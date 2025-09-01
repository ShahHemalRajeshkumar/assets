import { useEffect } from 'react';
import AskInput from './AskInput';
import { translateENtoDE } from '../../../functions/translator';

const AskQuestionFormMessage = ({ form, language, setMessage, showContactForm }) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values) => {
    showContactForm();
  };

  const message = watch('message');

  useEffect(() => {
    setMessage(message);
  }, [message, setMessage]);

  return (
    <form className='teacher-ask-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='p-3 sm:p-5'>
        <AskInput
          id='message'
          type='textarea'
          required={true}
          maxLength={1000}
          value={message}
          language={language}
          error={errors['message']}
          label={translateENtoDE('Your message', language)}
          register={register('message', { required: true, maxLength: 1000 })}
        />
      </div>
      <div className='teacher-ask-form_top-border p-3 sm:p-5 flex justify-end'>
        <button type='submit' className='btn-primary uppercase bg-primary cursor-pointer'>
          {translateENtoDE('Next', language)}
        </button>
      </div>
    </form>
  );
};

export default AskQuestionFormMessage;
