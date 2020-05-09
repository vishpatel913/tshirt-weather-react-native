import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface RouterState {
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

export const RouterContext = createContext<RouterState>(initialState);

export const RouterProvider = ({ children, pages }: ProviderProps) => {
  const [index, push] = useState(initialState.index);

  const ctx = {
    pages,
    index,
    push,
  };

  return (
    <RouterContext.Provider value={ctx}>{children}</RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
