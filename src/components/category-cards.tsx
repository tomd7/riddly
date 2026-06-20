import { useCategoryCards } from "@/hooks/use-category-cards.ts";
import { Spinner } from "@/components/ui/spinner.tsx";
import { CardStack } from "@/components/card-stack.tsx";

type Props = {
  categoryId: string;
};

export function CategoryCards({ categoryId }: Props) {
  const { cards, isLoading } = useCategoryCards(categoryId);
  console.log(cards);

  if (isLoading) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="w-full h-full mt-8">
      <CardStack ids={cards.map((c) => c.id)}>
        {(id, index) => {
          const card = cards.find((c) => c.id === id);
          if (!card) return null;

          return (
            <CardStack.Item key={id} id={id} index={index}>
              <CardStack.Front>
                <div className="relative h-full p-6 flex flex-col items-center justify-center">
                  {card.subCategory && (
                    <div
                      className="rounded py-1 px-2.5 font-medium text-white text-lg mb-2"
                      style={{ background: card.subCategory.color }}
                    >
                      {card.subCategory.label}
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
  );
}
