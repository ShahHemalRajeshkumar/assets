import React, { useEffect, useRef, useState } from 'react';
import { sharedService } from '../utils/shared-service';
import { useMediaQuery } from 'react-responsive';
import dynamic from 'next/dynamic';

const ModalComponent = dynamic(() => import('./ModalComponent'));
const SearchForm = dynamic(() => import('./SearchForm'));

const SearchInstrumentComponent = ({ blok, instruments }) => {

  
  const mobile = useMediaQuery({ maxWidth: 599 });
  const tab = useMediaQuery({ minWidth: 600, maxWidth: 959 });
  const smallLaptop = useMediaQuery({ minWidth: 960, maxWidth: 1279 });
  const medLaptop = useMediaQuery({ minWidth: 1280, maxWidth: 1439 });
  const largeLaptop = useMediaQuery({ minWidth: 1440, maxWidth: 1919 });
  const extraLargeLaptop = useMediaQuery({ minWidth: 1920, maxWidth: 5000 });

  const device = [
    { xs: mobile },
    { sm: tab },
    { md: smallLaptop },
    { lg: medLaptop },
    { xl: largeLaptop },
    { xxl: extraLargeLaptop },
  ].find((value) => {
    if (Object.values(value)[0]) {
      return value;
    }
  });

  const dev = device ? Object.keys(device) : 'xs';
  const [showModal, setShowModal] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setDisabled(false);
  };

  const onInstrumentFocus = (e) => {
    e.preventDefault();
    setDisabled(true);
    setShowModal(true);
    InstrumentInput.current.blur();
    document.body.style.overflow = 'hidden';
  };

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    sharedService.setModalOpen(!!showModal);
  }, [showModal]);

  let InstrumentInput = useRef(null);

  return (
    <div className={`${blok.class} bg-white`}>
      {/* relative */}
      <div>
        <SearchForm blok={blok} device={dev[0]} instruments={instruments} />
      </div>
      {['xs', 'sm'].includes(dev[0]) && (
        <ModalComponent show={showModal} handleClose={() => closeModal()} title={blok.header_search}>
          <SearchForm blok={blok} show={showModal} instruments={instruments} />
        </ModalComponent>
      )}
    </div>
  );
};
export default SearchInstrumentComponent;
