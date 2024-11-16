import Sidebar from '@/components/Sidebar';
import Wallet from '@/components/wallet/Wallet';
export default function RabotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-black h-full overflow-hidden flex items-stretch justify-center gap-8 p-10'>
     <Sidebar />
      <main className='overflow-y-auto no-scrollbar'>{children}</main>
      <Wallet />
    </div>
  );
}