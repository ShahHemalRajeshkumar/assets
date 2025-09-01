/* eslint-disable react-hooks/exhaustive-deps */
import cx from 'classnames';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { translateENtoDE, translateFieldKeyToEN } from '../../../functions/translator';
import TeacherPopup from '../../TeacherInfoPage/TeacherPopup';
import TeacherFilterCheckbox from './TeacherFilterCheckbox';
import TeacherFilterButtons from './TeacherFilterButtons';
import TeachersFilterOnline from './TeachersFilterOnline';
import ChevronDown from '../../icons/ChevronDown.svg';
import { getFilterNewList } from './functions';

const TeacherSearchFilters = ({
  form,
  onClose,
  onReset,
  isOnline,
  setValue,
  language,
  setValues,
  list = [],
  seoActions,
  setIsOnline,
  setFilterParams,
  setFilteredList,
  // onlineTeachers = [],
}) => {
  const [newList, setNewList] = useState(list);
  const [prevForm, setPrevForm] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [showMoreGenres, setShowMoreGenres] = useState(false);
  const languages = useMemo(() => {
    const uniqueKeys = new Set();
    const langs = list
      .map((item) => item?.languages)
      .flat()
      .filter((item) => {
        if (!uniqueKeys.has(item?.key)) {
          uniqueKeys.add(item?.key);
          return true;
        }
        return false;
      });

    const enObj = {};
    const deObj = {};
    const enKeys = langs.map((item) => item?.en).sort();
    const deKeys = langs.map((item) => item?.de).sort();

    langs.map((item) => {
      enObj[item?.en] = item;
      deObj[item?.de] = item;
      return item;
    });

    if (language === 'ch-de') return deKeys.map((key) => deObj[key]);

    return enKeys.map((key) => enObj[key]);
  }, [list, language]);

  const genres = useMemo(() => {
    const uniqueKeys = new Set();

    const _genres = list
      .map((item) => item?.genres)
      .flat()
      .filter((item) => {
        if (!uniqueKeys.has(item?.key)) {
          uniqueKeys.add(item?.key);
          return true;
        }
        return false;
      });

    const enObj = {};
    const deObj = {};
    const enKeys = _genres.map((item) => item?.en).sort();
    const deKeys = _genres.map((item) => item?.de).sort();

    _genres.map((item) => {
      enObj[item?.en] = item;
      deObj[item?.de] = item;
      return item;
    });

    if (language === 'ch-de') return deKeys.map((key) => deObj[key]);

    return enKeys.map((key) => enObj[key]);
  }, [list, language]);

  const genreData = useMemo(() => {
    if (showMoreGenres) return genres;

    return genres.slice(0, 6);
  }, [showMoreGenres]);
  
  const langData = useMemo(() => {
    if (showMore) return languages;

    return languages.slice(0, 6);
  }, [showMore]);

  const onFilter = useCallback(() => {
    // if (form.online !== isOnline) setIsOnline(form.online);

    setFilteredList(newList);
    onClose();

    if (seoActions?.applyFilter) {
      const genres = form?.genres?.join(';');
      const languages = form?.languages?.join(';');
      const ages = [form.adults ? 'adults' : '', form.kids ? 'kids' : ''].filter((item) => !!item).join(';');
      const locations = [form.online ? 'online' : '', form.home ? 'student_place' : '', form.studio ? 'studios' : '']
        .filter((item) => !!item)
        .join(';');
      const durations = [form.min30 ? '30' : '', form.min45 ? '45' : '', form.min60 ? '60' : '', form.min90 ? '90' : '']
        .filter((item) => !!item)
        .join(';');
      const skills = [
        form.beginner ? 'beginner' : '',
        form.intermediate ? 'intermediate' : '',
        form.advanced ? 'advanced' : '',
        form.professional ? 'professional' : '',
      ]
        .filter((item) => !!item)
        .join(';');

      seoActions?.applyFilter({ ages, locations, skills, genres, durations, languages });
    }
  }, [newList, languages, onClose, isOnline, setIsOnline, setFilteredList, seoActions, form]);

  const resetHandle = useCallback(() => {
    onReset();
    setFilterParams({});

    if (seoActions?.applyFilter) seoActions?.applyFilter({});
  }, [onReset, seoActions, setFilterParams]);

  const filterNewList = useCallback((form, list) => {
    getFilterNewList(form, list, setNewList, resetHandle);
  }, []);

  const closeHandle = useCallback(() => {
    onClose();
    setValues(prevForm);
  }, [onClose, setValues, prevForm]);

  useEffect(() => {
    setPrevForm(form);
  }, []);

  useEffect(() => {
    filterNewList(form, list);
  }, [form, list]);

  return (
    <TeacherPopup
      name='filters'
      onClose={closeHandle}
      isFullViewModal={true}
      isFullModalStyle={true}
      title={translateENtoDE('Filters', language)}
      buttonsBlock={
        <TeacherFilterButtons
          form={form}
          language={language}
          onFilter={onFilter}
          onClose={closeHandle}
          onReset={resetHandle}
          filteredList={newList}
        />
      }>
      <div className='pr-[10px] overflow-y-scroll visible-scrollbar filter-list-wrapper'>
        {/* AGES */}
        <p className='teacher-filter-title'>{translateENtoDE('Age groups', language)}</p>
        <div className='grid gap-2 grid-cols-1 md:gap-4 md:grid-cols-2'>
          <TeacherFilterCheckbox
            type='age'
            name='adults'
            value={form.adults}
            setValue={setValue}
            setFilterParams={setFilterParams}
            label={translateENtoDE('Adults', language)}
            labelInfo={translateENtoDE('Regular rate', language)}
          />
          <TeacherFilterCheckbox
            type='age'
            name='kids'
            value={form.kids}
            setValue={setValue}
            setFilterParams={setFilterParams}
            label={translateENtoDE('Kids', language)}
            labelInfo={translateENtoDE('Incl. teenagers and young adults in education', language)}
          />
        </div>
        <div className='teacher-filter-line' />
        {/* LOCATIONS */}
        <p className='teacher-filter-title'>{translateENtoDE('Location', language)}</p>
        <div className='grid gap-2 grid-cols-1 md:gap-4 md:grid-cols-2'>
          <TeacherFilterCheckbox
            name='home'
            type='location'
            value={form.home}
            setValue={setValue}
            extraClasses='mb-2 md:mb-4'
            setFilterParams={setFilterParams}
            label={translateENtoDE('Home visits', language)}
            labelInfo={translateENtoDE('Lessons take place at your home', language)}
          />
          <TeacherFilterCheckbox
            name='online'
            type='location'
            value={form.online}
            setValue={setValue}
            extraClasses='mb-2 md:mb-4'
            setFilterParams={setFilterParams}
            isVisibleExtraLabel={!!form.online}
            label={translateENtoDE('Online lessons', language)}
            labelInfo={translateENtoDE('Lessons take place online', language)}
            extraLabel={<TeachersFilterOnline language={language} />}
          />
          <TeacherFilterCheckbox
            name='studio'
            type='location'
            value={form.studio}
            setValue={setValue}
            setFilterParams={setFilterParams}
            label={language === 'ch-en' ? 'Studio' : 'Studio'}
            labelInfo={translateENtoDE('Lessons take place at the teacher’s studio', language)}
          />
        </div>
        <div className='teacher-filter-line' />
        {/* LANGUAGES */}
        <p className='teacher-filter-title'>{translateENtoDE('Available Languages', language)}</p>
        <div className='grid gap-2 grid-cols-1 md:gap-4 md:grid-cols-2'>
          {langData.map((item) =>{
            if(!item){
              return
            }
            return <TeacherFilterCheckbox
              labelInfo=''
              key={item?.id}
              name={item?.key}
              type='languages'
              isLanguage={true}
              setValue={setValue}
              value={form.languages}
              extraClasses='mb-2 md:mb-4'
              setFilterParams={setFilterParams}
              label={language === 'ch-en' ? item.en : item.de}
            />
          })}
        </div>
        {languages?.length > 6 && (
          <div
            onClick={() => setShowMore((value) => !value)}
            className='w-[150px] flex items-center text-[14px] cursor-pointer
           text-[#21697C] font-[500]'>
            <div
              className={cx('transform', {
                'rotate-180': !!showMore,
              })}>
              <ChevronDown color='#21697C' />
            </div>
            {translateENtoDE(showMore ? 'Show less' : 'Show more', language)}
          </div>
        )}
        <div className='teacher-filter-line' />
        {/* SKILLS */}
        <p className='teacher-filter-title'>{translateENtoDE('Skill level taught', language)}</p>
        <div className='grid gap-2 grid-cols-1 md:gap-4 md:grid-cols-2'>
          <TeacherFilterCheckbox
            type='skill'
            name='beginner'
            setValue={setValue}
            value={form.beginner}
            extraClasses='mb-2 md:mb-4'
            setFilterParams={setFilterParams}
            label={translateFieldKeyToEN('beginner', language)}
            labelInfo={translateENtoDE('Learn the fundamentals for starters', language)}
          />
          <TeacherFilterCheckbox
            type='skill'
            name='intermediate'
            setValue={setValue}
            value={form.intermediate}
            extraClasses='mb-2 md:mb-4'
            setFilterParams={setFilterParams}
            label={translateFieldKeyToEN('intermediate', language)}
            labelInfo={translateENtoDE('Expand your knowledge', language)}
          />
          <TeacherFilterCheckbox
            type='skill'
            name='advanced'
            setValue={setValue}
            value={form.advanced}
            setFilterParams={setFilterParams}
            label={translateFieldKeyToEN('advanced', language)}
            labelInfo={translateENtoDE('Master complex pieces', language)}
          />
          <TeacherFilterCheckbox
            type='skill'
            name='professional'
            setValue={setValue}
            value={form.professional}
            setFilterParams={setFilterParams}
            label={translateFieldKeyToEN('professional', language)}
            labelInfo={translateENtoDE('Train at the highest level', language)}
          />
        </div>
        <div className='teacher-filter-line' />
        {/* GENRES */}
        <p className='teacher-filter-title'>{translateENtoDE('Available musical genres', language)}</p>
        <div className='grid gap-2 grid-cols-1 md:gap-4 md:grid-cols-2'>
          {genreData.map((item) => {
            if(!item){
              return
            }
           return <TeacherFilterCheckbox
              labelInfo=''
              type='genres'
              key={item?.id}
              name={item.key}
              isGenres={true}
              setValue={setValue}
              value={form.genres}
              extraClasses='mb-2 md:mb-4'
              setFilterParams={setFilterParams}
              label={language === 'ch-en' ? item.en : item.de}
            />
          })}
        </div>
        {genres?.length > 6 && (
          <div
            onClick={() => setShowMoreGenres((value) => !value)}
            className='w-[150px] flex items-center text-[14px] cursor-pointer
           text-[#21697C] font-[500]'>
            <div
              className={cx('transform', {
                'rotate-180': !!showMoreGenres,
              })}>
              <ChevronDown color='#21697C' />
            </div>
            {translateENtoDE(showMoreGenres ? 'Show less' : 'Show more', language)}
          </div>
        )}
        <div className='teacher-filter-line' />
        {/* DURATION */}
        <p className='teacher-filter-title'>{translateENtoDE('Lesson Duration', language)}</p>
        <div className='grid gap-2 grid-cols-1 md:gap-4 md:grid-cols-2'>
          <TeacherFilterCheckbox
            name='min30'
            type='duration'
            value={form.min30}
            setValue={setValue}
            extraClasses='mb-2 md:mb-4'
            setFilterParams={setFilterParams}
            label={translateENtoDE('30 min.', language)}
            labelInfo={translateENtoDE('Each lesson lasts 30 minutes.', language)}
          />
          <TeacherFilterCheckbox
            name='min45'
            type='duration'
            value={form.min45}
            setValue={setValue}
            extraClasses='mb-2 md:mb-4'
            setFilterParams={setFilterParams}
            label={translateENtoDE('45 min.', language)}
            labelInfo={translateENtoDE('Each lesson lasts 45 minutes.', language)}
          />
          <TeacherFilterCheckbox
            name='min60'
            type='duration'
            value={form.min60}
            setValue={setValue}
            setFilterParams={setFilterParams}
            label={translateENtoDE('60 min.', language)}
            labelInfo={translateENtoDE('Each lesson lasts 60 minutes.', language)}
          />
          <TeacherFilterCheckbox
            name='min90'
            type='duration'
            value={form.min90}
            setValue={setValue}
            setFilterParams={setFilterParams}
            label={translateENtoDE('90 min.', language)}
            labelInfo={translateENtoDE('Each lesson lasts 90 minutes.', language)}
          />
        </div>
      </div>
    </TeacherPopup>
  );
};

export default TeacherSearchFilters;
