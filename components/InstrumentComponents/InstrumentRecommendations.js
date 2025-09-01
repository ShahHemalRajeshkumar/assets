import React, { useMemo, useState, useCallback } from 'react';
import TeacherContentLikes from '../TeacherInfoPage/TeacherContent/TeacherContentLikes/TeacherContentLikes';
import TeacherPopupLikes from '../TeacherInfoPage/TeacherContent/TeacherContentLikes/TeacherPopupLikes';
import { translateENtoDE } from '../../functions/translator';
import ContentBlock from '../TeacherInfoPage/ContentBlock';
import TeacherPopup from '../TeacherInfoPage/TeacherPopup';

const MAX_LENGTH = 8;

const InstrumentRecommendations = ({ language, recommendations = [] }) => {
  const [show, setShow] = useState(false);
  const [popupInfo, setPopupInfo] = useState({ name: null });

  const showPopup = useCallback((name, params) => {
    setShow(true);
    setPopupInfo({ name, ...params });
  }, []);

  const hidePopup = useCallback(() => {
    setShow(false);
    setPopupInfo({ name: null });
  }, []);

  const likes = recommendations
    ?.filter((item) => item?.positive && item?.status === 'published')
    ?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));

  const modalComponent = useMemo(() => {
    if (!show) return null;

    const { name, title } = popupInfo;

    return (
      <TeacherPopup name={name} title={title} onClose={hidePopup} isFullViewModal={true} isFullModalStyle={false}>
        <TeacherPopupLikes language={language} likes={likes} />
      </TeacherPopup>
    );
  }, [popupInfo, hidePopup, show, language, likes]);

  return (
    <div className='instrument-page-content'>
      <>{modalComponent}</>
      <div className='max-w-[1440px] m-auto'>
        <div id='likes'>
          <ContentBlock
            label=' '
            name='likes'
            data={likes}
            maxItemsVisible={0}
            language={language}
            onShowPopup={showPopup}
            popupLabel={`${likes.length} ${translateENtoDE(
              likes.length === 1 ? 'Student recommendation' : 'Student recommendations',
              language
            )}`}>
            <TeacherContentLikes
              isStorybook={true}
              language={language}
              showPopup={showPopup}
              likes={likes.slice(0, MAX_LENGTH)}
              popupLabel={`${likes.length} ${translateENtoDE(
                likes.length === 1 ? 'Student recommendation' : 'Student recommendations',
                language
              )}`}
            />
          </ContentBlock>
        </div>
      </div>
    </div>
  );
};

export default InstrumentRecommendations;
