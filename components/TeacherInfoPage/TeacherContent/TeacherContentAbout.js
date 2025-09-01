import { useState } from 'react';
import ShowMoreText from '../ShowMoreText';
import { sortSkillLevels } from '../../../utils/teacherInfo';
import { translateENtoDE, translateFieldKeyToEN } from '../../../functions/translator';

const TeacherContentAbout = ({ language, teacher = {} }) => {
  const [maxGenres, setMaxGenres] = useState(4);
  const [maxLanguages, setMaxLanguages] = useState(4);

  const ageGroups = Object.keys(teacher?.age_taught || {}).filter((item) => !!teacher?.age_taught[item]);

  const showMoreGenres = () => setMaxGenres(10);
  const showMoreLanguages = () => setMaxLanguages(10);

  return (
    <div className='teacher-content-about'>
      <div className='max-w-[820px]'>
        <ShowMoreText maxLength={200} text={teacher?.about_me} language={language} />
      </div>
      <div className='teacher-content-about-line' />
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <div className='mb-4 pr-4'>
          <p className='text-16px font-bold'>{translateENtoDE('Languages', language)}</p>
          <div className='flex flex-wrap'>
            {teacher?.languages.slice(0, maxLanguages).map((item) => (
              <div key={item?.id} className='teacher-content-about-item'>
                {language === 'ch-de' ? item?.de : item?.en}
              </div>
            ))}
            {teacher?.languages?.length > 4 && maxLanguages < 10 && (
              <div onClick={showMoreLanguages} className='teacher-content-about-item cursor-pointer'>
                {`+${teacher?.languages?.length - 4}`}
              </div>
            )}
          </div>
        </div>
        {!!ageGroups.length ? (
          <div className='mb-4'>
            <p className='text-16px font-bold'>{translateENtoDE('Age groups taught', language)}</p>
            <div className='flex flex-wrap'>
              {ageGroups.map((item) => (
                <div key={item} className='teacher-content-about-item'>
                  {translateFieldKeyToEN(item, language)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div />
        )}
        <div className='pr-4 mb-4 sm:mb-0'>
          <p className='text-16px font-bold'>{translateENtoDE('Main musical genres', language)}</p>
          <div className='flex flex-wrap'>
            {teacher?.genres.slice(0, maxGenres).map((item) => (
              <div key={item?.id} className='teacher-content-about-item'>
                {language === 'ch-de' ? item?.de : item?.en}
              </div>
            ))}
            {teacher?.genres?.length > 4 && maxGenres < 10 && (
              <div onClick={showMoreGenres} className='teacher-content-about-item cursor-pointer'>
                {`+${teacher?.genres?.length - 4}`}
              </div>
            )}
          </div>
        </div>
        {!!teacher?.skill_levels_taught?.length ? (
          <div>
            <p className='text-16px font-bold'>{translateENtoDE('Skill levels taught', language)}</p>
            <div className='flex flex-wrap'>
              {sortSkillLevels(teacher?.skill_levels_taught).map((item) => (
                <div key={item} className='teacher-content-about-item'>
                  {translateFieldKeyToEN(item, language)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default TeacherContentAbout;
