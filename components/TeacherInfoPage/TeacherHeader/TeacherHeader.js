import MatchSpaceLogo from '../../icons/MatchSpaceLogo.svg';
import TeacherHeaderButtons from './TeacherHeaderButtons';

const TeacherHeader = ({ language }) => {
  const logInLink = '/ch-en';
  const signUpLink = '/ch-en';
  const linkHome = `/${language || 'ch-en'}`;

  return (
    <div className='teacher-header'>
      <div className='teacher-header-content flex items-center justify-between'>
        <a href={linkHome} aria-label='Matchspace'>
          <MatchSpaceLogo />
        </a>
        <TeacherHeaderButtons language={language} logInLink={logInLink} signUpLink={signUpLink} />
      </div>
    </div>
  );
};

export default TeacherHeader;
