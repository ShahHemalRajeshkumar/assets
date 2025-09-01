import React from 'react';
import { useMediaQuery } from 'react-responsive';

export default function CanvaPresentation() {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  return (
    <>
      {DesktopSize && (
        <div
          style={{
            paddingTop: '72px',
          }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              //marginTop: '0em',
              //marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: '8px',
              willChange: 'transform',
            }}>
            <iframe
              loading='lazy'
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0,
              }}
              src='https://www.canva.com/design/DAGlWFbSvGs/LzHMZWTtclBllJIIEMHsgg/view?embed'
              allowFullScreen></iframe>
          </div>
        </div>
      )}

      {TabletSize && (
        <div
          style={{
            paddingTop: '72px',
          }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              //marginTop: '0em',
              //marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: '8px',
              willChange: 'transform',
            }}>
            <iframe
              loading='lazy'
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0,
              }}
              src='https://www.canva.com/design/DAGlWFbSvGs/LzHMZWTtclBllJIIEMHsgg/view?embed'
              allowFullScreen></iframe>
          </div>
        </div>
      )}

      {MobileSize && (
        <div
          style={{
            paddingTop: '64px',
          }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              //marginTop: '0em',
              //marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: '8px',
              willChange: 'transform',
            }}>
            <iframe
              loading='lazy'
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0,
              }}
              src='https://www.canva.com/design/DAGlWFbSvGs/LzHMZWTtclBllJIIEMHsgg/view?embed'
              allowFullScreen></iframe>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* <>
      {DesktopSize && (
        <div
          className='max-w-[1440px] min-w-[1250px] flex-col justify-center items-center'
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              //marginTop: '0em',
              //marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: '8px',
              willChange: 'transform',
            }}>
            <iframe
              loading='lazy'
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0,
              }}
              src='https://www.canva.com/design/DAGlWFbSvGs/LzHMZWTtclBllJIIEMHsgg/view?embed'
              allowFullScreen></iframe>
          </div>
        </div>
      )}
    </> */
}
