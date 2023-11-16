import BoidCanvas from '@/components/BoidCanvas';
import ControlPanel from '@/components/ControlPanel';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="w-full h-full inset-0 absolute">
        <BoidCanvas />
      </div>
      <ControlPanel />
    </main>
  );
}
