import TeacherPopup from '../../TeacherPopup';
import TeacherGalleryPopupItem from './TeacherGalleryPopupItem';
import { translateENtoDE } from '../../../../functions/translator';

const TeacherGalleryPopupMobile = ({
  onPlay,
  onClose,
  language,
  activeIndex,
  teacherInfo,
  gallery = [],
  setActiveIndex,
}) => {
  return (
    <TeacherPopup
      onClose={onClose}
      isFullViewModal={true}
      isFullModalStyle={true}
      title={translateENtoDE('Gallery', language)}>
      <div className='teacher-content-slider-mobile-content visible-scrollbar'>
        {gallery.map((item, index) => (
          <TeacherGalleryPopupItem
            isPlay
            isMobile
            item={item}
            key={item.id}
            slideIndex={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            imageAlt={`${teacherInfo?.name} - Gallery - ${index + 1}`}
            onPlay={() => onPlay(item)}
            params={{
              isVideo: item?.type === 'video',
            }}
          />
        ))}
      </div>
    </TeacherPopup>
  );
};

export default TeacherGalleryPopupMobile;
