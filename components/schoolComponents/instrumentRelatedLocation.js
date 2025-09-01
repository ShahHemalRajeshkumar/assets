import React, { useEffect, useState } from 'react';
import { genrateInstrumentIcon } from './instrumentIcon/instrumentIcon';
import RelatedLocationSidebar from './RelatedLocationSidebar';
import Pluse from '../icons/Pluse';
import Minus from '../icons/Minus';
import { translateENtoDE } from 'functions/translator';
import axios from 'axios';
import { useRouter } from 'next/router';

function InstrumentRelatedLocation({ language, instrumentsData, locations }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState({});
  const [expandedCategory, setExpandedCategory] = useState({key : 'string_instruments', name : 'String instruments'});
  const [allInstrumentBasedOnRegion, setAllInstrumentBasedOnRegion] = useState([]);
  const [regionBasedOnInstrument, setRegionBasedOnInstrument] = useState([]);
  const query = useRouter();

  function filterInstrumentLocation(selectedInstrument) {
    setSelectedInstrument(selectedInstrument);
    setIsSidebarOpen(true);
  }

  const instrumentCategories = [
    { id: 1, name: 'String instruments', category: ['string_instruments'] },
    { id: 2, name: 'Keyboard instruments', category: ['key_instruments'] },
    { id: 3, name: 'Wind instruments', category: ['wind_instruments'] },
    { id: 4, name: 'Percussion instruments', category: ['percussion_instruments'] },
    { id: 5, name: 'Other musical subjects', category: ['other_skills', 'voice'] },
  ];

  const toggleCategory = (category, name) => {
    setExpandedCategory((prev) => (prev?.key === category ? {} : { key: category, name }));
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      document.body.style.overflow = 'scroll';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    async function handleGetInstrument() {
      const [{ data: instrumentRes }, { data: regionRes }] = await Promise.all([
        axios.get('/api/getInstrumentKeys', {
          params: { organization: query?.organization },
        }),
        axios.get('/api/getInstrumentRegion', {
          params: { organization: query?.organization },
        }),
      ]);
      const instrumentKeys = instrumentRes?.data?.instruments_keys || [];
      const regionnstrumentData = regionRes?.data?.instruments_region_ids || {};
      setRegionBasedOnInstrument(regionnstrumentData);
      setAllInstrumentBasedOnRegion(instrumentKeys);
    }

    handleGetInstrument();
  }, []);
  return (
    <div className=' max-w-4xl mx-auto'>
      <p className='text-[15px] text-[#000000AD] leading-[156%] font-Roboto mb-2'>
        {translateENtoDE(
          'Discover all our musical instruments and courses taught at Music School Zurich Oberland.',
          language
        )}
      </p>

      {instrumentCategories?.map((cat, index) => {
        const instrumentsInCategory = instrumentsData
          ?.filter((instrument) => [...new Set(allInstrumentBasedOnRegion)]?.includes(instrument?.key))
          .filter((instrument) => cat?.category?.includes(instrument?.sub_category))
          .sort((a, b) => (language == 'ch-en' ? a?.en?.localeCompare(b.en, 'en') : a?.de?.localeCompare(b.de, 'de')));

        return (
          <div key={cat.id} className={`border-b border-[#F2F4F7] py-[20px] ${index == 0 && '!pt-1'}`}>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={() => toggleCategory(cat.category[0],cat?.name)}>
              <h3 className='text-[17px] font-semibold font-Roboto text-black/[87%]'>
                {translateENtoDE(cat.name, language)}
              </h3>
              <button className='text-gray-500'>{cat.category?.includes(expandedCategory?.key)  ? <Minus /> : <Pluse />}</button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                cat.category?.includes(expandedCategory?.key) ? 'max-h-screen' : 'max-h-0'
              } origin-top`}>
              {cat.category?.includes(expandedCategory?.key) && (
                <div className='flex flex-wrap gap-3 mt-[16px] w-full'>
                  {instrumentsInCategory?.map((instrument, index) => (
                    <div
                      key={index}
                      onClick={() => filterInstrumentLocation(instrument)}
                      className='flex items-center justify-center gap-2 bg-[#EDF3F5] rounded-xl py-2 cursor-pointer w-fit pr-3'>
                      <span className='text-[#21697C] text-[24px]'>{genrateInstrumentIcon(instrument.key)}</span>
                      <span className='text-[14px] text-[#21697C] font-medium'>
                        {language === 'ch-en' ? instrument.en : instrument.de}
                      </span>
                    </div>
                  ))}

                  {instrumentsInCategory == 'undefined' ||
                    (!instrumentsInCategory?.length && (
                      <div className='flex items-center gap-2 bg-gray-100 rounded-full py-2 px-4 cursor-default'>
                        <span className='text-sm text-gray-600'>{
                          language == 'ch-en' ? `No available lessons for ${translateENtoDE(expandedCategory?.name, language).toLowerCase()}.` 
                          : `Kein Unterricht für ${translateENtoDE(expandedCategory?.name, language)} verfügbar.`}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {isSidebarOpen && (
        <div className='fixed inset-0 bg-[#000000A8] z-50' onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-[960px] bg-white overflow-y-auto z-50 transition-all duration-300 ease-linear ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-[100%]'
        }`}>
        <RelatedLocationSidebar
          selectedInstrument={selectedInstrument}
          onClose={() => setIsSidebarOpen(false)}
          language={language}
          locations={locations}
          regionBasedOnInstrument={regionBasedOnInstrument}
        />
      </div>
    </div>
  );
}

export default InstrumentRelatedLocation;
