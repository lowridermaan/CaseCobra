'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { BASE_PRICE } from '@/config/products';
import { useUploadThing } from '@/lib/uploadthing';
import { base64ToBlob, cn, formatPrice } from '@/lib/utils';
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from '@/validators/option-validator';
import { Description, Radio, RadioGroup, Label } from '@headlessui/react';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
import NextImage from 'next/image';
import { useRef, useState } from 'react';
import Moveable from 'react-moveable';
import { saveConfig as _saveConfig, SaveConfigArgs } from './actions';
import { useRouter } from 'next/navigation';

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

function DesignConfigurator({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfiguratorProps) {
  const { toast } = useToast();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ['save-config'],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), _saveConfig(args)]);
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'There was an error on our end. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['save-config'] });
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  // для загрузки файла
  const { startUpload } = useUploadThing('imageUploader');

  const targetRef = useRef<HTMLDivElement | null>(null);
  const phoneCaseRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  //* main hook
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  // размер фотки на экране
  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });
  // расположение фотки
  const [renderPosition, setRenderPosition] = useState({
    x: 0,
    y: 0,
  });

  const [renderDeg, setRenderDeg] = useState(0);

  async function saveConfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      // растояние от края кейса до каря контейнера
      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;
      // расположение кейса в контейнере
      const actualX = renderPosition.x - leftOffset;
      const actualY = renderPosition.y - topOffset;
      // градусы
      const actualDeg = renderDeg;
      // рисуем картинку на канвас
      const canvas = document.createElement('canvas');
      // задаем ему ш\в
      canvas.width = width;
      canvas.height = height;
      //канвас двухмерный
      const ctx = canvas.getContext('2d');
      // создаем картинку
      const userImage = new Image();
      userImage.crossOrigin = 'anonumous';
      userImage.src = imageUrl;
      // дожидаемя загрузки
      await new Promise((resolve) => (userImage.onload = resolve));
      // рисуем
      ctx?.save();
      ctx?.translate(canvas.width / 2, canvas.height / 2);
      ctx?.rotate(actualDeg * (Math.PI / 180));
      ctx?.translate(-canvas.width / 2, -canvas.height / 2);
      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      );
      ctx?.restore();

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(',')[1];

      const blob = base64ToBlob(base64Data, 'img/png');
      const file = new File([blob], 'filename.png', { type: 'image/png' });

      await startUpload([file], { configId });
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description:
          'There was a problem saving your config, please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className=" relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className=" pointer-events-none relative z-50 aspect-[896/1831]"
          >
            <NextImage
              className="pointer-events-none z-50 select-none"
              src="/phone-template.png"
              alt="phone"
              fill
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              'absolute  inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
              `bg-${options.color.tw}`
            )}
          />
        </div>
        {/* изменение размеров*/}
        <div
          className="absolute top-0 left-0 flex justify-start items-start "
          ref={targetRef}
        >
          <NextImage
            width={imageDimensions.width / 4}
            height={imageDimensions.height / 4}
            src={imageUrl}
            alt="your image"
            className="pointer-events-none  "
          />
        </div>
        <Moveable
          target={targetRef}
          draggable={true}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          resizable={true}
          keepRatio={true}
          throttleScale={0}
          renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
          rotatable={true}
          throttleRotate={0}
          rotationPosition={'top'}
          onDrag={(e) => {
            e.target.style.transform = e.transform;
          }}
          onResize={(e) => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
          }}
          onRotate={(e) => {
            e.target.style.transform = e.drag.transform;
          }}
          onResizeEnd={(e) => {
            const { height, width } = e.lastEvent;
            const [x, y] = e.lastEvent.drag.beforeTranslate;
            setRenderedDimension({
              width,
              height,
            });
            setRenderPosition({ x, y });
          }}
          onDragEnd={(e) => {
            const [x, y] = e.lastEvent.beforeTranslate;
            setRenderPosition({ x, y });
          }}
          onRotateEnd={(e) => {
            const deg = e.lastEvent.beforeRotation;
            setRenderDeg(deg);
          }}
        />
      </div>
      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="realative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-2xl sm:text-3xl">
              Customize your case
            </h2>
            <div className="w-full h-px bg-zinc-200 my-6" />
            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({ ...prev, color: val }));
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <Radio
                        key={color.label}
                        value={color}
                        className={({ checked }) =>
                          cn(
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent transition',
                            {
                              [`border-${color.tw}`]: checked,
                            }
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        ></span>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
                <div className="relative flex flex-col gap-3 w-full">
                  <DropdownMenu>
                    <DropdownMenuLabel>Model</DropdownMenuLabel>
                    <DropdownMenuTrigger asChild>
                      {/* asChild для своего варианта кнопки */}
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" w-full">
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          onClick={() => {
                            setOptions((prev) => ({
                              ...prev,
                              model,
                            }));
                          }}
                          className={cn(
                            `flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100`,
                            {
                              'bg-zinc-100':
                                model.label === options.model.label,
                            }
                          )}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              model.label === options.model.label
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) =>
                        setOptions((prev) => ({
                          ...prev,
                          [name]: val,
                        }))
                      }
                    >
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((selectOpt) => (
                          <Radio
                            value={selectOpt}
                            key={selectOpt.value}
                            className={({ checked }) =>
                              cn(
                                'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:fing-0 outline-none sm:flex sm:justify-between',
                                {
                                  'border-primary': checked,
                                }
                              )
                            }
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <Label className="font-medium text-gray-900">
                                  {selectOpt.label}
                                </Label>
                                {selectOpt.description ? (
                                  <Description className="text-gray-500">
                                    <span className="block sm:inline ">
                                      {selectOpt.description}
                                    </span>
                                  </Description>
                                ) : null}
                              </span>
                            </span>
                            <Description className=" mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
                              <span className="font-medium text-gray-900">
                                {formatPrice(selectOpt.price / 100)}
                              </span>
                            </Description>
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100
                )}
              </p>
              <Button
                onClick={() =>
                  saveConfig({
                    configId,
                    color: options.color.value,
                    finish: options.finish.value,
                    material: options.material.value,
                    model: options.model.value,
                  })
                }
                className="w-full"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignConfigurator;
