import { NodeConsumer } from "~/components/NodeConsumer";

export default function Index() {
  return (
    <main className="h-screen bg-neutral-50 dark:bg-neutral-800">
      <NodeConsumer />
    </main>
  );
}
