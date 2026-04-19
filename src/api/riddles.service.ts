import { shuffle } from "@/lib/array.utils.ts";
import type { GetAllRiddlesDto } from "@/api/riddles.types.ts";
import { pb } from "@/config/pb.ts";

export const riddlesService = {
  getAll: async () => {
    return pb.collection("humour_cards").getFullList<GetAllRiddlesDto>({
      filter: "type = 'riddle'",
    });
  },
  getAllRandom: async () => {
    return riddlesService.getAll().then((riddles) => shuffle(riddles));
  },
};
