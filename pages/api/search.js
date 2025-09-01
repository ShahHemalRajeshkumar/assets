import axios from 'axios';

import { getAllChannableData } from '@/utils/getAllChannableData';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { language = '', locality = '', instrument = '', currentPage = '', numPages = '' } = req.query;

  const JOBS_PER_PAGE = 15;

  try {
    const channableData = await getAllChannableData();

    const filteredByLanguage = channableData?.filter((job) => job.language_id === language);

    const results = filteredByLanguage.filter(
      ({ location_locality, instrument_name }) =>
        location_locality.trim().toLowerCase().indexOf(locality) != -1 &&
        instrument_name.trim().toLowerCase().indexOf(instrument) != -1
    );
    const instrumentNames = [...new Set(filteredByLanguage.map((jobOffer) => jobOffer.instrument_name))];

    const numPages = Math.ceil(results.length / JOBS_PER_PAGE);
    const pageIndex = currentPage - 1;
    const orderedJobs = results.slice(pageIndex * JOBS_PER_PAGE, (pageIndex + 1) * JOBS_PER_PAGE);

    res.status(200).json(JSON.stringify({ results: orderedJobs, numPages, instrumentNames }));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data.' });
  }
};
