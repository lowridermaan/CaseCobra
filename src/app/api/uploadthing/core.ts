import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { z } from 'zod';
import sharp from 'sharp';
import { db } from '@/db';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      // получаем данные о изображении
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();

      const imageMetadata = await sharp(buffer).metadata();
      const { width, height } = imageMetadata;

      if (!configId) {
        //так будет называется таблица
        const configuration = await db.configuration.create({
          data: {
            imageUrl: file.url,
            height: height || 500,
            width: width || 500,
          },
        });

        return { configId: configuration.id };
      } else {
        // для кропнутой картинки (обновляем таблицу)
        const updatedConfiguration = await db.configuration.update({
          // где обновлять
          where: {
            id: configId,
          },
          // что обновлять
          data: {
            croppedImageUrl: file.url,
          },
        });
        return { configId: updatedConfiguration.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
