import React from 'react';
import CheckCircle from '../../components/TeacherInfoPage/AskQuestion/Textarea/CheckCircle.svg';

const SuccessFormComponent = ({ language }) => {
  const textClasses = 'text-14px font-[400] leading-[21px] text-center tx-secondary';

  return (
    <>
      <div id='contact-teacher-modal-success' className='teacher-ask-success max-w-[500px]'>
        <div className='flex flex-col items-center justify-center'>
          <CheckCircle className='mb-4' />
          <p className='text-24px font-[600] leading-[28px] text-center mb-[12px] tx-primary'>
            {language === 'ch-de' ? 'Herzlichen Dank!' : 'Thank you!'}
          </p>
          <p className={`${textClasses} mb-[24px] px-3`}>
            {language === 'ch-de'
              ? 'Du wirst so schnell wie möglich kontaktiert.Wir danken dir in der Zwischenzeit herzlich für dein Interesse und deine Geduld.'
              : 'You will be contacted as soon as possible.In the meantime,we sincerely thank you for your interest and patience.'}
          </p>
        </div>
      </div>
      <style>{`.teacher-page-ask-popup { max-width: 500px !important; }`}</style>
    </>
  );
};

export default SuccessFormComponent;
