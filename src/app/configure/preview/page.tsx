import { db } from '@/db';
import { notFound } from 'next/navigation';
import DesignPreview from './DesignPreview';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

async function Page({ searchParams }: PageProps) {
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const test = JSON.stringify(configuration).split(',');

  return (
    <div className="py-20">
      <DesignPreview configuration={configuration} />
      {/* <div className="bg-zinc-100 fixed bottom-[100px] right-0 opacity-40 ">
        <ul>
          object from DB:
          {test.map((prop, i) => (
            <li key={i}>{prop}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default Page;
