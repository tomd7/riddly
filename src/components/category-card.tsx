import { Card } from "@/components/ui/card.tsx";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils.ts";
import { IconArrowRight } from "@tabler/icons-react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  cardsContent?: ReactNode;
  bgClassName?: string;
};

export function CategoryCard({
  icon,
  title,
  description,
  cardsContent,
  bgClassName,
}: Props) {
  return (
    <Card
      className={cn(
        "flex justify-center items-center relative shadow-lg w-64 h-64 bg-gray-300/80 clickable p-4 hover:[&_.cards-stack>:nth-child(3)]:rotate-3",
        bgClassName,
      )}
    >
      <div className="rounded-3xl w-full h-full">
        <ul className="relative rounded-3xl w-full h-full cards-stack">
          <li className="absolute flex w-full h-full pl-4">
            <div className="rounded-3xl bg-gray-300 w-full h-full shadow" />
          </li>
          <li className="absolute flex w-full h-full px-2">
            <div className="rounded-3xl bg-gray-200 w-full h-full shadow mt-2" />
          </li>
          <li className="absolute flex w-full h-full pr-4 transition-transform duration-200">
            <div className="rounded-3xl bg-white w-full h-full shadow mt-4 p-4">
              {cardsContent}
            </div>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1 rounded-t-xl bg-white/50 backdrop-blur-sm shadow-md shadow-black hover:[&>div>svg.tabler-icon]:text-gray-800 transition-all duration-200">
        {icon}
        <h2 className="text-xl font-semibold font-heading">{title}</h2>
        <p className="text-sm text-muted-foreground font-sans">{description}</p>
        <div className="relative">
          <IconArrowRight className="absolute right-0 bottom-0 text-gray-500" />
        </div>
      </div>
    </Card>
  );
}
