import { useState, useEffect } from "react";

const useScroll = (ref,sidebarRef) => {
  const [isReached, setIsReached] = useState(false);

  useEffect(() => {
    const sidebar = sidebarRef.current
    const handleScroll = (e) => {
      if (!ref.current) return;
      const { top } = ref.current.getBoundingClientRect();
      if (top < sidebar.scrollTop) {
        setIsReached(true);
      } else {
        setIsReached(false);
      }
    };

    sidebar.addEventListener("scroll", handleScroll);
    
    return () => sidebar.removeEventListener("scroll", handleScroll);
  }, [ref,sidebarRef]);

  return { isReached };
};

export default useScroll;