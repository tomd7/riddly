import { createFileRoute, Link } from "@tanstack/react-router";
import {
  IconArrowNarrowLeftDashed,
  IconArrowNarrowRightDashed,
  IconHandMove,
  IconHome2Filled,
  IconSwipe,
} from "@tabler/icons-react";
import { CardStack } from "@/components/card-stack.tsx";

export const Route = createFileRoute("/riddles")({
  component: RiddlesPage,
});

export function RiddlesPage() {
  const cards = [
    {
      id: 1,
      question: "Qu'est-ce que je vois dans mon miroir ? (1)",
      hint: `"mir" ou "ar"/"oir"`,
      answer: 'Tous les mots qui contiennent "mir" ou "ar"/"oir"',
    },
    {
      id: 2,
      question: "Qu'est-ce que je vois dans mon miroir ? (2)",
      answer: 'Tous les mots qui contiennent "mir" ou "ar"/"oir"',
    },
    {
      id: 3,
      question: "Qu'est-ce que je vois dans mon miroir ? (3)",
      hint: `"mir" ou "ar"/"oir"`,
      answer: 'Tous les mots qui contiennent "mir" ou "ar"/"oir"',
    },
    {
      id: 4,
      question: "Qu'est-ce que je vois dans mon miroir ? (4)",
      hint: `"mir" ou "ar"/"oir"`,
      answer: 'Tous les mots qui contiennent "mir" ou "ar"/"oir"',
    },
  ];

  return (
    <div className="w-full h-full px-3 py-6 flex justify-center">
      <div className="h-full w-full md:w-3/4 flex flex-col gap-3">
        <div className="w-full flex gap-3 items-center">
          <Link to="/" className="clickable p-2">
            <IconHome2Filled className="size-6 text-indigo-500" />
          </Link>
          <h1 className="text-3xl font-heading text-center font-bold text-indigo-500">
            Devinettes
          </h1>
        </div>
        <div className="w-full h-full mt-8">
          <CardStack cards={cards} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center items-center text-muted-foreground">
            <IconArrowNarrowLeftDashed />
            <div>
              <IconSwipe size={28} />
              <IconHandMove size={28} />
            </div>
            <IconArrowNarrowRightDashed />
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Swipez à gauche ou à droite pour passer à la carte suivante
          </p>
        </div>
      </div>
    </div>
  );
}
