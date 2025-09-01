import Bugsnag from '@bugsnag/js';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import SearchCallbackPopup from '../TeachersSearch/SearchCallbackPopup';
import TeacherPopup from './TeacherPopup';

const WAIT_URL = process.env.PABBLY_WAIT_URL;
const SEARCH_URL = process.env.PABBLY_SEARCH_URL;

const TeacherCallbackPopups = ({ language, isHomePage }) => {
  const { query } = useRouter();
  const [isCallback, setIsCallback] = useState(false);

  const showCallbackPopup = useCallback(() => {
    setIsCallback(true);
  }, []);

  const hideCallbackPopup = useCallback(() => {
    setIsCallback(false);
  }, []);

  const pabblyHandle = useCallback(async ({ search, wait }) => {
    let callbackid = search ? search : wait ? wait : '';
    let url = search ? SEARCH_URL : wait ? WAIT_URL : '';

    if (url && callbackid) {
      const body = [{ dealid: callbackid }];

      const requestParams = {
        method: 'POST',
        body: JSON.stringify({
          body,
          url: LATER_URL,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await fetch('/api/proxy', requestParams)
        .catch(async (error) => {
          Bugsnag.notify(error);
          await fetch('/api/proxy', requestParams);
        })
        .finally(() => {
          window.history.pushState(null, '', window.location.pathname);
        });
    }
  }, []);

  useEffect(() => {
    if (query?.['deal_search-alt_wait'] || query?.['deal_reject_search']) {
      if (!isHomePage || (isHomePage && !!query?.['deal_reject_search'])) {
        pabblyHandle({
          wait: query?.['deal_search-alt_wait'],
          search: query?.['deal_reject_search'],
        });
        showCallbackPopup(true);
      }
    }
  }, [query, isHomePage, pabblyHandle, showCallbackPopup]);

  if (!isCallback || (isHomePage && !query?.['deal_reject_search'])) {
    return null;
  }

  return (
    <TeacherPopup
      title=''
      buttonsBlock={<div />}
      name='search-callback'
      isFullViewModal={true}
      isFullModalStyle={true}
      onClose={hideCallbackPopup}>
      <SearchCallbackPopup
        language={language}
        isWait={!!query?.['deal_search-alt_wait']}
        isSearch={!!query?.['deal_reject_search']}
      />
    </TeacherPopup>
  );
};

export default TeacherCallbackPopups;
