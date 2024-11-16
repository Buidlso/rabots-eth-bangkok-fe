import { GoogleIcon } from '@/components/Icons';
import Image from 'next/image';
import React from 'react';
import loginBg from '/public/login-bg.png';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className='flex items-center justify-around gap-10 h-full'>
      <div className='flex flex-col  justify-center  p-6 h-[550px]'>
        <p className='text-[#FF5900] mb-8 text-lg'>Login</p>
        <h1 className='text-6xl text-white font-medium mb-6'>
          Welcome to <br /> Rabots
        </h1>
        <p className='text-white mb-8'>Quick Login With Google</p>
        <Button className='flex items-center gap-3 bg-black rounded-lg py-2 px-4 text-white w-fit border border-white'>
          <GoogleIcon />
          Login with Google
        </Button>
      </div>
      <div className='max-w-4xl'>
        <Image src={loginBg} alt='login-bg' />
      </div>
    </div>
  );
};

export default page;
