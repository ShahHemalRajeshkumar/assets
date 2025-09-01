import React, { useCallback } from 'react';
import TeacherGuaranteePopup from '../TeacherConfigurator/TeacherGuaranteePopup';
import { translateENtoDE } from '../../../functions/translator';
import AskThanksIcon from '../../icons/AskThanks.svg';
import ShieldIcon from '../../icons/shield.svg';

const AskQuestionSuccess = ({ language, showGuarantee, setShowGuarantee }) => {
  const onGuarantee = useCallback(() => {
    setShowGuarantee(true);
  }, [setShowGuarantee]);

  const textClasses = 'text-14px font-[400] leading-[21px] text-center tx-secondary';
  const subTitleClasses = 'text-[19px] font-[600] text-center tx-primary leading-[24px]';

  if (showGuarantee) {
    return (
      <div id='contact-teacher-modal-success' className='teacher-ask-success'>
        <TeacherGuaranteePopup language={language} />
      </div>
    );
  }

  return (
    <div id='contact-teacher-modal-success' className='teacher-ask-success'>
      <div className='flex flex-col items-center justify-center'>
        <AskThanksIcon className='mb-4' />
        <p className='text-24px font-[600] leading-[28px] text-center mb-[12px] tx-primary'>
          {translateENtoDE('Thank you for your request', language)}
        </p>
        <p className={`${textClasses} mb-[24px]`}>
          {translateENtoDE(
            'Your request has been forwarded to your teacher, who will get in touch with you very shortly.',
            language
          )}
        </p>
      </div>
      <div className='teacher-ask-success-content mb-[24px]'>
        <div className={`${subTitleClasses} mb-[24px]`}>{translateENtoDE("What's next?", language)}</div>
        <div className='teacher-ask-success-columns'>
          <div className='flex flex-col items-center'>
            <div className='teacher-ask-success-number mb-[12px]'>1</div>
            <div className={textClasses}>
              {translateENtoDE(
                'The teacher will confirm their availability to teach you and reply to your message',
                language
              )}
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='teacher-ask-success-number mb-[12px]'>2</div>
            <div className={textClasses}>
              {translateENtoDE('You can book the desired lesson subscription', language)}
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='teacher-ask-success-number mb-[12px]'>3</div>
            <div className={textClasses}>
              {translateENtoDE('Your teacher will contact you to schedule your first lesson', language)}
            </div>
          </div>
        </div>
      </div>
      <div className={`${subTitleClasses} mb-[12px]`}>{translateENtoDE('You are in good hands', language)}</div>
      <div className={textClasses}>{translateENtoDE('All our teachers are qualified and verified.', language)}</div>
      <div className={textClasses}>
        {translateENtoDE('On top, you benefit from a unique trial lesson with a money-back guarantee.', language)}
      </div>

      <div className='flex justify-center mt-[12px]'>
        <div
          onClick={onGuarantee}
          className='flex items-center justify-center text-[13px] font-[600] text-[#21697C] cursor-pointer hover:text-[#004252]'>
          <ShieldIcon className='mr-[6px] mb-[2px]' />
          {translateENtoDE('Trial lesson with money-back guarantee', language)}
        </div>
      </div>
    </div>
  );
};

export default AskQuestionSuccess;
