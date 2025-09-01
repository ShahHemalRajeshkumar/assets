import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import organizationOwnerImg from '../../../public/assets/images/profile.webp';
import Image from 'next/image';
import { translateENtoDE } from 'functions/translator';
import { useRouter } from 'next/router';

const COUNTRY_TO_ISO = {
  '+33': 'FR',
  '+1': 'US',
  '+44': 'GB',
  '+49': 'DE',
};

const ContactForm = ({ organizationData, hidePopup, language, showPopup }) => {
  let webhookURL;
  let webhookLabel;
  const { organizationName, organizationLogo, organizationOwner, contact, full_name } = organizationData;
  const [countryCode, setCountryCode] = useState('+33');
  const [country, setCountry] = useState('FR');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setCountry(COUNTRY_TO_ISO[countryCode] || 'FR');
  }, [countryCode]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      postalCode: '',
      phoneNumber: '',
      message: '',
    },
    mode: 'onChange',
  });
  const messageValue = watch('message');
  const charCount = messageValue?.length || 0;
  const organizationFullName = language == 'ch-en' ? full_name?.en : full_name?.de;

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const additionalData = {
    locale: language === 'ch-en' ? 'en' : 'de',
    organization_slug: router?.query?.organization || '',
    region_id: organizationData?.id || '',
    google_ads_click_id: getCookie('ms_aw') || '',
    google_analytics_session_id: getCookie('ms_ga_8JGM1CFS45') || '',
    google_analytics_user_id: getCookie('ms_ga') || '',
  };

  const env = process.env.NEXT_PUBLIC_PABBLY_WEBHOOK_URL;
  webhookURL = env;
  webhookLabel = 'NEXT_PUBLIC_PABBLY_WEBHOOK_URL';

  const onSubmit = async (data) => {
    const fullData = {
      id: crypto.randomUUID(),
      phone: data?.phoneNumber?.replace('+', ''),
      first_name: data?.firstName,
      last_name: data?.lastName,
      email: data?.email,
      zip: data?.postalCode,
      message: data?.message,
      ...additionalData,
    };
    const formData = new URLSearchParams();
    Object.entries(fullData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const responseText = await res.text();

      if (res.ok && res.status === 200) {
        setIsSubmitted(true);
        const { origin, pathname } = window?.location || {};
        window.location.href = `${origin}${pathname}?contact_form=success`;
      } else {
        console.error('Submission failed with status:', res.status);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    reset();
    hidePopup();
  };

  return (
    <div className='pt-[20px] pb-[16px] px-[20px]'>
      <div className='flex items-center mb-[12px]'>
        <div className='flex items-center'>
          <div className='w-[48px] h-[48px] rounded-full overflow-hidden mr-3'>
            <Image
              src={organizationOwnerImg}
              alt={organizationFullName}
              className='w-full max-w-[48px] h-[48px] rounded-full object-cover'
            />
          </div>
          <div>
            <h2 className='font-bold text-[15px] leading-[160%]'>
              {contact?.firstname} {contact?.lastname}
            </h2>
            <p className='text-[#000000AD] font-Roboto text-[14px]'>
              {language == 'ch-en' ? contact.role?.en : contact?.role?.de}
            </p>
          </div>
        </div>
        <div className='ml-auto'>
          <Image src={organizationLogo} alt={organizationName} width={48} height={48} className='w-full max-w-[48px] h-[48px] object-cover' loading='lazy' quality={75} />
        </div>
      </div>

      <p className='text-[15px] font-Roboto text-[#000000AD] leading-[160%] mb-[24px]'>
        {translateENtoDE('We will get back to you as soon as possible. Many thanks.', language)}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='mt-[12px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[8px] mb-[12px]'>
          <div>
            <div
              className={`relative  block  text-gray-900 border overflow-hidden  ${
                errors.firstName ? 'border-red' : 'border-gray-300'
              } rounded 
   peer-focus:pt-4 peer-placeholder-shown:pt-2 peer-[&:not(:placeholder-shown)]:pt-4`}>
              <input
                {...register('firstName', { required: translateENtoDE('First name is required', language) })}
                placeholder={translateENtoDE('First Name', language)}
                className='peer placeholder:opacity-0 focus:placeholder:opacity-100 transition-all duration-200 text-[14px] leading-[185%] appearance-none focus:outline-none  md:w-[256px] w-full px-3 pb-[1px] pt-2 outline-none mt-2 relative z-20 bg-transparent'
              />

              <label className='text-[15px] leading-[110%] absolute left-3 duration-300 transform -translate-y-2 scale-75 top-3  origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 font-medium select-none'>
                <span className='text-[#AB1300]'>* </span>
                <span className='text-[#000000AD]'>{translateENtoDE('First Name', language)}</span>
              </label>
            </div>
            {errors.firstName && <p className='text-[#FF0000] text-[12px] mt-1'>{errors.firstName.message}</p>}
          </div>
          <div>
            <div
              className={`relative  block  text-gray-900 border overflow-hidden  ${
                errors.lastName ? 'border-red' : 'border-gray-300'
              } rounded 
   peer-focus:pt-4 peer-placeholder-shown:pt-2 peer-[&:not(:placeholder-shown)]:pt-4`}>
              <input
                {...register('lastName', { required: translateENtoDE('Last name is required', language) })}
                placeholder={translateENtoDE('Last Name', language)}
                className='peer placeholder:opacity-0 focus:placeholder:opacity-100 transition-all duration-200 text-[14px] leading-[185%] appearance-none focus:outline-none  md:w-[256px] w-full px-3 pb-[1px] pt-2 outline-none mt-2 relative z-20 bg-transparent'
              />

              <label className='text-[15px] leading-[110%] absolute left-3 duration-300 transform -translate-y-2 scale-75 top-3 select-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 font-medium'>
                <span className='text-[#AB1300]'>* </span>
                <span className='text-[#000000AD]'>{translateENtoDE('Last Name', language)}</span>
              </label>
            </div>
            {errors.lastName && <p className='text-[#FF0000] text-[12px] mt-1'>{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <div
            className={`relative  block  text-gray-900 border overflow-hidden  ${
              errors.firstName ? 'border-red' : 'border-gray-300'
            } rounded 
   peer-focus:pt-4 peer-placeholder-shown:pt-2 peer-[&:not(:placeholder-shown)]:pt-4`}>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email is invalid',
                },
              })}
              placeholder='email@gmail.com'
              className='peer placeholder:opacity-0 focus:placeholder:opacity-100 transition-all duration-200 text-[14px] leading-[185%] appearance-none focus:outline-none   w-full px-3 pb-[1px] pt-2 outline-none mt-2 relative z-20 bg-transparent'
            />

            <label className='text-[15px] leading-[110%] absolute left-3 duration-300 transform -translate-y-2 scale-75 top-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 font-medium select-none '>
              <span className='text-[#AB1300]'>* </span>
              <span className='text-[#000000AD]'>{translateENtoDE('E-mail', language)}</span>
            </label>
          </div>
          {errors.email && (
            <p className='text-[#FF0000] text-[12px] mt-1'>{translateENtoDE(errors.email.message, language)}</p>
          )}
        </div>
        <div className='my-[12px]'>
          <div
            className={`relative  block  text-gray-900 border overflow-hidden  ${
              errors.firstName ? 'border-red' : 'border-gray-300'
            } rounded 
   peer-focus:pt-4 peer-placeholder-shown:pt-2 peer-[&:not(:placeholder-shown)]:pt-4`}>
            <input
              {...register('postalCode', { required: 'Postal code is required' })}
              placeholder='8000'
              className='peer placeholder:opacity-0 focus:placeholder:opacity-100 transition-all duration-200 text-[14px] leading-[185%] appearance-none focus:outline-none  w-full px-3 pb-[1px] pt-2 outline-none mt-2 relative z-20 bg-transparent'
            />

            <label className='text-[15px] leading-[110%] absolute left-3 duration-300 transform -translate-y-2 scale-75 top-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 font-medium select-none'>
              <span className='text-[#AB1300]'>* </span>
              <span className='text-[#000000AD]'>{translateENtoDE('Postal Code', language)}</span>
            </label>
          </div>
          {errors.postalCode && (
            <p className='text-[#FF0000] text-[12px] mt-1'>{translateENtoDE(errors.postalCode.message, language)}</p>
          )}
        </div>

        <div className='mb-[12px]'>
          <div className='flex gap-3'>
            <Controller
              name='phoneNumber'
              control={control}
              rules={{
                required: 'Phone number is required',
                validate: (value) => isValidPhoneNumber(value) || 'Invalid phone number',
              }}
              render={({ field }) => (
                <PhoneInput
                  international
                  onChange={(value) => field.onChange(value)}
                  defaultCountry='CH'
                  countryCallingCodeEditable={false}
                  className='w-full p-2 pl-3 rounded border focus:outline-none border-disable border-grey-blue [&>input]:text-[14px]'
                />
              )}
            />
          </div>
          {errors.phoneNumber && (
            <p className='text-[#FF0000] text-[12px] mt-1'>{translateENtoDE(errors.phoneNumber.message, language)}</p>
          )}
        </div>

        <div className='relative'>
          <textarea
            {...register('message')}
            rows='3'
            maxLength={1000}
            placeholder={`${translateENtoDE('Your message', language)}`}
            className='peer w-full border border-gray-300 rounded px-3 pt-4 pb-2 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-[15px] placeholder:font-Roboto placeholder:absolute placeholder:top-[19px] placeholder:leading-[110%] placeholder:text-gray-400 h-[96px] placeholder:opacity-0 focus:placeholder:opacity-100 transition-opacity duration-200  text-[14px] leading-[185%] placeholder:pt-1 relative z-20 bg-transparent'
          />

          <label className='text-[15px] leading-[110%] absolute left-3 duration-300 transform -translate-y-2 scale-75 top-3 z-30 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 font-medium'>
            <span className='text-[#000000AD] select-none'>{translateENtoDE('Your message', language)}...</span>
          </label>
        </div>

        <div className='flex items-center mb-[24px] pt-2'>
          <div className='relative flex items-center h-5'>
            <span className=' w-[24px] h-[24px]  rounded-lg flex items-center justify-center '>
              <Image src='/assets/images/checkMark.svg' alt='Checked' width={24} height={24} className=' w-[24px] h-[24px]' loading='lazy' />
            </span>
          </div>
          <label htmlFor='privacy' className='ml-[12px] mt-1 text-[12px] text-[#000000AD] font-Roboto leading-[133%]'>
            {translateENtoDE('Your data is protected and will not be shared with third parties.', language)}
          </label>
        </div>

          <div className='flex gap-[12px] justify-end items-center border-t-[1px] border-[#E4E7EC] pt-[16px]'>
            <button
              type='button'
              onClick={handleCancel}
              className='px-[16px] py-[12px]  rounded text-[#21697C]  text-[15px] font-Roboto uppercase font-medium  '>
              {translateENtoDE('CANCEL', language)}
            </button>
            <button
              type='submit'
              className='px-[16px] py-[12px] bg-[#21697C] rounded-full text-white text-[15px] leading-[110%] font-Roboto uppercase font-medium w-full max-w-[122px]'>
              {translateENtoDE('SEND', language)}
            </button>
          </div>
      </form>
    </div>
  );
};

export default ContactForm;
