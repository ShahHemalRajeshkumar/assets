import React from 'react';

const LinkListComponent = ({ url, title }) => {
  return (
    <div className=''>
      <a href={url} className='font-normal text-[14px] md:text-[15px] text-[#1F2020] '>
        {title}
      </a>
    </div>
  );
};

const InstrumentLocationList = ({ data, instrument, language }) => {
  const totalDataLength = Math.round(data?.length / 2);
  const columnOne = data?.slice(0, totalDataLength);
  const columnTwo = data?.slice(totalDataLength);
  const isMobileScreen = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  };

  return (
    <div className='gap-10 mt-4'>
      <div className='overflow-hidden bg-[#F3F4F6] py-9 rounded-xl  px-4 sm:px-8 md:px-5'>
        <div className='flex justify-center items-center flex-col'>
          <h2
            className='
          
          text-[22px] text-center font-semibold font-sans p-[10px] md:p-[18px] !pt-0 leading-[100%] text-[#1F2020]
          '>
            {language === 'ch-en'
              ? `More ${instrument?.en?.toLowerCase()} teachers near you`
              : `Mehr ${instrument?.de?.charAt(0)?.toUpperCase() + instrument?.de?.slice(1)}${
                  instrument?.delimiters?.teacher
                }nen in deiner Nähe`}
          </h2>
          <div className='border-b-4 border-primary px-12 pt-2 mb-6 md:mb-9 md:pt-0 inline-flex justify-center items-center  '></div>
        </div>
        {!isMobileScreen() ? (
          <div className='columns-2 gap-8 '>
            {/* First Column */}
            <div className=''>
              <div className=' instrument-list'>
                {columnOne?.map((region, index) => (
                  <LinkListComponent
                    key={index}
                    title={region.location_title?.charAt(0)?.toUpperCase() + region.location_title?.slice(1)}
                    url={region?.location_url}
                  />
                ))}
              </div>
            </div>

            {/* Second Column */}
            <div className=' '>
              <div className=' instrument-list'>
                {columnTwo?.map((region, index) => (
                  <LinkListComponent
                    key={index}
                    title={region.location_title?.charAt(0)?.toUpperCase() + region.location_title?.slice(1)}
                    url={region?.location_url}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='flex justify-start gap-10'>
            <div className=''>
              <div className=' instrument-list'>
                {data.map((region, index) => (
                  <LinkListComponent
                    key={index}
                    title={region.location_title?.charAt(0)?.toUpperCase() + region.location_title?.slice(1)}
                    url={region?.location_url}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentLocationList;
