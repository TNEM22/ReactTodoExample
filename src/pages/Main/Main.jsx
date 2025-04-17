import React from "react";

import Header from "../Header/Header";
import CardsPage from "../CardsPage/CardsPage";
import useThemeStore from "../../store/themeStore";

const Main = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      className={`flex-1 flex flex-col ` + (theme === "dark" && "bg-[#2A2B2F]")}
    >
      <Header />
      <CardsPage />
    </div>
  );
};

export default Main;
