import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';

const Switch = ({ checked, onSwitch }) => {
  const switchID = `switch-${uuidv4()}`;

  return (
    <div className='inline-flex items-center'>
      <div className='relative inline-block w-[28px] h-[16px] rounded-full cursor-pointer'>
        <div onClick={() => onSwitch(!checked)} className='w-[35px] h-[20px] top-[-5px] left-[-5px] z-20 absolute' />
        <input
          id={switchID}
          type='checkbox'
          checked={checked}
          onChange={() => onSwitch(!checked)}
          className='absolute w-[28px] h-[10px] transition-colors duration-300 rounded-full appearance-none !opacity-100 cursor-pointer peer bg-[#cfd8dc] checked:bg-[#6AA1B3]'
          aria-label='Toggle switch'
        />
        <label
          htmlFor={switchID}
          className={cx(
            "before:content[''] absolute top-[5px] -left-1 h-[16px] w-[16px] -translate-y-2/4 cursor-pointer rounded-full border shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-[16px] before:w-[16px] before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full  before:opacity-0 before:transition-opacity peer-checked:translate-x-full",
            {
              'border-[#21697C] bg-[#21697C]': checked,
              'border-[#9eb0b8] bg-[#9eb0b8]': !checked,
            }
          )}
        />
      </div>
    </div>
  );
};

export default Switch;
