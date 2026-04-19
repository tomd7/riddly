import { createFileRoute, Link } from "@tanstack/react-router";
import {
  IconArrowNarrowLeftDashed,
  IconArrowNarrowRightDashed,
  IconHandMove,
  IconHome2Filled,
  IconSwipe,
} from "@tabler/icons-react";
import { CardStack } from "@/components/card-stack.tsx";
import { useEffect, useState } from "react";
import type { GetAllHumourCardDto } from "@/api/humour-card.ts";
import { jokeService } from "@/api/joke.service.ts";
import { Spinner } from "@/components/ui/spinner.tsx";

export const Route = createFileRoute("/jokes")({
  component: JokesPage,
});

function JokesPage() {
  const [cards, setCards] = useState<GetAllHumourCardDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    jokeService
      .getAllRandom()
      .then((riddles) => setCards(riddles))
      .then(() => setIsLoading(false));
  }, []);

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

        {isLoading ? (
          <div className="w-full h-full justify-center items-center flex">
            <Spinner className="size-8" />
          </div>
        ) : (
          <div className="w-full h-full mt-8">
            <CardStack cards={cards} />
          </div>
        )}

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
