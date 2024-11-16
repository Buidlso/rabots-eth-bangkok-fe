import React, { useState } from 'react';
import ethIcon from '@/components/Icons/ethIcon.svg';
import Image from 'next/image';
import { Button } from '../ui/button';

const WithdrawInput = () => {
  const withdrawAmountSelectOptions = ['10%', '25%', '50%', '75%', '100%'];
  const [withdrawPercentage, setWithdrawPercentage] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [estimatedGas, setEstimatedGas] = useState<string | null>(null);

  const calculateValues = (value: number, field: 'percentage' | 'eth') => {
    const userBotDepositedAmount = 0.0389;

    // if (userBotDepositedAmount === 0) {
    //   setWithdrawAmount(0);
    //   setWithdrawPercentage(0);
    //   return;
    // }

    if (field === 'percentage') {
      const ethValue = (userBotDepositedAmount * value) / 100;
      setWithdrawPercentage(value);
      setWithdrawAmount(Number(ethValue.toFixed(6))); // Rounds ETH value to 6 decimal places
    } else {
      // Calculate percentage based on the ETH amount
      const percentageValue = (value / userBotDepositedAmount) * 100;
      setWithdrawAmount(value);
      setWithdrawPercentage(Number(percentageValue.toFixed(2))); // Rounds percentage to 2 decimal places
    }
  };

  const handleSelectWithdrawlInput = (amount: number) => {
    calculateValues(amount, 'percentage');
  };

  return (
    <div>
      <div className='bg-black rounded-xl p-4 mb-3'>
        <h2 className='text-[#FF5900] text-xl'>Total Earned: 0.0389 eth</h2>

        <div className=''>
          <p className='text-white text-sm mb-2'>
            Enter value eth or percentage
          </p>
          <div className='flex items-stretch h-11 mb-2'>
            <div className='flex items-center gap-2 bg-[#121212] py-2 px-3'>
              <Image src={ethIcon} alt='eth-icon' className='w-4 h-4' />
              <p className='text-white'>Eth</p>
            </div>
            <div className='h-full w-[2px] flex-shrink-0 bg-white/70' />
            <div>
              <input
                type='text'
                className='text-end border-none bg-[#121212] rounded-r-xl rounded-br-xl py-2 px-3 text-white h-full focus:outline-none max-w-56'
                value={0.01945}
              />
            </div>
            <div className='mx-2 my-auto w-[2px] bg-white/70 h-[60%] flex-shrink-0' />
            <div className='flex items-center text-white relative'>
              <input
                type='text'
                value={withdrawPercentage}
                className='text-start border-none bg-[#121212] rounded-r-xl rounded-br-xl py-2 px-3 text-white h-full focus:outline-none max-w-16  rounded-xl'
              />
              <p className='absolute right-1'>%</p>
            </div>
          </div>

          <div className='bg-[#121212] rounded-xl p-3 w-full'>
            <div className='flex items-center justify-between'>
              <p className='text-white/40 text-sm'>Total Earned</p>
              <p className='text-white '>$100</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-white text-sm'>Withdraw Amount</p>
              <p className='text-white '>$50</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-white text-sm'>Gas</p>
              <p className='text-white '>$0.5 | 0.00005 eth</p>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <p className='text-white mb-3'>Quick Select</p>
        <div className='flex items-center gap-2'>
          {withdrawAmountSelectOptions.map((option, idx) => {
            return (
              <button
                className=' bg-black rounded-full text-white px-3 py-1'
                onClick={() => handleSelectWithdrawlInput(parseInt(option))}
                key={idx}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className='flex items-center gap-1 mb-6  justify-center'>
        <p className='text-white'>Wallet:</p>
        <p className='text-white/40'>734923bkbk374234jdsfkdhfdsfj</p>
      </div>
      <Button className='text-black bg-[#FF5900] rounded-full w-full text-lg h-11 hover:bg-[#FF5900]'>Withdraw</Button>
    </div>
  );
};

export default WithdrawInput;
