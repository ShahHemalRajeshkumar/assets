import React from 'react'
import Image from 'next/image';

import Form from '../JobsForm/Form'
import { FrenchDictionary } from '@/utils/enum';


const FormSection = ({isFrenchKeyword, language, path }) => {
    const isEn = language === 'ch-en'
    return (
        <div className='contain p-8 md:flex md:gap-x-24'>
            <div className='flex-1'>
                <h2 className='text-[24px] font-bold md:text-[48px] md:leading-[52px] '>
                    {isEn ? 'Apply now and get contacted!' : (!isEn && isFrenchKeyword === FrenchDictionary?.PROFESSOR ? "Postule maintenant et sois contacté!" : 'Bewirb dich jetzt und werde kontaktiert!')}
                </h2>

                <div className='mt-10 p-6 bg-white shadow-lg rounded-lg'>
                    <p className='font-medium text-18px mb-2'>{isEn ? 'We are happy to help you with any enquires through phone or email!' : (!isEn && isFrenchKeyword === FrenchDictionary?.PROFESSOR ? "As-tu des questions ou as-tu besoin d'aide?" : 'Hast du Fragen oder brauchst du Unterstützung?')} </p>
                    <div className=''>
                        <div className='flex my-2'>

                            <div className='w-20 h-20 relative'>
                                <Image
                                    className='rounded-full'
                                    alt=''
                                    width={40}
                                    height={40}
                                    layout='fill'
                                    objectFit='cover'
                                    src='https://a.storyblok.com/f/121094/1080x1080/bb24348b81/claudia.jpg' />
                            </div>

                            <div className='flex flex-col justify-center ml-4'>
                                <p className='leading-28px font-medium text-16px lg:text-18px mr-2 lg:leading-36px'>Claudia Carneiro</p>
                                <p className='leading-24px text-14px lg:text-16px mr-2 opacity-60 text-black lg:leading-24px'>{isEn ? 'Professional oboist and music teacher' : (!isEn && isFrenchKeyword === FrenchDictionary?.PROFESSOR ? 'Hautboïste professionnelle et professeure de musique' : 'Professionelle Oboistin und Musiklehrerin' ) }</p>
                            </div>
                        </div>
                        <a href='mailto:customer.service@matchspace.com'>
                            <div className='my-4 flex items-center'>
                                <i className='font-regular material-icons-outlined text-primary text-20px object-cover mr-2'>email</i>
                                <p className='leading-22px   font-medium text-primary text-12px   lg:text-16px    mr-2 tracking-widest   lg:leading-24px'>{isEn ? 'SEND US AN EMAIL' : (!isEn && isFrenchKeyword === FrenchDictionary?.PROFESSOR ? "Écris-nous un e-mail" : 'SCHREIB UNS EINE EMAIL' )}</p>
                            </div>
                        </a>
                        <a></a>
                    </div>
                </div>
            </div>

            <Form isFrenchKeyword={isFrenchKeyword} path={path} language={language} />
        </div>
    )
}

export default FormSection
