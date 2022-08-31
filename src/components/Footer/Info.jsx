import React from 'react';
import FooterLogo from './qri-hd-footer-logo.png';
import SocialList from './social';

const FooterInfo =()=> {
  return (
    <aside>
        <div className="footer-logo-area mb-4">
            <img src={`${FooterLogo}`} alt="" />
        </div>
        <div className="footer-info-content mb-4">
            <p className='mb-1'>Copyright © 2022 Qroniswap Inc.</p>
            <p className='mb-0'>All rights reserved</p>
        </div>
        <div className="footer-info-social">
            <SocialList />
        </div>
    </aside>
  )
}

export default FooterInfo