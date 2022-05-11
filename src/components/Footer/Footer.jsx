import React from 'react';

import './footer.css';
export const Footer = () => {
  return (
    <div className="footer-parent">
      Made with ❤ by{' '}
      <a target={'_blank'} rel="noreferrer" href="https://peerlist.io/onkar">
        {' '}
        <u>Onkar from Pune</u>{' '}
      </a>
    </div>
  );
};
