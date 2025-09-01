import * as yup from 'yup';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useCallback } from 'react';
import { translateENtoDE } from '../../../../functions/translator';
import ChevronLeft from '../../../icons/ChevronLeft.svg';
import CloseIcon from '../../../icons/close.svg';
import AskInput from '../AskInput';

const LATER_URL = process.env.PABBLY_CONTACT_LATER_URL;

const AskQuestionFormLater = ({
  onBack,
  message,
  teacher,
  errorMsg,
  language,
  isLoading,
  seoActions,
  setErrorMsg,
  setVisibleLater,
  setIsSuccessLater,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required(translateENtoDE('Required', language)),
        email: yup
          .string()
          .email(translateENtoDE('Invalid e-mail', language))
          .required(translateENtoDE('Required', language)),
      })
    ),
  });

  useEffect(() => {
    setErrorMsg('');
  }, [setErrorMsg]);

  const onFormSubmit = useCallback(
    async (values) => {
      setLoading(true);

      const pageUrl = window.location.href || '';
      const ageTaught = teacher?.age_taught || {};
      const instruments = teacher?.instruments || [];

      const [firstName, lastName] = `${teacher?.name || ''}`.split(' ');

      const body = {
        timestamp: +new Date(),
        teacher_page_url: pageUrl,
        email: values?.email || '',
        incomplete_message: message,
        teacher_last_name: lastName,
        teacher_first_name: firstName,
        first_name: values?.firstName || '',
        teacher_about_us: teacher?.about_me || '',
        teacher_instruments: instruments?.map((item) => item?.key),
        teacher_later_url: `${pageUrl}${pageUrl.includes('?') ? '&' : '?'}contact=true`,
        teacher_age_categories: Object.keys(ageTaught).filter((key) => !!ageTaught[key]),
      };

      const requestParams = {
        method: 'POST',
        body: JSON.stringify({
          body,
          url: LATER_URL,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await fetch('/api/proxy', requestParams)
        .then((res) => res.json())
        .then(() => {
          setIsSuccessLater(true);
          setVisibleLater();
        })
        .catch(async () => await fetch('/api/proxy', requestParams).then((res) => res.json()))
        .finally(() => {
          seoActions?.messageLater();
          setLoading(false);
        });
    },
    [seoActions, message, teacher, setVisibleLater, setIsSuccessLater]
  );

  return (
    <div className='teacher-page-popup-screen ask-delete-popup scrollbar-invisible'>
      <div className='teacher-page-popup teacher-page-ask-popup'>
        <div className='teacher-page-popup-head'>
          <p className='text-20px font-bold'>{translateENtoDE('Complete later', language)}</p>
          <div className='ml-5 cursor-pointer' onClick={onBack}>
            <CloseIcon color='#424953' />
          </div>
        </div>
        <div className='p-3 sm:p-5'>
          <p className='text-16px text-gray-500 mb-4'>
            {language === 'ch-de'
              ? 'Sende die unvollständige Anfrage an deine E-Mail und schliesse diese später ab. Bitte fülle die erforderlichen Felder aus, um fortzufahren.'
              : 'Send the incomplete request to the teacher to your e-mail and complete it later. Please fill in the required fields to continue.'}
          </p>
          <form className='teacher-ask-form' onSubmit={handleSubmit(onFormSubmit)}>
            <div className='pb-3 sm:pb-5'>
              <div className='mb-3'>
                <AskInput
                  id='firstName'
                  required={true}
                  language={language}
                  value={watch('firstName')}
                  error={errors['firstName']}
                  label={translateENtoDE('First name', language)}
                  register={register('firstName', { required: true })}
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
              <div>{!!errorMsg && <div className='text-16px mt-3 text-rose-600'>{errorMsg}</div>}</div>
            </div>
            <div className='teacher-ask-form_top-border pt-3 sm:pt-5 flex justify-between'>
              <button
                type='button'
                onClick={onBack}
                className='flex items-center uppercase text-primary text-14px font-medium hover:text-dark-primary'>
                <ChevronLeft className='mr-2' />
                {translateENtoDE('Back', language)}
              </button>
              <button
                type='submit'
                disabled={isLoading || loading}
                className={cx('flex items-center btn-primary uppercase bg-primary cursor-pointer')}>
                {translateENtoDE('Send', language)}
                {!!loading && (
                  <div className='w-[16px] h-[16px] border-b-[1px] border-r-[1px] rounded-full border-white animate-spin relative top-[8px] left-[16px]' />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionFormLater;
