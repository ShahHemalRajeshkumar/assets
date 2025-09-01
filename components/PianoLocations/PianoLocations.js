import React from 'react';

const PianoLocations = ({ data }) => {
    // Group locations by region
    const regions = data?.reduce((acc, item) => {
        if (!acc[item.region_id]) {
            acc[item.region_id] = {
                region_title: item.region_title,
                region_url: item.page_url,
                locations: [],
            };
        }
        acc[item.region_id].locations.push(item);
        return acc;
    }, {});

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {Object.values(regions).map((region, index) => (
                <div key={index} className='flex-1 mx-2'>
                    <h2 className='font-bold mb-2 text-[24px] md:text-[30px]'>{region.region_title}</h2>
                    <ul className='list-none p-0 max-h-[275px] overflow-y-auto'>
                        {region.locations.map((location, locIndex) => (
                            <li key={locIndex} className='text-[16px] border-b border-gray-300 text-gray-700 md:text-[18px]'>
                                {location.location_url ? (
                                    <a
                                        href={location.location_url}
                                        className='focus-visible:bg-gray-100 py-2  hover:bg-gray-100 w-full block'>
                                        {location.location_title}
                                    </a>
                                ) : (
                                    location.location_title
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PianoLocations;
