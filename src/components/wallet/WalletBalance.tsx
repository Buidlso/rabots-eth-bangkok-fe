import React from 'react';
import WalletAssets from './WalletAssets';

const WalletBalance = () => {
  return (
    <div className='flex flex-col items-center w-full gap-3'>
      <div className='bg-black rounded-xl py-6 text-center flex flex-col items-center justify-center w-full'>
        <h1 className='text-5xl text-white'>$20.00</h1>
        <p className='text-white/40 text-sm'>Total balance</p>
      </div>
      <WalletAssets />
    </div>
  );
};

export default WalletBalance;
