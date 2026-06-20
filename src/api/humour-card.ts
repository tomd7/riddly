export type GetAllHumourCardDto = {
  id: string;
  title: string;
  hint: string;
  answer: string;
  category: {
    label: string;
    color: string;
  };
  subCategory: {
    label: string;
    color: string;
  };
};
