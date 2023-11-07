import BoidCanvas from '@/components/BoidCanvas';
import ControlPanel from '@/components/ControlPanel';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ControlPanel />
      <div className="w-full h-full inset-0 absolute z-[-50]">
        <BoidCanvas />
      </div>
    </main>
  );
}
