import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CrossIcon } from '../Icons';

import dummyBotImage from '@/components/Icons/dummyRabotIcon.png';
import Image from 'next/image';
import WithdrawInput from './WithdrawInput';
import WithdrawLoading from './WithdrawLoading';
import WithdrawSuccess from './WithdrawSuccess';
import WithdrawError from './WithdrawError';

const WithdrawModal = () => {
  const [isWithdrawState, setIsWithdrawState] = useState<
    'loading' | 'success' | 'error' | 'input'
  >('input');

  function renderContent() {
    switch (isWithdrawState) {
      case 'loading':
        return <WithdrawLoading />;
      case 'success':
        return <WithdrawSuccess />;
      case 'error':
        return <WithdrawError />;
      default:
        return <WithdrawInput />;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-[#FF5900]/10 border-2 border-[#FF5900] flex-1 rounded-xl'>
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[460px] bg-[#121212] border-none flex flex-col'>
        <div className='mb-3 flex items-center justify-between w-full '>
          <h1 className='text-xl text-[#FF5900] font-medium'>Withdraw Funds</h1>
          <CrossIcon className='cursor-pointer' />
        </div>

        <div className='flex items-center gap-3 mb-6'>
          <Image src={dummyBotImage} alt='rabot-img' className='w-12 h-12' />
          <p className='text-white text-xl'>Bot 3</p>
        </div>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
