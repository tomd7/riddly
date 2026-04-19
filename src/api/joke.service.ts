import { shuffle } from "@/lib/array.utils.ts";
import { humourCardService } from "@/api/humour-card.service.ts";

export const jokeService = {
  getAllRandom: async () => {
    return humourCardService
      .getAllRandom({ filter: "type = 'joke'" })
      .then((riddles) => shuffle(riddles));
  },
};
