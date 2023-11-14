'use client';
import Link from 'next/link';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useBirdConfig, useRenderConfig } from '@/hooks/useBoidsConfig';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { MoveRightIcon, Pause, Play, RefreshCcw } from 'lucide-react';
import Image from 'next/image';

export default function ToolMenu() {
  const { paused, flipPaused, setPaused, setNextFrame, flipMemoFresh } =
    useRenderConfig();
  const {
    birdNum,
    birdPerceivedRadius,
    birdMaxSpeed,
    // birdMaxForce,
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
    predatorRemain,

    setBirdNum,
    setBirdPerceivedRadius,
    setBirdMaxSpeed,
    // setBirdMaxForce,
    setBirdSeparationWeight,
    setBirdAlignmentWeight,
    setBirdCohesionWeight,
    setBirdSeparationRadius,
    setBirdDirectionNoise,
    setBirdDirectionNoiseWeight,
    flipBounceOffEdge,
    setBounceMargin,
    setBounceTurnFactor,
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
      max: 800,
      min: 10,
      step: 10,
    },
    // {
    //   label: 'Bird Max Force',
    //   value: birdMaxForce,
    //   onValueChange: setBirdMaxForce,
    //   max: 500,
    //   min: 0,
    //   step: 10,
    // },
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

  return (
    <div className="h-screen w-[300px] bg-white bg-opacity-5 backdrop-blur-[2px]">
      <div className="h-full w-full p-8 flex flex-col space-y-3 overflow-scroll text-xs">
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
          <Button onClick={flipMemoFresh} title="Reset">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button onClick={flipPaused} title={paused ? 'Resume' : 'Pause'}>
            {paused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </Button>
          <Button
            disabled={!paused}
            onClick={(e) => {
              setNextFrame(true);
            }}
          >
            Next Frame
          </Button>
        </div>
        {sliders.map((s) => (
          <div key={s.label}>
            <p className="py-2">
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
          <div key={s.label}>
            <p className="py-2">
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
