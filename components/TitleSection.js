import React from 'react';

import cn from 'classnames';

const TitleSection = ({ text, className }) => {
    return (
        <h2
            className={cn(
                'text-center mb-12 text-24px font-bold md:text-48px md:leading-[52px] relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-[-18px] before:w-[108px] before:h-[4px] before:bg-opacity-10 before:bg-primary',
                className
            )}>
            {text}
        </h2>
    );
};

export default TitleSection;
