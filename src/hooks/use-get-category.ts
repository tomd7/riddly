import { useEffect, useState } from "react";
import { cardCategoryService } from "@/api/card-category.service.ts";
import type { GetAllCardCategoryDto } from "@/api/card-category.ts";

export function useGetCategory(categoryId: string) {
  const [category, setCategory] = useState<GetAllCardCategoryDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    cardCategoryService
      .getOne(categoryId)
      .then((result) => setCategory(result))
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  return { category, isLoading };
}
