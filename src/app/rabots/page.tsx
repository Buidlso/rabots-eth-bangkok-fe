import Sidebar from '@/components/Sidebar';
import AllRabots from './AllRabots';
import Wallet from '@/components/wallet/Wallet';


export default function page() {
  return (
    <div className='bg-black h-full overflow-hidden flex items-stretch justify-center gap-8 p-10'>
      <Sidebar />
      <AllRabots />
      <Wallet />
    </div>
  );
}
