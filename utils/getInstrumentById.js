export const getInstrumentById = (instruments, instrumentKey, language) => {
  return instruments.find((hit) => {
    return hit[language]?.toLowerCase() === instrumentKey;
  });
};
