import React, { forwardRef, useEffect, useRef, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';

import Close from '../icons/close.svg';
import Success from '../icons/chat.svg';
import InstrumentTypeAhead from '../InstrumentTypeAhead';
import { translateENtoDE } from '../../functions/translator';
import { getValidationSchema } from '../../utils/notifyFormValidationSchema';

const ModalContentComponent = dynamic(() => import('../ModalContentComponent'));
const Instrument = dynamic(() => import('../icons/Instrument'));

const NotifyMeForm = forwardRef(({ language, instrument, instruments, location, seoActions }, ref) => {
  const router = useRouter();
  const instrumentInputRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const options = Array.isArray(instruments)
    ? instruments?.map((items) => items)
    : instruments?.hits?.map((items) => items) || [];

  const handleClose = () => {
    ref.current.close();
  };

  const instrumentName = useMemo(() => {
    if (instrument) {
      return [language === 'ch-en' ? instrument?.en : instrument?.de || instrument?.en];
    }

    return [];
  }, [language, instrument]);

  const errorLabels = {
    requiredError: translateENtoDE('Required', language),
    emailError: translateENtoDE('Please enter a valid e-mail address', language),
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      Instrument: instrumentName,
    },
    resolver: yupResolver(getValidationSchema(errorLabels)),
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {
    data.Source = router.asPath;
    data.Location = location;
    let URLparamsFromFormData = Object.entries(data)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');
    fetch(`https://matchspace-music.ch/.netlify/functions/notify?${URLparamsFromFormData}`).then((response) => {
      if (response.status !== 200) {
        reset();
        setSubmitted(false);
        handleClose();
      }
      if (response.status === 200) {
        if (seoActions?.searchNotifyFinish) {
          seoActions?.searchNotifyFinish({
            search_request_id: uuidv4(),
            search_request_zip: `${data.ZIP}`,
            search_request_instrument: `${instrument?.key}`,
          });
        }
        setSubmitted(true);
        reset();
      }
    });
  };

  const handleCancel = () => {
    reset();
    handleClose();
  };

  const handleDialogClose = () => {
    setSubmitted(false);
    ref.current.close();
  };

  useEffect(() => {
    if (instrument) {
      setValue('Instrument', language === 'ch-en' ? [instrument?.en] : [instrument?.de] || '');
    }
  }, [instrument, language, setValue]);

  return submitted ? (
    <div className='relative flex flex-col items-center justify-center w-screen h-screen py-10 text-center px-28 md:w-auto md:h-auto'>
      <button className='absolute top-8 right-8' type='button' onClick={handleDialogClose}>
        <Close />
      </button>
      <Success />
      <h1 className='pt-4 text-24px text-primary'>{translateENtoDE('Search request sent!', language)}</h1>
      <p className='pt-1 text-sm leading-relaxed text-center text-gray-600'>
        {translateENtoDE('Thank you for your message!', language)}
        <br />
        {translateENtoDE('You will hear from us shortly.', language)}
        <br />
      </p>
    </div>
  ) : (
    <ModalContentComponent
      noScroll
      handleClose={handleClose}
      title={translateENtoDE('Tell us more about your search', language)}>
      <div id='notify-me-form-seo' className='notify-me'>
        <form
          name='notify'
          method='post'
          data-netlify='true'
          netlify-honeypot='bot-field'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='relative w-full'>
            <Controller
              name='Instrument'
              control={control}
              render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => {
                const handleChange = (e) => {
                  onChange(e);
                };

                return (
                  <InstrumentTypeAhead
                    name={name}
                    error={error}
                    value={value}
                    onBlur={onBlur}
                    selected={value}
                    options={options}
                    language={language}
                    onChange={handleChange}
                    ref={instrumentInputRef}
                    className='outline-none border-disabled notify'
                    placeholder={translateENtoDE('Select your instrument', language)}
                  />
                );
              }}
            />
            <Instrument />
          </div>
          <input
            name='ZIP'
            {...register('ZIP', { required: true })}
            type='text'
            className='notify-me-input mt-4'
            placeholder={translateENtoDE('Enter your ZIP code', language)}
            inputMode='numeric'
          />
          {errors['FirstName'] && <p className='notify-me-error'>{errors['FirstName']?.message}</p>}
          <div className='notify-me-pair'>
            <div>
              <input
                name='FirstName'
                {...register('FirstName', { required: true })}
                className='notify-me-input mt-4'
                placeholder={translateENtoDE('First name', language)}
                inputMode='search'
                type='text'
              />
              {errors['FirstName'] && <p className='notify-me-error'>{errors['FirstName']?.message}</p>}
            </div>
            <div>
              <input
                name='LastName'
                {...register('LastName')}
                className='notify-me-input mt-4 border-red-600'
                placeholder={translateENtoDE('Last Name', language)}
                inputMode='search'
                type='text'
              />
              {errors['LastName'] && <p className='notify-me-error'>{errors['LastName']?.message}</p>}
            </div>
          </div>
          <input
            name='Email'
            {...register('Email')}
            type='email'
            className='notify-me-input mt-4'
            placeholder={language === 'ch-en' ? 'E-mail address' : 'E-Mail'}
            inputMode='search'
          />
          {errors['Email'] && <p className='ml-3 text-14px text-red'>{errors['Email']?.message}</p>}
          <textarea
            rows='3'
            name='Message'
            inputMode='search'
            {...register('Message')}
            className='notify-me-input mt-4'
            placeholder={translateENtoDE('Leave us a note', language)}
          />
          {errors['Message'] && <p className='notify-me-error'>{errors['Message']?.message}</p>}
          <div className='notify-me-buttons'>
            <button type='button' onClick={handleCancel} className='btn-outline py-3 px-11'>
              {translateENtoDE('CANCEL', language)}
            </button>
            <button type='submit' className='btn-primary bg-primary py-3 px-11 uppercase'>
              {language === 'ch-en' ? 'SUBMIT' : 'SENDEN'}
            </button>
          </div>
        </form>
      </div>
    </ModalContentComponent>
  );
});

NotifyMeForm.displayName = 'NotifyMeForm';

export default NotifyMeForm;
