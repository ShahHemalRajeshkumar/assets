import React from 'react';

function extractHtmlBlocks(html) {
  const blocks = [];
  const regex = /(<b>.*?<\/b>[^<]*)/gs;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const matchStart = match.index;

    if (matchStart > lastIndex) {
      const preText = html.slice(lastIndex, matchStart).trim();
      if (preText) blocks.push(preText);
    }

    blocks.push(match[1].trim());
    lastIndex = regex.lastIndex;
  }

  const remaining = html.slice(lastIndex).trim();
  if (remaining) blocks.push(remaining);

  return blocks;
}

function InstrumentSeoComponent({ seoFilteredData, instrument, locationName }) {
  return (
    <div>
      {seoFilteredData?.map((item, index) => {
        const rawHtml =
          item?.lng === 'en'
            ? item?.description
                ?.replaceAll('{{instrument_en}}', instrument?.en?.toLowerCase())
                ?.replaceAll('{{location_en}}', locationName?.charAt(0)?.toUpperCase() + locationName?.slice(1))
            : item?.description
                ?.replaceAll('{{instrument_de}}', instrument?.de?.charAt(0)?.toUpperCase() + instrument?.de?.slice(1))
                ?.replaceAll('{{location_de}}', locationName?.charAt(0)?.toUpperCase() + locationName?.slice(1))
                ?.replaceAll('{{delimeter_teacher}}', instrument?.delimiters?.teacher?.toLowerCase())
                ?.replaceAll('{{delimeter_lessons}}', instrument?.delimiters?.lessons?.toLowerCase());

        const blocks = extractHtmlBlocks(rawHtml);
        const midpoint = Math.round(blocks.length / 2);
        let col1 = blocks.slice(0, midpoint);
        let col2 = blocks.slice(midpoint);

        const lastHeadingIndex = [...col1].reverse().findIndex((block) => block.trim().startsWith('<b>'));
        if (lastHeadingIndex !== -1) {
          const realIndex = col1.length - 1 - lastHeadingIndex;
          const [moved] = col1.splice(realIndex, 1);
          col2.unshift(moved);
        }

        return (
          <div key={index} className='py-9 bg-[#F3F4F6] px-4 sm:px-8 md:px-5 rounded-xl'>
            <div className='flex justify-center items-center flex-col'>
              <h2 className='text-[22px] text-center font-semibold font-sans p-[10px] md:p-[18px] !pt-0 leading-[100%] text-[#1F2020]'>
                {item.lng === 'en'
                  ? item.title
                      .replaceAll('{{instrument_en}}', instrument.en)
                      .replaceAll('{{location_en}}', locationName)
                  : item.title
                      .replaceAll('{{instrument_de}}', instrument.de)
                      .replaceAll('{{location_de}}', locationName)
                      .replaceAll('{{delimeter_teacher}}', instrument?.delimiters?.teacher)
                      .replaceAll('{{delimeter_lessons}}', instrument?.delimiters?.lessons)}
              </h2>

              <div className='border-b-4 border-primary px-12 pt-2 mb-6 md:mb-9 md:pt-0 inline-flex justify-center items-center'></div>
            </div>

            <div className='flex flex-col md:flex-row gap-8'>
              <div className='flex-1 flex flex-col gap-4'>
                {col1.map((html, idx) => (
                  <div
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: html }}
                    className='text-[15px] text-[#1F2020] leading-[130%]'
                  />
                ))}
              </div>
              <div className='flex-1 flex flex-col gap-4'>
                {col2.map((html, idx) => (
                  <div
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: html }}
                    className='text-[15px] text-[#1F2020] leading-[130%]'
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InstrumentSeoComponent;