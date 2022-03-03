export const donationData = [
  {
    projects: 'Covid',
    Donations: 6000,
  },
  {
    projects: 'Landslide',
    Donations: 2000,
  },

  {
    projects: 'Orphanage',
    Donations: 4000,
  },
  {
    projects: 'Earthquake',
    Donations: 5000,
  },
  {
    projects: 'Flood',
    Donations: 1000,
  },
];
export const getToken = () => {
  return localStorage.getItem('access-token');
};
export const getUserEmail = () => {
  return localStorage.getItem('email');
};
export const getCurrentWalletAddress=()=>{
  return localStorage.getItem('wallet-address')
}
export const sliceWalletAddress=(walletAddress)=>{
  return `${walletAddress.slice(0,6)}...${walletAddress.slice(walletAddress.length-6)}`
}
