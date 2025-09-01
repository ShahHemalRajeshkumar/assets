import React from 'react'

import SingleStory from './SingleStory'

const JobStory = ({ language }) => {
    const isEn = language === 'ch-en'

    return (
        <div>
            <h2 className='text-[24px] font-bold md:text-[48px] md:leading-[52px] text-center  md:pb-4'>
                {isEn ? 'Get to know our music teachers' : 'Lerne unsere Musiklehrer*innen kennen'}
            </h2>
            <div className='mx-auto border-b-4 border-primary px-12 pt-2 mb-4 lg:pt-0 w-[100px]' />

            <p className='leading-28px  text-center text-18px md:text-24px my-4 contain md:my-8 md:leading-34px xxl:px-32'>
                {isEn ? "At Matchspace Music over 700 passionate teachers teach more than 80 instruments" : 'Bei Matchspace Music unterrichten über 700 passionierte Lehrkräfte mehr als 80 Instrumente'}
            </p>

            <div className='flex flex-col md:gap-32 justify-center  md:flex-row md:space-x-6'>

                <SingleStory
                    title='Yiheng Li'
                    description={isEn ? 'Pianist and music teacher for Matchspace Music in Zurich' : 'Pianistin und Musiklehrerin für Matchspace Music in Zürich'}
                    img='https://a.storyblok.com/f/121094/1080x1080/ba3b808aef/yiheng-feed-min.png'
                    buttonData={{
                        label: isEn ? 'LEARN MORE' : 'MEHR ERFAHREN',
                        href: isEn ? '/ch-en/stories/yiheng-li' : '/ch-de/geschichten/yiheng-li'
                    }}
                />
                <SingleStory
                    title='Emanuele Forni'
                    description={isEn ? 'Guitarist and music teacher for Matchspace Music in Zurich' : 'Gitarrist und Musiklehrer für Matchspace Music in Zürich '}
                    img='https://a.storyblok.com/f/121094/1080x1080/76d8cd6791/emanuele-feed-min.png'
                    buttonData={{
                        label: isEn ? 'LEARN MORE' : 'MEHR ERFAHREN',
                        href: isEn ? '/ch-en/stories/emanuele-forni' : '/ch-de/geschichten/emanuele-forni'
                    }}
                />
                <SingleStory
                    title='Daniela Schumacher'
                    description={isEn ? 'Singer and music teacher for Matchspace Music in Zurich' : 'Sängerin und Musiklehrerin für Matchspace Music in Zürich '}
                    img='https://a.storyblok.com/f/121094/1080x1080/f9d2d3472c/daniela-feed-min.png'
                    buttonData={{
                        label: isEn ? 'LEARN MORE' : 'MEHR ERFAHREN',
                        href: isEn ? '/ch-en/stories/daniela-schumacher' : '/ch-de/geschichten/daniela-schumacher'
                    }}
                />

            </div>
        </div>
    )
}

export default JobStory
