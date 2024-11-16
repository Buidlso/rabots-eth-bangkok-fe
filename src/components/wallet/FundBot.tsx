import React from 'react';
import ethIcon from '../../components/Icons/ethIcon.svg';
import Image from 'next/image';
import SelectFundNetwork from './SelectFundNetwork';

const FundBot = () => {
  return (
    <div>
      <div className='bg-black rounded-xl w-full p-6 mb-5'>
        <h1 className='text-center text-white text-xl mb-6'>Fund Bot 3</h1>
        <div className='mb-6'>
          <div className='mb-2'>
            <p className='text-white text-sm mb-2'>
              Enter value eth or percentage
            </p>
            <div className='flex items-stretch h-[44px]'>
              <div className='bg-[#121212] rounded-l-xl rounded-bl-xl py-2 px-3 flex items-center gap-2'>
                <div className='bg-black rounded-full w-8 h-8 flex items-center justify-center'>
                  <Image src={ethIcon} alt='eth-icon' className='w-6 h-6' />
                </div>
                <p className='text-white'>Eth</p>
              </div>
              <div className='h-full w-[2px] bg-white/70 flex-shrink-0' />
              <div>
                <input
                  type='number'
                  className='text-end border-none bg-[#121212] rounded-r-xl rounded-br-xl py-2 px-3 text-white h-full focus:outline-none'
                  value={0.01945}
                />
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between bg-[#121212] rounded-xl py-2 px-3 text-white'>
            <p className='text-xs'>Gas</p>
            <p className='text-sm'>$0.5 | 0.00005 eth</p>
          </div>
        </div>
        <p className='text-white text-center'>Your eth balance - 99.00</p>
      </div>

      <SelectFundNetwork />

    </div>
  );
};

export default FundBot;
