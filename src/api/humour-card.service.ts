import { pb } from "@/config/pb.ts";
import type { GetAllHumourCardDto } from "@/api/humour-card.ts";
import type { RecordFullListOptions } from "pocketbase";
import { shuffle } from "@/lib/array.utils.ts";
import type { ExpandableResult } from "@/types/expandable-result.ts";

const COLLECTION_NAME = "humour_cards";
const EXPAND_FIELDS = "category";

const flattenCategory = (
  card: ExpandableResult<GetAllHumourCardDto>,
): GetAllHumourCardDto => ({
  ...card,
  category: card.expand.category,
});

async function getAll(
  options?: RecordFullListOptions,
): Promise<GetAllHumourCardDto[]> {
  const cards = await pb
    .collection(COLLECTION_NAME)
    .getFullList<ExpandableResult<GetAllHumourCardDto>>({
      ...options,
      expand: EXPAND_FIELDS,
    });
  return cards.map(flattenCategory);
}

async function getAllRandom(
  options?: RecordFullListOptions,
): Promise<GetAllHumourCardDto[]> {
  const cards = await getAll(options);
  return shuffle(cards);
}

export const humourCardService = {
  getAllRandom,
};
