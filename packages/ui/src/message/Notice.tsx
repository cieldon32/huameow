import { useEffect } from 'react';

export const Notice: any = ({ children, onClose, id }: any) => {
  const duration = 1.5;
  let closeTimer: number | null;
  function close() {
    clearCloseTimer();
    onClose(id);
  }
  function startCloseTimer() {
    closeTimer = window.setTimeout(() => {
      close();
    }, duration * 1000);
  }
  function clearCloseTimer() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  }
  function onMouseEnter() {
    clearCloseTimer();
  }
  function onMouseLeave() {
    startCloseTimer();
  }
  useEffect(() => {
    startCloseTimer();
  }, []);
  return (
    <div className='container' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  );
};
