import cx from 'classnames';
import { isEmpty } from 'ramda';
import { forwardRef, useState, useMemo } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Styles from '../styles/search.module.scss';

const synonyms = {
  vocal: ['singing', 'vocal'],
  singing: ['singing', 'vocal'],
};

const InstrumentTypeAhead = forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (query) => {
    setInputValue(inputValue);
    if (!query) setInputValue('');
  };

  const language = props?.language?.split(/[-]+/).pop();
  const inputProps = {
    value: inputValue,
    inputMode: 'search',
    className: cx(`typeahead data-hj-whitelist ${props?.error?.message ? 'typeahead-error' : ''}`, props.className),
  };

  const loadInstrumentOptions = async (value) => {
    setInputValue(value);
  };

  const handleBlur = () => {
    if (isEmpty(ref.current?.state?.selected) || isEmpty(props.value)) {
      ref.current?.clear();
    }
    if (ref.current?.state?.initialItem) {
      props.onChange([ref.current?.state?.initialItem[language]]);
    }
    ref.current?.hideMenu();
  };

  const handleChange = (e) => {
    const currentValue = Array.isArray(e) && !isEmpty(e) && e[0][language];
    props.onChange(currentValue ? [currentValue] : []);
  };

  const handleKeyDown = (e) => {
    if (['Enter'].includes(e.key)) {
      if (ref.current?.state?.initialItem) {
        ref.current.state.selected = [ref.current?.state?.initialItem];
        handleChange([ref.current?.state?.initialItem]);
      }
      ref.current?.hideMenu();
    }
  };

  const handleFocus = () => {
    if (isEmpty(ref.current?.state?.selected)) ref.current?.hideMenu();
  };

  const filterBy = () => true;
  const handleSearch = (e) => {
    loadInstrumentOptions(e);
  };

  const emptyLabel = language === 'en' ? 'No matches found' : 'Keine Ergebnisse gefunden.';

  const instrumentOptions = useMemo(() => {
    const data = props?.options || [];

    if (inputValue) {
      const search = inputValue.trim().toLowerCase();

      const filtered = data?.filter((item) => {
        const key = item?.key || '';
        const keys = synonyms[key] || [key];
        const name = `${item[language] || ''}`.trim().toLowerCase();

        return name.includes(search) || keys.join(' ').includes(search);
      });

      return filtered?.length ? filtered : data;
    }

    return data;
  }, [props?.options, language, inputValue]);
  return (
    <AsyncTypeahead
      ref={ref}
      minLength={0}
      paginate={false}
      useCache={false}
      autoFocus={false}
      isLoading={false}
      name={props.name}
      filterBy={filterBy}
      labelKey={language}
      onBlur={handleBlur}
      value={props?.value}
      onFocus={handleFocus}
      inputProps={inputProps}
      onChange={handleChange}
      onSearch={handleSearch}
      emptyLabel={emptyLabel}
      onKeyDown={handleKeyDown}
      highlightOnlyResult={true}
      onInputChange={onInputChange}
      id={`${Styles['instrument']}`}
      options={instrumentOptions || []}
      defaultSelected={props?.value || [props?.default_instrument_selected] || []}
      placeholder={props?.error?.message || props.placeholder}
    />
  );
});

InstrumentTypeAhead.displayName = 'InstrumentTypeAhead';

export default InstrumentTypeAhead;
