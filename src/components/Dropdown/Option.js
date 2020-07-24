import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDimensions } from "./dimensions";
import { Context } from "./Provider";

let lastOptionID = 0;

export function DropdowOption({ name, content: Content, backgroundHeight }) {
  const [optionHook, optionDimensions] = useDimensions();
  const [registered, setRegistered] = useState(false);

  const {
    registerOption,
    updateOptionProps,
    deleteoptionById,
    targetId,
    setTargetId,
  } = useContext(Context);

  const idRef = useRef(++lastOptionID);
  const id = idRef.current;

  useEffect(() => {
    if (!registered && optionDimensions) {
      const WrappedContent = () => {
        const contentRef = useRef();

        useEffect(() => {
          const contentDimensions = contentRef.current.getBoundingClientRect();
          updateOptionProps(id, { contentDimensions });
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      registerOption({
        id,
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.width / 2,
        WrappedContent,
        backgroundHeight,
      });

      setRegistered(true);
    } else if (registered && optionDimensions) {
      updateOptionProps(id, {
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.width / 2,
      });
    }
  }, [
    registerOption,
    id,
    registered,
    optionDimensions,
    updateOptionProps,
    deleteoptionById,
    backgroundHeight,
  ]);

  useEffect(() => deleteoptionById(id), [deleteoptionById, id]);

  const handleOpen = () => setTargetId(id);
  const handleClose = () => setTargetId(null);
  const handleTouch = () => (window.isMobile = true);

  const handleClick = (e) => {
    e.preventDefault();

    return targetId === id ? handleClose() : handleOpen();
  };

  return (
    <motion.button
      className="dropdown-option"
      ref={optionHook}
      onMouseDown={handleClick}
      onHoverStart={() => !window.isMobile && handleOpen()}
      onHoverEnd={() => !window.isMobile && handleClose()}
      onTouchStart={handleTouch}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {name}
    </motion.button>
  );
}
