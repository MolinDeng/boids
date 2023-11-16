import MyCanvas from '@/components/MyCanvas';
import ControlPanel from '@/components/ControlPanel';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="w-full h-full inset-0 absolute">
        <MyCanvas />
      </div>
      <ControlPanel />
    </main>
  );
}
