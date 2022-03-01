import { KeyboardArrowDown } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import DropDown from './Dropdown';
import { getBlockchain } from '../../pages/Web3Client';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
`;

const Connect = styled.button`
  height: 40px;
  width:150px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: flex;
  border: none;
  border-radius: 4rem;
  background-color: rgb(61, 60, 60);
  color: white;
`;

const Metamask = () => {
  const [accountAddress, setAccountAddress] = useState(null);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => {
    setClick(!click);
    setDropdown(true);
  };
  
  return (
    <Container>
      <Connect variant='contained' onClick={()=>getBlockchain(setAccountAddress)}>
        {!!accountAddress
          ? `${accountAddress.slice(0, 6)}...${accountAddress.slice(
              accountAddress.length - 4,
              accountAddress.length
            )}`
          : 'Connect Wallet'}
        {accountAddress && <KeyboardArrowDown onClick={handleClick} />}
      </Connect>
      {accountAddress && click && dropdown && (
        <DropDown setAccountAddress={setAccountAddress} />
      )}
      {}
    </Container>
  );
};

export default Metamask;
