import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { isValidPhoneNumber } from 'react-phone-number-input';
import AskQuestionFormMessage from './AskQuestionFormMessage';
import AskQuestionFormContact from './AskQuestionFormContact';
import { translateENtoDE } from '../../../functions/translator';

const AskQuestionForm = ({ errorMsg, language, onSubmit, isLoading, seoActions, setMessage }) => {
  const [isSaved, setIsSaved] = useState(false);

  const showContactForm = () => setIsSaved(true);
  const showMessageForm = () => setIsSaved(false);

  const messageForm = useForm();
  const contactForm = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required(translateENtoDE('Required', language)),
        lastName: yup.string().required(translateENtoDE('Required', language)),
        email: yup
          .string()
          .email(translateENtoDE('Invalid e-mail', language))
          .required(translateENtoDE('Required', language)),
        phoneNumber: yup
          .string()
          .test('phoneNumber', 'Invalid mobile number', (val) => {
            if (!val) return false;

            return !!isValidPhoneNumber(val || '');
          })
          .required(translateENtoDE('Required', language)),
        postcode: yup.string().required(translateENtoDE('Required', language)),
      })
    ),
  });

  if (!isSaved) {
    return (
      <AskQuestionFormMessage
        form={messageForm}
        language={language}
        setMessage={setMessage}
        showContactForm={showContactForm}
      />
    );
  }

  return (
    <AskQuestionFormContact
      form={contactForm}
      language={language}
      errorMsg={errorMsg}
      onSubmit={onSubmit}
      isLoading={isLoading}
      seoActions={seoActions}
      onBack={showMessageForm}
    />
  );
};

export default AskQuestionForm;
