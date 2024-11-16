import React from 'react';

const Analytics = () => {
  return (
    <div className='bg-[#121212] rounded-xl h-full flex-1'>
      <div className='flex flex-wrap items-stretch justify-center gap-3 w-full  p-6'>
        <div className='border border-white/40 rounded-xl p-3 flex-1 bg-black'>
          <p className='text-white text-sm mb-3'>Gross Revenue</p>
          <p className='text-white text-2xl'>$2,480.32</p>
        </div>
        <div className='border border-white/40 rounded-xl  p-3 flex-1 bg-black'>
          <p className='text-white text-sm mb-3'>Avg. Order value</p>
          <p className='text-white text-2xl'>$56,12</p>
        </div>
        <div className='border border-white/40 rounded-xl  p-3 flex-1 bg-black'>
          <p className='text-white text-sm mb-3'>Total orders</p>
          <p className='text-white text-2xl'>$230</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
