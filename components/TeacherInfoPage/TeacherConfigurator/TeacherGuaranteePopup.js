import MusicianIcon from '../../icons/musician.svg';
import { translateENtoDE } from '../../../functions/translator';

const TeacherGuaranteePopup = ({ language }) => {
  return (
    <div className='max-w-[480px] m-auto min-h-[100px] flex-col justify-center'>
      <div className='flex items-center justify-center mb-[24px]'>
        <MusicianIcon />
      </div>
      <div className='tx-primary text-[22px] font-[600] leading-[26px] mb-[12px] text-center'>
        {translateENtoDE('Trial lesson with money-back guarantee', language)}
      </div>
      <div className='tx-secondary text-[16px] leading-[20px] text-center mb-[40px] mx-[15px]'>
        {language === 'ch-en'
          ? 'The first lesson of your first subscription serves as a trial lesson. If you are not satisfied with the lessons, we will find a new teacher or refund your money.'
          : 'Die erste Lektion deines ersten Abos gilt als Probelektion. Falls du nicht zufrieden bist mit dem Unterricht, finden wir eine neue Lehrperson oder erstatten dir das Geld zurück.'}
      </div>
    </div>
  );
};

export default TeacherGuaranteePopup;
