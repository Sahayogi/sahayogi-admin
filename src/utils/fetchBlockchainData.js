import { getProjectCount } from "../pages/Web3Client";

export const countOfProject =()=>{
    const pcount = getProjectCount();
    return pcount;

}