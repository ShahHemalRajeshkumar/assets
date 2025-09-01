import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Styles from '../styles/giftVoucher.module.scss';
import 'react-phone-input-2/lib/style.css';

const PhoneInput = dynamic(() => import('react-phone-input-2'));

const formatVoucherValue = (voucherValue, idx) => voucherValue?.split(':')[idx];
const InputField = ({ name, register, rules, placeholder, errors, type = 'text', className = '' }) => (
  <div className="flex flex-col px-4 pb-4 text-16px">
    <input
      {...register(name, rules)}
      className={`w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable ${className}`}
      placeholder={placeholder}
      inputMode="search"
      type={type}
    />
    {errors[name] && (
      <p className="ml-3 text-14px text-red">{errors[name]?.message || placeholder}</p>
    )}
  </div>
);

const GiftVoucherFormComponent = ({ blok }) => {
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(false);
  const [placeholder, setPlaceholder] = useState('');

  const voucherValues = blok.value_voucher.split(',');

  useEffect(() => {
    const firstValue = blok.voucher_count.split(',')[0];
    setPlaceholder(firstValue);
  }, [blok.voucher_count]);

  const createCompanyName = (sbData, userData) => {
    const sbCompanyName = sbData.company_name?.toLowerCase().trim();
    return ['firmen name', 'company name'].includes(sbCompanyName)
      ? userData.COMPANY_NAME
      : sbData.url_company_name;
  };

  const onSubmit = (data) => {
    if (data.VOUCHER_VALUE === placeholder) setSelectedValue(true);
    if (data.VOCHER_QUANTITY === placeholder) setSelectedQuantity(true);

    if (
      data.VOUCHER_VALUE !== placeholder &&
      (data.VOCHER_QUANTITY !== placeholder || !data.VOCHER_QUANTITY)
    ) {
      data.VOUCHER_VALUE = formatVoucherValue(data.VOUCHER_VALUE, 0) || data.VOUCHER_VALUE;
      data.COMPANY_NAME = createCompanyName(blok, data);

      const queryParams = new URLSearchParams(data).toString();
      reset();
      window.location.href = `${process.env.MATCHSPACE_GIFT}?${queryParams}`;
    }
  };

  const renderPhone = ({ field: { ref, ...field } }) => (
    <PhoneInput
      {...field}
      country="ch"
      inputExtraProps={{ ref, required: true }}
    />
  );

  return (
    <div className="px-4 sign-up-form">
      <form
        className="my-8"
        onSubmit={handleSubmit(onSubmit)}
        data-netlify="true"
        name="signup"
        method="post"
        netlify
        netlify-honeypot="bot-field"
      >
        <InputField
          name="FIRSTNAME"
          register={register}
          rules={{ required: blok.validate_fname }}
          placeholder={blok.fname}
          errors={errors}
        />
        <InputField
          name="LASTNAME"
          register={register}
          rules={{ required: blok.validate_lname }}
          placeholder={blok.lname}
          errors={errors}
        />
        <div className={`${Styles['react-tel-input']} flex flex-col text-16px px-4 pb-4`}>
          <Controller
            control={control}
            name="SMS"
            render={renderPhone}
            rules={{ required: blok.validate_phone }}
          />
          {errors.SMS && <p className="ml-3 text-14px text-red">{blok.validate_phone}</p>}
        </div>
        {!blok.general && !blok.voucher_musik_hug && (
          <InputField
            name="COMPANY_NAME"
            register={register}
            rules={{ required: blok.validate_company }}
            placeholder={blok.company_name}
            errors={errors}
          />
        )}
        <InputField
          name="email"
          register={register}
          rules={{
            required: blok.validate_email,
            pattern: { value: /\S+@\S+\.\S+/, message: blok.validate_email_message },
          }}
          placeholder={
            router.asPath.includes('customers') || router.asPath.includes('unsere-kunden')
              ? blok.company_email
              : blok.email
          }
          errors={errors}
          type="email"
          className="border-grey-blue"
        />
        <InputField
          name="STREET_NAME_AND_NUMBER"
          register={register}
          rules={{ required: blok.validate_street }}
          placeholder={blok.street}
          errors={errors}
          className="border-grey-blue"
        />
        <InputField
          name="POSTAL_CODE"
          register={register}
          rules={{ required: blok.validate_postal }}
          placeholder={blok.postal_code}
          errors={errors}
        />
        {!blok.voucher_musik_hug && (
          <InputField
            name="CITY"
            register={register}
            rules={{ required: blok.validate_city }}
            placeholder={blok.city}
            errors={errors}
            className="border-grey-blue"
          />
        )}
        {blok.voucher_musik_hug && (
          <InputField
            name="PLACE"
            register={register}
            rules={{ required: blok.validate_city }}
            placeholder={blok.place}
            errors={errors}
            className="border-grey-blue"
          />
        )}
        {!blok.voucher_musik_hug && (
          <InputField
            name="NAME_AUF_GUTSCHEIN"
            register={register}
            rules={{ required: blok.validate_name_on_voucher }}
            placeholder={blok.name_on_voucher}
            errors={errors}
            className="border-grey-blue"
          />
        )}
        {voucherValues.length === 1 ? (
          <>
            <div className="flex flex-col px-4 pb-4 text-16px">
              <input
                readOnly
                value={formatVoucherValue(voucherValues[0], 1)}
                className="w-full p-2 pl-3 border rounded-lg focus:outline-none border-disable border-grey-blue"
              />
            </div>
            <input
              type="hidden"
              {...register('VOUCHER_VALUE', { required: true })}
              value={formatVoucherValue(voucherValues[0], 0)}
            />
          </>
        ) : (
          <div className="flex flex-col px-4 pb-4 text-16px">
            <p className="mb-2">{blok.value_voucher_name}</p>
            <select
              {...register('VOUCHER_VALUE', { required: true })}
              onClick={() => setSelectedValue(false)}
              className="focus:outline-none border border-disable rounded-lg border-grey-blue p-2.5 w-full"
            >
              {voucherValues.map((value, index) => (
                <option
                  key={index}
                  value={value}
                  disabled={index === 0}
                  selected={index === 0}
                >
                  {index === 0 ? value : formatVoucherValue(value, 1)}
                </option>
              ))}
            </select>
            {selectedValue && <p className="ml-3 text-14px text-red">{blok.validate_voucher_value}</p>}
          </div>
        )}
        {blok.general && (
          <div className="flex flex-col px-4 pb-4 text-16px">
            <p className="mb-2">{blok.number_of_voucher}</p>
            <select
              {...register('VOCHER_QUANTITY', { required: true })}
              onClick={() => setSelectedQuantity(false)}
              className="focus:outline-none border border-disable rounded-lg border-grey-blue p-2.5 w-full"
            >
              {blok.voucher_count.split(',').map((value, index) => (
                <option
                  key={index}
                  value={value}
                  disabled={index === 0}
                  selected={index === 0}
                >
                  {value}
                </option>
              ))}
            </select>
            {selectedQuantity && <p className="ml-3 text-14px text-red">{blok.validate_voucher_quantity}</p>}
          </div>
        )}
        <div className="flex my-4 lg:mb-8">
          <button
            type="submit"
            className="w-full py-3 mx-4 font-medium text-white rounded-full bg-primary px-11 text-16px hover:bg-dark-primary"
          >
            {blok.button}
          </button>
        </div>
      </form>
    </div>
  );
};
export default GiftVoucherFormComponent;