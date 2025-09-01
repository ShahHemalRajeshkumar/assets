import cx from 'classnames';
import Image from 'next/image';
import React, { useMemo } from 'react';
import YellowLikeIcon from '../../../icons/LikeYellow.svg';
import { translateENtoDE } from '../../../../functions/translator';

const TeacherContentLikeItem = ({ info = {}, language = 'ch-en', isModal, onShowPopup }) => {
  const instrumentEnName = info?.instrument?.en || info?.instrument?.name;
  const instrumentName = language === 'ch-de' ? info?.instrument?.de || instrumentEnName : instrumentEnName;
  const course = `${instrumentName}. ${translateENtoDE('Private lessons', language)}`;

  const text = useMemo(() => {
    const review = info?.review_texts || info?.review_text || {};
    const review2 = typeof info?.review_text === 'string' ? info?.review_text : '';

    const _text =
      language === 'ch-en'
        ? `${review?.en_review_text || review?.text || info?.en_review_text || review2 || ''}`
        : `${review?.de_review_text || review?.text || info?.de_review_text || review2 || ''}`;

    if (!_text) return [];

    let textData = _text?.split('<br/>')?.map((item) => item.replace(/<(.|\n)*?>/g, ''));

    if (isModal) return [textData[0], textData[1]].filter((item) => !!item);

    const textLang = language === 'ch-en' && !!textData[1] ? textData[1] : textData[0];

    return [textLang.length > 120 ? `${textLang.slice(0, 100)}...` : textLang];
  }, [info, language, isModal]);

  return (
    <div
      onClick={onShowPopup}
      className={cx('teacher-content-like-slide', {
        'cursor-pointer': !!onShowPopup,
        'teacher-content-like-slide__modal': !!isModal,
      })}>
      <div className='teacher-content-like-slide-content'>
        <div className='relative'>
          {!!info?.student_image_path ? (
            <Image
              width={48}
              height={48}
              layout='fixed'
              className='rounded-full'
              alt={info?.student_name}
              src={info?.student_image_path}
            />
          ) : (
            <h3 className='teacher-content-like-circle'>{info?.student_name[0]}</h3>
          )}
        </div>
        <div>
          <p className='text-[15px] font-bold tx-primary'>{info?.student_first_name || info?.student_name}</p>
          <div className='flex items-center'>
            <YellowLikeIcon className='mr-1.5' />
            <p className='text-12px tx-secondary first-letter:uppercase'>{course}</p>
          </div>
        </div>
      </div>
      {text?.map((item, index) => (
        <p
          key={index}
          className={cx('text-14px font-normal tx-secondary', {
            'mt-[14px]': !!index,
            'whitespace-pre-wrap': isModal,
          })}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default TeacherContentLikeItem;
