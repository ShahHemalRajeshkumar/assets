import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import forwardimg from '../../assets/icons/Forward.png';
import backwarding from '../../assets/icons/Back.png';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CarouselSlide = ({ blok }) => {
  return (
    <div
      className={`${blok.custom_class}`}
      style={{
        paddingTop: `${blok?.padding_top}px`,
        paddingLeft: `${blok?.padding_left}px`,
        paddingRight: `${blok?.padding_right}px`,
        paddingBottom: `${blok?.padding_bottom}px`,
        marginTop: `${blok?.margin_top}px`,
        marginLeft: `${blok?.margin_left}px`,
        marginRight: `${blok?.margin_right}px`,
        marginBottom: `${blok?.margin_bottom}px`,
        backgroundColor: blok?.bg_color?.color,
        borderColor: blok?.border_color?.color,
        borderWidth: `${blok?.border_width}px`,
        borderRadius: `${blok?.border_radius}px`,
      }}
      {...storyblokEditable(blok)}>
      {blok?.carousel_heading?.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
      <div style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Carousel
          arrows={true}
          swipeable={blok.swipeable}
          responsive={responsive}
          draggable={false}
          showDots={blok.show_dots}
          infinite={blok.infinite_scroll}
          autoPlay={blok.autoplay} //{this.props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={1000}
          keyBoardControl={false}
          containerClass='carousel-container'
          removeArrowOnDeviceType={['tablet', 'mobile']}>
          {blok.carousel_slide.map((nestedBlok, index) => (
            <div key={index} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
            </div>
          ))}
        </Carousel>
      </div>
      {blok?.carousel_button?.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default CarouselSlide;
