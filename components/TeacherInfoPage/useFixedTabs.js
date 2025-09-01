import { useRef, useEffect, useState, useCallback, useMemo } from 'react';

export const useFixedTabs = () => {
  const headRef = useRef(null);
  const likesRef = useRef(null);
  const bottomRef = useRef(null);
  const coursesRef = useRef(null);
  const aboutMeRef = useRef(null);
  const galleryRef = useRef(null);
  const locationRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const contactInfoRef = useRef(null);
  const associationsRef = useRef(null);
  const [topIndex, setTopIndex] = useState(true);
  const [fixedTab, setFixedTab] = useState(false);
  const [activeHash, setActiveHash] = useState(null);

  const refs = useMemo(() => {
    return [aboutMeRef, galleryRef, locationRef, coursesRef, likesRef, experienceRef, educationRef, associationsRef];
  }, [aboutMeRef, likesRef, coursesRef, galleryRef, locationRef, educationRef, experienceRef, associationsRef]);

  const setCurrentHash = useCallback(
    (hash) => {
      setActiveHash(hash);
      const activeRef = refs.filter((item) => item?.current?.id === hash)[0];

      const fixedTabOffset = fixedTab ? (window.innerWidth < 1100 ? 110 : 50) : 90;
      const blockTopOffset = activeRef?.current?.getBoundingClientRect().top;

      window.scrollTo({
        behavior: 'smooth',
        top: window.pageYOffset + blockTopOffset - fixedTabOffset,
      });
    },
    [refs, fixedTab]
  );

  const onScroll = useCallback(() => {
    if (aboutMeRef?.current) {
      const aboutMeTopOffset = aboutMeRef?.current?.getBoundingClientRect().top;

      if (aboutMeTopOffset < 10 && !fixedTab) setFixedTab(true);
      if (aboutMeTopOffset >= 10 && fixedTab) setFixedTab(false);
    }

    if (fixedTab && contactInfoRef?.current) {
      const contactInfoOffset = contactInfoRef?.current?.getBoundingClientRect().top;

      if (contactInfoOffset < 20 && !topIndex) setTopIndex(true);
      if (contactInfoOffset >= 20 && topIndex) setTopIndex(false);
    }

    if (fixedTab) {
      const offsets = refs
        .map((item) => ({
          ref: item,
          id: item?.current?.id,
          top: item?.current?.getBoundingClientRect()?.top,
          height: item?.current?.getBoundingClientRect()?.height,
        }))
        .filter((item) => item.top > 0 || Math.abs(item.top) <= item.height - 200)
        .sort((a, b) => a.top - b.top);

      const newActiveHash = offsets[0]?.ref?.current?.id;
      if (newActiveHash !== activeHash) setActiveHash(newActiveHash);
    }
  }, [aboutMeRef, fixedTab, refs, activeHash, contactInfoRef, topIndex]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return {
    fixedTab,
    topIndex,
    activeHash: activeHash || 'about',
    setCurrentHash,
    ref: {
      headRef,
      likesRef,
      bottomRef,
      coursesRef,
      aboutMeRef,
      galleryRef,
      locationRef,
      educationRef,
      experienceRef,
      contactInfoRef,
      associationsRef,
    },
  };
};
