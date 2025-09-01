import React from 'react'

import Image from 'next/image'

const SingleStory = ({ img, title, description, buttonData }) => {
    return (
        <div className='flex  items-center flex-col   mb-12 md:mb-0'>
            <div className='relative'>
                <Image className='rounded-lg' width={240} height={240} alt='' src={img} />
            </div>
            <div className='md:h-20 flex items-center'>
                <h3 className='leading-28px  text-center font-medium text-20px  lg:text-24px  py-2  md:leading-34px md:py-0 md:flex md:items-center'>{title}</h3>
            </div>
            <div>

                <p className='leading-28px  text-center   text-16px   lg:text-18px     opacity-60 text-black    lg: lg:pb-0'>{description}</p>
            </div>
            <div className='text-center'>

                <a href={buttonData.href}>
                    <button
                        type="button"
                        className="primary     bg-primary  px-11 py-3 rounded-full hover:bg-dark-primary mt-10       focus:outline-none">
                        <span className='sc-dkPtRN kCZHJF uppercase  font-medium text-white text-16px'>

                            {buttonData.label}
                        </span>
                    </button>
                </a>
            </div>
        </div>
    )
}

export default SingleStory
