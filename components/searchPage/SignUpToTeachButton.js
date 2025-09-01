import { translateENtoDE } from '../../functions/translator';

const SignUpToTeachButton = ({ language }) => {
  const label = translateENtoDE('SIGN UP TO TEACH', language);

  const href = `https://app.matchspace-music.ch/auth/signup?role=teacher&language=${
    language === 'ch-en' ? 'en' : 'de'
  }`;

  return (
    <a
      className='mb-4 text-sm uppercase btn-outline md:mr-4 md:mb-0 whitespace-nowrap md:text-base'
      href={href}
      target='_blank'
      rel='noopener noreferrer'>
      {label}
    </a>
  );
};

export default SignUpToTeachButton;
