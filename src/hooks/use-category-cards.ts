import { useEffect, useState } from "react";
import { humourCardService } from "@/api/humour-card.service.ts";
import type { GetAllHumourCardDto } from "@/api/humour-card.ts";

export function useCategoryCards(categoryId: string) {
  const [cards, setCards] = useState<GetAllHumourCardDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    humourCardService
      .getAllFromCategory(categoryId)
      .then((result) => setCards(result))
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  return { cards, isLoading };
}
