import { createContext, useContext, useState, type ReactNode } from 'react';

interface PictureContextType {
  numOfPics: number;
  setNumOfPics: (num: number) => void;
}

interface WidthContextType {
  picWidth: number;
  setPicWidtch: (num: number) => void;
}

interface HeightContextType {
  picHeight: number;
  setPicHeight: (num: number) => void;
}

const PictureContext = createContext<PictureContextType | undefined>(undefined);

const WidthContext = createContext<WidthContextType | undefined>(undefined);

const HeightContext = createContext<HeightContextType | undefined>(undefined);

export const usePictureContext = () => {
  const context = useContext(PictureContext);
  if (!context) {
    throw new Error(`Picture context must be within a Provider!`);
  }
  return context;
};

export const useWidthContext = () => {
  const context = useContext(WidthContext);
  if (!context) {
    throw new Error(`Witdh context must be within a Provider!`);
  }
  return context;
};

export const useHeigthContext = () => {
  const context = useContext(HeightContext);
  if (!context) {
    throw new Error(`Height context must be within a Provider!`);
  }
  return context;
};

interface PictureProviderProps {
  children: ReactNode;
}

export const PictureProvider = ({ children }: PictureProviderProps) => {
  const [numOfPics, setNumOfPics] = useState(0);
  const [picWidth, setPicWidtch] = useState(0);
  const [picHeight, setPicHeight] = useState(0);

  return (
    <PictureContext.Provider value={{ numOfPics, setNumOfPics }}>
      <WidthContext.Provider value={{ picWidth, setPicWidtch }}>
        <HeightContext.Provider value={{ picHeight, setPicHeight }}>
          {children}
        </HeightContext.Provider>
      </WidthContext.Provider>
    </PictureContext.Provider>
  );
};
