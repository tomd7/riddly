import { createFileRoute, Link } from "@tanstack/react-router";
import {
  IconArrowNarrowLeftDashed,
  IconArrowNarrowRightDashed,
  IconHandMove,
  IconHome2Filled,
  IconSwipe,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { riddleService } from "@/api/riddle.service.ts";
import { Spinner } from "@/components/ui/spinner.tsx";
import type { GetAllHumourCardDto } from "@/api/humour-card.ts";
import { CardStack } from "@/components/card-stack.tsx";

export const Route = createFileRoute("/riddles")({
  component: RiddlesPage,
});

export function RiddlesPage() {
  const [cards, setCards] = useState<GetAllHumourCardDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    riddleService
      .getAllRandom()
      .then((riddles) => setCards(riddles))
      .then(() => setIsLoading(false));
  }, []);

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

        {isLoading ? (
          <div className="w-full h-full justify-center items-center flex">
            <Spinner className="size-8" />
          </div>
        ) : (
          <div className="w-full h-full mt-8">
            <CardStack ids={cards.map((c) => c.id)}>
              {(id, index) => {
                const card = cards.find((c) => c.id === id);
                if (!card) return null;

                return (
                  <CardStack.Item key={id} id={id} index={index}>
                    <CardStack.Front>
                      <div className="relative h-full p-6 flex flex-col items-center justify-center">
                        {card.category && (
                          <div
                            className="rounded py-1 px-2.5 font-medium text-white text-lg mb-2"
                            style={{ background: card.category.color }}
                          >
                            {card.category.label}
                          </div>
                        )}
                        <span className="font-heading font-bold text-2xl md:text-4xl text-center">
                          {card.title}
                        </span>
                        <span className="absolute bottom-1.5 text-muted-foreground text-center">
                          Appuyez sur la carte pour la retourner
                        </span>
                      </div>
                    </CardStack.Front>
                    <CardStack.Back>
                      <div className="h-full py-6 px-4 md:px-12 gap-8 flex flex-col items-center justify-evenly">
                        {card.hint ? (
                          <>
                            <div className="flex flex-col gap-2">
                              <span className="font-heading font-bold text-2xl text-center">
                                Indice
                              </span>
                              <span className="font-sans text-lg text-center">
                                {card.hint}
                              </span>
                            </div>
                            <hr className="border-t border-gray-300 w-full" />
                          </>
                        ) : null}
                        {card.answer && (
                          <div className="flex flex-col gap-2">
                            <span className="font-heading font-bold text-2xl text-center">
                              Réponse
                            </span>
                            <span className="font-sans text-lg text-center">
                              {card.answer}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardStack.Back>
                  </CardStack.Item>
                );
              }}
            </CardStack>
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
