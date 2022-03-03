import { getProjectCount } from '../pages/Web3Client';

export const countOfProject = async () => {
  const pcount = await getProjectCount();
  return pcount;
};
