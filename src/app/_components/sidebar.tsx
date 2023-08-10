import DesktopKanbanLogo from '../../../public/assets/desktop-kanban-logo.svg';
import DarkModeDesktopKanbanLogo from '../../../public/assets/dark-desktop-kanban-logo.svg';
import BoardLogo from '../../../public/assets/board.svg';
import EyeSlash from '../../../public/assets/eye-slash.svg';
import Moon from '../../../public/assets/moon.svg';
import Sunlight from '../../../public/assets/sunlight.svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeBoardIndex, selectBoardsState } from '@/redux/features/boards';
import { selectModalsState, toggleActiveModal } from '@/redux/features/modals';

interface SideBarProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  toggleSideBar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ theme, setTheme, toggleSideBar }) => {
  const boardsState = useSelector(selectBoardsState);
  const modalsState = useSelector(selectModalsState);
  const dispatch = useDispatch();

  return (
    <aside className='bg-white min-h-screen w-[16.25rem] flex flex-col justify-between border-r border-r-lightBlue flex-none desktop:w-[18.75rem] dark:bg-darkGray dark:border-r-gray'>
      <div className='pt-8'>
        <div className='flex gap-1 px-[1.6rem] items-center pb-[3.3rem]'>
          {theme === "dark" ? <DarkModeDesktopKanbanLogo /> : <DesktopKanbanLogo />}
        </div>
        <nav>
          <ul>
            <li className='px-[1.6rem] text-lightGray text-xs font-medium pb-[1.1rem]'>ALL BOARDS ({boardsState.project.boards.length})</li>

            {boardsState.project.boards.map((board, index) => {
              return (
                <li key={board.id} className={`px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-lightGray cursor-pointer rounded-r-[6.25rem] ${theme === 'light' ? 'hover:bg-purple hover:bg-opacity-30 hover:text-purple' : null} ${theme === 'dark' ? 'hover:bg-white hover:text-purple' : null} ${index === boardsState.currentBoardIndex ? 'bg-purple text-white' : null}`} onClick={() => dispatch(changeBoardIndex(index))}>
                  <BoardLogo className={`${index === boardsState.currentBoardIndex ? 'fill-svg-white' : null}`} />
                  {board.name}
                </li>
              )
            })}

            <li className={`px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-purple rounded-r-[6.25rem] cursor-pointer  ${theme === 'light' ? 'hover:bg-purple hover:bg-opacity-30' : null} ${theme === 'dark' ? 'hover:bg-white' : null}`} onClick={() => dispatch(toggleActiveModal('addNewboard'))}>
              <BoardLogo className='fill-svg-purple' />
              + Create New Board
            </li>
          </ul>
        </nav>
      </div>
      <div className='mx-3 '>
        <div className='flex justify-between items-center h-12 bg-lightBlueBg rounded-md px-9 dark:bg-veryDarkGray'>
          <Sunlight width={25} height={25} />
          <span className='w-12 bg-purple h-6 rounded-2xl relative hover:bg-opacity-50 cursor-pointer'>
            <span className={`h-4 rounded-[50%] bg-white w-4 absolute top-1 left-1 cursor-pointer ${theme === "dark" ? 'right-1 left-auto ease-in' : null}`} onClick={() => theme === "dark" ? setTheme('light') : setTheme("dark")}></span>
          </span>
          <Moon width={25} height={25} />
        </div>
        <span className={`flex gap-3 items-center mt-6 h-10 text-lightGray text-medium font-semibold mb-11 cursor-pointer rounded-r-[6.25rem] ${theme === 'light' ? 'hover:bg-purple hover:bg-opacity-30' : null} ${theme === 'dark' ? 'hover:bg-white' : null}`} onClick={() => toggleSideBar()}>
          <EyeSlash />
          Hide Sidebar
        </span>
      </div>
    </aside>
  )
};

export default SideBar;