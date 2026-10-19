import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import VendorContent from '@/components/pages/VendorContent';

export default function VendorPage() {
  const { go } = useAppContext();

  return (
    <main className="relative font-sans overflow-x-hidden">
      <VendorContent go={go} />
    </main>
  );
}