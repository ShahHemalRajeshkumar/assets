import React from 'react';
import DownArrow from './icons/DownArrow';

const CustomDropdown = ({ label, options, isOpen, onToggle, onSelect }) => {
  return (
    <div
      className=' bg-[#EDF3F5] rounded-lg flex flex-col items-center py-1 px-[12px] relative cursor-pointer'
      onClick={onToggle}>
      <div className='bg-transparent text-xs font-medium text-[#21697C] w-full flex items-center justify-between capitalize'>
        <div className='pl-1 text-[12px] whitespace-nowrap'>{label}</div>
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <DownArrow className='w-[21px] h-[21px]' />
        </span>
      </div>

      {isOpen && (
        <div className='absolute top-full left-0 w-max bg-white shadow-md rounded-lg mt-1 z-[9] max-h-60 overflow-y-auto overflow-x-hidden capitalize'>
          {options.map((option, index) => (
            <div
              key={option.value}
              className='px-3 py-2 text-[12px] hover:bg-gray-100 cursor-pointer'
              onClick={(e) => onSelect(option.value, e)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
