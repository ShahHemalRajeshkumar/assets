import { Popup } from 'react-map-gl';
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { translateENtoDE } from '../../functions/translator';
import useOutsideClick from '../../hooks/useOutsideClick';
import ChevronLeft from '../icons/ChevronLeft.svg';
import { sortedMarkers } from './functions';
import { NthCard } from './PopupInfo';

const MapboxPinGroupSlider = ({
  isEvta,
  markers,
  language,
  hideMarkers,
  openListPopup,
  handlePinClick,
  setIsOpenPinSlider,
}) => {
  const groupeRef = useRef();
  const [slide, setSlide] = useState(0);
  useOutsideClick(groupeRef, hideMarkers);

  const list = useMemo(() => sortedMarkers(markers), [markers]);

  const onPrevHandle = useCallback(() => {
    const prevSlide = slide - 1 < 0 ? list.length - 1 : slide - 1;

    setSlide(prevSlide);
    handlePinClick([list[prevSlide]]);
  }, [slide, list, handlePinClick]);

  const onNextHandle = useCallback(() => {
    const nextSlide = slide + 1 > list.length - 1 ? 0 : slide + 1;

    setSlide(nextSlide);
    handlePinClick([list[nextSlide]]);
  }, [slide, list, handlePinClick]);

  const onViewAll = useCallback(() => {
    if (openListPopup) openListPopup({ data: list });
  }, [list, openListPopup]);

  const title = useMemo(() => {
    return `${translateENtoDE('Teachers', language)} ${slide + 1} ${translateENtoDE('of', language)} ${list?.length}`;
  }, [language, list, slide]);

  useEffect(() => {
    if (setIsOpenPinSlider) setIsOpenPinSlider(true);
  }, [setIsOpenPinSlider]);

  return (
    <Popup
      closeButton={false}
      closeOnClick={false}
      onClose={hideMarkers}
      latitude={markers[0].latitude}
      longitude={markers[0].longitude}>
      <div className='teacher-pins-slider'>
        <div className='flex items-center justify-between mb-[8px]'>
          <div className='teacher-pins-slider-title'>{title}</div>
          <div className='teacher-pins-slider-arrows'>
            <div onClick={onPrevHandle} className='teacher-pins-slider-arrows-prev mr-[16px]'>
              <ChevronLeft color='#21697C' />
            </div>
            <div onClick={onNextHandle} className='teacher-pins-slider-arrows-next'>
              <ChevronLeft color='#21697C' />
            </div>
          </div>
        </div>
        <div className='min-h-[52px]'>
          <NthCard isEvta={isEvta} data={list[slide]} language={language} />
        </div>
        <div
          onClick={onViewAll}
          className='cursor-pointer flex items-center justify-end underline text-[13px] text-[#21697C] text-[400]'>
          {translateENtoDE('View all', language)}
        </div>
      </div>
    </Popup>
  );
};

export default MapboxPinGroupSlider;
