'use client';

import React, { ReactNode, createContext, useContext, useReducer } from 'react';

interface State {
  [key: string]: boolean;
}

type Action = { type: 'TOGGLE'; id: string } | { type: 'CLOSE_ALL'; excludeId?: string };

export const DropdownStateContext = createContext<State | undefined>(undefined);
export const DropdownDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

const dropdownReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE': {
      const newState = { ...state };
      Object.keys(newState).forEach((key) => {
        if (key !== action.id) {
          newState[key] = false;
        }
      });
      newState[action.id] = !state[action.id];
      return newState;
    }
    case 'CLOSE_ALL': {
      const newState = { ...state };
      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });
      return newState;
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
};

export function DropdownProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dropdownReducer, {});

  return (
    <DropdownStateContext.Provider value={state}>
      <DropdownDispatchContext.Provider value={dispatch}>{children}</DropdownDispatchContext.Provider>
    </DropdownStateContext.Provider>
  );
}

export const useDropdownState = () => {
  const context = useContext(DropdownStateContext);
  if (context === undefined) {
    throw new Error('useDropdownState must be used within a DropdownProvider');
  }
  return context;
};

export const useDropdownDispatch = () => {
  const context = useContext(DropdownDispatchContext);
  if (context === undefined) {
    throw new Error('useDropdownDispatch must be used within a DropdownProvider');
  }
  return context;
};
