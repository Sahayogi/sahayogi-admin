import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 80px);
  color: white;
  font-size: 1rem;
  background-color: rgb(53, 51, 51);
`;
const BeneficiaryTitleContainer = styled.div`
  color: white;
  background-color: black;
`;
// const BeneficiaryTitleContainer = styled.div``;
// const BeneficiaryTitleContainer = styled.div``;
// const BeneficiaryTitleContainer = styled.div``;
// const BeneficiaryTitleContainer = styled.div``;
// const BeneficiaryTitleContainer = styled.div``;

const Beneficiary = () => {
  return (
    <Container>
      <BeneficiaryTitleContainer>
       {/* <BeneficiaryTitle>

       </BeneficiaryTitle> */}
      </BeneficiaryTitleContainer>
    </Container>
  );
};

export default Beneficiary;
