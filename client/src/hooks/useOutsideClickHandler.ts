import { useEffect } from "react";

export const useOutsideClickHandler = (ref, disableOutsideClick, callback) => {
  const handleClick = (e) => {
    if (disableOutsideClick) {
      return;
    }

    if (!ref?.current?.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
};
