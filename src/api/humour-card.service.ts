import { pb } from "@/config/pb.ts";
import type { GetAllHumourCardDto } from "@/api/humour-card.ts";
import type { RecordFullListOptions } from "pocketbase";
import { shuffle } from "@/lib/array.utils.ts";

export const humourCardService = {
  getAll: (options?: RecordFullListOptions) =>
    pb.collection("humour_cards").getFullList<GetAllHumourCardDto>(options),
  getAllRandom: async (options?: RecordFullListOptions) => {
    return humourCardService.getAll(options).then((cards) => shuffle(cards));
  },
};
