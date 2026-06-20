import { createFileRoute, Link } from "@tanstack/react-router";
import { CategoryCard } from "@/components/category-card.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { useGetCategories } from "@/hooks/use-get-categories.ts";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { categories, isLoading } = useGetCategories();

  return (
    <div className="md:h-full py-8 flex flex-col gap-10 items-center md:justify-center">
      <div>
        <h1 className="text-5xl font-heading text-center font-bold">Riddly</h1>
        <h2 className="text-3xl font-heading text-center font-bold">
          <span className="underline text-emerald-500">Cogite</span> ou{" "}
          <span className="underline text-indigo-500">rigole</span> ?
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {categories.map((category) => (
            <Link key={category.id} to={category.id}>
              <CategoryCard
                icon={category.icon}
                title={category.label}
                description={category.description}
                color={category.color}
                example={category.example}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
