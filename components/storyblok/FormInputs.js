import { storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
export default function FormInputs({ blok, register, errors }) {
  console.log('Caliing Errrros: ', errors);
  return (
    <div {...storyblokEditable(blok)}>
      <label className=' text-sm font-medium text-gray-700 '>{blok.Label}</label>
      <input
        className=''
        style={{
          borderWidth: 1,
          borderColor: '#d9dbdc',
          paddingTop: 9,
          paddingLeft: 13.5,
          paddingRight: 9,
          paddingBottom: 9,
          borderRadius: 8,
          width: '100%',
        }}
        type={blok.Type}
        placeholder={blok.Placeholder}
        {...register(blok.Name, {
          required: blok.Type === 'tel' ? false : true,
          pattern:
            (blok.Type === 'email' && /^[a-z0-9,_%+-]+@[a-z0-9,-]+\.[a-z{2,4}$]/) ||
            (blok.Type === 'tel' && /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,8}$/),
          maxLength: blok.Type === 'tel' && blok.Validators.find((findMax) => findMax.maxLength).maxLength,
          minLength: blok.Type === 'tel' && blok.Validators.find((findMin) => findMin.minLength).minLength,
        })}
      />
      <div className='text-red-500'>
        {blok.Validators.map((nestedBlok) => (
          <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} errors={errors} inputName={blok.Name} />
        ))}
      </div>
    </div>
  );
}
