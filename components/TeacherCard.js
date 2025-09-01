import React from 'react';
import Image from 'next/image';
import { IconComponent } from './IconComponent/IconComponent';

const TeacherCard = ({ blok }) => {
    const { image, name, location, description, bio, profileImage, qualification, teachingSubjects, icons } = blok;

    return (
        <div className='flex flex-col p-3 border border-[#edf3f5] rounded-[12px]'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='relative founded-full'>
                        <Image
                            style={{ borderRadius: '100%' }}
                            src={profileImage?.filename}
                            alt={profileImage?.alt}
                            width={56}
                            height={56}
                            objectFit='cover'
                        />
                    </div>
                    <h2 className='text-[16px] font-semibold'>Natalia Ivashina</h2>
                </div>
                <div className='flex gap-1 [&>svg]:!w-[24px] [&>svg]:!h-[24px] items-center'>
                    {icons.map(({ icon_name, _uid }) => (
                        <IconComponent key={_uid} icon={icon_name} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherCard;
