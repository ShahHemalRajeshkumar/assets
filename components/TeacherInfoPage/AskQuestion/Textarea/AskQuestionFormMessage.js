import cx from 'classnames';
import Image from 'next/image';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { getTeacherSubTitle } from '../../TeacherContent/TeacherContentHead/functions';
import TeacherLabelWithLikes from '../../../TeachersSearch/TeacherLabelWithLikes';
import { useIntersectionObserver } from '../../../../hooks/usehooks-ts';
import { translateENtoDE } from '../../../../functions/translator';
import useWindowSize from '../../../../hooks/useWindowSize';
import InfoIcon from '../../../icons/Info.svg';
import { getChatVariants } from './helpers';
import AskInput from '../AskInput';

const AskQuestionFormMessage = ({
  form,
  teacher,
  onSubmit,
  language,
  setMessage,
  seoActions,
  onClosePopup,
  scrollToBlock,
}) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;
  const message = watch('message');

  const bottomRef = useRef();
  const scrollRef = useRef();
  const { width = 0 } = useWindowSize();
  const [selected, setSelected] = useState([]);
  const [activeID, setActiveID] = useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const entry = useIntersectionObserver(bottomRef, {});
  const isVisible = !!entry?.isIntersecting;

  const onKeyboard = useCallback((isFocus) => {
    setTimeout(() => setIsKeyboardOpen(!!isFocus), isFocus ? 0 : 500);
  }, []);

  const onOptionScroll = useCallback(() => {
    setIsKeyboardOpen(false);
    if (scrollToBlock) scrollToBlock(200);
  }, [scrollToBlock]);

  const { imageSize, instruments } = useMemo(() => {
    const instruments = teacher?.instruments?.map((item) => {
      const instrument = `${language === 'ch-de' ? item?.de : item?.en || item?.key || ''}`;

      if (language === 'ch-en') return instrument.toLowerCase();
      return instrument;
    });

    return {
      instruments,
      imageSize: width < 768 ? 40 : 72,
    };
  }, [width, language, teacher]);

  const { label, variants, itemClasses, secondLevel } = useMemo(() => {
    const data = getChatVariants({ language, instruments });

    return {
      label: `${language === 'ch-en' ? 'Hi' : 'Hallo'} ${teacher?.name?.split(' ')[0] || ''},`,
      secondLevel: data[activeID] || {},
      variants: Object.values(data)
        .filter((item) => !selected.includes(item?.id))
        .slice(0, 6),
      itemClasses: cx(
        `select-none border p-[5px_8px] cursor-pointer border-[#A1A9B6] min-w-fit 
         rounded-lg text-[12px] font-[500] text-[#21697C] flex items-center leading-[15px]`,
        {
          'mr-[8px] min-w-max': width <= 768,
        }
      ),
    };
  }, [width, activeID, teacher, selected, language, instruments]);

  const messageRegister = register('message', {
    required: true,
    maxLength: 1000,
  });

  const onFormSubmit = useCallback(
    (values) => {
      const messageText = `${label}\n${values?.message || ''}\n${translateENtoDE(
        'Thank you and best regards.',
        language
      )}`;
      onSubmit(messageText);
    },
    [label, language, onSubmit]
  );

  const resetScrollPosition = useCallback(() => {
    const scroll = scrollRef?.current;

    if (scroll) scroll.scrollLeft = 0;
  }, [scrollRef]);

  const onSelectFirstText = useCallback(
    (id, text) => {
      setActiveID(id);
      resetScrollPosition();
      seoActions?.contactLevel(1, text);
    },
    [seoActions, resetScrollPosition]
  );

  const onSelectSecondText = useCallback(
    (text) => {
      setActiveID(null);
      resetScrollPosition();
      setSelected((values) => [...values, activeID]);

      const _text = `${message ? `${message} ` : message}${secondLevel?.text || ''} ${text} `
        .replace(/  /g, ' ')
        .replaceAll('für für', 'für');

      setValue('message', _text);
      setMessage(_text || '');
      // setFocus('message');
    },
    [message, activeID, secondLevel, setValue, setMessage, resetScrollPosition]
  );

  useEffect(() => {
    setMessage(message || '');
  }, [message, setMessage]);

  return (
    <form className='teacher-ask-form' onSubmit={handleSubmit(onFormSubmit)}>
      <div className='teacher-ask-form-content'>
        <div
          className={cx(`grid gap-[12px] items-center`, {
            'grid-cols-[40px_1fr]': width < 768,
            'grid-cols-[72px_1fr] mb-[12px]': width >= 768,
          })}>
          <div>
            {teacher?.avatar_path ? (
              <Image
                alt={teacher?.name}
                width={`${imageSize}px`}
                height={`${imageSize}px`}
                src={teacher?.avatar_path}
                className='teacher-content-head-photo cursor-pointer'
              />
            ) : (
              <div
                style={{
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                }}
                className='teacher-content-head-photo rounded-full bg-slate-400'
              />
            )}
          </div>
          <div>
            <h2 className='font-bold text-[19px]'>{teacher?.name}</h2>
            {width > 768 && (
              <>
                <TeacherLabelWithLikes
                  isOneRow
                  isContactForm
                  language={language}
                  teacherType={teacher?.profile_type}
                  likes={teacher?.recommendations.length}
                />
                <p className='text-[13px] relative top-[-4px] tx-secondary'>{getTeacherSubTitle(teacher, language)}</p>
              </>
            )}
          </div>
        </div>
        <div
          className={cx('mb-[12px] grid gap-[12px] grid-cols-[1fr] rounded-md items-center text-[13px] text-[#000]', {
            'bg-[#EDF3F5] p-[8px_12px] grid-cols-[16px_1fr] visible-scrollbar': width > 768,
          })}>
          {width > 768 && <InfoIcon />}
          {translateENtoDE('Contact details can be entered in the next step.', language)}
        </div>
        <div>
          <AskInput
            id='message'
            label={label}
            type='textarea'
            value={message}
            required={true}
            maxLength={1000}
            language={language}
            isTextareaBlock={true}
            onKeyboard={onKeyboard}
            error={errors['message']}
            register={messageRegister}
            placeholder={translateENtoDE('Enter your message...', language)}
            textAreaBlock={
              !!variants?.length ? (
                <div className='relative'>
                  {false && isKeyboardOpen && !isVisible && width <= 800 && (
                    <div className='chat-options-button' onClick={onOptionScroll}>
                      {translateENtoDE('Options', language)}
                    </div>
                  )}
                  <div
                    ref={scrollRef}
                    className={cx(
                      'mt-1 content-end px-[16px] pb-[16px] w-full grid gap-[8px] grid-cols-[1fr_1fr_1fr]',
                      {
                        'min-h-[105px]': language === 'ch-de',
                        'min-h-[86px]': language === 'ch-en',
                        'overflow-scroll': width <= 768,
                      }
                    )}>
                    {!activeID &&
                      variants.map((item) => (
                        <div
                          key={item?.id}
                          className={itemClasses}
                          onClick={() => onSelectFirstText(item?.id, item?.text)}>
                          {`${item.text}...`}
                        </div>
                      ))}
                    {!!activeID &&
                      secondLevel?.level2?.map((item) => (
                        <div
                          key={item}
                          className={itemClasses}
                          onClick={() => {
                            onSelectSecondText(item);
                            seoActions?.contactLevel(2, item);
                          }}>
                          {item}
                        </div>
                      ))}
                  </div>
                  <div ref={bottomRef} className='w-full h-[1px]' />
                </div>
              ) : null
            }
          />
        </div>
      </div>
      <div className='teacher-ask-form_top-border p-[20px] grid gap-[12px] grid-cols-[130px_130px] justify-end'>
        <button
          type='button'
          onClick={onClosePopup}
          className='uppercase text-primary text-14px font-medium hover:text-dark-primary'>
          {translateENtoDE('CANCEL', language)}
        </button>
        <button type='submit' className='btn-primary uppercase bg-primary cursor-pointer'>
          {translateENtoDE('CONTINUE', language)}
        </button>
      </div>
    </form>
  );
};

export default AskQuestionFormMessage;
