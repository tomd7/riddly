import { useEffect, useState } from "react";
import { cardCategoryService } from "@/api/card-category.service.ts";
import type { GetAllCardCategoryDto } from "@/api/card-category.ts";

export function useGetCategories() {
  const [categories, setCategories] = useState<GetAllCardCategoryDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    cardCategoryService
      .getAll()
      .then((result) => setCategories(result))
      .finally(() => setIsLoading(false));
  }, []);

  return { categories, isLoading };
}
