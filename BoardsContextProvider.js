import { FC, createContext, useContext, useState, ReactNode } from "react";
import { save, load } from "./db";

export const BoardsContext = createContext(undefined);

const BoardsProvider = ({ children }) => {
  const [boards, setBoards] = useState(load());

  //   const toggleTheme = () => {
  //     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  //   };

  return (
    <BoardsContext.Provider value={{ boards, setBoards }}>
      {children}
    </BoardsContext.Provider>
  );
};

export default BoardsProvider;
