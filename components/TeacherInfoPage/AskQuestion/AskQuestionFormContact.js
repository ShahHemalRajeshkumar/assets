import cx from 'classnames';
import Bugsnag from '@bugsnag/js';
import { useState, useMemo, useCallback } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { translateENtoDE } from '../../../functions/translator';
import ExternalLinkIcon from '../../icons/ExternalLink.svg';
import ChevronLeft from '../../icons/ChevronLeft.svg';
import AskInput from './AskInput';

const AskQuestionFormContact = ({ form, errorMsg, language, isLoading, onSubmit, onBack, seoActions }) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;
  const [checked, setChecked] = useState(false);

  const phoneNumber = watch('phoneNumber');
  const phoneNumberError = errors['phoneNumber'];
  const submitCount = form?.formState?.submitCount;
  const phoneTouched = form?.formState?.touchedFields?.phoneNumber;

  const onChangeCheckbox = () => {
    setChecked(!checked);
  };

  // For next.js contact form (cookies)
  const cookies = useMemo(() => {
    const data = {};

    document?.cookie?.split(';')?.map((item) => {
      const split = String(item || '')
        .trim()
        .split('=');
      data[split[0]] = split[1];
      return item;
    });

    return data;
  }, []);

  const onFormSubmit = useCallback(
    (values) => {
      onSubmit(values);

      if (seoActions?.contactFinish) {
        seoActions?.contactFinish();

        // For next.js contact form (fetch)
        fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY5MDYzMTA0M2M1MjY5NTUzMTUxM2Ii_pc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gclValue: cookies['_gcl_aw'] || '-',
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log('Webhook Success:', data))
          .catch((error) => {
            Bugsnag.notify(error);
            console.error('Webhook Error:', error);
          });
      }
    },
    [cookies, onSubmit, seoActions]
  );

  const phoneError = useMemo(() => {
    if (!isValidPhoneNumber(phoneNumber || '')) {
      if (submitCount || phoneTouched || phoneNumberError?.message) {
        return { type: 'phoneNumber' };
      }
    }

    return null;
  }, [phoneNumber, submitCount, phoneNumberError, phoneTouched]);

  const termsLink = useMemo(() => {
    if (language === 'ch-de') {
      return 'https://www.blog.matchspace-music.ch/post/unterrichtsbedingungen-von-matchspace-music';
    }

    return 'https://www.blog.matchspace-music.ch/en/post/terms-and-conditions-of-matchspace-music';
  }, [language]);

  return (
    <form id='contact-teacher-modal-form' className='teacher-ask-form' onSubmit={handleSubmit(onFormSubmit)}>
      <div className='p-3 sm:p-5'>
        <p className='mb-3 text-16px text-gray-500'>
          {translateENtoDE(
            'Your contact details are required so that the teacher can respond to your request.',
            language
          )}
        </p>
        <div className='grid grid-col-1 sm:grid-cols-2 gap-2 mb-3'>
          <AskInput
            id='firstName'
            required={true}
            language={language}
            value={watch('firstName')}
            error={errors['firstName']}
            label={translateENtoDE('First name', language)}
            register={register('firstName', { required: true })}
          />
          <AskInput
            id='lastName'
            required={true}
            language={language}
            value={watch('lastName')}
            error={errors['lastName']}
            label={translateENtoDE('Last Name', language)}
            register={register('lastName', { required: true })}
          />
        </div>
        <div className='mb-3'>
          <AskInput
            id='email'
            required={true}
            language={language}
            value={watch('email')}
            error={errors['email']}
            label={translateENtoDE('Email', language)}
            register={register('email', { required: true })}
          />
        </div>
        <div className='mb-3'>
          <AskInput
            id='phoneNumber'
            required={true}
            type='phoneNumber'
            error={phoneError}
            language={language}
            value={watch('phoneNumber')}
            label={translateENtoDE('Mobile number', language)}
            register={{
              ...register('phoneNumber', { required: true }),
              onChange: (value) => setValue('phoneNumber', value),
            }}
          />
        </div>
        <AskInput
          id='postcode'
          required={true}
          language={language}
          value={watch('postcode')}
          error={errors['postcode']}
          label={translateENtoDE('Zip', language)}
          register={register('postcode', { required: true })}
        />
        <div className='flex items-center mt-4'>
          <input
            name='agree'
            type='checkbox'
            checked={checked}
            id='checkbox-terms'
            onChange={onChangeCheckbox}
            className='ask-checkbox mr-3'
          />
          <label htmlFor='checkbox-terms' className='flex items-center cursor-pointer'>
            <p className='text-14px mr-1 text-gray-600'>{translateENtoDE('I accept the', language)}</p>
            <a
              target='_blank'
              href={termsLink}
              rel='noopener noreferrer'
              className='flex items-center text-14px font-bold text-primary'>
              {translateENtoDE('terms & conditions', language)}
              <ExternalLinkIcon className='ml-1' />
            </a>
          </label>
        </div>
        <div>{!!errorMsg && <div className='text-16px mt-3 text-rose-600'>{errorMsg}</div>}</div>
      </div>
      <div className='teacher-ask-form_top-border p-3 sm:p-5 flex justify-between'>
        <button
          type='button'
          onClick={onBack}
          className='flex items-center uppercase text-primary text-14px font-medium hover:text-dark-primary'>
          <ChevronLeft className='mr-2' />
          {translateENtoDE('Back', language)}
        </button>
        <button
          type='submit'
          disabled={isLoading}
          className={cx('btn-primary uppercase bg-primary cursor-pointer', {
            'opacity-60 cursor-default hover:bg-primary': !checked,
          })}>
          {translateENtoDE('Send', language)}
        </button>
      </div>
    </form>
  );
};

export default AskQuestionFormContact;
