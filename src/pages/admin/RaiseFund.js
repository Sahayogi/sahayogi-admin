import React, { useState } from 'react';
import styled from 'styled-components';
import {
  getFundingCount,
  raiseFund,
  cancelRaiseFund,
  getRaiseFunds,
} from '../Web3Client';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Container = styled.div`
  flex: 4;
  min-height: calc(100vh - 80px);
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
  padding: 40px;
`;

const Wrapper = styled.div`
  /* height: 100%; */
  background-color: rgb(53, 51, 51);
`;
const FormWrapper = styled.form`
  display: flex;
  display: block;
  flex: 1;
  margin: 10px;
  align-items: center;
  justify-content: center;
  background-color: rgb(53, 51, 51);
  padding: 20px;
  width: 500px;
  height: auto;
  border: 1px solid gray;
`;

const FormContainer = styled.div`
  display: flex;
  height: 100%;
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Button = styled.button`
  height: 40px;
  width: auto;
  padding: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: flex;
  border: none;
  align-self: center;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 20px;
  &:hover {
    background-color: grey;
  }
`;
const FormInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
`;
const FormLabel = styled.label`
  margin-bottom: 10px;
  display: block;
  color: white;
`;

const RaiseFund = () => {
  const [raised, setRaised] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [frId, setFrId] = useState('');
  const [getId, setGetId] = useState('');

  //fund raised data
  const [fundData, setFundData] = useState(' ');

  const [formData, setFormData] = useState({
    project: '',
    agency: '',
    goal: '',
    start: '',
    end: '',
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const fetchApi = async (fundingCount) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/admin/project/map',
        { ...formData, fundingCount },
        config
      );
      console.log('data:', data);

      if (data.success === true) {
        // alert(JSON.stringify(values, null, 2));
        console.log('added sucessful');
        // values = initialValues;
      }
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const handleFundRaising = (e) => {
    e.preventDefault();
    const { project, agency, goal, start, end } = formData;
    const newgoal = (goal * 10 ** 18).toString();
    console.log('newgoal', newgoal);
    console.log('BEFORE BLOCKCHAIN');
    raiseFund(project, agency, newgoal, start, end)
      .then((tx) => {
        console.log('success');
        getFundingCount()
          .then((fundingCount) => {
            console.log(fundingCount);
            console.log('Proj count is up');
            fetchApi(fundingCount);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(tx);
        setRaised(true);
        toast.success("Fund raised Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to Add", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const handleFundRaisingCancel = (e) => {
    e.preventDefault();
    cancelRaiseFund(frId)
      .then((tx) => {
        console.log(tx);
        setCanceled(true);
        toast.success("Fund Raising is Canceled Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Failed to Cancel", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const handleFund = (e) => {
    e.preventDefault();

    getRaiseFunds(getId)
      .then((fundData) => {
        setFundData(fundData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log('fundraised', fundData);
  // console.log('donatedAmount:', fundData.donated);
  // console.log('fundraisecount:', fundData.id);

  return (
    <Container>
      <Wrapper>
        <FormContainer>
          <FormWrapper>
            <div>
              <FormLabel htmlFor='project'>Project Id</FormLabel>
              <FormInput
                placeholder='project'
                id='project'
                name='project'
                type='number'
                onChange={handleChange}
              />
            </div>
            <div>
              <FormLabel htmlFor='agency'>Aid Agency</FormLabel>
              <FormInput
                placeholder='Aid Agency'
                name='agency'
                type='text'
                onChange={handleChange}
              />
            </div>
            <div>
              <FormLabel htmlFor='goal'>Goal</FormLabel>
              <FormInput
                placeholder='goal'
                name='goal'
                type='string'
                onChange={handleChange}
              />
            </div>
            <div>
              <FormLabel htmlFor='start'>Start</FormLabel>
              <FormInput
                placeholder='start date'
                name='start'
                type='text'
                onChange={handleChange}
              />
            </div>
            <div>
              <FormLabel htmlFor='end'>End</FormLabel>
              <FormInput
                placeholder='End time'
                name='end'
                type='text'
                onChange={handleChange}
              />
            </div>
            <Button type='submit' onClick={handleFundRaising}>
              Raise Fund
            </Button>
          </FormWrapper>

          <FormWrapper>
            <div>
              <FormInput
                placeholder='id'
                name='frId'
                type='text'
                value={frId}
                onChange={(e) => setFrId(e.target.value)}
              />
            </div>
            <Button onClick={handleFundRaisingCancel}>Cancel</Button>

            <div>
              <FormInput
                placeholder='id'
                name='getId'
                type='text'
                value={getId}
                onChange={(e) => setGetId(e.target.value)}
              />
            </div>
            <Button onClick={handleFund}>GetFundRaiseData</Button>
          </FormWrapper>
        </FormContainer>
      </Wrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default RaiseFund;
