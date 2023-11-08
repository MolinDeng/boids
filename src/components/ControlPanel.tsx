'use client';
import Link from 'next/link';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useBirdConfig, useRenderConfig } from '@/hooks/useBoidsConfig';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RefreshCcw } from 'lucide-react';

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
  } = useBirdConfig();

  const sliders = [
    {
      label: 'Bird Num',
      value: birdNum,
      onValueChange: setBirdNum,
      max: 1500,
      min: 10,
      step: 10,
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
      value: birdMaxSpeed,
      onValueChange: setBirdMaxSpeed,
      max: 500,
      min: 10,
      step: 10,
    },
    {
      label: 'Bird Max Force (Uselss)',
      value: birdMaxForce,
      onValueChange: setBirdMaxForce,
      max: 500,
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

  return (
    <div className="h-screen w-[300px] bg-white bg-opacity-5 backdrop-blur-[2px]">
      <div className="h-full w-full p-8 flex flex-col space-y-3 overflow-scroll text-xs">
        <p className="text-center text-base">
          Boids{' '}
          <Link
            className="text-sm underline text-blue-600"
            href={'https://github.com/MolinDeng/boids'}
          >
            Source
          </Link>
        </p>
        <div className="flex items-center space-x-2">
          <Button onClick={flipMemoFresh} className="text-xs">
            <RefreshCcw className="h-4 w-4" /> Reset
          </Button>
          <Checkbox
            className="ring-white"
            id="pause"
            checked={paused}
            onClick={flipPaused}
          />
          <label htmlFor="pause" className="py-4">
            Pause
          </label>
          {paused && (
            <Button
              className="text-xs"
              size={'sm'}
              onClick={(e) => {
                setNextFrame(true);
              }}
            >
              Next Frame
            </Button>
          )}
        </div>
        {sliders.map((s) => (
          <div key={s.label}>
            <p className="py-4">
              {s.label}: <span className="bg-black px-2">{s.value}</span>
            </p>
            <div className="flex">
              <p>{s.min}</p>
              <Slider
                className="mx-2"
                defaultValue={[s.value]}
                onValueChange={(e) => s.onValueChange(e[0])}
                max={s.max}
                min={s.min}
                step={s.step}
              />
              <p>{s.max}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}