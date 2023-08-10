import useViewport from '@/utils/useViewport';
import PurpleEyeBox from '../../../public/assets/purple-eye-box.svg';
import ViewTask from './viewTask';
import EditTask from './editTask';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoardsState } from '@/redux/features/boards';
import { toggleActiveModal, toggleOpenTaskById } from '@/redux/features/modals';
import { v4 as uuidv4 } from 'uuid';

interface BoardProps {
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}

const Board: React.FC<BoardProps> = ({ isSideBarOpen, toggleSideBar }) => {
  const boardsState = useSelector(selectBoardsState);
  const dispatch = useDispatch();
  const { width: viewportWidth }: { width: number } = useViewport();

  return (
    <section className="flex gap-6 w-full overflow-x-auto mt-6 px-6">
      {boardsState.project.boards[boardsState.currentBoardIndex].columns.map((column) => {
        return (
          <div key={column.id}>
            <div>
              <span></span>
              <h2 className="text-lightGray text-xs font-semibold tracking-[0.15rem] mb-6">{column.name.toUpperCase()} ({column.tasks.length})</h2>
            </div>
            {
              column.tasks.map((task) => {
                const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;
                const totalSubtasks = task.subtasks.length;
                return (
                  <div key={task.id}>
                    <article className="boardTask bg-white w-[17.5rem] h-max px-4 py-[1.44rem] rounded-lg shadow-md mb-5 cursor-pointer dark:bg-darkGray" onClick={() => dispatch(toggleOpenTaskById(task.id))}>
                      <h3 className="text-medium font-bold text-darkBlack dark:text-white">{task.title}</h3>
                      <p className="text-xs text-lightGray font-semibold pt-1">{`${completedSubtasks} of ${totalSubtasks}`} substasks</p>
                    </article>
                    <ViewTask task={task} column={column} />
                  </div>

                )
              })
            }
            <EditTask />
          </div>
        )
      })}
      <div>
        <article className="newColumn bg-lightBlue min-h-[calc(100%-3rem)] rounded-lg mt-[2.5rem] w-[17.5rem] flex items-center justify-center cursor-pointer dark:bg-darkGray" onClick={() => dispatch(toggleActiveModal('editBoard'))}>
          <span className="text-header text-lightGray font-bold">+ New Column</span>
        </article>
      </div>
      {viewportWidth > 768 && !isSideBarOpen ? <PurpleEyeBox className='absolute bottom-8 left-0 cursor-pointer hover:opacity-20' onClick={() => toggleSideBar()} /> : null}
    </section>
  )
}

export default Board;