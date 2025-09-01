import React, { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import InstrumentLandingPage from '../../../../components/InstrumentLandingPage';
import StructuredData from '@/components/StructuredData';
import { getInstrumentById } from '@/utils/getInstrumentById';
import StoryblokService from '../../../../utils/storyblok-service';
import { changeLanguage, findComponent, transformInstrumentLocations } from '../../../../utils';
import { searchClient, instrumentsIndex, algoliaClient } from '../../../../config';
import {
    fetchInstrumentsData,
    fetchTeachersData,
    fetchStoryData,
    fetchInstrumentLocations,
} from '../../../../apiHelpers';
const getTeachers = algoliaClient.initIndex(process.env.ALGOLIA_TEACHERINDEX);
const likes = searchClient.initIndex(process.env.ALGOLIA_RECOMMENDATION_INDEX);
export async function getStaticPaths() {
    return {
        paths: [
            { params: { language: 'ch-de' } }
        ], 
        fallback: false,
    };
}
export async function getStaticProps({ params }) {
    const language = 'ch-de';
    const [instruments, storyResult] = await Promise.all([
        fetchInstrumentsData(instrumentsIndex),
        fetchStoryData(StoryblokService, language, 'musikunterricht/geigenunterricht'),
    ]);

    const instrument = getInstrumentById(instruments, 'violin', 'en') || null;

    const teachers = await fetchTeachersData(getTeachers, instrument?.key);
    const story = storyResult.result?.data?.story || null;
    const status = storyResult.status;

    const likesList = (await likes?.search('violin'))?.hits || [];

    return {
        props: {
            recommendations: likesList,
            instrument,
            instruments,
            _online: teachers?.hits || [],
            language,
            story,
            status,
        },
        revalidate: 60, 
    };
}
function GeigenunterrichtPage({ story, language, instrument, instruments, _online, recommendations }) {
    const [onlineTeachers, setOnlineTeachers] = useState(_online || []);
    const [instrumentLocations, setInstrumentLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadInstrumentLocations = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await fetchInstrumentLocations(language);
                if (data) {
                    const transformed = transformInstrumentLocations(data, {
                        oldInstrument: 'piano',
                        newInstrument: 'geige',
                        oldLesson: 'Klavierunterricht',
                        newLesson: 'Geigenunterricht',
                        oldUrl: 'klavier-unterricht',
                        newUrl: 'geigen-unterricht',
                    });
                    setInstrumentLocations(transformed);
                }
                if (error) setError(error);
            } catch (err) {
                setError(err.message || 'Error fetching locations');
            }
            setIsLoading(false);
        };
        loadInstrumentLocations();
    }, [language]);

    const [globalReference, pageContent] = story.content.body;

    const componentIds = [
        'hero-component',
        'two-col-component',
        'links-component',
        'table-component',
        'faq-component',
        'two-col-component-2',
        'teaser-component',
        'lined-card-component',
    ];

    const [
        heroComponent,
        twoColComponent,
        linksComponent,
        tableComponent,
        faqComponent,
        twoColComponent2,
        teaserComponent,
        linedCardComponent,
    ] = componentIds.map((id) => findComponent(pageContent.components, id));

    return (
        <Layout
            noIndex={story?.content?.noIndex}
            meta={story?.content?.meta}
            keywords={story?.content?.keywords}
            alternateSlug={story.alternates[0]?.full_slug}
            language={language}
            story={story?.content}
            languageChange={() =>
                (location.href = location.href.replace(
                    'ch-de/musikunterricht/geigenunterricht',
                    'ch-en/music-lessons/violin-lessons'
                ))
            }
        >
            <InstrumentLandingPage
                recommendations={recommendations}
                teachers={onlineTeachers}
                instrument={instrument}
                language={language}
                instrumentLocations={instrumentLocations}
                pageContent={{
                    heroComponent,
                    twoColComponent,
                    linksComponent,
                    tableComponent,
                    faqComponent,
                    twoColComponent2,
                    teaserComponent,
                    linedCardComponent,
                }}
                titleTexts={{
                    mainTitle: 'Geigen- und Violinenunterricht in der Schweiz',
                    teacherTitle: 'Unsere qualifizierten Geigenlehrer*innen',
                    recommendationsTitle: 'Empfehlungen unserer Geigenschüler*innen',
                }}
            />
            <StructuredData
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: [
                        {
                            '@type': 'Question',
                            name: 'Wie weiss ich, dass die Geigenlehrer*innen qualifiziert sind?',
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: 'Alle Geigenlehrer*innen von Matchspace Music werden von einer ausgebildeten Musiklehrer*innen geprüft und auf unserer Plattform freigeschalten.',
                            },
                        },
                        {
                            '@type': 'Question',
                            name: 'Wieviel kostet der Geigenunterricht?',
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: 'Die Kosten für eine Stunde Unterricht unterscheiden sich von Kanton zu Kanton und beginnen bei ca. CHF 85 bis CHF 115 pro Stunde. Das Abo mit 5 Lektionen ist für Kinder kostet ca. CHF 340 und für Erwachsene ca. CHF 425.',
                            },
                        },
                        {
                            '@type': 'Question',
                            name: 'Ab welchem Alter kann man Geige spielen lernen?',
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: 'Kinder können Geige je nach Entwicklungsstand bereits ab ca. 6 - 10 Jahren lernen. Geigenunterricht eignet sich ausgezeichnet auch für Jugendliche, Erwachsene und auch Senior*innen bis ins hohe Alter.',
                            },
                        },
                        {
                            '@type': 'Question',
                            name: 'Wo findet der Geigenunterricht statt?',
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: 'Unsere Geigenlehrer*innen bieten ihren Unterricht in ihrem Studio an, als Hausbesuch, also bei Schüler*innen zuhause oder bei Bedarf auch im Online-Unterricht an.',
                            },
                        },
                        {
                            '@type': 'Question',
                            name: 'Wie finde ich die passende Geigenlehrer*in?',
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: 'Bei Matchspace Music unterrichten hunderte qualifizierte Geigenlehrer*innen. Suche nach dem Instrument in deiner Nähe und wähle die Lehrperson, die zu deinen Bedürfnissen passt. Trete in Kontakt und vereinbare die erste Lektion.',
                            },
                        },
                    ],
                }}
            />
        </Layout>
    );
}
export default GeigenunterrichtPage;
