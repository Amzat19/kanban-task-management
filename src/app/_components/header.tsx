'use client'
import KanbanLogo from '../../../public/assets/kanban-logo.svg';
import Arrow from '../../../public/assets/arrow-down.svg';
import Ellipses from '../../../public/assets/ellipses.svg';
import useViewport from '@/utils/useViewport';
import SelectBoard from './selectBoard';
import { useState } from 'react';
import AddNewTask from './addNewTask';
import DeleteBoard from './deleteBoard';
import DeleteTask from './deleteTask';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoardsState } from '@/redux/features/boards';
import { selectModalsState, toggleActiveModal } from '@/redux/features/modals';
import EditBoard from './editBoard';

interface HeaderProps {
  theme: string | undefined;
  setTheme: (theme: string) => void
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  const { width: viewportWidth }: { width: number } = useViewport();
  const boardsState = useSelector(selectBoardsState);
  const modalsState = useSelector(selectModalsState);
  const dispatch = useDispatch();

  return (
    <header className='flex justify-between items-center h-16 p-4 bg-white md:h-20 md:p-6 md:border-b md:border-b-lightBlue desktop:h-24 dark:bg-darkGray dark:md:border-b-gray'>
      <div className='flex justify-between items-center gap-4'>
        {viewportWidth < 768 ? <KanbanLogo /> : null}
        <div className='flex justify-between items-center gap-2'>
          <span className='text-header font-bold dark:text-white'>{boardsState.project.boards[boardsState.currentBoardIndex]?.name}</span>
          {viewportWidth < 768 ? <Arrow onClick={() => dispatch(toggleActiveModal('selectboard'))} className={`cursor-pointer ${modalsState.activeModal === 'selectboard' ? 'rotate-180' : null}`} /> : null}
        </div>
        {viewportWidth < 768 ? <SelectBoard theme={theme} setTheme={setTheme} /> : null}
      </div>
      <div className='flex justify-between items-center gap-4'>
        <button className='border-none bg-purple rounded-2xl px-4 py-1 text-white text-[15px] font-semibold pointer md:h-12 md:rounded-3xl hover:opacity-30 ' onClick={() => dispatch(toggleActiveModal('addNewTask'))}>+ {viewportWidth >= 768 ? 'Add New Task' : null}</button>
        <AddNewTask />
        <Ellipses onClick={() => dispatch(toggleActiveModal('boardMenu'))} className='cursor-pointer' />
        <DeleteBoard />
        <EditBoard />
        <DeleteTask />
      </div>
      {modalsState.activeModal === 'boardMenu' ? <div className='absolute h-[4.5rem] w-40 bg-white top-20 right-5 rounded-lg grid gap-2 p-4 md:top-24 dark:bg-veryDarkGray'>
        <span className='text-[0.8125rem] font-medium text-lightGray cursor-pointer hover:opacity-50' onClick={() => dispatch(toggleActiveModal('editBoard'))}>Edit Board</span>
        <span className='text-[0.8125rem] font-medium text-red cursor-pointer hover:opacity-60' onClick={() => dispatch(toggleActiveModal('deleteBoard'))}>Delete Board</span>
      </div> : null}
    </header>
  )
}

export default Header;
