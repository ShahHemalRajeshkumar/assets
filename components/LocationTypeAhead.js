import React, { forwardRef, useEffect, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { isEmpty } from 'ramda';
import axios from 'axios';

import Styles from '../styles/search.module.scss';

const mapboxToken = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const LocationTypeAhead = forwardRef((props, ref) => {
  const { language, setOptionsSelectedContext } = props;
  const emptyLabel = language === 'ch-en' ? 'No matches found' : 'Keine Ergebnisse gefunden.';

  const [options, setOptions] = useState([]);
  const [locationIndex, setLocationIndex] = useState(-1);

  const lang = language.split(/[-]+/).pop();

  const loadLocationOptions = (input = '') =>
    new Promise(() => {
      setLocationIndex(-1);
      if (input !== '' && input?.length > 0) {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?fuzzyMatch=false&language=${lang}&country=ch,de,fr&bbox=5.413647,45.652619,10.643139,48.136929&types=country,district,postcode,locality,place,neighborhood&access_token=${mapboxToken}`
          )
          .then((res) => {
            setOptions(res?.data?.features || []);
          });
      }
    });

  const filterBy = () => true;
  const handleSearch = (e) => loadLocationOptions(e);

  const inputProps = {
    className: `typeahead data-hj-whitelist ${props.error?.message ? 'typeahead-error' : ''}`,
    inputMode: 'search',
  };

  const handleBlur = () => {
    if (!isEmpty(ref.current?.state?.selected)) {
      const selectedValue =
        language === 'ch-en'
          ? ref.current?.state?.selected[0]?.place_name
          : ref.current?.state?.selected[0]?.place_name_de;
      setOptionsSelectedContext(ref.current?.state?.selected[0] || ref.current?.state?.initialItem);
      selectedValue && props.onChange([selectedValue]);
    }

    if (isEmpty(props.value)) ref.current?.clear();
  };

  const handleChange = (e) => {
    const currentValue =
      Array.isArray(e) && !isEmpty(e) && language === 'ch-en' ? e[0]?.place_name : e[0]?.place_name_de;
    setOptionsSelectedContext(ref.current?.state?.selected[0]);
    currentValue ? props.onChange([currentValue]) : props.onChange([]);
  };

  const handleEnterKeyDown = () => {
    const state = ref.current?.state;
    if (state) {
      const newItem = state?.activeItem || state?.initialItem || state?.selected[0];

      if (newItem) {
        const selectedValue = language === 'ch-en' ? newItem?.place_name : newItem?.place_name_de;
        ref.current.state.selected = [newItem];

        setOptionsSelectedContext(newItem);
        props.onChange([selectedValue]);
      } else {
        ref.current?.clear();
        props.onChange([]);
      }
    }

    ref.current?.hideMenu();
  };

  const handleArrowKeyDown = (e) => {
    let index = locationIndex;
    e === 'ArrowDown' ? (index = index + 1) : (index = index - 1);
    index < 0 && (index = options.length + index);
    index >= options.length && (index = -1);

    if (index > -1 && index < options.length) {
      let element = options[index];
      setOptionsSelectedContext(element);
    }
    setLocationIndex(index);
  };

  const handleKeyDown = (e) => {
    if (['Enter'].includes(e.key)) handleEnterKeyDown();
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) handleArrowKeyDown(e.key);
  };

  const handleFocus = () => {
    if (isEmpty(ref.current?.state?.selected)) ref.current?.hideMenu();
  };

  const labelKey = language === 'ch-en' ? 'place_name' : 'place_name_de';

  useEffect(() => {
    props?.value && loadLocationOptions(props?.value || '');
  }, []);

  return (
    <AsyncTypeahead
      ref={ref}
      minLength={0}
      useCache={false}
      paginate={false}
      autoFocus={false}
      isLoading={false}
      name={props.name}
      filterBy={filterBy}
      labelKey={labelKey}
      onBlur={handleBlur}
      onFocus={handleFocus}
      options={options || []}
      inputProps={inputProps}
      onChange={handleChange}
      onSearch={handleSearch}
      emptyLabel={emptyLabel}
      onKeyDown={handleKeyDown}
      highlightOnlyResult={true}
      id={`${Styles['location']}`}
      defaultSelected={props.value || []}
      placeholder={props?.error?.message || props.placeholder}
    />
  );
});

LocationTypeAhead.displayName = 'LocationTypeAhead';

export default LocationTypeAhead;
