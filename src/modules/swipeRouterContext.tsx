import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface SwipeRouterState {
  pages: number;
  index: number;
  push: (i: number) => void;
}

type ProviderProps = {
  children: ReactNode;
  pages: number;
};

const initialState = {
  pages: 1,
  index: 0,
  push: (i: number) => null,
};

export const SwipeRouterContext = createContext<SwipeRouterState>(initialState);

export const SwipeRouterProvider = ({ children, pages }: ProviderProps) => {
  const [index, push] = useState(initialState.index);

  const ctx = {
    pages,
    index,
    push,
  };

  return (
    <SwipeRouterContext.Provider value={ctx}>
      {children}
    </SwipeRouterContext.Provider>
  );
};

export const useSwipeRouter = () => useContext(SwipeRouterContext);
