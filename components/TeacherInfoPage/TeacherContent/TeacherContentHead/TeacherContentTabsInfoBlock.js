import Image from 'next/image';
import ShareIcon from '../../../icons/Share.svg';

const TeacherContentTabsInfoBlock = ({ name = '', avatar = '', shareLinkHandle }) => {
  return (
    <div className='teacher-content-tabs-info-block'>
      <Image width='32px' height='32px' alt={name} className='rounded-full' src={avatar} />
      <h2 className='font-bold text-16px ml-4 mr-4'>{name}</h2>
      <button type='button' className='cursor-pointer z-50' onClick={shareLinkHandle}>
        <ShareIcon />
      </button>
    </div>
  );
};

export default TeacherContentTabsInfoBlock;
