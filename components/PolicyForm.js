import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const PolicyForm = ({ close, title, header, blok }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (data) => {
    data.source = 'Pricing Policy';
    let URLparamsFromFormData = Object.entries(data)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');
    fetch(`${window.location.origin}/.netlify/functions/form?${URLparamsFromFormData}`).then((response) => {
      if (!response.ok) {
        throw new Error('error');
      } else if (response.ok) {
        reset();
        setSubmitted(true);
      }
    });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const onClose = () => {
    close(true);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className='sign-up-form'>
      {!submitted ? (
        <>
          <div className='px-8 py-6 bg-white rounded-t-lg shadow-lg'>
            <p className='text-20px'>{header}</p>
          </div>
          <p className='py-6 pl-8'>{title}</p>
          <form
            className='px-4'
            name='signup'
            method='post'
            netlify
            netlify-honeypot='bot-field'
            data-netlify='true'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col px-4 md:flex-row md:space-x-4'>
              <div className='flex flex-col w-full pb-4 text-16px'>
                <input
                  name='Fist Name'
                  {...register('Fist Name', { required: true })}
                  className='w-full py-2 pl-3 border rounded-lg focus:outline-none border-disable'
                  placeholder={blok.first_name}
                  inputMode='search'
                  type='text'
                />
                <p className='ml-3 text-14px text-red'>
                  {errors['Fist Name']?.type === 'required' && `${blok.first_name_validation}`}
                </p>
              </div>
              <div className='flex flex-col w-full pb-4 text-16px'>
                <input
                  name='Last Name'
                  {...register('Last Name', { required: true })}
                  className='w-full py-2 pl-3 border rounded-lg focus:outline-none border-disable'
                  placeholder={blok.last_name}
                  inputMode='search'
                  type='text'
                />
                <p className='ml-3 text-14px text-red'>
                  {errors['Last Name']?.type === 'required' && `${blok.last_name_validation}`}
                </p>
              </div>
            </div>
            <div className='flex flex-col px-4 pb-4 text-16px'>
              <input
                name='Email'
                {...register('Email', {
                  required: `${blok.email_validation}`,
                  pattern: {
                    message: `${blok.email_validation_message}`,
                    value: /\S+@\S+\.\S+/,
                  },
                })}
                type='email'
                className='w-full py-2 pl-3 border rounded-lg focus:outline-none border-disable border-grey-blue'
                placeholder={blok.email}
                inputMode='search'
              />
              <p className='text-14px text-red'>
                {errors.Email && (
                  <span className='ml-3' role='alert'>
                    {errors.Email.message}
                  </span>
                )}
              </p>
            </div>
            <div className='flex flex-col px-4 pb-4 text-16px'>
              <input
                name='Phone'
                {...register('Phone', { required: true })}
                type='text'
                className='w-full py-2 pl-3 border rounded-lg focus:outline-none border-disable border-grey-blue'
                placeholder={blok.phone}
                inputMode='search'
              />
              <p className='ml-3 text-14px text-red'>
                {errors.Phone?.type === 'required' && `${blok.phone_validation}`}
              </p>
            </div>
            <div className='flex flex-col px-4 pb-4 text-16px'>
              <textarea
                name='Message'
                {...register('Message', { required: true })}
                className='w-full py-2 pl-3 border rounded-lg border-disable border-grey-blue focus:outline-none'
                rows='3'
                placeholder={blok.message_placeholder}
                inputMode='search'></textarea>
              <p className='ml-3 text-14px text-red'>
                {errors.Message?.type === 'required' && `${blok.message_validation}`}
              </p>
            </div>
            <div className='flex flex-col justify-end mt-4 mb-8 lg:flex-row'>
              <button
                onClick={onClose}
                type='button'
                className='py-3 mx-4 mb-8 uppercase border-2 rounded-full border-primary text-primary px-11 hover:bg-primary hover:border-primary hover:text-white lg:mb-0'>
                {blok.cancel_button}
              </button>
              <button
                type='submit'
                className='py-3 mx-4 font-medium text-white uppercase rounded-full bg-primary px-11 text-16px hover:bg-dark-primary'>
                {blok.request_button}
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className='p-6'>
            <div className='mb-6'>
              <div className='flex justify-end'>
                <Image
                  height='20'
                  width='20'
                  src='https://images.selise.club/cd9c3b67a46b4c80087b98c8e1006b97.webp'
                  alt='clear'
                  onClick={onClose}
                />
              </div>
              <div className='flex flex-col items-center justify-center py-6'>
                <Image
                  height='80'
                  width='80'
                  src='https://images.selise.club/2bbbbbb45af4055ce3c8235b0dc9dd2f.webp'
                  alt='tick'
                />
                <p className='py-4 text-primary text-20px'>{blok.success}</p>
                <p className='text-center lg:w-2/3'>{blok.form_success_messsege}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PolicyForm;
