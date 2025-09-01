import cx from 'classnames';
import { useMemo, useState, useRef, useCallback } from 'react';
import { translateENtoDE } from '../../../functions/translator';
import useOutsideClick from '../../../hooks/useOutsideClick';
import ChevronLeftIcon from '../../icons/ChevronLeft.svg';

const TeacherConfiguratorSelect = ({ name, value, label, error, disabled, language, options = [], onChange }) => {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(false);
  useOutsideClick(wrap, () => setVisible(false));

  const toggle = useCallback(() => {
    if (!disabled) setVisible(!visible);
  }, [visible, disabled]);

  const selectHandle = useCallback(
    (value) => {
      onChange(value || '');
      setVisible(false);
    },
    [onChange]
  );

  const currentValue = useMemo(() => {
    if (!value) return {};

    return options.filter((item) => item.value === value)[0];
  }, [value, options]);

  const optionsList = useMemo(() => {
    if (!visible) return null;
    return (
      <div className='configurator-select-options'>
        {options.map((item) => (
          <div
            key={item.value}
            data-test={`configurator-${name}-${item.value}`}
            className={cx('configurator-select-option', {
              'configurator-select-option-selected': currentValue?.value === item.value,
            })}
            onClick={() => selectHandle(item.value)}>
            {item.label}
          </div>
        ))}
      </div>
    );
  }, [visible, currentValue, name, options, selectHandle]);

  return (
    <div
      ref={wrap}
      onClick={toggle}
      data-test={`configurator-${name}`}
      className={cx('configurator-select select-none', { 'configurator-select-disabled': disabled })}>
      <p
        className={cx('configurator-select-label', {
          'configurator-select-label-error': !!error && !currentValue?.label,
        })}>
        {label}
      </p>
      <p
        className={cx('configurator-select-value text-14px font-medium', {
          'configurator-select-value-empty': !currentValue?.label,
          'configurator-select-label-error': !!error && !currentValue?.label,
        })}>
        {currentValue?.label || translateENtoDE('Choose an option', language)}
      </p>
      <ChevronLeftIcon
        color='#21697C'
        className={cx('configurator-select-icon transform duration-300 -rotate-90', {
          'rotate-90': visible,
        })}
      />
      {optionsList}
    </div>
  );
};

export default TeacherConfiguratorSelect;
