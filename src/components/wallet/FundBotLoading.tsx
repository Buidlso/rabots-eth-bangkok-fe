import React from 'react';
import { RabotIcon } from '../icons';
import Image from 'next/image';
import loading from '@/public/loading.svg';
import { Button } from '../ui/button';

const FundBotLoading = () => {
  return (
    <div className='bg-black rounded-xl w-full p-6 mb-5'>
      <h2 className='text-white text-xl text-center mb-4'>Fund Bot 3</h2>
      <div className='flex items-center justify-center mb-6'>
        <RabotIcon className='text-[#FF5900] absolute' />
        <Image src={loading} alt='loading' className='animate-spin relative' />
      </div>
      <Button className='text-black bg-[#FF5900] rounded-full w-full text-lg h-11 hover:bg-[#FF5900]'>
        Back
      </Button>
    </div>
  );
};

export default FundBotLoading;