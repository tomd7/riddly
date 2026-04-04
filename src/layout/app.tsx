import { CategoryCard } from "@/components/category-card.tsx";

export default function App() {
  return (
    <div className="h-full w-full bg-[url('/background.png')] bg-cover bg-center">
      <div className="w-full h-full flex flex-col justify-center items-center p-4 gap-10 bg-white/70 backdrop-blur">
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
          />
          <CategoryCard
            icon={<span className="text-2xl">🤣</span>}
            title="Blagues"
            description="Ici, le niveau descend parfois très bas… mais le sourire monte toujours très vite."
            bgClassName="bg-emerald-400"
            cardsContent={
              <div className="text-lg text-gray-400 font-sans text-center">
                Qu&apos;est-ce qui est jaune et qui attend ?
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
