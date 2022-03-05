import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/sahayogi.png';
import { useAuth } from '../context/UserContext';
import { login as loginApi } from '../apis';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-content: center;
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    display: flex;
    flex-direction: column;
  }
`;
const PasswordField = styled.div`
  display: flex;
  flex-direction: row;
`;
const VisibilityButton = styled.button`
  align-items: center;
  justify-content: center;
  display: flex;
  border: none;
  width: 20%;
`;

const LoginLeft = styled.div`
  background-image: radial-gradient(
    circle,
    #3c3d3f,
    #2f3132,
    #242525,
    #191a19,
    #0d0d0c
  );
  flex: 50%;
  position: relative;
  display: flex;
`;
const LoginRight = styled.div`
  background-color: grey;
  flex: 50%;
  display: flex;
  position: relative;
`;

const Wrapper = styled.div`
  text-align: center;
  margin: auto;
  color: white;
  h1 {
    margin: 0 200px;
  }
  img {
    height: 9rem;
    margin: auto;
    margin-right: 40px;
  }
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    h1 {
      margin: auto;
      padding: 5px 0px;
      font-size: 20px;
    }
  }
`;

const LoginForm = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  height: auto;
  max-width: 400px;
  margin: auto;
  gap: 2rem;
  border-radius: 20px;
  background-color: white;

  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    padding: 30px 30px;
  }
`;
const LoginInput = styled.input`
  height: 2.8rem;
  border-radius: 10px;
  border: none;
  color: white;
  padding: 10px;
  font-size: 16px;
  background-color: rgb(53, 51, 51);
  &:focus {
    background-color: rgb(63, 65, 65);
    border: none;
  }
`;
const InputLabel = styled.label`
  color: black;
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
`;
const LoginButton = styled.button`
  padding: 10px;
  background-color: rgb(53, 51, 51);
  border-radius: 10px;
  margin: auto;
  color: white;
  font-size: 16px;
  border: none;
  &:hover {
    background-color: grey;
  }
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    justify-content: center;
    align-items: center;
  }
`;

const StatusLabel = styled.div`
  background-color: red;
  padding: 20px;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 2px;
`;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(undefined);
  const [timeOut, setTimeOut] = useState(null);
  const handleShow = () => {
    setShow(!show);
  };

  const { loadUser, login: loginAction, loginSuccess, loginError } = useAuth();

  const login = async (e) => {
    try {
      loginAction();
      const res = await loginApi({
        email: email,
        password,
      });
      loadUser(res.data);
      if (res.status === 200) {
        loginSuccess(res.data);
        console.log('login sucessful');
      }
      setStatus({ type: 'success' });
      setTimeout(() => {
        setTimeOut(1);
      }, 3000);
    } catch (err) {
      console.log(err, 'err');
      loginError(err);
      setStatus({ type: 'error', err });
      setTimeout(() => {
        setTimeOut(1);
      }, 3000);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <Container>
      <LoginLeft>
        <Wrapper>
          <img src={logo} alt='' />
          <h1>CASH AND VOUCHER ASSISTANCE USING BLOCKCHAIN</h1>
        </Wrapper>
      </LoginLeft>

      <LoginRight>
        <Wrapper>
          <h1>Login</h1>
          <LoginForm>
            {timeOut !== 1 && (
              <div>
                {status?.type === 'success' && (
                  <StatusLabel>success</StatusLabel>
                )}
                {status?.type === 'error' && (
                  <StatusLabel>Invalid Credentials</StatusLabel>
                )}
              </div>
            )}
            <InputLabel htmlFor='email'> Email: </InputLabel>
            <LoginInput
              type='email'
              value={email}
              placeholder='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputLabel htmlFor='password'> Password: </InputLabel>
            <PasswordField>
              <LoginInput
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <VisibilityButton onClick={handleShow}>
                {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </VisibilityButton>
            </PasswordField>
            <LoginButton onClick={login}>login</LoginButton>
          </LoginForm>
        </Wrapper>
      </LoginRight>
    </Container>
  );
};

export default Login;
