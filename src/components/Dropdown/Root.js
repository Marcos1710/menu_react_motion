import React, { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Context } from "./Provider";
import { DropdownSection } from "./Section";

const refDuration = 0.22;

export function DropdownRoot() {
  const { options, cachedId, getoptionById, targetId } = useContext(Context);

  const cacheOption = useMemo(() => getoptionById(cachedId), [
    cachedId,
    getoptionById,
  ]);

  let [x, width, height] = [0, 0, 0];

  if (cacheOption) {
    const { optionCenterX, contentDimensions } = cacheOption;

    width = contentDimensions?.width;
    height = contentDimensions?.height;
    x = optionCenterX - width / 2;
  }

  const [hovering, setHovering] = useState(false);
  const isActive = targetId !== null || hovering;

  const [hasInteracted, setHasInteracted] = useState(false);
  const isFirstInteraction = isActive && !hasInteracted;

  if (isFirstInteraction) {
    setTimeout(() => {
      if (!hasInteracted) setHasInteracted(true);
    }, 15);
  }

  useEffect(() => {
    if (isActive) return;

    let timeout = setTimeout(
      () => setHasInteracted(false),
      refDuration * 1000 * 0.9
    );

    return () => clearTimeout(timeout);
  }, [isActive]);

  return (
    <div style={{ perspective: 2000 }}>
      <motion.div
        className="dropdown-root"
        animate={{
          opacity: isActive ? 1 : 0,
          rotateX: isActive ? 0 : -15,
        }}
        transition={{
          opacity: { duration: refDuration, delay: 0.05 },
          rotateX: { duration: refDuration, delay: 0.05 },
        }}
      >
        <motion.div
          className="dropdown-container"
          animate={{
            x,
            width,
            height,
            pointerEvents: isActive ? "unset" : "none",
          }}
          transition={{
            ease: "easeOut",
            x: isFirstInteraction ? { duration: 0 } : refDuration,
            width: { duration: isFirstInteraction ? 0 : refDuration * 0.92 },
            height: { duration: isFirstInteraction ? 0 : refDuration * 0.92 },
            pointerEvents: { delay: 0.05 },
          }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
        >
          <DropdownBackground />

          <motion.div
            animate={{
              x: -x,
            }}
            transition={{
              x: isFirstInteraction ? { duration: 0 } : undefined,
            }}
          >
            {options.map((item) => (
              <DropdownSection key={item.id} option={item} />
            ))}
          </motion.div>
        </motion.div>

        <DropdwonArrow isFirstInteraction={isFirstInteraction} />
      </motion.div>
    </div>
  );
}

function DropdwonArrow({ isFirstInteraction }) {
  const { cachedId, getoptionById } = useContext(Context);

  const cacheOption = useMemo(() => getoptionById(cachedId), [
    cachedId,
    getoptionById,
  ]);

  const x = cacheOption ? cacheOption.optionCenterX : 0;

  return (
    <motion.div
      className="dropdown-arrow"
      initial={{
        opacity: 0,
      }}
      animate={{
        x,
        pointerEvents: "none",
        opacity: x > 0 ? 1 : 0,
      }}
      transition={{
        ease: "easeOut",
        x: { duration: isFirstInteraction ? 0 : refDuration },
      }}
    />
  );
}

export function DropdownBackground() {
  const { cachedId, getoptionById } = useContext(Context);

  const cacheOption = useMemo(() => getoptionById(cachedId), [
    cachedId,
    getoptionById,
  ]);

  const backgroundHeight = cacheOption?.backgroundHeight || 0;

  return (
    <motion.div
      className="dropdown-background"
      animate={{
        height: backgroundHeight,
      }}
      transition={{
        ease: "easeOut",
        duration: refDuration,
      }}
    />
  );
}
