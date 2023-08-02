'use client'
import { useTheme } from 'next-themes';
import Header from './header';
import useViewport from '@/utils/useViewport';
import SideBar from './sidebar';
import EmptyBoard from './emptyBoard';
import Board from './board';
import { useState } from 'react'

export default function Home() {
  const { theme, systemTheme, setTheme } = useTheme();
  const { width: viewportWidth }: { width: number } = useViewport();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <main className='flex'>
      {viewportWidth >= 768 && isSideBarOpen ? <SideBar theme={theme} setTheme={setTheme} toggleSideBar={toggleSideBar} /> : null}
      <div className='flex-1 min-w-0'>
        <Header theme={theme} setTheme={setTheme} />
        {/* <EmptyBoard /> */}
        <Board isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
      </div>
    </main>
  )
};