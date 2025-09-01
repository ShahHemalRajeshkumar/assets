import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { enData, deData } from './formData';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import EN from 'react-phone-number-input/locale/en.json';
import DE from 'react-phone-number-input/locale/de.json';
import 'react-phone-number-input/style.css';
import { FrenchDictionary } from '@/utils/enum';

const Form = ({ isFrenchKeyword, language, path }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [blok, setBlock] = useState(null);
  const router = useRouter();

  

  useEffect(() => {
    if (language === 'ch-de') {
      setBlock(deData);
    } else {
      setBlock(enData);
    }


  }, [language]);

  const onSubmit = (data) => {
    data.source = path;
    let URLparamsFromFormData = Object.entries(data)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');
    fetch(`${window.location.origin}/.netlify/functions/jobs?${URLparamsFromFormData}`).then((response) => {
      if (!response.ok) {
        throw new Error('error');
      } else if (response.ok) {
        reset();
        setSubmitted(true);
      }
    });
  };

  return (
    <div className='flex-1 mt-10 px-4 sign-up-form bg-white rounded-lg shadow-lg w-full  py-8  md:mt-0 md:w-1/2 md: md:py-0'>
      <p className='leading-32px font-medium text-24px  px-4 md:leading-52px md: md:pt-7'>
        {language === 'ch-de' && isFrenchKeyword === FrenchDictionary?.PROFESSOR ? 'Tes coordonnées' : blok?.titleForm}
      </p>
      <form
        name='jobads'
        method='post'
        netlify-honeypot='bot-field'
        data-netlify='true'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col px-4 pt-4 md:flex-row md:space-x-4'>
          <div className='flex flex-col w-full pb-4 text-16px'>
            <input
              name='First Name'
              {...register('First Name', { required: true })}
              className='w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable'
              placeholder={
                language === 'ch-de' && isFrenchKeyword === FrenchDictionary?.PROFESSOR ? 'Prénom' : blok?.fname
              }
              inputMode='search'
              type='text'
            />
            <p className='ml-3 text-14px text-red'>
              {errors['First Name']?.type === 'required' &&
                `${
                  language === 'ch-de' && isFrenchKeyword === FrenchDictionary?.PROFESSOR
                    ? 'Le prénom est obligatoire'
                    : blok?.fname_validation
                }`}
            </p>
          </div>
          <div className='flex flex-col w-full pb-4 text-16px'>
            <input
              name='Last Name'
              {...register('Last Name', { required: true })}
              className='w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable'
              placeholder={
                language === 'ch-de' && isFrenchKeyword === FrenchDictionary?.PROFESSOR ? 'Nom de famille' : blok?.lname
              }
              inputMode='search'
              type='text'
            />
            <p className='ml-3 text-14px text-red'>
              {errors['Last Name']?.type === 'required' &&
                `${
                  language === 'ch-de' && isFrenchKeyword === FrenchDictionary?.PROFESSOR
                    ? 'le nom de famille est obligatoire'
                    : blok?.lname_validation
                }`}
            </p>
          </div>
        </div>

        <div className='flex flex-col px-4 pb-4 text-16px'>
          <input
            name='Email'
            {...register('Email', {
              required: `${
                language === 'ch-de' && isFrenchKeyword === FrenchDictionary?.PROFESSOR
                  ? "l'adresse e-mail est requise"
                  : blok?.email_validation
              }`,
              pattern: {
                message: `${
                  language === 'ch-de' && isFrenchKeyword === FrenchDictionary?.PROFESSOR
                    ? 'Veuillez saisir une adresse e-mail valide'
                    : blok?.email_validation_message
                }`,
                value: /\S+@\S+\.\S+/,
              },
            })}
            type='email'
            className='w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable border-grey-blue'
            placeholder={
              language === 'ch-de' && isFrenchKeyword === FrenchDictionary?.PROFESSOR
                ? 'Adresse e-mail'
                : blok?.email_address
            }
            inputMode='search'
          />
          <p className='ml-3 text-14px text-red'>{errors.Email && <span role='alert'>{errors.Email.message}</span>}</p>
        </div>
        <div className='flex flex-col px-4 pb-4 text-16px'>
          <Controller
            name='Phone'
            control={control}
            rules={{
              validate: (value) => isValidPhoneNumber(value),
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                international
                value={value}
                onChange={onChange}
                defaultCountry='CH'
                countryCallingCodeEditable={false}
                labels={language === 'ch-de' ? DE : EN}
                className='w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable border-grey-blue'
              />
            )}
          />
          <p className='ml-3 text-14px text-red'>{errors.Phone?.type === 'required' && `${language === 'ch-de' && isFrenchKeyword === FrenchDictionary?.PROFESSOR
                ? 'Le numéro de téléphone est requis' : blok?.phone_validation}`}</p>
        </div>
        {submitted && <div className='px-4 mb-8'>{language === "ch-de" && isFrenchKeyword === FrenchDictionary?.PROFESSOR ? "Merci beaucoup ! Nous avons reçu vos coordonnées et vous contacterons sous peu." : blok?.success_message}</div>}
        {!submitted && (
          <div className='flex my-4 lg:mb-8'>
            <button
              type='submit'
              className='w-full py-3 mx-4 font-medium text-white rounded-full bg-primary px-11 text-16px hover:bg-dark-primary'>
              {language === 'ch-de' && isFrenchKeyword === FrenchDictionary?. PROFESSOR ? 'ENVOYER' : blok?.button}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
