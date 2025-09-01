import { useMemo, lazy, Suspense } from 'react';
import ContentBlock from '../ContentBlock';
import TeacherContentAbout from './TeacherContentAbout';
import TeacherLocation from './TeacherLocation/TeacherLocation';
import { translateENtoDE } from '../../../functions/translator';
import TeacherExperience from './TeacherExperience/TeacherExperience';
import TeacherContentHead from './TeacherContentHead/TeacherContentHead';
const TeacherAssociations = lazy(() => import('./TeacherAssociations/TeacherAssociations'));
const TeacherContentLikes = lazy(() => import('./TeacherContentLikes/TeacherContentLikes'));
const TeacherContentGallery = lazy(() => import('./TeacherContentGallery/TeacherContentGallery'));
const TeacherContentCourses = lazy(() => import('./TeacherContentCourses/TeacherContentCourses'));
const MAX_ITEMS_VISIBLE = 5;
const TeacherHeader = ({ language, teacher = {}, showPopup, fixedTabs, seoActions, handleOpenGuaranteeModal }) => {
  const {
    topIndex,
    fixedTab,
    activeHash,
    setCurrentHash,
    ref: {
      headRef,
      likesRef,
      bottomRef,
      coursesRef,
      aboutMeRef,
      galleryRef,
      contentRef,
      locationRef,
      educationRef,
      experienceRef,
      associationsRef,
    },
  } = fixedTabs;
  const likes = useMemo(() => {
    return teacher?.recommendations?.filter((item) => item?.status !== 'not_published') || [];
  }, [teacher?.recommendations]);
  return (
    <div ref={contentRef} className='teacher-content'>
      <TeacherContentHead
        headRef={headRef}
        teacher={teacher}
        topIndex={topIndex}
        language={language}
        fixedTabs={fixedTabs}
        bottomRef={bottomRef}
        showPopup={showPopup}
        isFixedTabs={fixedTab}
        activeHash={activeHash}
        setCurrentHash={setCurrentHash}
        handleOpenGuaranteeModal={handleOpenGuaranteeModal}
      />
      <div id='about' ref={aboutMeRef}>
        <ContentBlock
          name='about-me'
          withPopup={false}
          language={language}
          label={translateENtoDE('About me', language)}>
          <TeacherContentAbout language={language} teacher={teacher} />
        </ContentBlock>
      </div>
      <Suspense fallback={<div>Loading…</div>}>
        {!!teacher?.gallery?.length && (
          <div className='relative'>
            <div id='gallery' ref={galleryRef}>
              <ContentBlock
                name='gallery'
                language={language}
                maxItemsVisible={0}
                data={teacher?.gallery}
                onShowPopup={showPopup}
                label={translateENtoDE('Gallery', language)}>
                <TeacherContentGallery gallery={teacher?.gallery.slice(0, MAX_ITEMS_VISIBLE)} showPopup={showPopup} />
              </ContentBlock>
            </div>
          </div>
        )}
        <div id='location' ref={locationRef}>
          <ContentBlock
            name='location'
            withPopup={false}
            language={language}
            label={translateENtoDE('Location', language)}>
            <TeacherLocation language={language} locations={teacher?.locations} />
          </ContentBlock>
        </div>
        {!!teacher?.courses?.length && (
          <div id='courses' ref={coursesRef}>
            <ContentBlock
              name='courses'
              withPopup={false}
              language={language}
              maxItemsVisible={12}
              onShowPopup={showPopup}
              data={teacher?.courses}
              label={translateENtoDE('Courses', language)}>
              <TeacherContentCourses
                teacher={teacher}
                language={language}
                maxItemsVisible={12}
                showPopup={showPopup}
                seoActions={seoActions}
                courses={teacher?.courses}
              />
            </ContentBlock>
          </div>
        )}
        {!!likes?.length && (
          <div id='likes' ref={likesRef}>
            <ContentBlock
              name='likes'
              data={likes}
              maxItemsVisible={0}
              language={language}
              onShowPopup={showPopup}
              label={translateENtoDE('Recommendations', language)}
              popupLabel={`${likes.length} ${translateENtoDE(
                likes.length === 1 ? 'Student recommendation' : 'Student recommendations',
                language
              )}`}>
              <TeacherContentLikes
                language={language}
                showPopup={showPopup}
                likes={likes?.slice(0, MAX_ITEMS_VISIBLE)}
                popupLabel={`${likes.length} ${translateENtoDE(
                  likes.length === 1 ? 'Student recommendation' : 'Student recommendations',
                  language
                )}`}
              />
            </ContentBlock>
          </div>
        )}
        {!!teacher?.experience?.length && (
          <div id='experience' ref={experienceRef}>
            <ContentBlock
              name='experience'
              language={language}
              maxItemsVisible={2}
              onShowPopup={showPopup}
              data={teacher?.experience}
              label={translateENtoDE('Experience', language)}>
              <TeacherExperience isExperience={true} language={language} data={teacher?.experience} />
            </ContentBlock>
          </div>
        )}
        {!!teacher?.education?.length && (
          <div id='education' ref={educationRef}>
            <ContentBlock
              name='education'
              language={language}
              maxItemsVisible={2}
              onShowPopup={showPopup}
              data={teacher?.education}
              label={translateENtoDE('Education', language)}>
              <TeacherExperience isExperience={false} language={language} data={teacher?.education} />
            </ContentBlock>
          </div>
        )}
        {!!teacher?.association_list?.length && (
          <div id='associations' ref={associationsRef}>
            <ContentBlock
              name='associations'
              language={language}
              maxItemsVisible={2}
              onShowPopup={showPopup}
              data={teacher?.association_list}
              label={translateENtoDE('Music Associations', language)}>
              <TeacherAssociations isExperience={false} language={language} data={teacher?.association_list} />
            </ContentBlock>
          </div>
        )}
      </Suspense>
      <div ref={bottomRef} />
    </div>
  );
};
export default TeacherHeader;
