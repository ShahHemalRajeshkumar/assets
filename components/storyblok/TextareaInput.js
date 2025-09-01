import { storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
export default function TextareaInput({ blok, register, errors }) {
  console.log('Caliing Errrros: ', errors);
  return (
    <div {...storyblokEditable(blok)}>



      <label className=' text-sm font-medium text-gray-700 '>{blok.Label}</label>
      <textarea
      className=''
        style={{
          borderWidth: 1,
          borderColor: '#d9dbdc',
          paddingTop: 9,
          paddingLeft: 13.5,
          paddingRight: 9,
          paddingBottom: 9,
          borderRadius: 8,
          width: "100%",
          height: 75,
          
        }}
        type={"text"}
        placeholder={blok.Placeholder}
        {...register(blok.Name, {
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
