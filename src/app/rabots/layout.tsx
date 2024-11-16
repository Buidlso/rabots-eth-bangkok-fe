import Sidebar from '@/components/Sidebar';
import Wallet from '@/components/wallet/Wallet';
export default function RabotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-black h-full w-full overflow-hidden flex items-stretch justify-center gap-6 p-10 py-4'>
     <Sidebar />
      <main className='overflow-y-auto no-scrollbar w-full'>{children}</main>
      <Wallet />
    </div>
  );
}