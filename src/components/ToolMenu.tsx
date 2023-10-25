import Link from 'next/link';
import React from 'react';

export default function ToolMenu() {
  return (
    <div className="min-h-screen w-[300px] bg-white bg-opacity-5 backdrop-blur-[2px]">
      <div className="h-full w-full p-8 flex flex-col">
        <p className="text-white text-center">
          Boids{' '}
          <Link
            className="text-sm underline text-blue-600"
            href={'https://github.com/MolinDeng/boids'}
          >
            Source
          </Link>
        </p>
      </div>
    </div>
  );
}
