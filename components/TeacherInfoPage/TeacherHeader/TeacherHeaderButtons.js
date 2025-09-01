import { useState } from 'react';
import { useRouter } from 'next/router';
import TeacherPopup from '../TeacherPopup';
import { translateENtoDE } from '../../../functions/translator';

const TeacherHeaderButtons = ({ language, logInLink, signUpLink }) => {
  const { push, query } = useRouter();
  const [show, setShow] = useState(false);

  const shopPopup = () => setShow(true);
  const hidePopup = () => setShow(false);

  const langToggleHandle = (lang) => {
    push(`/${lang}/teachers/${query?.id}`);
  };

  return (
    <div className='teacher-header-buttons'>
      <div className='flex pr-6'>
        <button
          type='button'
          onClick={() => langToggleHandle('ch-en')}
          className={`text-${language === 'ch-en' ? 'primary' : '-light-grey-300'} cursor-pointer`}>
          EN
        </button>
        <p className='mx-1 text-light-grey-300'>|</p>
        <button
          type='button'
          onClick={() => langToggleHandle('ch-de')}
          className={`text-${language === 'ch-de' ? 'primary' : '-light-grey-300'} cursor-pointer`}>
          DE
        </button>
      </div>
      <a
        target='_blank'
        rel='noreferrer'
        href={signUpLink}
        className='uppercase text-primary text-16px font-medium tracking-widest border-2 btn-outline'>
        {translateENtoDE('Sign up to teach', language)}
      </a>
      <a href={logInLink} target='_blank' rel='noreferrer' className='uppercase text-primary text-16px font-medium'>
        {translateENtoDE('Log in', language)}
      </a>
      <div className='teacher-dropdown-wrapper'>
        <div onClick={shopPopup}>
          <i className='text-primary material-icons-outlined text-40px h-9 w-9 cursor-pointer header-menu-icon'>
            {show ? 'close' : 'menu'}
          </i>
        </div>
        {show && (
          <div className='teacher-dropdown-menu'>
            <TeacherPopup onClose={hidePopup} isOnlyWrapper={true}>
              <div className='teacher-header-menu' onClick={hidePopup}>
                <div>MENU</div>
              </div>
            </TeacherPopup>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherHeaderButtons;
