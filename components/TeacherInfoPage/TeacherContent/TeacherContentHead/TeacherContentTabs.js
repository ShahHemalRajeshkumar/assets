import cx from 'classnames';
import { useMemo, useState } from 'react';
import TeacherPopup from '../../TeacherPopup';
import useWindowSize from '../../../../hooks/useWindowSize';
import ChevronDownIcon from '../../../icons/ChevronDown.svg';
import { translateENtoDE } from '../../../../functions/translator';
import TeacherContentTabsInfoBlock from './TeacherContentTabsInfoBlock';
import TeacherInfoBlock from '../../TeacherConfigurator/TeacherInfoBlock';

const getTabs = (language, teacher) => ({
  tabs: [
    { name: translateENtoDE('About', language), anchor: 'about', isVisible: true },
    { name: translateENtoDE('Gallery', language), anchor: 'gallery', isVisible: !!teacher?.gallery?.length },
    { name: translateENtoDE('Location', language), anchor: 'location', isVisible: true },
    { name: translateENtoDE('Courses', language), anchor: 'courses', isVisible: !!teacher?.courses?.length },
    {
      name: translateENtoDE('Recommendations', language),
      anchor: 'likes',
      isVisible: !!teacher?.recommendations.length,
    },
  ],
  more: [
    { name: translateENtoDE('Experience', language), anchor: 'experience', isVisible: !!teacher?.experience?.length },
    { name: translateENtoDE('Education', language), anchor: 'education', isVisible: !!teacher?.education?.length },
    {
      name: translateENtoDE('Associations', language),
      anchor: 'associations',
      isVisible: !!teacher?.association_list?.length,
    },
  ],
});

const TeacherContentTabs = ({
  tabRef,
  language,
  topIndex,
  isBottom,
  showPopup,
  fixedTabs,
  activeHash,
  isFixedTabs,
  teacher = {},
  contactHandle,
  setCurrentHash,
  shareLinkHandle,
}) => {
  const { width } = useWindowSize();
  const [show, setShow] = useState(false);

  const shopPopup = () => setShow(true);
  const hidePopup = () => setShow(false);

  const data = useMemo(() => getTabs(language, teacher), [language, teacher]);
  const moreData = useMemo(() => data.more.filter((item) => item.isVisible), [data]);
  const tabsData = useMemo(() => {
    if (width < 768) {
      return [...data.tabs.filter((item) => item.isVisible), ...data.more.filter((item) => item.isVisible)];
    }

    return data.tabs.filter((item) => !!item.isVisible);
  }, [data, width]);

  return (
    <div
      ref={tabRef}
      className={cx({
        'opacity-0': isBottom && isFixedTabs,
        'teacher-content-tabs-fixed': isFixedTabs,
        'teacher-content-tabs-fixed-max-index': topIndex,
      })}>
      {width < 1100 && isFixedTabs && (
        <TeacherContentTabsInfoBlock
          name={teacher?.name}
          avatar={teacher?.avatar_path}
          shareLinkHandle={shareLinkHandle}
        />
      )}
      {width < 1100 && isFixedTabs && (
        <button type='button' onClick={contactHandle} className='contact-button'>
          {language === 'ch-en' ? 'CONTACT ME' : 'KONTAKTIERE MICH'}
        </button>
      )}
      <div className={cx({ 'teacher-content-tabs-wrapper': isFixedTabs })}>
        <div
          className={cx('teacher-content-tabs-hidden', {
            'teacher-content-tabs-hidden-fixed': isFixedTabs,
          })}>
          <div className='teacher-content-tabs flex'>
            {tabsData.map((item) => (
              <div key={item.name} onClick={() => setCurrentHash(item.anchor)}>
                <p
                  className={cx('mr-[16px] sm:mr-[26px] teacher-content-tabs-item text-[#000000AD]', {
                    'teacher-content-tabs-item__active': activeHash === item.anchor,
                  })}>
                  {item.name}
                </p>
              </div>
            ))}
            {width > 768 && !!moreData.length && (
              <div className='teacher-dropdown-wrapper'>
                <div
                  onClick={shopPopup}
                  className='teacher-content-tabs-item teacher-content-tabs-item__no-border mr-0 flex items-center'>
                  {translateENtoDE('More', language)}
                  <ChevronDownIcon className='ml-1' />
                </div>
                {show && (
                  <div className='teacher-dropdown-more'>
                    <TeacherPopup onClose={hidePopup} isOnlyWrapper={true}>
                      <div className='flex flex-col' onClick={hidePopup}>
                        {moreData.map((item) => (
                          <div key={item.name} onClick={() => setCurrentHash(item.anchor)}>
                            <p className='teacher-content-tabs-more-item text-[#000000AD]'>{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </TeacherPopup>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* {isFixedTabs && width > 1100 && (
          <div className='relative'>
            <div className='absolute top-[20px] w-full z-[99999]'>
              <TeacherInfoBlock
                teacher={teacher}
                language={language}
                showPopup={showPopup}
                shareLinkHandle={shareLinkHandle}
                contactInfoRef={fixedTabs?.ref?.contactInfoRef}
              />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TeacherContentTabs;
