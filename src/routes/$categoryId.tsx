import { createFileRoute, Link } from "@tanstack/react-router";
import { useGetCategory } from "@/hooks/use-get-category.ts";
import {
  IconArrowNarrowLeftDashed,
  IconArrowNarrowRightDashed,
  IconHandMove,
  IconHome2Filled,
  IconSwipe,
} from "@tabler/icons-react";
import { CategoryCards } from "@/components/category-cards.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";

export const Route = createFileRoute("/$categoryId")({
  component: CategoryCardsPage,
});

function CategoryCardsPage() {
  const { categoryId } = Route.useParams();
  const { category, isLoading } = useGetCategory(categoryId);

  if (isLoading) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="w-full h-full px-3 py-6 flex justify-center">
      <div className="h-full w-full max-w-120 flex flex-col gap-3">
        <div className="w-full flex gap-3 items-center">
          <Link to="/" className="clickable p-2">
            <IconHome2Filled
              className="size-6"
              style={{ color: category?.color }}
            />
          </Link>
          <h1
            className="text-3xl font-heading text-center font-bold"
            style={{ color: category?.color }}
          >
            {category?.label}
          </h1>
        </div>

        <CategoryCards categoryId={categoryId} />

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
