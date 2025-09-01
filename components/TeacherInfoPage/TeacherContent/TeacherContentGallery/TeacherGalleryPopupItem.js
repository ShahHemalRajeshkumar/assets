import cx from 'classnames';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { useMemo, useState, useEffect } from 'react';
import PlayCircle from '../../../icons/PlayCircle.svg';
import { getGalleryImage } from './TeacherContentGallery';

const TeacherGalleryPopupItem = ({
  item,
  onPlay,
  params,
  isPlay,
  isMobile,
  imageAlt,
  slideIndex,
  activeIndex,
  setActiveIndex,
}) => {
  const [playing, setPlaying] = useState(false);
  const isYouTubeVideo = (url) => /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/.test(url);

  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const isVideo = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

  const content = useMemo(() => {
    if (isPlay && item?.type === 'video') {
      const styles = { width: '100%', height: isMobile ? '40vh' : 'calc(100vh - 210px)' };

      return (
        <div
          style={styles}
          className={cx('flex items-center justify-center overflow-hidden', {
            'teacher-content-slide-mobile': isMobile,
          })}>
          <ReactPlayer
            controls
            {...styles}
            url={item?.url}
            playing={playing}
            onPlay={() => {
              setPlaying(true);
              setActiveIndex(slideIndex);
            }}
            onEnded={() => setPlaying(false)}
            onPause={() => setPlaying(false)}
          />
        </div>
      );
    }

    if (isMobile) {
      if (isYouTubeVideo(item?.url) && isPlay) {
        return (
          <div className='teacher-content-gallery-slide relative mb-6'>
            <div className='w-full' style={{ height: '40vh' }}>
              <iframe
                width='100%'
                height='100%'
                src={getYouTubeEmbedUrl(item.url)}
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='YouTube Video'
                className='rounded-[12px] w-full h-full'
              />
            </div>
          </div>
        );
      }
      return (
        <div
          className='teacher-content-slide-mobile'
          style={{ backgroundImage: `url(${item?.image_url || item?.url})` }}
        />
      );
    }

    if (isYouTubeVideo(item?.url)) {
      if (isPlay) {
        const iframeHeight = isMobile ? '40vh' : 'calc(100vh - 210px)';
        return (
          <div className='w-full' style={{ height: iframeHeight }}>
            <iframe
              width='100%'
              height='100%'
              src={getYouTubeEmbedUrl(item.url)}
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='YouTube Video'
              className='rounded-[12px] w-full h-full'
            />
          </div>
        );
      }

      return (
        <div className='teacher-content-gallery-slide relative'>
          <div className='relative w-full h-full rounded-lg'>
            <Image
              src={getGalleryImage(item)}
              alt={imageAlt || 'Video Thumbnail'}
              objectFit='contain'
              layout={params.layout}
              height={params.height}
              width={params.width}
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 340px'
            />
          </div>
          <div className='teacher-content-gallery-slide-play'>
            <PlayCircle />
          </div>
        </div>
      );
    }

    return (
      <Image
        objectFit='contain'
        width={params.width}
        className='rounded-lg'
        height={params.height}
        layout={params.layout}
        src={item?.image_url || item?.url}
        alt={imageAlt || item?.video_title}
      />
    );
  }, [isMobile, item, playing, params, slideIndex, isPlay, imageAlt, setActiveIndex]);

  useEffect(() => {
    if (slideIndex !== activeIndex && activeIndex !== undefined) {
      setPlaying(false);
    }
  }, [slideIndex, activeIndex]);

  return (
    <div
      onClick={onPlay}
      className={cx('teacher-content-gallery-slide relative cursor-pointer', {
        [params?.extraClass]: !!params?.extraClass,
      })}>
      {content}
      {!isPlay && params.isVideo && (
        <div className='teacher-content-gallery-slide-play'>
          <PlayCircle />
        </div>
      )}
    </div>
  );
};

export default TeacherGalleryPopupItem;
