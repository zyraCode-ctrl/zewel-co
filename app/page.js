"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const PRODUCTS = [
  {
    src: "/images/yellow-gold-box-chain-round-diamond-pendant-necklace.webp",
    alt: "Zevel & Co. yellow gold box chain necklace with a round diamond pendant",
  },
  {
    src: "/images/white-gold-open-cuff-bracelet-pear-diamonds.webp",
    alt: "Zevel & Co. white gold open cuff bracelet with pear-cut diamond ends",
  },
  {
    src: "/images/rose-gold-round-diamond-solitaire-pendant.webp",
    alt: "Zevel & Co. rose gold round diamond solitaire pendant",
  },
  {
    src: "/images/yellow-gold-open-cuff-bracelet-pear-diamonds.webp",
    alt: "Zevel & Co. yellow gold open cuff bracelet with pear-cut diamond ends",
  },
  {
    src: "/images/rose-gold-triple-circle-diamond-pendant.webp",
    alt: "Zevel & Co. rose gold triple circle diamond pendant",
  },
  {
    src: "/images/rose-gold-bypass-round-diamond-ring.webp",
    alt: "Zevel & Co. rose gold bypass ring with a round diamond",
  },
  {
    src: "/images/rose-gold-diamond-cluster-band-ring.webp",
    alt: "Zevel & Co. rose gold diamond cluster band ring",
  },
];

const CARD_START_DELAY = 1000;
const CARD_APPEAR_MS = 500;
const CARD_FLIP_MS = 1000;
const NEXT_FLIP_DELAY = 200;

export default function Home() {
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(1);
  const [cardOpen, setCardOpen] = useState(false);
  const [cardSize, setCardSize] = useState(200);

  const angleRef = useRef(90);
  const indexRef = useRef(0);
  const totalFlipsRef = useRef(0);
  const cardRef = useRef(null);
  const flippingRef = useRef(false);
  const startedRef = useRef(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setCardSize(width < 640 ? 136 : width < 1280 ? 172 : 200);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useLayoutEffect(() => {
    if (!cardRef.current || startedRef.current) return;
    cardRef.current.style.transform = "translate(-50%, -50%) rotateY(90deg)";
  }, []);

  useEffect(() => {
    const timers = [];
    let flipTimeout = null;

    const flipLoop = () => {
      if (flippingRef.current || !cardRef.current) return;
      flippingRef.current = true;

      const nextIndex = (indexRef.current + 1) % PRODUCTS.length;
      const nextAngle = angleRef.current - 180;

      if (totalFlipsRef.current % 2 === 0) {
        setBackIndex(nextIndex);
      } else {
        setFrontIndex(nextIndex);
      }

      const el = cardRef.current;
      el.style.transition = `transform ${CARD_FLIP_MS}ms cubic-bezier(0.8, 0, 0.2, 1)`;
      el.style.transform = `translate(-50%, -50%) rotateY(${nextAngle}deg)`;

      flipTimeout = setTimeout(() => {
        angleRef.current = nextAngle;
        indexRef.current = nextIndex;
        totalFlipsRef.current += 1;
        flippingRef.current = false;
        flipTimeout = setTimeout(flipLoop, NEXT_FLIP_DELAY);
      }, CARD_FLIP_MS + 80);
    };

    timers.push(
      setTimeout(() => {
        setCardOpen(true);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!cardRef.current) return;
            const el = cardRef.current;
            el.style.transition = `transform ${CARD_APPEAR_MS}ms cubic-bezier(0.6, 0, 0, 1)`;
            el.style.transform = "translate(-50%, -50%) rotateY(0deg)";
            angleRef.current = 0;
          });
        });

        timers.push(
          setTimeout(() => {
            if (startedRef.current) return;
            startedRef.current = true;
            flipLoop();
          }, CARD_APPEAR_MS + 80)
        );
      }, CARD_START_DELAY)
    );

    return () => {
      timers.forEach(clearTimeout);
      if (flipTimeout) clearTimeout(flipTimeout);
    };
  }, []);

  const lineClass =
    "flex items-center justify-center whitespace-nowrap text-[clamp(1.45rem,5.2vw,2.3rem)] leading-none tracking-[-0.04em] text-black";

  return (
    <main className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white px-4">
      <section
        aria-label="Zevel and Co coming soon"
        className="flex flex-col items-center justify-center"
      >
        <h1 className="m-0 flex w-full max-w-full flex-col items-center justify-center gap-3 text-center font-normal xl:w-auto xl:flex-row xl:gap-1">
          <span className="flex flex-col items-center gap-2 sm:flex-row sm:gap-[0.6rem]">
            <img
              src="/logo.webp"
              alt="Zevel & Co."
              width={220}
              height={37}
              className="block h-[clamp(1.45rem,5.2vw,2.3rem)] w-auto object-contain"
            />
            <span className={lineClass}>premium jewelry</span>
          </span>

          <span
            className="relative shrink-0 overflow-hidden bg-white transition-[width,height] duration-500 ease-[cubic-bezier(0.6,0,0,1)]"
            style={{
              width: cardOpen ? cardSize : 0,
              height: cardOpen ? cardSize : 0,
              overflow: "hidden",
            }}
          >
            <span className="absolute inset-0 [perspective:1200px]">
              <span
                ref={cardRef}
                className="absolute left-1/2 top-1/2 block bg-white [transform:translate(-50%,-50%)_rotateY(90deg)] [transform-style:preserve-3d]"
                style={{
                  width: cardSize,
                  height: cardSize,
                  visibility: cardOpen ? "visible" : "hidden",
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center bg-white [backface-visibility:hidden]">
                  <img
                    src={PRODUCTS[frontIndex].src}
                    alt={PRODUCTS[frontIndex].alt}
                    width={cardSize}
                    height={cardSize}
                    className="block h-full w-full rounded-[1.5px] bg-white object-contain"
                  />
                </span>
                <span className="absolute inset-0 flex items-center justify-center bg-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <img
                    src={PRODUCTS[backIndex].src}
                    alt={PRODUCTS[backIndex].alt}
                    width={cardSize}
                    height={cardSize}
                    className="block h-full w-full rounded-[1.5px] bg-white object-contain"
                  />
                </span>
              </span>
            </span>
          </span>

          <span className={lineClass}>for the modern world</span>
        </h1>
        <p className="m-0 mt-5 text-center text-[0.8rem] font-normal uppercase leading-none tracking-[0.28em] text-black opacity-45 sm:text-[0.95rem] sm:tracking-[0.35em] xl:hidden">
          Coming Soon
        </p>
        <p className="sr-only">
          Zevel & Co. is a premium jewelry brand launching soon, with gold
          necklaces, pendants, bracelets, and diamond rings for the modern
          world.
        </p>
      </section>
      <p className="absolute inset-x-0 bottom-10 m-0 hidden px-4 text-center text-[0.95rem] font-normal uppercase leading-none tracking-[0.35em] text-black opacity-45 xl:block">
        Coming Soon
      </p>
    </main>
  );
}
