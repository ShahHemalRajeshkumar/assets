import { useState, useMemo } from 'react';

const defaultValues = {
  // Student age
  kids: false,
  adults: false,
  // Location
  home: false,
  online: false,
  studio: false,
  // Lesson duration
  min30: false,
  min45: false,
  min60: false,
  min90: false,
  // Skill level
  beginner: false,
  advanced: false,
  intermediate: false,
  professional: false,
  // Languages
  languages: [],
  // Genres
  genres: [],
};

const useSearchFilter = () => {
  const [form, setForm] = useState(defaultValues);

  const onReset = () => setForm(defaultValues);

  const setValue = (key, value) => {
    setForm((values) => ({ ...values, [key]: value }));
  };

  const setValues = (values) => setForm(values);

  const isActive = useMemo(
    () => Object.values(form).includes(true) || !!form?.languages?.length || !!form?.genres?.length,
    [form]
  );

  return { form, onReset, setValue, setValues, isActive };
};

export default useSearchFilter;
