import { cn } from "@/lib/utils.ts";
import {
  Children,
  type PropsWithChildren,
  type ReactElement,
  useState,
} from "react";
import { Card } from "@/components/ui/card.tsx";

const CARD_OFFSET = 12;

type RootProps = PropsWithChildren<{
  className?: string;
}>;

function Root({ children, className }: RootProps) {
  const items = Children.toArray(children);

  return (
    <ul className={cn("relative rounded-3xl cards-stack", className)}>
      {items.map((item, index) => (
        <ItemWrapper key={index} index={index} totalItems={items.length}>
          {item}
        </ItemWrapper>
      ))}
    </ul>
  );
}

type ItemWrapperProps = PropsWithChildren<{
  index: number;
  totalItems: number;
}>;

function ItemWrapper({ children, index, totalItems }: ItemWrapperProps) {
  const offset = index * CARD_OFFSET;
  const reversedOffset = (totalItems - 1 - index) * CARD_OFFSET;
  // const opacity = 1 - index / totalItems;

  const darkening = totalItems > 1 ? (index / (totalItems - 1)) * 0.125 : 0;
  const brightness = 1 - darkening;

  return (
    <li
      key={index}
      className="absolute flex w-full h-full clickable"
      style={{
        zIndex: totalItems - index,
        paddingLeft: offset,
        paddingRight: reversedOffset,
        paddingTop: reversedOffset,
        paddingBottom: offset,
        filter: `brightness(${brightness})`,
      }}
    >
      {children}
    </li>
  );
}

type ItemProps = PropsWithChildren;

function Item({ children }: ItemProps) {
  const [showBack, setShowBack] = useState<boolean>(false);

  const items = Children.toArray(children)
    .filter((child) => typeof child === "object" && child !== null)
    .map((child) => child as ReactElement);
  const front = items.find((child: ReactElement) => child.type === Front);
  const back = items.find((child: ReactElement) => child.type === Back);

  return (
    <div
      className="relative w-full h-full"
      onClick={() => setShowBack(!showBack)}
    >
      <Card
        className={cn(
          "z-2 absolute shadow w-full h-full p-0 duration-700 backface-hidden transform-3d",
          showBack ? "rotate-y-180" : "",
        )}
      >
        {front}
      </Card>
      <Card
        className={cn(
          "z-1 absolute shadow w-full h-full p-0 duration-700 transform-3d",
          showBack ? "" : "rotate-y-180",
        )}
      >
        {back}
      </Card>
    </div>
  );
}

function Front({ children }: PropsWithChildren) {
  return children;
}

function Back({ children }: PropsWithChildren) {
  return children;
}

export const CardStack = Object.assign(Root, {
  Item,
  Front,
  Back,
});
