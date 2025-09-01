import React, { useState, useEffect } from "react";
import { searchClient, instrumentsIndex, algoliaClient } from "../../../../config";
import InstrumentLandingPage from "../../../../components/InstrumentLandingPage";
import { findComponent, transformInstrumentLocations } from "../../../../utils";
import StoryblokService from "../../../../utils/storyblok-service";
import { getInstrumentById } from "@/utils/getInstrumentById";
import StructuredData from "@/components/StructuredData";
import Layout from "../../../../components/Layout";
import {
  fetchInstrumentLocations,
  fetchInstrumentsData,
  fetchTeachersData,
  fetchStoryData,
} from "../../../../apiHelpers";

const likes = searchClient.initIndex(process.env.ALGOLIA_RECOMMENDATION_INDEX);
const getTeachers = algoliaClient.initIndex(
  process.env.ALGOLIA_TEACHERINDEX_INSTRUMENT
);

export async function getStaticProps() {
  const language = "ch-de";
  const instruments = await fetchInstrumentsData(instrumentsIndex);

  const instrument = getInstrumentById(instruments, "guitar", "en") || null;

  const storyFetchResult = await fetchStoryData(
    StoryblokService,
    language,
    "musikunterricht/gitarrenunterricht"
  );
  const teachers = await fetchTeachersData(getTeachers, instrument?.key);

  const story = storyFetchResult.result?.data?.story || null;
  const status = storyFetchResult.status;

  const likesList = (await likes?.search("guitar"))?.hits || [];

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
    revalidate: 60 * 60,
  };
}

function GitarrenunterrichtPage({
  story,
  language,
  instrument,
  instruments,
  _online,
  recommendations,
}) {
  const [onlineTeachers, setOnlineTeachers] = useState(_online || []);
  const [instrumentLocations, setInstrumentLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInstrumentLocations = async () => {
      setIsLoading(true);
      const { data, error } = await fetchInstrumentLocations("ch-de");
      const transformOptions = {
        oldInstrument: "piano",
        newInstrument: "gitarre",
        oldLesson: "Klavierunterricht",
        newLesson: "Gitarrenunterricht",
        oldUrl: "klavier-unterricht",
        newUrl: "gitarre-unterricht",
      };

      const transformedData = transformInstrumentLocations(data, transformOptions);
      if (transformedData) {
        setInstrumentLocations(transformedData);
      }
      if (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    loadInstrumentLocations();
  }, [language]);

  const [globalReference, pageContent] = story.content.body;

  const componentIds = [
    "hero-component",
    "two-col-component",
    "links-component",
    "table-component",
    "faq-component",
    "two-col-component-2",
    "teaser-component",
    "lined-card-component",
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
          "ch-de/musikunterricht/gitarrenunterricht",
          "ch-en/music-lessons/guitar-lessons"
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
          mainTitle: "Gitarrenunterricht in der Schweiz",
          teacherTitle: "Unsere qualifizierten Gitarrenlehrer*innen",
          recommendationsTitle: "Empfehlungen unserer Gitarrenschüler*innen",
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Wie weiss ich, dass die Gitarrenlehrer*innen qualifiziert sind?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Alle Gitarrenlehrer*innen von Matchspace Music werden von einer ausgebildeten Musiklehrer*innen geprüft und auf unserer Plattform freigeschalten.",
              },
            },
            {
              "@type": "Question",
              name: "Wieviel kostet der Gitarrenunterricht?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Die Kosten für eine Stunde Unterricht unterscheiden sich von Kanton zu Kanton und beginnen bei ca. CHF 85 bis CHF 115 pro Stunde. Das Abo mit 5 Lektionen ist für Kinder kostet ca. CHF 340 und für Erwachsene ca. CHF 425.",
              },
            },
            {
              "@type": "Question",
              name: "Ab welchem Alter kann man Gitarre spielen lernen?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kinder können Gitarre je nach Entwicklungsstand bereits ab ca. 4 Jahren spielen lernen. Gitarrenunterricht eignet sich ausgezeichnet auch für Jugendliche, Erwachsene und auch Senior*innen bis ins hohe Alter.",
              },
            },
            {
              "@type": "Question",
              name: "Wo findet der Gitarrenunterricht statt?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Unsere Gitarrenlehrpersonen bieten ihren Unterricht in ihrem Studio an, als Hausbesuch, also bei Gitarrenschüler*innen zuhause oder bei Bedarf auch im Online-Unterricht an.",
              },
            },
            {
              "@type": "Question",
              name: "Wie finde ich die passende Gitarrenlehrperson?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Bei Matchspace Music unterrichten hunderte qualifizierte Gitarrenlehrer*innen. Suche nach dem Instrument in deiner Nähe und wähle die Lehrperson, die zu deinen Bedürfnissen passt. Trete in Kontakt und vereinbare die erste Lektion.",
              },
            },
          ],
        }}
      />
    </Layout>
  );
}
export default GitarrenunterrichtPage;
