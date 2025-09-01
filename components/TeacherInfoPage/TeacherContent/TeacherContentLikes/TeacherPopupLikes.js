import { useMemo } from 'react';
import TeacherContentLikeItem from './TeacherContentLikeItem';
import CheckedPrimaryIcon from '../../../icons/CheckedPrimary.svg';
import { translateENtoDE } from '../../../../functions/translator';

const TeacherPopupLikes = ({ likes = [], language }) => {
  const verifiedText = 'All recommendations are from verified students of this music teacher on Matchspace Music';

  const sorted = useMemo(() => {
    return likes?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));
  }, [likes]);

  return (
    <div className='teacher-page-popup-likes visible-scrollbar pb-[30px]'>
      <div className='teacher-page-popup-likes-title'>
        <div className='mr-2'>
          <CheckedPrimaryIcon />
        </div>
        <p className='text-14px'>{translateENtoDE(verifiedText, language)}</p>
      </div>
      {sorted.map((item) => (
        <TeacherContentLikeItem key={item?.id} info={item} language={language} isModal={true} />
      ))}
    </div>
  );
};

export default TeacherPopupLikes;
