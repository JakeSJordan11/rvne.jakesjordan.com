export default function Index() {
  return (
    <main>
      <Node />
    </main>
  );
}

export function Node() {
  return (
    <>
      <article className="flex absolute justify-center items-center p-4 rounded-lg border-4 border-black select-none w-fit cursor-grab">
        <h1 className="font-mono font-extrabold">input node</h1>
        <div className="absolute w-2 h-2 bg-black rounded-full ring-2 ring-white translate-y-[30px] cursor-crosshair" />
      </article>
    </>
  );
}
