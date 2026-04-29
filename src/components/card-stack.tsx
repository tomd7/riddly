import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { Card as CnCard } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";

const SWIPE_THRESHOLD = 150;
const SWIPE_VELOCITY = 500;

type CardStackContextType = {
  onSwipe: (id: string) => void;
  visibleCount: number;
  totalItems: number;
};

const CardStackContext = createContext<CardStackContextType | null>(null);

function useCardStack() {
  const ctx = useContext(CardStackContext);
  if (!ctx) {
    throw new Error("CardStack.* must be used within <CardStack>");
  }
  return ctx;
}

type CardsStackProps = {
  ids: string[];
  children: (id: string, index: number) => ReactNode;
  visibleCount?: number;
};

export function CardStack({
  ids,
  children,
  visibleCount = 3,
}: CardsStackProps) {
  const [order, setOrder] = useState<string[]>(ids);
  const visible = order.slice(-visibleCount);

  function handleSwipe(id: string) {
    setOrder((prev) => {
      const next = prev.filter((x) => x !== id);
      next.unshift(id);
      return next;
    });
  }

  // useEffect(() => {
  //   setOrder(ids);
  // }, [ids]);

  return (
    <CardStackContext.Provider
      value={{
        onSwipe: handleSwipe,
        visibleCount: visibleCount,
        totalItems: order.length,
      }}
    >
      <div className="h-full flex justify-center">
        <div className="h-full w-full relative">
          <AnimatePresence initial={false}>
            {visible.map((cardId, index) => children(cardId, index))}
          </AnimatePresence>
        </div>
      </div>
    </CardStackContext.Provider>
  );
}

type ItemContextType = {
  showBack: boolean;
};

const ItemContext = createContext<ItemContextType | null>(null);

function useItemContext() {
  const ctx = useContext(ItemContext);
  if (!ctx) {
    throw new Error("useItemContext must be used within <CardStack>");
  }
  return ctx;
}

type ItemProps = {
  id: string;
  index: number;
  children: ReactNode;
};

function Item({ id, index, children }: ItemProps) {
  const { onSwipe, totalItems, visibleCount } = useCardStack();

  const [showBack, setShowBack] = useState<boolean>(false);
  const isDraggingRef = useRef(false);

  // const darkening = totalItems > 1 ? (index / (totalItems - 1)) * 0.125 : 0;
  const darkening =
    totalItems > 1
      ? ((visibleCount - 1 - index) / (visibleCount - 1)) * 0.125
      : 0;
  const brightness = 1 - darkening;

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(
    x,
    [
      -SWIPE_THRESHOLD,
      -(SWIPE_THRESHOLD / 2),
      0,
      SWIPE_THRESHOLD / 2,
      SWIPE_THRESHOLD,
    ],
    [0, 1, 1, 1, 0],
  );

  const isTop = index === visibleCount - 1;
  const scale = 1 - (visibleCount - 1 - index) * 0.05;
  const yOffset = (visibleCount - 1 - index) * -30;

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: any) {
    const shouldSwipe =
      Math.abs(info.offset.x) > SWIPE_THRESHOLD ||
      Math.abs(info.velocity.x) > SWIPE_VELOCITY;

    if (shouldSwipe) {
      onSwipe(id);
    }
  }

  return (
    <ItemContext.Provider value={{ showBack }}>
      <motion.div
        initial={false}
        className="h-full w-full"
        style={{
          position: "absolute",
          borderRadius: 20,
          cursor: isTop ? "grab" : "default",
          userSelect: "none",
          x,
          y: yOffset,
          scale,
          rotate: isTop ? rotate : 0,
          opacity: isTop ? opacity : 1,
          zIndex: index,
          touchAction: "none",
          filter: `brightness(${brightness})`,
        }}
        drag={isTop ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={(e, info) => {
          if (isTop) handleDragEnd(e, info);
          isDraggingRef.current = false;
        }}
        whileTap={isTop ? { cursor: "grabbing" } : undefined}
        onClick={() => {
          if (isDraggingRef.current || !isTop) return;
          setShowBack(!showBack);
        }}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
      >
        {children}
      </motion.div>
    </ItemContext.Provider>
  );
}
CardStack.Item = Item;

type FaceProps = PropsWithChildren;

function Front({ children }: FaceProps) {
  const { showBack } = useItemContext();

  return (
    <CnCard
      className={cn(
        "z-2 absolute shadow w-full h-full p-0 duration-700 backface-hidden transform-3d",
        showBack ? "rotate-y-180" : "",
      )}
    >
      {children}
    </CnCard>
  );
}
CardStack.Front = Front;

function Back({ children }: FaceProps) {
  const { showBack } = useItemContext();

  return (
    <CnCard
      className={cn(
        "z-1 absolute shadow w-full h-full p-0 duration-700 transform-3d",
        showBack ? "" : "rotate-y-180",
      )}
    >
      {children}
    </CnCard>
  );
}
CardStack.Back = Back;
