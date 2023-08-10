'use client'
import BoardLogo from '../../../public/assets/board.svg';
import Sunlight from '../../../public/assets/sunlight.svg';
import Moon from '../../../public/assets/moon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changeBoardIndex, selectBoardsState } from '@/redux/features/boards';
import { selectModalsState, toggleActiveModal } from '@/redux/features/modals';

interface SelectBoardProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

const SelectBoard: React.FC<SelectBoardProps> = ({ theme, setTheme }) => {
  const boardsState = useSelector(selectBoardsState);
  const modalsState = useSelector(selectModalsState);
  const dispatch = useDispatch();

  const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
  };

  return (
    <dialog open={modalsState.activeModal === 'selectboard'} className='absolute top-16 min-h-full w-screen bg-[#000] bg-opacity-60' onClick={() => dispatch(toggleActiveModal(null))}>
      <article className='bg-white w-[16.5rem] mt-4 rounded-lg p-4 mx-auto dark:bg-darkGray' onClick={stopElementEventPropagation}>
        <nav>
          <ul>
            <li className='px-[1.6rem] text-lightGray text-xs font-medium pb-[1.1rem] w-max tracking-[0.15rem]'>ALL BOARDS ({boardsState.project.boards.length})</li>
            {
              boardsState.project.boards.map((board, index) => {
                return (
                  <li
                    key={board.id}
                    className={`px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-lightGray w-max cursor-pointer rounded-r-[6.25rem] hover:bg-purple hover:bg-opacity-30 hover:text-purple ${index === boardsState.currentBoardIndex ? 'bg-purple text-white' : ''} ${theme === 'dark' ? 'hover:bg-white hover:text-purple' : ''}`}
                    onClick={() => dispatch(changeBoardIndex(index))}
                  >
                    <BoardLogo className={index === boardsState.currentBoardIndex ? 'fill-svg-white' : ''} />
                    {board.name}
                  </li>
                )
              })
            }
            <li className={`px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-purple w-max cursor-pointer rounded-r-[6.25rem] hover:bg-purple hover:bg-opacity-30 hover:text-purple ${theme === 'dark' ? 'hover:bg-white hover:text-purple' : null}`} onClick={() => dispatch(toggleActiveModal('addNewboard'))}>
              <BoardLogo className='fill-svg-purple' />
              + Create New Board
            </li>
          </ul>
        </nav>
        <div className='mx-3 '>
          <div className='flex justify-between items-center h-12 bg-lightBlueBg rounded-md px-9 dark:bg-veryDarkGray'>
            <Sunlight width={20} height={20} />
            <span className='w-12 bg-purple h-5 rounded-2xl relative cursor-pointer hover:bg-opacity-50'>
              <span className={`h-3 rounded-[50%] bg-white w-3 absolute top-1 left-1 cursor-pointer ${theme === "dark" ? 'right-1 left-auto ease-in' : null}`} onClick={() => theme === "dark" ? setTheme('light') : setTheme("dark")}></span>
            </span>
            <Moon width={20} height={20} />
          </div>
        </div>
      </article>
    </dialog>
  )
};

export default SelectBoard;