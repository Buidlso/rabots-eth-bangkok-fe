import React from 'react';
import { Button } from '../ui/button';

const FundBotError = () => {
  return (
    <div className='bg-black rounded-xl w-full p-6 mb-5'>
      <p className='text-white text-xl text-center'>Fund Bot 3</p>
      <h1 className='text-white text-4xl font-medium mb-6'>Error</h1>
      <p className='text-white/40 mb-4'>
        Adipisicing ipsum do ea Lorem id ex veniam adipisicing est sint.
        Occaecat sit reprehenderit nostrud velit minim laboris laboris dolor
        dolore enim. Aliquip consectetur exercitation{' '}
      </p>
      <Button className='text-black bg-[#FF5900] rounded-full w-full text-lg h-11 hover:bg-[#FF5900]'>
        Back
      </Button>
    </div>
  );
};

export default FundBotError;