import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import GiftCardSuccessPopup from './popups/GiftCardSuccessPopup';

const DynamicComponent = dynamic(() => import('./DynamicComponent'));

const Page = ({ content, instruments, slug }) => {
  const { pathname } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isHeavyComponentLoaded, setIsHeavyComponentLoaded] = useState(false);

  useEffect(() => {
    if (!!instruments?.length && typeof window !== 'undefined') {
      localStorage.setItem('instruments', JSON.stringify(instruments));
    }
  }, [instruments]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        await new Promise((resolve) => {
          const timeout = setTimeout(() => resolve());
        });

        setIsHeavyComponentLoaded(true);
      } catch (err) {
        setError('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  return (
    <>
      {pathname === '/[language]' && <GiftCardSuccessPopup />}
      <div className='min-h-screen'>
        {isHeavyComponentLoaded &&
          content?.body?.map((blok, i) => {
            return (
              <div key={i}>
                <DynamicComponent instruments={instruments} blok={blok} key={blok._uid} slug={slug} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Page;
