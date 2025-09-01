import CloseIcon from '../../../icons/close.svg';
import { translateENtoDE } from '../../../../functions/translator';

const AskQuestionClosePopup = ({ language, onLater, onClose, onContinue }) => {
  return (
    <div className='teacher-page-popup-screen ask-delete-popup scrollbar-invisible'>
      <div className='teacher-page-popup teacher-page-ask-popup'>
        <div className='teacher-page-popup-head'>
          <p className='text-20px font-bold'>{translateENtoDE('Are you sure you want to cancel?', language)}</p>
          <div className='ml-5 cursor-pointer' onClick={onContinue}>
            <CloseIcon color='#424953' />
          </div>
        </div>
        <div className='p-3 sm:p-5'>
          <p className='text-16px text-gray-500 mb-4'>
            {language === 'ch-de'
              ? 'Wenn du jetzt abbrichst, wird dein Fortschritt nicht gespeichert. Du kannst dieses Formular auch später abschliessen und alle Details der Lehrperson per E-Mail erhalten.'
              : 'If you cancel now, your progress will not be saved. You can also choose to complete this form later and receive all details of the teacher via E-Mail.'}
          </p>
          <div className='teacher-ask-popup-buttons'>
            <button
              type='button'
              onClick={onClose}
              className='flex items-center uppercase text-primary text-14px font-medium hover:text-dark-primary'>
              {translateENtoDE('CANCEL REQUEST', language)}
            </button>
            <div className='flex items-center justify-end teacher-ask-popup-buttons-pairs'>
              <button
                type='button'
                onClick={onLater}
                className='p-[8px_24px] flex items-center uppercase text-primary text-14px font-medium hover:text-dark-primary border-[2px] border-[#21697C] rounded-full'>
                {translateENtoDE('Complete later', language)}
              </button>
              <button
                type='button'
                onClick={onContinue}
                className='btn-primary uppercase bg-primary cursor-pointer ml-4'>
                {translateENtoDE('Continue', language)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionClosePopup;
