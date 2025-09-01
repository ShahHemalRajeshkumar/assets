import CloseIcon from '../../icons/close.svg';
import { translateENtoDE } from '../../../functions/translator';

const AskQuestionClosePopup = ({ language, onClose, onContinue }) => {
  return (
    <div className='teacher-page-popup-screen ask-delete-popup scrollbar-invisible'>
      <div className='teacher-page-popup teacher-page-ask-popup'>
        <div className='teacher-page-popup-head'>
          <p className='text-20px font-bold'>{translateENtoDE('Your message will not be saved', language)}</p>
          <div className='ml-5 cursor-pointer' onClick={onContinue}>
            <CloseIcon color='#424953' />
          </div>
        </div>
        <div className='p-3 sm:p-5'>
          <p className='text-16px text-gray-500 mb-4'>
            {translateENtoDE('Your message will not be saved if you abort the process.', language)}
          </p>
          <div className='flex items-center justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='flex items-center uppercase text-primary text-14px font-medium hover:text-dark-primary'>
              {translateENtoDE('CANCEL REQUEST', language)}
            </button>
            <button type='button' onClick={onContinue} className='btn-primary uppercase bg-primary cursor-pointer ml-6'>
              {translateENtoDE('Continue', language)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionClosePopup;
