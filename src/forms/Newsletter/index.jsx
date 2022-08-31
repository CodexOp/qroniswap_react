import React from 'react';
import styled from 'styled-components';
import PaperPlane from '../../assets/paperplane.svg';

const NewsletterForm =()=> {
    const FormWrapper = styled.div``;
    const InputGroup = styled.div`
        background-color: rgba(255,255,255,0.2);
        display: flex;
        align-items: center;
        border-radius: 8px;
        padding: 6px 15px;
    `;
    const InputForm = styled.input`
        background-color: transparent;
        width: 100%;
        outline: 0;
        border: 0;
        color: #fff;
        padding-left: 10px;
        font-size: 14px;

        ::placeholder {
            color: #D9DBE1;
        }
    `;
  return (
    <FormWrapper>
        <h4 className='h4'>Stay up to date</h4>
    <form>
        <InputGroup>
            <InputForm type="text" placeholder='Your email address'/>
            <button className="btn py-2 px-3 border-0"><img src={PaperPlane} /></button>
        </InputGroup>
    </form>
    </FormWrapper>
  )
}

export default NewsletterForm;