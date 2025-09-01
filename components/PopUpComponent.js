import React, { useState } from 'react';
import SbEditable from 'storyblok-react';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./DynamicComponent'));
const ModalComponent = dynamic(() => import('./ModalComponent'));
const PolicyForm = dynamic(() => import('./PolicyForm'));

const PopUpComponent = ({ blok }) => {
  const [show, setShow] = useState(false);

  const openModal = () => {
    setShow(!show);
  };

  {
    /*
    const modalData = () => {
        return (
            <div className="fixed inset-0 flex items-center justify-center sm:bg-black-75">
                <div className="bg-white w-full h-full overflow-y-scroll">
                    <div className="flex shadow-lg py-6 px-4 bg-white">
                        <div className="cursor-pointer pr-4">
                            <i onClick={() => openModal} className="material-icons-outlined">
                                arrow_back
                            </i>
                        </div>
                    </div>
                    <div className="modal-body mt-12 px-4">
                        {blok.components.map ((comp, index) =>
                            index > 0 && <DynamicComponent blok={comp} key={comp._uid}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    */
  }

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div onClick={openModal}>
        <DynamicComponent blok={blok.components[0]} key={blok.components[0]._uid} />
      </div>
      <ModalComponent show={show} title={blok.title} handleClose={openModal} modalData={true}>
        <div className='fixed inset-0 flex items-center justify-center z-50 ms-nav-overlay'>
          <div className='bg-white rounded-lg w-full lg:w-1/2 mx-6'>
            <div>
              <PolicyForm close={openModal} title={blok.title} header={blok.header} blok={blok} />
            </div>
          </div>
        </div>
      </ModalComponent>
    </SbEditable>
  );
};

export default PopUpComponent;
