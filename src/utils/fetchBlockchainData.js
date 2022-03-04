import { getProjectCount ,getFundingCount } from '../pages/Web3Client';

export const countOfProject = async () => {
  const pcount = await getProjectCount();
  return pcount;
};

export const countOfFunding = async ()=>{
  const fcount = await getFundingCount();
  return fcount;
}