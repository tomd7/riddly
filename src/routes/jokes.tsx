import { createFileRoute, Link } from "@tanstack/react-router";
import { IconHome2Filled } from "@tabler/icons-react";
import { CardStack } from "@/components/card-stack.tsx";

export const Route = createFileRoute("/jokes")({
  component: JokesPage,
});

function JokesPage() {
  return (
    <div className="w-full h-full px-3 py-6 flex justify-center">
      <div className="h-full w-full md:w-3/4 flex flex-col gap-6">
        <div className="w-full flex gap-3 items-center">
          <Link to="/" className="clickable p-2">
            <IconHome2Filled className="size-6 text-emerald-500" />
          </Link>
          <h1 className="text-3xl font-heading text-center font-bold text-emerald-500">
            Blagues
          </h1>
        </div>
        <div className="w-full h-full mt-8">
          <CardStack cards={[]} />
        </div>
      </div>
    </div>
  );
}
