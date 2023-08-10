'use client'
import { useTheme } from 'next-themes';
import Header from './_components/header';
import useViewport from '@/utils/useViewport';
import SideBar from './_components/sidebar';
import EmptyBoard from './_components/emptyBoard';
import Board from './_components/board';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectBoardsState } from '@/redux/features/boards';
import AddNewBoard from './_components/addNewBoard';
import modals, { selectModalsState } from '@/redux/features/modals';

export default function Home() {
  const { theme, systemTheme, setTheme } = useTheme();
  const boardsState = useSelector(selectBoardsState);
  const modalsState = useSelector(selectModalsState);
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
        {
          boardsState.project.boards.length >= 1 ?
            <Board isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} /> :
            <EmptyBoard />
        }
        <AddNewBoard />
      </div>
    </main>
  )
};