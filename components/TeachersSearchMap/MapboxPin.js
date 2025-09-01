import { memo } from 'react';

const Pin = ({ active, onClick, isTeacherInfo, isHomeVisit }) => {
  if (isTeacherInfo && isHomeVisit) {
    return (
      <button
        onClick={onClick}
        aria-label="Home visit location marker"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer'
        }}>
        <svg
          width='21'
          height='21'
          fill='none'
          viewBox='0 0 21 21'
          style={{
            stroke: 'none',
            transform: 'scale(1.4)',
            fill: active ? '#21697C' : '#C00659',
          }}
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M18.6245 10.2985C18.9266 9.95525 18.8974 9.4292 18.5593 9.12381L11.1108 2.39166C10.7727 2.08626 10.2307 2.09266 9.8997 2.40608L2.42584 9.48274C2.09487 9.79616 2.07862 10.3215 2.38987 10.6557L2.57725 10.8573C2.88812 11.1915 3.39061 11.2313 3.69887 10.946L4.25743 10.4293V17.9936C4.25743 18.4577 4.62149 18.8334 5.07046 18.8334H7.98379C8.43277 18.8334 8.79682 18.4577 8.79682 17.9936V12.7017H12.5128V17.9936C12.5063 18.4574 12.8276 18.8331 13.2766 18.8331H16.364C16.8129 18.8331 17.177 18.4574 17.177 17.9933V10.5359C17.177 10.5359 17.3313 10.6755 17.5216 10.8483C17.7116 11.0207 18.1106 10.8824 18.4128 10.5389L18.6245 10.2985Z' />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label="Location marker"
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer'
      }}>
      <svg
        width='21'
        height='30'
        fill='none'
        style={{
          stroke: 'none',
          fill: active ? '#21697C' : '#C00659',
        }}
        viewBox='0 0 15 21'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M7.85352 0.672363C3.98352 0.672363 0.853516 3.80236 0.853516 7.67236C0.853516 12.9224 7.85352 20.6724 7.85352 20.6724C7.85352 20.6724 14.8535 12.9224 14.8535 7.67236C14.8535 3.80236 11.7235 0.672363 7.85352 0.672363ZM7.85352 10.1724C6.47352 10.1724 5.35352 9.05236 5.35352 7.67236C5.35352 6.29236 6.47352 5.17236 7.85352 5.17236C9.23352 5.17236 10.3535 6.29236 10.3535 7.67236C10.3535 9.05236 9.23352 10.1724 7.85352 10.1724Z' />
      </svg>
    </button>
  );
};

export default memo(Pin);
