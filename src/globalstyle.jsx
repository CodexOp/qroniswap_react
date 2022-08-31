// globalStyles.js
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
    :root{
        --ff-primary: 'Inter', sans-serif;
        --gr-primary: linear-gradient(95.08deg, #9F2DFE 6.71%, #3BB2F9 111.09%);
    }
    body {
        margin: 0;
        padding: 0;
        background: var(--body-bg, #11001F);
        font-family: var(--ff-primary);
        font-size: 14px;
        line-height: 1.7;
        color: var(--body-text, #fff);
    }

    @media (min-width: 1400px){
        .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
            max-width: 1260px;
        }
    }
    .gr-primary{
        background: var(--gr-primary-bg, linear-gradient(95.08deg, #9F2DFE 6.71%, #3BB2F9 111.09%));
    }
    .btn-gr-primary{
        background: var(--gr-primary-bg, linear-gradient(95.08deg, #9F2DFE 6.71%, #3BB2F9 111.09%));
        color: #fff;
        border: 0px;
    }
    .btn-gr-light{
        background-color: #fff;
        border: 1px solid #9F2DFE;
        position: relative;
        z-index: 1;

        span{
            /* both */
            background: linear-gradient(95.08deg, #9F2DFE 6.71%, #3BB2F9 111.09%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
        }

        &:hover{
            border: 1px solid #9F2DFE;
            background-color: #fff;
        }
    }

    .text-gr-primary{
        /* both */
        background: linear-gradient(95.08deg, #9F2DFE 6.71%, #3BB2F9 111.09%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }

    .h4{
        font-size: 20px;
        line-height: 1.5;
        font-weight: 500;
        margin-bottom: 20px;
    }
    

    .h3{
        font-size: 30px;
        line-height: 1.5;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .fs-14{ font-size: 14px!important; }
    .fs-15{ font-size: 15px!important; }
    .fs-16{ font-size: 16px!important; }
    .fs-17{ font-size: 17px!important; }
    .fs-18{ font-size: 18px!important; }
    .fs-19{ font-size: 19px!important; }
    .fs-20{ font-size: 20px!important; }
    .fs-22{ font-size: 22px!important; }
    .fs-24{ font-size: 24px!important; }
    .fs-30{ font-size: 30px!important; }


    // Button
    .btn{
        padding: var(--btn-padding, 16px 28px);
        font-size: var(--btn-fs, 16px);
        line-height: var(--btn-lh, 24px);
        font-weight: var(--btn-fw, 500);
        border-radius: 8px;

        &-primary{
            background-color: var(--btn-primary-bg, #7F56D9) !important;
            border-color: var(--btn-primary-border-color, #7F56D9) !important;

            &:hover{
                --btn-primary-bg: #6335c6;
                --btn-primary-border-color: #6335c6;
            }
        }

        &-sm{
            --btn-padding: 12px 20px;
        }
    }

    .__rubic {
        display: none;
        &.show{
            display: flex;
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(0,0,0,0.9);
            z-index: 9999;
    
            #rubic-widget-root{
                max-width: 400px;
                margin: auto;
            }
    
        }
    }

`;
 
export default GlobalStyle;