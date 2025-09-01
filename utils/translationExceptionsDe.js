import { exceptionsGroup1, exceptionsGroup2, exceptionsGroup3 } from '../constants/translationExceptions';

export const instrumentNameDe = (instrumentName) => {
  if (exceptionsGroup1.includes(instrumentName)) {
    return (
      <>
        <span className='capitalize'>{instrumentName}</span>nunterricht
      </>
    );
  }

  if (exceptionsGroup2.includes(instrumentName)) {
    return (
      <>
        <span className='capitalize'>{instrumentName}</span>sunterricht
      </>
    );
  }
  if (exceptionsGroup3.includes(instrumentName)) {
    return (
      <>
        <span className='capitalize'>{instrumentName}</span>unterricht
      </>
    );
  }
  return (
    <>
      <span className='capitalize'>{instrumentName}</span> Unterricht
    </>
  );
};

export const ogTitleDe = (instrumentName) => {
  if (exceptionsGroup1.includes(instrumentName)) {
    return `${instrumentName}nunterricht`;
  }

  if (exceptionsGroup2.includes(instrumentName)) {
    return `${instrumentName}sunterricht`;
  }
  if (exceptionsGroup3.includes(instrumentName)) {
    return `${instrumentName}unterricht`;
  }
  return `${instrumentName} Unterricht`;
};

export const instrumentStundenDe = (instrumentName) => {
  if (exceptionsGroup1.includes(instrumentName)) {
    return (
      <>
        <span className='capitalize'>{instrumentName}</span>nstunden
      </>
    );
  }

  if (exceptionsGroup2.includes(instrumentName)) {
    return (
      <>
        <span className='capitalize'>{instrumentName}</span>stunden
      </>
    );
  }
  if (exceptionsGroup3.includes(instrumentName)) {
    return (
      <>
        <span className='capitalize'>{instrumentName}</span>stunden
      </>
    );
  }
  return (
    <>
      <span className='capitalize'>{instrumentName}</span> Stunden
    </>
  );
};

export const instrumentLehrerDe = (instrumentName) => {
  if (exceptionsGroup1.includes(instrumentName)) {
    return (
      <>
        <span className='capitalize'>{instrumentName}</span>nlehrer*in
      </>
    );
  }

  if (exceptionsGroup2.includes(instrumentName)) {
    return (
      <>
        <span className='capitalize'>{instrumentName}</span>slehrer*in
      </>
    );
  }
  if (exceptionsGroup3.includes(instrumentName)) {
    return (
      <>
        <span className='capitalize'>{instrumentName}</span>ulehrer*in
      </>
    );
  }
  return (
    <>
      <span className='capitalize'>{instrumentName}</span> Lehrer*in
    </>
  );
};
