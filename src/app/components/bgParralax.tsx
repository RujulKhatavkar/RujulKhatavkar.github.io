import SpaceUniverse from "./universe/SpaceUniverse";

export function GlobalParallaxBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <SpaceUniverse />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
    </div>
  );
}