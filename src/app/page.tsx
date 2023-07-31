'use client'
import { useTheme } from 'next-themes';
import Header from './header';
import useViewport from '@/utils/useViewport';
import SideBar from './sidebar';
import EmptyBoard from './emptyBoard';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { width: viewportWidth }: { width: number } = useViewport();

  return (
    <main className='flex'>
      {viewportWidth >= 768 ? <SideBar /> : null}
      <div className='min-w-max flex-1'>
        <Header />
        <EmptyBoard />
      </div>
    </main>
  )
}
