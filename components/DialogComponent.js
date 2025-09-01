import React, { cloneElement, forwardRef } from 'react';

const DialogComponent = forwardRef(({ children }, ref) => (
  <dialog
    ref={ref}
    className='inset-0 max-w-full max-h-full p-0 transition transition-opacity md:rounded-lg dialog-wrapper'>
    {cloneElement(children, { ref: ref })}
  </dialog>
));

DialogComponent.displayName = 'DialogComponent';

export default DialogComponent;
