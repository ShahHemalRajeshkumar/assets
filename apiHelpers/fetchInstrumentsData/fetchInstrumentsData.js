export const fetchInstrumentsData = async (instrumentsIndex) => {
  const instrumentsData = await instrumentsIndex.search('', {
    hitsPerPage: 300,
  });
  return instrumentsData.hits.map((item) => ({
    de: item.de,
    en: item.en,
    id: item.id,
    key: item.key,
  }));
};
