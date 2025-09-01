import React from 'react';

import { icons } from './icons';

export const IconComponent = ({ icon, size = 'medium', className }) => {
    const Icon = icon && typeof icons[icon] !== undefined && icons[icon];

    if (!Icon) {
        return null;
    }

    return <Icon className={className} />;
};
