'use client'

import Sidebar from '@/components/Sidebar';
import React from 'react';
import Analytics from './Analytics';
import Wallet from '@/components/wallet/Wallet';

const page = () => {
  return (
    <div className='flex items-stretch justify-center p-10 h-screen gap-10 '>
      <Sidebar />
      <Analytics />
      <Wallet />
    </div>
  );
};

export default page;
