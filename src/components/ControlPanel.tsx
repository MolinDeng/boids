'use client';
import { FC } from 'react';
import Link from 'next/link';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useBirdConfig, useRenderConfig } from '@/hooks/useBoidsConfig';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  HelpCircle,
  MoveRightIcon,
  Pause,
  Play,
  RefreshCcw,
  Settings,
} from 'lucide-react';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface SliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  max: number;
  min: number;
  step: number;
  explain?: string;
}

const SliderComponent: FC<SliderProps> = ({
  label,
  value,
  onValueChange,
  max,
  min,
  step,
  explain,
}) => {
  return (
    <TooltipProvider>
      <div key={label}>
        <p className="py-2 flex items-center">
          {label}{' '}
          {explain && (
            <Tooltip delayDuration={300}>
              <TooltipTrigger className="cursor-default mx-1 animate-bounce">
                <HelpCircle className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="w-80 p-2 text-center">
                {explain}
              </TooltipContent>
            </Tooltip>
          )}
          : <span className="bg-black px-2">{value}</span>
        </p>

        <div className="flex">
          <p>{min}</p>
          <Slider
            className="mx-2"
            defaultValue={[value]}
            onValueChange={(e) => onValueChange(e[0])}
            max={max}
            min={min}
            step={step}
          />
          <p>{max}</p>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default function ToolMenu() {
  const { paused, flipPaused, setPaused, setNextFrame, flipMemoFresh } =
    useRenderConfig();
  const {
    birdNum,
    birdPerceivedRadius,
    birdMaxSpeed,
    birdMaxForce,
    birdSeparationWeight,
    birdAlignmentWeight,
    birdCohesionWeight,
    birdSeparationRadius,
    birdDirectionNoise,
    birdDirectionNoiseWeight,
    bounceOffEdge,
    bounceMargin,
    bounceTurnFactor,

    birdRemain,

    setBirdNum,
    setBirdPerceivedRadius,
    setBirdMaxSpeed,
    setBirdMaxForce,
    setBirdSeparationWeight,
    setBirdAlignmentWeight,
    setBirdCohesionWeight,
    setBirdSeparationRadius,
    setBirdDirectionNoise,
    setBirdDirectionNoiseWeight,
    flipBounceOffEdge,
    setBounceMargin,
    setBounceTurnFactor,

    // predator config
    predatorNum,
    setPredatorNum,
  } = useBirdConfig();

  const sliders = [
    {
      label: 'Bird Num',
      value: birdNum,
      onValueChange: setBirdNum,
      max: 5000,
      min: 10,
      step: 10,
    },
    {
      label: 'Predator Num',
      value: predatorNum,
      onValueChange: setPredatorNum,
      max: 10,
      min: 0,
      step: 1,
    },
    {
      label: 'Bird Perceived Radius',
      value: birdPerceivedRadius,
      onValueChange: setBirdPerceivedRadius,
      max: 100,
      min: 10,
      step: 1,
    },
    {
      label: 'Bird Max Speed',
      explain:
        '0 means no limit. It recommends to set no limit. Adjust the max force instead.',
      value: birdMaxSpeed,
      onValueChange: setBirdMaxSpeed,
      max: 800,
      min: 0,
      step: 10,
    },
    {
      label: 'Max Force',
      value: birdMaxForce,
      onValueChange: setBirdMaxForce,
      max: 800,
      min: 10,
      step: 10,
    },
    {
      label: 'Bird Alignment Weight',
      value: birdAlignmentWeight,
      onValueChange: setBirdAlignmentWeight,
      max: 10,
      min: 0,
      step: 0.1,
    },
    {
      label: 'Bird Cohesion Weight',
      value: birdCohesionWeight,
      onValueChange: setBirdCohesionWeight,
      max: 10,
      min: 0,
      step: 0.1,
    },
    {
      label: 'Bird Separation Weight',
      value: birdSeparationWeight,
      onValueChange: setBirdSeparationWeight,
      max: 10,
      min: 0,
      step: 0.1,
    },
    {
      label: 'Bird Separation Radius',
      value: birdSeparationRadius,
      onValueChange: setBirdSeparationRadius,
      max: birdPerceivedRadius, // should be less than perceived radius
      min: 0,
      step: 1,
    },
    {
      label: 'Bird Direaction Noise',
      value: birdDirectionNoise,
      onValueChange: setBirdDirectionNoise,
      max: 40,
      min: 0,
      step: 5,
    },
    {
      label: 'Bird Direaction Noise Weight',
      value: birdDirectionNoiseWeight,
      onValueChange: setBirdDirectionNoiseWeight,
      max: 1,
      min: 0,
      step: 0.1,
    },
  ];
  const bounceSlider = [
    {
      label: 'Bounce Margin',
      value: bounceMargin,
      onValueChange: setBounceMargin,
      max: 400,
      min: 200,
      step: 10,
    },
    {
      label: 'Bounce Turn Factor',
      value: bounceTurnFactor,
      onValueChange: setBounceTurnFactor,
      max: 10,
      min: 1,
      step: 0.1,
    },
  ];

  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <>
      <div
        className={cn(
          'h-screen w-[300px] bg-white bg-opacity-5 backdrop-blur-[2px] transition-transform',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full w-full p-8 flex flex-col space-y-2 overflow-scroll text-xs">
          <p className="text-center text-lg">
            Boids{' '}
            <Link
              className="text-sm underline text-blue-600"
              href={'https://github.com/MolinDeng/boids'}
            >
              Source
            </Link>
          </p>
          <div className="flex items-center justify-evenly">
            <div className="flex items-center justify-center">
              <div className="inline-block relative h-4 w-4">
                <Image src={'/predator.png'} fill alt="predator" />
              </div>
              Predator
            </div>

            <div className="flex items-center justify-center">
              <div className="relative inline-block h-4 w-4">
                <Image src={'/prey.png'} fill alt="prey" />
              </div>
              Prey <span className="px-2">{birdRemain}</span> alive
            </div>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <Button size="sm" onClick={flipMemoFresh} title="Reset">
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={flipPaused}
              title={paused ? 'Resume' : 'Pause'}
            >
              {paused ? (
                <Play className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="sm"
              disabled={!paused}
              onClick={(e) => {
                setNextFrame(true);
              }}
            >
              Next Frame
            </Button>
          </div>
          {sliders.map((s) => (
            <SliderComponent key={s.label} {...s} />
          ))}
          <div className="flex items-center justify-center space-x-2 pt-4">
            <Checkbox
              id="bounce"
              checked={bounceOffEdge}
              onClick={flipBounceOffEdge}
            />
            <label
              htmlFor="bounce"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Bounce off from edge
            </label>
          </div>
          {bounceSlider.map((s) => (
            <SliderComponent key={s.label} {...s} />
          ))}
        </div>
      </div>
      <Button
        variant={'ghost'}
        className="absolute left-0 top-0"
        onClick={() => setOpen(!open)}
      >
        <Settings className="h-4 w-4" />
      </Button>
    </>
  );
}
