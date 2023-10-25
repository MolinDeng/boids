import BoidCanvas from '@/components/BoidCanvas';
import ToolMenu from '@/components/ToolMenu';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ToolMenu />
      <div className="w-full h-full inset-0 absolute z-[-50]">
        <BoidCanvas />
      </div>
    </main>
  );
}
