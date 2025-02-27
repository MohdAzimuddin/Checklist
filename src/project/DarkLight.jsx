import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkLight = ({setDark,dark}) => {
  
  const handleToggleClick = () => {
    setDark(!dark);
  };
 
  return (
    <>
      <button
        className={`text-3xl`}
        onClick={() => {
          handleToggleClick();
        }}
      >
        {dark ? (
          <MdDarkMode className="text-zinc-400 " />
        ) : (
          <MdLightMode className="text-white" />
        )}
      </button>
    </>
  );
};

export default DarkLight;
