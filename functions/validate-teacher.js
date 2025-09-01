const algoliasearch = require('algoliasearch/lite');

const searchClient = algoliasearch(
  process.env.ALGOLIA_SEARCHAPPID,
  process.env.ALGOLIA_SEARCHAPIKEY
);

const teachers = searchClient.initIndex(process.env.ALGOLIA_TEACHERINDEX);

const validateTeacherName = async (teacherName) => {
  try {
    const teachersData = await teachers.search(teacherName);
    return !!teachersData?.hits.length;
  } catch (error) {
    console.error('Error fetching valid teacher names:', error);
    return false;
  }
};

exports.handler = async (event, context) => {
  const teacherName = event.path;

  // Determine the user's language based on the Accept-Language header
  const acceptLanguage = event.headers['accept-language'];
  const isGerman = acceptLanguage && acceptLanguage.includes('de')
  const lang = isGerman ? 'ch-de' : 'ch-en';

  if (!/^(_next|static|api)/.test(teacherName)) {
    const isValidTeacher = await validateTeacherName(teacherName);

    if (isValidTeacher) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isValidTeacher: true }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ isValidTeacher: false }),
      };
    }
  } else {
    // if path matches these conditions, you probably don't want to process it here
    return {
      statusCode: 400,
      body: 'Invalid path'
    }
  }
};