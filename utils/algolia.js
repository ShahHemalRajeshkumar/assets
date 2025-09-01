const INDEX = process.env.ALGOLIA_TEACHERINDEX;

export const getAlgoliaData = async ({ id, type }) => {
  let key = ``;
  let path = ``;
  const isProd = INDEX?.includes('ms_');
  const url = isProd ? 'https://app.matchspace-music.ch' : 'https://staging.matchspace.click';

  if (type === 'courses' && id) {
    key = 'course_lists';
    path = `course_ms/courses/${id}`;
  }
  if (type === 'likes' && id) {
    key = 'recommendations';
    path = `course_ms/recommendations/list/${id}`;
  }
  if (type === 'instruments') {
    key = id ? 'music_instrument' : 'music_instruments';
    path = `course_ms/instruments${id ? `/${id}` : ''}`;
  }

  try {
    const response = await fetch(`${url}/api/v1/${path}`, {
      method: 'POST',
      headers: {
        'X-TENANT-ID': 'matchspace',
        'Content-Type': 'application/json',
      },
    });

    const parsed = await response?.json();

    return { data: [...(parsed ? parsed[key] : [] || [])] };
  } catch (error) {
    return { data: [], error: error?.message };
  }
};

export const getTeacherInfo = async (username) => {
  const isProd = INDEX?.includes('ms_');
  const url = isProd ? 'https://app.matchspace-music.ch' : 'https://staging.matchspace.click';

  try {
    if (username) {
      const response = await fetch(`${url}/api/v1/auth_ms/teacher/show_uuid`, {
        method: 'POST',
        headers: {
          'X-TENANT-ID': 'matchspace',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response?.json();

      if (data?.uuid) {
        const teacherResponse = await fetch(`${url}/api/v1/auth_ms/teacher/show`, {
          method: 'POST',
          headers: {
            'X-TENANT-ID': 'matchspace',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uuid: data?.uuid }),
        });
        const teacherData = await teacherResponse?.json();

        return teacherData?.teacher;
      }

      return null;
    }

    return null;
  } catch (error) {
    return null;
  }
};
