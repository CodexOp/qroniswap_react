import React from 'react';
import styled from 'styled-components';
import NewsletterForm from '../../forms/Newsletter';
import FooterInfo from './Info';

const Footer =()=> {
    const Links = [
        {
            title: "Product",
            list: [
                {
                    slug: 'https://swap.qronic.io/',
                    title: 'Swap',
                },
                {
                    slug: 'staking',
                    title: 'Staking',
                },
                {
                    slug: 'farming',
                    title: 'Farming',
                },
                {
                    slug: 'https://pancakeswap.finance/liquidity',
                    title: 'Liquidity',
                },
                {
                    slug: 'https://nft.qroni.io',
                    title: 'NFT',
                },
            ]
        },
        {
            title: "Support",
            list: [
                {
                    slug: 'https://qroniswap.gitbook.io/qroniswap-whitepaper-1/technical-whitepaper/frequently-asked-questions-faqs',
                    title: 'FAQ',
                },
                {
                    slug: 'https://qroniswap.gitbook.io/qroniswap-whitepaper-1/technical-whitepaper/qroniswap-tokenomics',
                    title: 'Tokenomics',
                },
                {
                    slug: 'audits',
                    title: 'Audits',
                },
                {
                    slug: 'https://docs.google.com/forms/d/e/1FAIpQLScVjMXxEvvM3wKFd4tB6s1xgNpzL6VqKaWCtKLdaWZYbMA9eQ/viewform?usp=sf_link',
                    title: 'Apply for listing',
                },
            ]
        },
    ]

    const FooterWrapper = styled.footer`
        background-color: #0B0D17;
        color: #D9DBE1;
        padding: 65px 0;

        .quick-links a{
            color: #D9DBE1;
            text-decoration: none;
            font-size: 16px;
            font-weight: 400;
            line-height: 2.2;

        }
    `;
  return (
    <FooterWrapper>
        <div className="container">
            <div className="row gy-5">
                <div className="col-xxl-3 col-lg-4 order-lg-last">
                    <NewsletterForm />
                </div>
                <div className="col-lg-4">
                    <FooterInfo />
                </div>
                <div className="col-xxl-5 col-lg-4">
                    <div className="row gy-5">
                        {Links && Links.map((a, akey) => (
                            <div key={akey} className='col-lg-6'>
                                {a.title && <h4 className='h4'>{a.title}</h4>}
                                {a.list && <ul className="list-unstyled mb-0 quick-links">
                                    {a.list.map((b, bkey) =>(
                                        <li key={bkey}><a href={`${b.slug}`}>{b.title}</a></li>
                                    ))}
                                </ul>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </FooterWrapper>
  )
}

export default Footer;