import { StoryblokComponent, storyblokEditable } from '@storyblok/react';


const Video = ({ blok }) => {
  const uploaded_video = blok.video.filename;
  const thumbnail = blok.video_thumbnail.filename;
  return (
    <video
      className={`${blok.custom_class}`}
      style={{
        width: `${blok.video_width}px`,
        height: `${blok.video_height}px`,
        paddingTop: `${blok.padding_top}px`,
        paddingLeft: `${blok.padding_left}px`,
        paddingRight: `${blok.padding_right}px`,
        paddingBottom: `${blok.padding_bottom}px`,
        marginTop: `${blok.margin_top}px`,
        marginLeft: `${blok.margin_left}px`,
        marginRight: `${blok.margin_right}px`,
        marginBottom: `${blok.margin_bottom}px`,
        borderRadius: `${blok.border_radius}px`,
      }}
      poster={thumbnail}
      autoPlay={true}
      muted={true}
      loop={true}
      controls={true}>
      <source src={uploaded_video} type='video/mp4' />
    </video>
  );
};

export default Video;
