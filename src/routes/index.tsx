import { createFileRoute } from "@tanstack/react-router";
import { CategoryCard } from "@/components/category-card.tsx";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <h1 className="text-4xl font-heading text-center font-bold">
        Cogite ou rigole :{" "}
        <span className="underline text-indigo-500">Devinettes</span> ou{" "}
        <span className="underline text-emerald-500">Blagues</span> ?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <CategoryCard
          icon={<span className="text-2xl">🤔</span>}
          title="Devinettes"
          description="Ici, même les réponses te regardent en mode “c’était pourtant évident”."
          bgClassName="bg-indigo-400"
          cardsContent={
            <div className="text-lg text-gray-400 font-sans text-center">
              Il y a 7 nains autour d&apos;une table. Sur cette table, il y a 7
              assiettes, 7 couverts, ...
            </div>
          }
        />
        <CategoryCard
          icon={<span className="text-2xl">🤣</span>}
          title="Blagues"
          description="Ici, le niveau descend parfois très bas… mais le sourire monte toujours très vite."
          bgClassName="bg-emerald-400"
          cardsContent={
            <div className="flex flex-col justify-center">
              <span className="text-lg text-gray-400 font-sans text-center">
                Qu&apos;est-ce qui est jaune et qui attend ?
              </span>
              <span className="text-lg text-gray-500 font-sans text-center">
                Jonathan
              </span>
            </div>
          }
        />
      </div>
    </>
  );
}
