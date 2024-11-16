import React from 'react';
import { Button } from '../ui/button';

const WithdrawError = () => {
  return (
    <div>
      <h1 className='text-white text-4xl mb-6 font-medium'>Error</h1>
      <p className='mb-11 text-white/40 font-light text-sm'>
        Adipisicing ipsum do ea Lorem id ex veniam adipisicing est sint.
        Occaecat sit reprehenderit nostrud velit minim laboris laboris dolor
        dolore enim. Aliquip consectetur exercitation{' '}
      </p>

      <Button className='text-black bg-[#FF5900] rounded-full w-full text-lg h-11 hover:bg-[#FF5900]'>
        Close
      </Button>
    </div>
  );
};

export default WithdrawError;
