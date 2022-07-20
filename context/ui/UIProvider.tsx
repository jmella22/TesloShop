import React, { FC, PropsWithChildren, useReducer } from "react";
import { uiReducer, UIContext } from "./";

export interface UIState {
  isMenuOpen: boolean;
}

const UI_INITAL_STATE: UIState = {
  isMenuOpen: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITAL_STATE);

  const toogleSideMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Methods
        toogleSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
