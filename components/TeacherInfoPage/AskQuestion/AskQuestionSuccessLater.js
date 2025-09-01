import React from 'react';
import CheckCircle from './Textarea/CheckCircle.svg';

const AskQuestionSuccessLater = ({ language }) => {
  const textClasses = 'text-14px font-[400] leading-[21px] text-center tx-secondary';

  return (
    <>
      <div id='contact-teacher-modal-success' className='teacher-ask-success max-w-[500_!important]'>
        <div className='flex flex-col items-center justify-center'>
          <CheckCircle className='mb-4' />
          <p className='text-24px font-[600] leading-[28px] text-center mb-[12px] tx-primary'>
            {language === 'ch-de' ? 'Herzlichen Dank!' : 'Thank you!'}
          </p>
          <p className={`${textClasses} mb-[24px]`}>
            {language === 'ch-de'
              ? 'Wir haben dir eine E-Mail mit deiner Nachricht gesendet, damit du deine Anfrage später abschliessen kannst.'
              : 'We have sent you an email with your message to complete your request later.'}
          </p>
        </div>
      </div>
      <style>{`.teacher-page-ask-popup { max-width: 500px !important; }`}</style>
    </>
  );
};

export default AskQuestionSuccessLater;
