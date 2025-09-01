import React from 'react';
import DynamicComponent from './DynamicComponent';
import ExpandableList from './ExpandableList';
import PianoLocations from './PianoLocations/PianoLocations';
import InstrumentMap from './InstrumentComponents/InstrumentMap';
import InstrumentTeacherCards from './InstrumentComponents/InstrumentTeacherCards';
import InstrumentRecommendations from './InstrumentComponents/InstrumentRecommendations';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { getLastSegment } from '@/utils/getLastSegment';

import { useRouter } from 'next/router';

import TitleSection from './TitleSection';

function extractBaseWord(fullWord, suffix) {
    if (fullWord.endsWith(suffix)) {
        return fullWord.slice(0, -suffix.length);
    }
    return fullWord;
}

function PianoPage({ pageContent, instrument, instrumentLocations, language, teachers, recommendations, titleTexts }) {
    const router = useRouter();
    const isDE = language === 'ch-de';
    const slug = getLastSegment(router.asPath);

    return (
        <>
            <DynamicComponent blok={pageContent.heroComponent} />
            <DynamicComponent blok={pageContent.twoColComponent} />

            <div className='bg-light-grey-200 py-16'>
                <div className='contain'>
                    <TitleSection text={titleTexts.mainTitle} />
                    <InstrumentMap instrument={instrument} language={language} teachers={teachers} />
                    <div className='mt-12'>
                        <PianoLocations data={instrumentLocations} />
                    </div>
                </div>
            </div>

            <DynamicComponent blok={pageContent.tableComponent} />
            <div className='bg-light-grey-200'>
                <div className='contain py-16'>
                    <TitleSection text={titleTexts.teacherTitle} />
                    <InstrumentTeacherCards teachers={teachers} language={language} instrument={instrument} />

                    <div className='w-full text-center pt-6'>
                        <a
                            href={
                                isDE
                                    ? `/${language}/${instrument[language.slice(3)].toLowerCase()}-unterricht/schweiz`
                                    : `/${language}/${instrument[language.slice(3)].toLowerCase()}-lessons/switzerland`
                            }
                            type='button'
                            className=' btn-primary bg-primary uppercase'>
                            {isDE ? 'ALLE ANZEIGEN' : 'SHOW ALL'}
                        </a>
                    </div>
                </div>
            </div>
            <DynamicComponent blok={pageContent.faqComponent} />
            <div className='bg-light-grey-200 py-16'>
                <DynamicComponent blok={pageContent.twoColComponent2} />
            </div>
            <div className='contain py-16 overflow-hidden'>
                <TitleSection text={titleTexts.recommendationsTitle} />
                <InstrumentRecommendations recommendations={recommendations} language={language} />
            </div>
            <div className='bg-light-grey-200'>
                <DynamicComponent blok={pageContent.teaserComponent} />
            </div>
            <DynamicComponent blok={pageContent.linedCardComponent} />
        </>
    );
}

export default PianoPage;
