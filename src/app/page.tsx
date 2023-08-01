'use client'
import { useTheme } from 'next-themes';
import Header from './header';
import useViewport from '@/utils/useViewport';
import SideBar from './sidebar';
import EmptyBoard from './emptyBoard';
import Board from './board';

export default function Home() {
  const { theme, systemTheme, setTheme } = useTheme();
  const { width: viewportWidth }: { width: number } = useViewport();

  return (
    <main className='flex'>
      {viewportWidth >= 768 ? <SideBar theme={theme} setTheme={setTheme} /> : null}
      <div className='flex-1 min-w-0'>
        <Header theme={theme} setTheme={setTheme} />
        {/* <EmptyBoard /> */}
        <Board />
      </div>
    </main>
  )
};