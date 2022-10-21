import React from "react";

interface LangContextModel {
  isEnglish: boolean;
  setIsEnglish: React.Dispatch<React.SetStateAction<boolean>>;
}

const LangContext = React.createContext<LangContextModel | null>(null);

export const LangContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEnglish, setIsEnglish] = React.useState(
    localStorage.getItem("lang") === "en"
  );

  return (
    <LangContext.Provider value={{ isEnglish, setIsEnglish }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContext;
