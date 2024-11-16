import React from 'react';
import { CheckIcon, TopRightArrowIcon } from '../Icons';
import dummyBotImage from '@/components/Icons/dummyRabotIcon.png';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

const WithdrawSuccess = () => {
  return (
    <div className='text-center'>
      <div className='text-[#FF5900] flex items-center justify-center gap-3 mb-9'>
        <CheckIcon />
        <h1 className='text-lg'>Funds Withdraw</h1>
      </div>
      <div className='flex items-center justify-center gap-3 mb-6'>
        <Image src={dummyBotImage} alt='bot-image' className='w-10 h-10' />
        <p className='text-lg text-white font-light'>Renzo-bot</p>
      </div>
      <div className='flex items-center gap-1 mb-6  justify-center font-light'>
        <p className='text-white'>Wallet:</p>
        <p className='text-white/40'>734923bkbk374234jdsfkdhfdsfj</p>
      </div>
      <p className='text-4xl text-white mb-7'>0.01935 eth</p>
      <div className='flex items-center gap-1 mb-6  justify-center font-light'>
        <p className='text-white'>transaction hash:</p>
        <p className='text-white/40'>734923bkbk374234jdsfkdhfdsfj</p>
      </div>
      <hr className='w-full border-white/40 mb-3' />
      <div className=' flex items-center justify-center gap-6 mb-9 '>
        <div>
          <p className='text-white'>Gas amount:</p>
          <p className='text-[#FF5900]'>0.01 eth / $10.77</p>
        </div>
        <div className='explorer-link'>
          <p className='text-white'>View transaction</p>
          <div className='text-[#FF5900] flex items-center gap-2'>
            <Link
              //   href={`https://basescan.org/tx/${txHash}`}
              href={`#`}
              target='_blank'
              rel='noreferrer'
            >
              explorer link
            </Link>
            <TopRightArrowIcon />
          </div>
        </div>
      </div>
      <Button className='text-black bg-[#FF5900] rounded-full w-full text-lg h-11 hover:bg-[#FF5900]'>
        Close
      </Button>
    </div>
  );
};

export default WithdrawSuccess;
