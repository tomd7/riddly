import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button.tsx";
import { IconArrowNarrowRight, IconHome2Filled } from "@tabler/icons-react";
import { CardStack } from "@/components/card-stack.tsx";

export const Route = createFileRoute("/riddles")({
  component: RiddlesPage,
});

export function RiddlesPage() {
  return (
    <div className="w-full h-full px-3 py-6 flex justify-center">
      <div className="h-full w-full md:w-3/4 flex flex-col gap-6">
        <div className="w-full flex gap-3 items-center">
          <Link to="/" className="clickable p-2">
            <IconHome2Filled className="size-6 text-indigo-500" />
          </Link>
          <h1 className="text-3xl font-heading text-center font-bold text-indigo-500">
            Devinettes
          </h1>
        </div>
        <CardStack className="w-full h-full">
          <CardStack.Item>
            <CardStack.Front>
              <div className="h-full p-6 flex items-center justify-center">
                <span className="font-heading font-bold text-4xl text-center">
                  Qu&apos;est-ce que je vois dans mon miroir ?
                </span>
              </div>
            </CardStack.Front>
            <CardStack.Back>
              <div className="h-full py-6 px-4 md:px-12 gap-8 flex flex-col items-center justify-evenly">
                <div className="flex flex-col gap-2">
                  <span className="font-heading font-bold text-2xl text-center">
                    Indice
                  </span>
                  <span className="font-sans text-lg text-center">
                    &quot;mir&quot; ou &quot;ar&quot;/&quot;oir&quot;
                  </span>
                </div>
                <hr className="border-t border-gray-300 w-full" />
                <div className="flex flex-col gap-2">
                  <span className="font-heading font-bold text-2xl text-center">
                    Réponse
                  </span>
                  <span className="font-sans text-lg text-center">
                    Tous les mots qui contiennent &quot;mir&quot; ou
                    &quot;ar&quot;/&quot;oir&quot;
                  </span>
                </div>
              </div>
            </CardStack.Back>
          </CardStack.Item>
          <CardStack.Item></CardStack.Item>
          <CardStack.Item></CardStack.Item>
        </CardStack>
        <div className="w-full flex gap-2">
          <Button className="grow h-auto py-3 bg-indigo-500 text-md border-0 clickable shadow">
            Suivante
            <IconArrowNarrowRight className="size-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
