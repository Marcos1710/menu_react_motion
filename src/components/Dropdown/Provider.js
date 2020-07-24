import React, { createContext, useCallback, useEffect, useState } from "react";

export const Context = createContext();

export function DropdownProvider({ children }) {
  const [options, setoptions] = useState([]);
  const [targetId, setTargetId] = useState(null);
  const [cachedId, setCachedId] = useState(null);

  const registerOption = useCallback(
    ({
      id,
      optionDimensions,
      optionCenterX,
      WrappedContent,
      backgroundHeight,
    }) => {
      setoptions((items) => [
        ...items,
        {
          id,
          optionDimensions,
          optionCenterX,
          WrappedContent,
          backgroundHeight,
        },
      ]);
    },
    [setoptions]
  );

  const updateOptionProps = useCallback(
    (optionId, props) => {
      setoptions((items) =>
        items.map((item) => {
          if (item.id === optionId) {
            item = { ...item, ...props };
          }

          return item;
        })
      );
    },
    [setoptions]
  );

  const getoptionById = useCallback(
    (id) => options.find((item) => item.id === id),
    [options]
  );

  const deleteoptionById = useCallback(
    (id) => {
      setoptions((items) => items.filter((item) => item.id !== id));
    },
    [setoptions]
  );

  useEffect(() => {
    if (targetId !== null) {
      setCachedId(targetId);
    }
  }, [targetId]);

  return (
    <Context.Provider
      value={{
        registerOption,
        updateOptionProps,
        getoptionById,
        deleteoptionById,
        options,
        targetId,
        setTargetId,
        cachedId,
        setCachedId,
      }}
    >
      {children}
    </Context.Provider>
  );
}
