import { translateENtoDE } from '../../../../functions/translator';

export const getChatVariants = ({ language, instruments = [] }) => ({
  1: {
    id: 1,
    text: translateENtoDE('My desired instrument is', language),
    level2: instruments?.map((item) => `${item}.`),
  },
  2: {
    id: 2,
    text: translateENtoDE('The person who will take lessons is', language),
    level2: [
      translateENtoDE('myself.', language),
      translateENtoDE('my child.', language),
      translateENtoDE('somebody else.', language),
    ],
  },
  3: {
    id: 3,
    text: translateENtoDE('Preferred location is/are', language),
    level2: [
      translateENtoDE('at your studio.', language),
      translateENtoDE('at my home.', language),
      translateENtoDE('live-online.', language),
      translateENtoDE('in specific location(s):', language),
      translateENtoDE('flexible.', language),
    ],
  },
  4: {
    id: 4,
    text: translateENtoDE('My skill level is', language),
    level2: [
      translateENtoDE('beginner.', language),
      translateENtoDE('advanced.', language),
      translateENtoDE('professional.', language),
    ],
  },
  5: {
    id: 5,
    text: translateENtoDE('My availability is', language),
    level2: [
      translateENtoDE('quite flexible.', language),
      translateENtoDE('on specific days during the week.', language),
      translateENtoDE('not defined yet.', language),
      translateENtoDE('irregular.', language),
    ],
  },
  6: {
    id: 6,
    text: translateENtoDE('Preferred lesson hours are', language),
    level2: [
      translateENtoDE('in the morning.', language),
      translateENtoDE('over lunch.', language),
      translateENtoDE('in the afternoon.', language),
      translateENtoDE('in the evening.', language),
      translateENtoDE('quite flexible.', language),
      translateENtoDE('at specific times: ', language),
    ],
  },
  7: {
    id: 7,
    text: translateENtoDE('The ideal start date is', language),
    level2: [
      translateENtoDE('as soon as possible.', language),
      translateENtoDE('in a few weeks.', language),
      translateENtoDE('in a specific month.', language),
      translateENtoDE('on a specific day:', language),
    ],
  },
  8: {
    id: 8,
    text: translateENtoDE('Preferred lesson frequency is', language),
    level2: [
      translateENtoDE('once a week.', language),
      translateENtoDE('once every two weeks.', language),
      translateENtoDE('once a month.', language),
      translateENtoDE('flexibly agreed.', language),
    ],
  },
  9: {
    id: 9, // (12)
    text: translateENtoDE('Favorite genre is', language),
    level2: [
      translateENtoDE('classical.', language),
      translateENtoDE('pop & rock.', language),
      translateENtoDE('jazz.', language),
      translateENtoDE('folk.', language),
      translateENtoDE('various.', language),
      translateENtoDE('as followed:', language),
    ],
  },
  10: {
    id: 10, // (11)
    text: translateENtoDE('The learning objective is', language),
    level2: [
      translateENtoDE('to learn something new.', language),
      translateENtoDE('to improve my current skills.', language),
      translateENtoDE('to become a pro.', language),
      translateENtoDE('to prepare for an exam.', language),
      translateENtoDE('as followed:', language),
    ],
  },
  11: {
    id: 11, // (9)
    text: translateENtoDE('Preferred lesson duration is', language),
    level2: [
      translateENtoDE('30 minutes.', language),
      translateENtoDE('45 minutes.', language),
      translateENtoDE('60 minutes.', language),
      translateENtoDE('90 minutes.', language),
      translateENtoDE('not yet defined.', language),
    ],
  },
  12: {
    id: 12, // (10)
    text: translateENtoDE('Preferred subscription size is', language),
    level2: [
      translateENtoDE('5 lessons.', language),
      translateENtoDE('10 lessons.', language),
      translateENtoDE('20 lessons.', language),
      translateENtoDE('not yet defined.', language),
    ],
  },
  13: {
    id: 13,
    text: translateENtoDE('The instrument to be used is', language),
    level2: [
      translateENtoDE('is available.', language),
      translateENtoDE('is soon available.', language),
      translateENtoDE('is not available. I need support.', language),
    ],
  },
});
