import { useEffect, useRef } from "react";

function useCloseModalOnOutsideClick(onClose, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener(`click`, handleClick, listenCapturing);
    return () => document.removeEventListener(`click`, handleClick);
  }, [onClose, ref, listenCapturing]);
  return ref;
}

export default useCloseModalOnOutsideClick;
