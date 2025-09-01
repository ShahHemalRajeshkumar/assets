import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AskQuestionFormMessage from './AskQuestionFormMessage';
import { translateENtoDE } from '../../../../functions/translator';

const AskQuestionForm = ({
  teacher,
  errorMsg,
  language,
  onSubmit,
  isLoading,
  seoActions,
  setMessage,
  onClosePopup,
  scrollToBlock,
}) => {
  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        message: yup.string().required(translateENtoDE('Required', language)),
      })
    ),
  });

  return (
    <AskQuestionFormMessage
      form={form}
      teacher={teacher}
      language={language}
      errorMsg={errorMsg}
      onSubmit={onSubmit}
      isLoading={isLoading}
      setMessage={setMessage}
      seoActions={seoActions}
      onClosePopup={onClosePopup}
      scrollToBlock={scrollToBlock}
    />
  );
};

export default AskQuestionForm;
