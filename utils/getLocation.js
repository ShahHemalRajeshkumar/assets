import axios from 'axios';

export const replaceAccents = (str) => {
  const accentMap = {
    á: 'a',
    à: 'a',
    â: 'a',
    ä: 'a',
    ã: 'a',
    å: 'a',
    æ: 'ae',
    é: 'e',
    è: 'e',
    ê: 'e',
    ë: 'e',
    í: 'i',
    ì: 'i',
    î: 'i',
    ï: 'i',
    ó: 'o',
    ò: 'o',
    ô: 'o',
    ö: 'o',
    õ: 'o',
    ø: 'o',
    ú: 'u',
    ù: 'u',
    û: 'u',
    ü: 'u',
    ý: 'y',
    ÿ: 'y',
    ç: 'c',
    ñ: 'n',
    ß: 'ss',
  };

  return `${str || ''}`
    .toLowerCase()
    .split('')
    .map((char) => accentMap[char] || char)
    .join('');
};

export const getLocation = async (query, mapboxToken, isFullData) => {
  try {
    const language = query.language === 'ch-de' ? 'de' : 'en';
    const location = replaceAccents(query.location.replaceAll('+', '%2F') || '');

    const resp = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?fuzzyMatch=false&language=${language}&limit=5&types=country,district,postcode,place,locality&access_token=${mapboxToken}`
    );

    if (isFullData) {
      return resp.data.features[0];
    }

    return resp.data.features[0]?.center.reverse().join(',');
  } catch (err) {
    console.error(err);
  }
};
