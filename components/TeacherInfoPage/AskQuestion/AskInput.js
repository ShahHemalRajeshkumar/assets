import cx from 'classnames';
import { useState, useMemo } from 'react';
import PhoneInput from 'react-phone-number-input';
import EN from 'react-phone-number-input/locale/en.json';
import DE from 'react-phone-number-input/locale/de.json';
import { translateENtoDE } from '../../../functions/translator';

const AskInput = ({
  id,
  label,
  error,
  required,
  register,
  language,
  maxLength,
  onKeyboard,
  value = '',
  type = 'input',
  textAreaBlock,
  isTextareaBlock,
  placeholder = '',
}) => {
  const [isBlur, setIsBlur] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsBlur(false);
    setIsFocus(true);

    if (onKeyboard) onKeyboard(true);
    document?.style?.setProperty('--height-svh', '100svh');
  };

  const onBlur = async (event) => {
    setIsBlur(true);
    setIsFocus(false);

    document?.style?.setProperty('--height-svh', '100svh');
    if (onKeyboard) onKeyboard(false);
    if (register?.onBlur) await register?.onBlur(event);
  };

  const isLimit = useMemo(() => maxLength && value && value?.length > maxLength, [value, maxLength]);

  const errorText = useMemo(() => {
    if (!error && !isLimit) return <div />;

    return (
      <div className='text-12px text-rose-600'>
        {!value && error?.type === 'required' && translateENtoDE('Required', language)}
        {error?.type === 'email' && translateENtoDE('Invalid email', language)}
        {error?.type === 'phoneNumber' && translateENtoDE('Invalid mobile number', language)}
        {error?.type === 'maxLength' && translateENtoDE('Maximum of 300 characters exceeded', language)}
        {isLimit && translateENtoDE('Character limit exceeded', language)}
      </div>
    );
  }, [error, value, isLimit, language]);

  const counterText = useMemo(() => {
    if (!maxLength) return <div />;

    return (
      <p
        className={cx('mt-1 text-rose-600 text-12px text-right', {
          'text-gray-400': value.length <= +maxLength,
        })}>{`${value?.length}/${maxLength}`}</p>
    );
  }, [value, maxLength]);

  const isError = useMemo(() => {
    if (!value && error?.type === 'required') return true;

    return value && !!error?.type && error?.type !== 'required';
  }, [error, value]);

  const wrapClasses = cx('ask-input-wrapper', {
    'ask-input-wrapper-error': !!isError,
    'ask-input-wrapper-textarea': !!isTextareaBlock,
  });

  if (type === 'textarea') {
    return (
      <div>
        <div
          className={cx({
            'ask-input-textarea-wrapper': isTextareaBlock,
            'border-[#e11d48_!important]': !!isError || !!isLimit,
          })}>
          <label htmlFor={id}>
            <div className={wrapClasses}>
              <div className='flex mt-3 ml-[16px]'>
                {!isTextareaBlock && !!required && <p className='ask-input-required'>*</p>}
                {!!label && (
                  <p
                    className={cx('ask-input-label', {
                      'ask-input-label-area': isTextareaBlock,
                    })}>
                    {label}
                  </p>
                )}
              </div>
              <textarea
                id={id}
                {...register}
                data-hj-allow
                onBlur={onBlur}
                onFocus={onFocus}
                placeholder={placeholder}
                className={cx('ask-input', {
                  'ask-input-textarea': type === 'textarea',
                  'ask-input-textarea-form': isTextareaBlock,
                })}
              />
              {!!isTextareaBlock && (
                <div className='flex mb-[4px] ml-[16px]'>
                  <p
                    className={cx('ask-input-label', {
                      'ask-input-label-area': isTextareaBlock,
                    })}>
                    {translateENtoDE('Thank you and best regards.', language)}
                  </p>
                </div>
              )}
            </div>
          </label>
          {textAreaBlock}
        </div>
        <div className='flex justify-between mt-2'>
          {errorText}
          {counterText}
        </div>
      </div>
    );
  }

  if (type === 'phoneNumber') {
    return (
      <div>
        <label htmlFor={id}>
          <div className={wrapClasses}>
            <div
              className={cx('ask-input-label-wrap', {
                'ask-input-label-wrap-focus': (isFocus && !isBlur) || !!value,
              })}>
              {!!required && <p className='ask-input-required'>*</p>}
              {!!label && <p className='ask-input-label'>{label}</p>}
            </div>
            <PhoneInput
              id={id}
              {...register}
              international
              data-hj-allow
              onBlur={onBlur}
              onFocus={onFocus}
              defaultCountry='CH'
              countryCallingCodeEditable={false}
              labels={language === 'ch-de' ? DE : EN}
              className={cx('ask-input', {
                'ask-input-focus': (type !== 'textarea' && isFocus) || !!value,
              })}
            />
          </div>
        </label>
        {!!error && <div className='mt-1 mb-1'>{errorText}</div>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id}>
        <div className={wrapClasses}>
          <div
            className={cx('ask-input-label-wrap', {
              'ask-input-label-wrap-focus': (isFocus && !isBlur) || !!value,
            })}>
            {!!required && <p className='ask-input-required'>*</p>}
            {!!label && <p className='ask-input-label'>{label}</p>}
          </div>
          <input
            id={id}
            type='text'
            {...register}
            data-hj-allow
            onBlur={onBlur}
            onFocus={onFocus}
            className={cx('ask-input', {
              'ask-input-focus': (type !== 'textarea' && isFocus) || !!value,
            })}
          />
        </div>
      </label>
      {!!error && <div className='mt-1 mb-1'>{errorText}</div>}
    </div>
  );
};

export default AskInput;
