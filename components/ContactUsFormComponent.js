import React from 'react';
import { useForm } from 'react-hook-form';
import { ReCAPTCHA } from 'react-google-recaptcha';

const ContactUsFormComponent = ({ close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const recaptchaRef = React.createRef();
  const onSubmit = (data) => {
    data.source = 'Book Demo';
    recaptchaRef.current.execute();
    let URLparamsFromFormData = Object.entries(data)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');
    fetch(`${window.location.origin}/.netlify/functions/form?${URLparamsFromFormData}`).then((response) => {
      if (!response.ok) {
        throw new Error('error');
      } else if (response.ok) {
        close(true);
      }
    });
  };

  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch('/api/recaptcha', {
        method: 'POST',
        body: JSON.stringify({ captcha: captchaCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        alert('Recaptcha registered successfully');
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error?.message || 'Something went wrong');
    } finally {
      recaptchaRef.current.reset();
    }
  };

  const instructedSolutions = [
    'Compliance Solutions',
    'Onboarding Solutions',
    'KYC & Risk Solutions',
    'Document Management',
    'Fraud Detection',
    'Enterprise Content Management',
    'Semantic Search / Language Tools',
    'Case Management',
    'Transaction Monitoring / Anti-Money-Laundering Solutions',
  ];

  return (
    <div className='mt-16'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col justify-between py-4 md:flex-row md:items-center'>
          <p className='text-16px md:text-20px text-mine-shaft'>
            First Name<span className='text-red'>*</span>
          </p>
          <div className='md:w-4/5'>
            <input
              name='firstName'
              {...register('firstName', { required: true })}
              className='w-full px-2 py-2 border border-grey-blue'
              type='text'
            />
            <p className='text-14px text-red'>{errors.firstName?.type === 'required' && 'First name is required'}</p>
          </div>
        </div>
        <div className='flex flex-col justify-between py-4 md:flex-row md:items-center'>
          <p className='text-16px md:text-20px text-mine-shaft'>
            Last Name<span className='text-red'>*</span>
          </p>
          <div className='md:w-4/5'>
            <input
              name='lastName'
              {...register('lastName', { required: true })}
              className='w-full px-2 py-2 border border-grey-blue'
              type='text'
            />
            <p className='text-14px text-red'>{errors.lastName?.type === 'required' && 'Last name is required'}</p>
          </div>
        </div>
        <div className='flex flex-col justify-between py-4 md:flex-row md:items-center'>
          <p className='text-16px md:text-20px text-mine-shaft'>
            Company Name<span className='text-red'>*</span>
          </p>
          <div className='md:w-4/5'>
            <input
              name='company'
              {...register('company', { required: true })}
              className='w-full px-2 py-2 border border-grey-blue'
              type='text'
            />
            <p className='text-14px text-red'>{errors.company?.type === 'required' && 'Company name is required'}</p>
          </div>
        </div>
        <div className='flex flex-col justify-between py-4 md:flex-row md:items-center'>
          <p className='text-16px md:text-20px text-mine-shaft'>Function/Role</p>
          <div className='md:w-4/5'>
            <input name='role' className='w-full px-2 py-2 border border-grey-blue' type='text' />
          </div>
        </div>
        <div className='flex flex-col justify-between py-4 md:flex-row md:items-center'>
          <p className='text-16px md:text-20px text-mine-shaft'>
            Work Email<span className='text-red'>*</span>
          </p>
          <div className='md:w-4/5'>
            <input
              name='email'
              {...register('email', { required: true })}
              type='email'
              className='w-full px-2 py-2 border border-grey-blue'
            />
            <p className='text-14px text-red'>{errors.email?.type === 'required' && 'Email is required'}</p>
          </div>
        </div>
        <div className='flex flex-col justify-between py-4 md:flex-row md:items-center'>
          <p className='mr-2 text-16px md:text-20px text-mine-shaft'>Phone Number</p>
          <div className='md:w-4/5'>
            <input
              name='phoneNumber'
              {...register('phoneNumber', { required: true })}
              type='number'
              className='w-full px-2 py-2 border border-grey-blue'
            />
          </div>
        </div>
        <div className='flex justify-end py-4'>
          <div className='w-4/5'>
            <p className='mb-4 text-22px text-mine-shaft'>What solution are you interested in?</p>
            <div className='grid gap-x-4 md:grid-cols-2'>
              {instructedSolutions.map((list, inde) => (
                <div className='flex text-14px md:text-16px text-mine-shaft' key={inde}>
                  <input type='checkbox' className='mt-2 mr-1' />
                  <label>{list}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between py-4 md:flex-row md:items-start'>
          <p className='mr-2 text-16px md:text-20px text-mine-shaft'>Your Message</p>
          <div className='md:w-4/5'>
            <textarea className='w-full px-2 py-2 border border-grey-blue' />
          </div>
        </div>
        <ReCAPTCHA
          ref={recaptchaRef}
          size='normal'
          sitekey={process.env.RECAPTCHA_CLIENT_KEY}
          onChange={onReCAPTCHAChange}
        />
        <div className='flex justify-end py-4'>
          <div className='w-4/5'>
            <div className='flex text-14px md:text-16px text-mine-shaft'>
              <input name='mail' {...register('mail')} type='checkbox' className='mt-2 mr-1' />
              <label>I’m happy to receive news and communications from IMTF.</label>
            </div>
            <div className='flex text-14px md:text-16px text-mine-shaft'>
              <input
                name='terms'
                {...register('terms', { required: true, maxLength: 20 })}
                type='checkbox'
                className='mt-2 mr-1'
              />
              <label>
                I agree to{' '}
                <a href='#' className='underline'>
                  terms and conditions
                </a>
                <span className='text-red'>*</span>
              </label>
              <p className='text-14px text-red'>
                {errors.terms?.type === 'required' && 'Please read the terms and conditions'}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center mt-8 md:flex-row md:items-center'>
          <button type='submit' className='px-4 py-1 mr-2 text-white rounded-full bg-red text-14px md:text-18px'>
            GO
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUsFormComponent;
