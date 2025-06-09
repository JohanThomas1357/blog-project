"use client"
import { createContext, ReactNode, useContext, useState } from "react";

interface stateProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const stateContext = createContext<stateProps | undefined>(undefined);

export function StateProvider({children}:{children:ReactNode}) {
  const [state, setState] = useState<boolean>(false);
  return <stateContext.Provider value={{state,setState}}>{children}</stateContext.Provider>;
}

export function useChangeState(){
    const context = useContext(stateContext)
    if(!context){
       throw new Error("useChangeState should be used inside State Provider")
    }
    return context
}