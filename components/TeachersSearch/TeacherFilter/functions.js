export const getFilterNewList = (form, list, setNewList, onReset) => {
  const isAges = Boolean(form.kids || form.adults);
  const isGenres = Boolean(form?.genres?.length);
  const isLanguages = Boolean(form?.languages?.length);
  const isLocations = Boolean(form.online || form.home || form.studio);
  const isDurations = Boolean(form.min30 || form.min45 || form.min60 || form.min90);
  const isSkills = Boolean(form.beginner || form.intermediate || form.advanced || form.professional);
  const isEmpty = !Object.values(form).filter((item) => !!item)?.length && !isLanguages && !isGenres;
  if (isEmpty) {
    setNewList(list);
  } else {
    let _list = list;

    if (isAges && !isLocations) {
      _list = list.filter((item) => {
        const kids = form.kids ? !!item?.age_taught?.kids : false;
        const adults = form.adults ? !!item?.age_taught?.adults : false;

        return kids || adults || false;
      });
    }

    const locationsList = list.filter((item) => {
      const online = form.online ? !!item?.locations?.online : false;
      const home = form.home
        ? !!item?.locations?.student_place?.address_list?.length && !!item?.locations?.student_place?.checked
        : false;
      const studio = form.studio
        ? (!!item?.locations?.studios?.address_list?.length && !!item?.locations?.studios?.checked) ||
          (!!item?.locations?.teacher_place?.address && !!item?.locations?.teacher_place?.checked)
        : false;

      return home || studio || online || false;
    });

    if (isLocations && !isAges) {
      _list = locationsList;
    }
    if (isLocations && isAges) {
      _list = locationsList.filter((item) => {
        const kids = form.kids ? !!item?.age_taught?.kids : false;
        const adults = form.adults ? !!item?.age_taught?.adults : false;

        return kids || adults || false;
      });
    }
    if (isSkills) {
      const listForSkills = _list?.length ? _list : list;

      _list = listForSkills.filter((item) => {
        const beginner = form.beginner ? !!item?.skill_levels_taught?.includes('beginner') : false;
        const intermediate = form.intermediate ? !!item?.skill_levels_taught?.includes('intermediate') : false;
        const advanced = form.advanced ? !!item?.skill_levels_taught?.includes('advanced') : false;
        const professional = form.professional ? !!item?.skill_levels_taught?.includes('professional') : false;

        return beginner || intermediate || advanced || professional || false;
      });
    }
    if (isDurations) {
      const listForDurations = _list?.length ? _list : list;

      _list = listForDurations.filter((item) => {
        const min30 = form.min30 ? !!item?.pricing?.duration_30 : false;
        const min45 = form.min45 ? !!item?.pricing?.duration_45 : false;
        const min60 = form.min60 ? !!item?.pricing?.duration_60 : false;
        const min90 = form.min90 ? !!item?.pricing?.duration_90 : false;

        return min30 || min45 || min60 || min90 || false;
      });
    }
    if (isLanguages) {
      const listForLanguages = _list?.length ? _list : list;

      _list = listForLanguages.filter((item) => {
        const langs = item?.languages?.map((lang) => lang?.key);

        return !!langs?.filter((lang) => form?.languages?.includes(lang))?.length;
      });
    }
    if (isGenres) {
      const listForGenres = _list?.length ? _list : list;

      _list = listForGenres.filter((item) => {
        const genres = item?.genres?.map((genre) => genre?.key);

        return !!genres?.filter((genre) => form?.genres?.includes(genre))?.length;
      });
    }
    setNewList(_list);
  }
};
