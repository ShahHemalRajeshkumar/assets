import SbEditable from 'storyblok-react';
import { storyblokEditable } from '@storyblok/react';
import DynamicComponent from './DynamicComponent';
import React, { useState } from 'react';
import Image from 'next/image';

const AccordionComponent = ({ blok }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const Separator = () => {
    return (
      <hr
        className={`w-full h-[2px] mx-auto border-0 rounded`}
        style={{
          backgroundColor: blok.separator_color ? blok.separator_color?.color : 'transparent',
          height: `${blok.separator_height}px`,
        }}
      />
    );
  };

  const open_image = blok.open_icon ? blok.open_icon?.filename : null;
  const closed_image = blok.closed_icon ? blok.closed_icon?.filename : null;
  const content_image = blok.content_icon ? blok.content_icon?.filename : null;

  return (
    <div>
      <div {...storyblokEditable(blok)} className={`${blok.class}`}>
        {isOpen ? (
          <div onClick={toggleOpen}>
            <a
              className='flex items-center cursor-pointer'
              style={{
                backgroundColor: blok.open_bg_color ? blok.open_bg_color?.color : 'transparent',
              }}>
              {blok.header_opened.map((component) => (
                <DynamicComponent blok={component} key={component._uid} />
              ))}
              {open_image && <Image className='w-5 h-5 ml-auto' src={open_image}  alt="image" />}
            </a>
          </div>
        ) : (
          <div onClick={toggleOpen}>
            <a
              className='flex items-center cursor-pointer'
              style={{
                backgroundColor: blok.closed_bg_color ? blok.closed_bg_color?.color : 'transparent',
                marginTop: `${blok.closed_margin_top}px`,
                marginLeft: `${blok.closed_margin_left}px`,
                marginRight: `${blok.closed_margin_right}px`,
                marginBottom: `${blok.closed_margin_bottom}px`,
              }}>
              {blok.header_closed.map((component) => (
                <DynamicComponent blok={component} key={component._uid} />
              ))}
              {closed_image && <Image className='w-5 h-5 ml-auto' src={closed_image}  alt="image" />}
            </a>
          </div>
        )}

        {isOpen ? (
          <div>
            <a
              className='flex items-center cursor-pointer '
              style={{
                backgroundColor: blok.content_bg_color ? blok.content_bg_color?.color : 'transparent',
                marginTop: `${blok.content_margin_top}px`,
                marginLeft: `${blok.content_margin_left}px`,
                marginRight: `${blok.content_margin_right}px`,
                marginBottom: `${blok.content_margin_bottom}px`,
              }}>
              {blok.content.map((component) => (
                <DynamicComponent blok={component} key={component._uid} />
              ))}
              {/* {content_image && <img className='w-5 h-5 ml-auto' src={content_image} />} */}
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
      {blok.separator ? <Separator /> : null}
    </div>
  );
};

export default AccordionComponent;

// const [isToggled, setIsToggled] = useState(false);

//   const toggleDirection = () => {
//     setIsToggled(!isToggled);
//   };

// <button
//       className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300"
//       onClick={toggleDirection}
//     >
//       <img
//         src={LeftArrow}
//         className={`transition-transform duration-500 ${
//           isToggled ? "rotate-180" : "rotate-0" // Rotate button based on toggle state
//         }`}
//         alt=""
//       />
//     </button>

// {open_image && <img className={`w-5 h-5 ml-auto transition-transform duration-500 ${
//   isOpen ? "rotate-180" : "rotate-0" // Rotate button based on toggle state
// }`}src={open_image}
// onClick={toggleOpen}/>}
