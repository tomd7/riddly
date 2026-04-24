import { shuffle } from "@/lib/array.utils.ts";
import { humourCardService } from "@/api/humour-card.service.ts";

export const riddleService = {
  getAllRandom: async () => {
    return humourCardService
      .getAllRandom({ filter: "type = 'riddle' && deleted = false" })
      .then((riddles) => shuffle(riddles));
  },
};
