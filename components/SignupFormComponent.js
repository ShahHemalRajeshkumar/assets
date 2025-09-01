import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const SignupFormComponent = ({ close, blok }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const onSubmit = (data) => {
    data.source = router.asPath.includes('about-us') ? 'About Us' : 'For companies';
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

  return (
    <div className='px-4 sign-up-form'>
      <form
        name='signup'
        method='post'
        netlify
        netlify-honeypot='bot-field'
        data-netlify='true'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col px-4 pt-4 md:flex-row md:space-x-4'>
          <div className='flex flex-col w-full pb-4 text-16px'>
            <input
              name='First Name'
              {...register('First Name', { required: true })}
              className='w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable'
              placeholder={blok.fname}
              inputMode='search'
              type='text'
            />
            <p className='ml-3 text-14px text-red'>
              {errors['First Name']?.type === 'required' && `${blok.fname_validation}`}
            </p>
          </div>
          <div className='flex flex-col w-full pb-4 text-16px'>
            <input
              name='Last Name'
              {...register('Last Name', { required: true })}
              className='w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable'
              placeholder={blok.lname}
              inputMode='search'
              type='text'
            />
            <p className='ml-3 text-14px text-red'>
              {errors['Last Name']?.type === 'required' && `${blok.lname_validation}`}
            </p>
          </div>
        </div>
        <div className='flex flex-col px-4 pb-4 text-16px'>
          <input
            name='Company'
            {...register('Company', { required: true })}
            className='w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable border-grey-blue'
            placeholder={blok.company_name}
            inputMode='search'
            type='text'
          />
          <p className='ml-3 text-14px text-red'>
            {errors.Company?.type === 'required' && `${blok.company_name_validation}`}
          </p>
        </div>
        <div className='flex flex-col px-4 pb-4 text-16px'>
          <input
            name='Job'
            {...register('Job', { required: true })}
            className='w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable border-grey-blue'
            placeholder={blok.job_title}
            inputMode='search'
            type='text'
          />
          <p className='ml-3 text-14px text-red'>{errors.Job?.type === 'required' && `${blok.job_title_validation}`}</p>
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
            className='w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable border-grey-blue'
            placeholder={blok.email_address}
            inputMode='search'
          />
          <p className='ml-3 text-14px text-red'>{errors.Email && <span role='alert'>{errors.Email.message}</span>}</p>
        </div>
        <div className='flex flex-col px-4 pb-4 text-16px'>
          <input
            name='Phone'
            {...register('Phone', { required: true })}
            type='text'
            className='w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable border-grey-blue'
            placeholder={blok.phone}
            inputMode='search'
          />
          <p className='ml-3 text-14px text-red'>{errors.Phone?.type === 'required' && `${blok.phone_validation}`}</p>
        </div>
        <div className='flex flex-col px-4 pb-4 text-16px'>
          <textarea
            name='Message'
            {...register('Message', { required: true })}
            className='w-full px-2 py-2 pl-3 border rounded-lg border-disable border-grey-blue focus:outline-none'
            rows='3'
            placeholder={blok.message}
            inputMode='search'></textarea>
          <p className='ml-3 text-14px text-red'>
            {errors.Message?.type === 'required' && `${blok.message_validation}`}
          </p>
        </div>
        {submitted && <div className='px-4 mb-8'>{blok.success_message}</div>}
        {!submitted && (
          <div className='flex my-4 lg:mb-8'>
            <button
              type='submit'
              className='w-full py-3 mx-4 font-medium text-white rounded-full bg-primary px-11 text-16px hover:bg-dark-primary'>
              {blok.button}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupFormComponent;
