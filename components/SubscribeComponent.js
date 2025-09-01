import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const SubscribeComponent = ({ component, options, blok }) => {
  const optionList = options.split(',');
  const subscribeBlogOptions = [
    { key: 'students', value: optionList[0] },
    {
      key: 'teachers',
      value: optionList[1],
    },
  ];
  const subscribeNewsOptions = [
    { key: 'news', value: optionList[0] },
    {
      key: 'in the news',
      value: optionList[1],
    },
  ];

  const [subscribeFor, setSubscribeFor] = useState(subscribeBlogOptions[0].value);
  const [subscribe, setSubscribe] = useState(subscribeNewsOptions[0].value);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const selectNewsLetter = (event) => {
    component === 'blog'
      ? setSubscribeFor(subscribeBlogOptions.find((news) => news.key === event.currentTarget.value).value)
      : setSubscribe(subscribeNewsOptions.find((news) => news.key === event.currentTarget.value).value);
  };

  const onSubmit = (data) => {
    data.Subscription = component === 'blog' ? subscribeFor : subscribe;
    let URLparamsFromFormData = Object.entries(data)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');
    fetch(`${window.location.origin}/.netlify/functions/form?${URLparamsFromFormData}`).then((response) => {
      if (!response.ok) {
        setSubmitted(false);
        throw new Error('error');
      } else if (response.ok) {
        setSubmitted(true);
      }
    });
  };
  return (
    <div>
      <div className='flex items-center text-black text-opacity-75 cursor-pointer dropdown inline-block relative'>
        <select
          className='bg-white text-black opacity-60rounded pr-3 py-2 outline-none w-full'
          onChange={(e) => selectNewsLetter(e)}>
          {component === 'blog'
            ? subscribeBlogOptions.map((option, index) => (
                <option className='py-1' key={index} value={option.key}>
                  {option.value}
                </option>
              ))
            : subscribeNewsOptions.map((option, index) => (
                <option className='py-1' key={index} value={option.key}>
                  {option.value}
                </option>
              ))}
        </select>
      </div>

      <div className='border-b border-disable my-2 w-full'></div>
      {!submitted && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name='Email'
            {...register('Email', {
              required: `${blok.validation}`,
              pattern: {
                message: `${blok.messege}`,
                value: /\S+@\S+\.\S+/,
              },
            })}
            type='email'
            placeholder={blok.placeholder}
            className='mt-2 py-2 px-3 w-full rounded-lg border border-disable focus:outline-none'
          />
          <p className='text-14px text-red text-left'>
            {errors.Email && <span role='alert'>{errors.Email.message}</span>}
          </p>
          <button
            type='submit'
            className='w-full hover:bg-dark-primary rounded-full bg-primary text-16px flex items-center justify-center text-white mt-4 font-medium px-11 py-3'>
            {blok.subscribe_button}
          </button>
        </form>
      )}
      {submitted && (
        <div>
          <p>{blok.subscribe_message}</p>
        </div>
      )}
    </div>
  );
};

export default SubscribeComponent;
