import React from "react";

import useThemeStore from "../../store/themeStore";

const MapPage = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      className={
        `flex-1 flex flex-col ` +
        (theme === "dark" && "bg-[#2A2B2F] text-white")
      }
    >
      MapPage
    </div>
  );
};

export default MapPage;
