import { genrateInstrumentIcon } from './instrumentIcon/instrumentIcon';
import TeacherStudioIcon from '../../components/icons/TeacherStudio.svg';
import CloseIcon from '../icons/closeIcon';
import { translateENtoDE } from 'functions/translator';
import { useRouter } from 'next/router';
import { getSlugAfterDash } from '@/utils/schoolpage/getSlugAfterDash';
import { convertIntoLocation } from './commonComponent/TeachingLocation';
import { locationLink, redirectToMZO } from '@/utils/schoolpage/redirectMZO';
const RelatedLocationSidebar = ({ selectedInstrument, onClose, language, locations, regionBasedOnInstrument }) => {
  const router = useRouter();
  const regionSlug = getSlugAfterDash(router?.query?.regionSlug);
  
  const currentAllRegion = regionBasedOnInstrument[selectedInstrument?.key?.toLowerCase()];
  const filterLocation =
    locations
      ?.filter((location) => currentAllRegion?.find((item) => item == location?.id))
      .sort((a, b) => a?.slug?.localeCompare(b.slug, 'de')) ?? [];
  const currentLanguage = language == 'ch-en' ? 'en' : 'de';
  return (
    <div className=''>
      <div className='flex justify-between items-center py-[20px] border-b-[1px] border-[#E4E7EC] px-[20px]'>
        <h3 className='font-semibold text-[19px] leading-[100%] text-[#000000DE] font-Roboto'>
          <span>{`${translateENtoDE('Instrument details', language)}`}</span>
        </h3>
        <button onClick={onClose} className='text-gray-600 hover:text-red-500'>
          <CloseIcon />
        </button>
      </div>
      <div className='flex sm:flex-row flex-row-reverse gap-[24px] p-[20px] border-b-[1px] border-[#F2F4F7]'>
        <div className='[&>div]:text-[64px]'>{genrateInstrumentIcon(selectedInstrument?.key)}</div>

        <div>
          <h2 className='text-[17px] sm:text-[19px] font-bold  font-Roboto leading-[126%] mb-[12px] capitalize'>
            {' '}
            {language == 'ch-en' ? selectedInstrument?.en : selectedInstrument?.de}
          </h2>
          <p className='text-[14px] sm:text-[15px] text-[#000000AD] leading-[160%] font-Roboto'>
            {language == 'ch-en' ? selectedInstrument?.about?.en : selectedInstrument?.about?.de}
          </p>
        </div>
      </div>
      <div className='p-[20px] '>
        <h4 className='font-semibold text-[17px] sm:text-[19px] text-[#000000DE] font-Roboto'>
          {translateENtoDE(`Lesson locations`, language)}
        </h4>

        <ul className=''>
          {filterLocation && filterLocation.length > 0 ? (
            filterLocation?.map((item, index) => {
              const isActive = regionSlug?.toLowerCase() === item?.slug?.toLowerCase();
              const href = isActive ? undefined : locationLink(item, language);

              return (
                <li
                  className='flex sm:flex-row flex-col items-center justify-between gap-[12px] mt-[16px] pb-[20px] border-b-[1px] border-b-[#E4E7EC]'
                  key={index}>
                  <div className='w-full max-w-[744px] flex items-center gap-[12px]'>
                    <TeacherStudioIcon className='min-w-[21px]' />
                    <div>
                      {item?.full_name[currentLanguage] && (
                        <h3 className='font-semibold text-[14px] sm:text-[15px] text-[#000000DE]   font-Roboto capitalize mb-[8px]'>
                          {item?.full_name[currentLanguage]}
                        </h3>
                      )}
                      {item?.slug && (
                        <p className='text-[13px] font-Roboto text-[#000000AD] leading-[123%] capitalize'>
                          {item?.mzo_region_addresses[0]?.full_address}
                        </p>
                      )}
                    </div>
                  </div>
                  <a
                    disabled={isActive}
                    href={href}
                    target={isActive ? undefined : '_blank'}
                    className={`cursor-pointer w-full sm:max-w-[150px] ${isActive ? 'pointer-events-none' : ''} text-white py-[9px] px-[12px] ${
                        isActive ? 'bg-gray-400' : 'bg-[#21697C]'
                    } rounded-full text-[14px] font-medium uppercase font-Roboto leading-[100%] w-full block text-center hover:opacity-80 transition-all duration-300 ease-linear`}
                    onClick={() => window.open(locationLink(item, language), '_blank')}>
                      {translateENtoDE('LEARN MORE', language)}
                  </a>
                </li>
              );
            })
          ) : (
            <div className='text-sm mt-7 text-gray-600 text-center h-[200px] flex items-center justify-center '>
              <span>{translateENtoDE(`No Result Found`, language)}</span>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RelatedLocationSidebar;
