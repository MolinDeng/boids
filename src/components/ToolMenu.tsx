'use client';
import Link from 'next/link';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useRenderPause } from '@/hooks/useBoidsConfig';

export default function ToolMenu() {
  const { paused, flipPaused, setPaused } = useRenderPause();

  return (
    <div className="min-h-screen w-[300px] bg-white bg-opacity-5 backdrop-blur-[2px]">
      <div className="h-full w-full p-8 flex flex-col">
        <p className="text-center">
          Boids{' '}
          <Link
            className="text-sm underline text-blue-600"
            href={'https://github.com/MolinDeng/boids'}
          >
            Source
          </Link>
        </p>
        <div className="flex items-center space-x-2">
          <Checkbox
            className="ring-white"
            id="pause"
            checked={paused}
            onClick={flipPaused}
          />
          <label htmlFor="pause" className="text-sm">
            Pause
          </label>
        </div>
      </div>
    </div>
  );
}
