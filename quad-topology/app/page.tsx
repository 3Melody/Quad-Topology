import GameController from "../components/game/GameController";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white selection:bg-cyan-500/30">
      <GameController />
    </main>
  );
}
