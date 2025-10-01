import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Drawer from './Drawer';
import Header from './Header';
import { Loading } from '@/components/shared';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="relative flex min-h-screen w-full bg-transparent">
      <Drawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex w-full flex-1 flex-col lg:pl-[20rem] xl:pl-[22rem]">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 px-4 pb-12 pt-24 sm:px-8 md:px-10 md:pt-28 lg:px-12">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
