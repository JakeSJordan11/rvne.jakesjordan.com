export function MissingContent() {
  return (
    <div className="p-4 m-4 text-xl font-light text-center rounded border-2 dark:border-0 dark:border-b-2 bg-neutral-50 border-neutral-400 caret-black dark:bg-neutral-200 dark:border-b-neutral-700">
      <p className="text-2xl font-medium">no content found!</p>
      <p>use the create menu</p>
      <p className="font-mono text-sm">[tab or right click]</p>
      <p>to add content to this node</p>
    </div>
  );
}
