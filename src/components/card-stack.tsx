import { useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";

import { Card as CnCard } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";

const SWIPE_THRESHOLD = 150;
const SWIPE_VELOCITY = 500;

type CardProps = {
  card: any;
  index: number;
  total: number;
  onSwipe: (id: number) => void;
};

function Card({ card, index, total, onSwipe }: CardProps) {
  const [showBack, setShowBack] = useState<boolean>(false);
  const isDraggingRef = useRef(false);

  const darkening = total > 1 ? ((total - 1 - index) / (total - 1)) * 0.125 : 0;
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

  const isTop = index === total - 1;
  const scale = 1 - (total - 1 - index) * 0.05;
  const yOffset = (total - 1 - index) * -30;

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: any) {
    const shouldSwipe =
      Math.abs(info.offset.x) > SWIPE_THRESHOLD ||
      Math.abs(info.velocity.x) > SWIPE_VELOCITY;

    if (shouldSwipe) {
      const dir = info.offset.x > 0 ? 1 : -1;
      animate(x, dir * 600, { type: "spring", stiffness: 300, damping: 30 });
      setTimeout(() => onSwipe(card.id), 180);
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  }

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        scale,
        y: yOffset,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="h-full w-full"
      style={{
        position: "absolute",
        borderRadius: 20,
        background: card.bg,
        border: `2px solid ${card.accent}22`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: isTop ? "grab" : "default",
        userSelect: "none",
        x,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        // scale,
        // y: yOffset,
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
        if (isDraggingRef.current) return;
        setShowBack(!showBack);
      }}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
    >
      <CnCard
        className={cn(
          "z-2 absolute shadow w-full h-full p-0 duration-700 backface-hidden transform-3d",
          showBack ? "rotate-y-180" : "",
        )}
      >
        <div className="relative h-full p-6 flex items-center justify-center">
          <span className="font-heading font-bold text-2xl md:text-4xl text-center">
            {card.title}
          </span>
          <span className="absolute bottom-1.5 text-muted-foreground text-center">
            Appuyez sur la carte pour la retourner
          </span>
        </div>
      </CnCard>
      <CnCard
        className={cn(
          "z-1 absolute shadow w-full h-full p-0 duration-700 transform-3d",
          showBack ? "" : "rotate-y-180",
        )}
      >
        <div className="h-full py-6 px-4 md:px-12 gap-8 flex flex-col items-center justify-evenly">
          {card.hint ? (
            <>
              <div className="flex flex-col gap-2">
                <span className="font-heading font-bold text-2xl text-center">
                  Indice
                </span>
                <span className="font-sans text-lg text-center">
                  {card.hint}
                </span>
              </div>
              <hr className="border-t border-gray-300 w-full" />
            </>
          ) : null}
          <div className="flex flex-col gap-2">
            <span className="font-heading font-bold text-2xl text-center">
              Réponse
            </span>
            <span className="font-sans text-lg text-center">{card.answer}</span>
          </div>
        </div>
      </CnCard>
    </motion.div>
  );
}

type Props = {
  cards: any[];
};

export function CardStack({ cards }: Props) {
  const [order, setOrder] = useState(cards.map((c) => c.id));
  // const order = useMemo(() => cards.map((c) => c.id), [cards]);

  function handleSwipe(id: number) {
    setOrder((prev) => {
      const next = prev.filter((x) => x !== id);
      next.unshift(id);
      return next;
    });
  }

  const visible = order.slice(-3);

  useEffect(() => {
    setOrder(cards.map((c) => c.id));
  }, [cards]);

  return (
    <div className="h-full flex justify-center">
      <div className="h-full w-full relative">
        <AnimatePresence initial={false}>
          {visible.map((id, i) => {
            const card = cards.find((c) => c.id === id);
            if (!card) return null;

            return (
              <Card
                key={`${id}-${i}`}
                card={card}
                index={i}
                total={visible.length}
                onSwipe={handleSwipe}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
