export function WelcomeContent() {
  return (
    <div className="p-4 m-4 text-xl font-light text-center rounded border-2 dark:border-0 dark:border-b-2 bg-neutral-50 border-neutral-400 caret-black dark:bg-neutral-200 dark:border-b-neutral-700">
      <p className="text-2xl font-medium">
        Welcome to{" "}
        <span className="font-serif font-semibold text-orange-600">RVNE</span>!
      </p>
      <p>
        open the{" "}
        <span className="font-serif font-semibold text-teal-600">
          create menu
        </span>
      </p>
      <p className="font-mono text-sm">[tab or right click]</p>
      <p>to add nodes to your board</p>
    </div>
  );
}
