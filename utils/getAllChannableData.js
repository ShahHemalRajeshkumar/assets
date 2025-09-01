import axios from 'axios';

const CHANNABLE_URL =
  'https://files.channable.com/o1gdsGohV1o3tJeG6oeEPA==.json';

export async function getAllChannableData() {
  try {
    const { data } = await axios.get(CHANNABLE_URL);
    return data;
  } catch (error) {
    return error;
  }
}
