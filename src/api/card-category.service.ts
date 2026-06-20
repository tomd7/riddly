import { pb } from "@/config/pb.ts";
import type { GetAllCardCategoryDto } from "@/api/card-category.ts";

const COLLECTION_NAME = "card_categories";

async function getAll(): Promise<GetAllCardCategoryDto[]> {
  return pb.collection(COLLECTION_NAME).getFullList<GetAllCardCategoryDto>({
    filter: "deleted = false",
    sort: "label",
  });
}

async function getOne(id: string): Promise<GetAllCardCategoryDto> {
  return pb.collection(COLLECTION_NAME).getOne<GetAllCardCategoryDto>(id);
}

export const cardCategoryService = {
  getAll,
  getOne,
};
