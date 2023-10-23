import BoidCanvas from '@/components/BoidCanvas';

export default function Home() {
  return (
    <main className="w-full h-full">
      <div className="w-full h-full inset-0 absolute z-[-50]">
        <BoidCanvas />
      </div>
      <div className="bg-white w-[50px] h-[50px]">
        <p className="text-black"> text ui</p>
      </div>
    </main>
  );
}
