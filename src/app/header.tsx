'use client'
import KanbanLogo from '../../public/assets/kanban-logo.svg';
import Arrow from '../../public/assets/arrow-down.svg';
import Ellipses from '../../public/assets/ellipses.svg';
import useViewport from '@/utils/useViewport';
import SelectBoard from './selectBoard';
import { useState } from 'react';
import AddNewTask from './addNewTask';
import DeleteBoard from './deleteBoard';
import DeleteTask from './deleteTask';

interface HeaderProps {
    theme: string | undefined;
    setTheme: (theme: string) => void
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
    const { width: viewportWidth }: { width: number } = useViewport();
    const [isSelectBoardOpen, setIsSelectBoardOpen] = useState<boolean>(false);
    const [isAddNewTaskOpen, setIsAddNewTaskOpen] = useState<boolean>(false);
    const [isDeleteBoardOpen, setIsDeleteBoardOpen] = useState(false);
    const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false)

    const toggleAddNewTask = () => {
        setIsAddNewTaskOpen(!isAddNewTaskOpen);
    }

    const toggleSelectBooard = () => {
        setIsSelectBoardOpen(!isSelectBoardOpen);
    }

    const toggleDeleteboard = () => {
        setIsDeleteBoardOpen(!isDeleteBoardOpen)
    }

    const toggleDeleteTask = () => {
        setIsDeleteTaskOpen(!isDeleteTaskOpen);
    }

    return (
        <header className='flex justify-between items-center h-16 p-4 bg-white md:h-20 md:p-6 md:border-b md:border-b-lightBlue desktop:h-24 dark:bg-darkGray dark:md:border-b-gray'>
            <div className='flex justify-between items-center gap-4'>
                {viewportWidth < 768 ? <KanbanLogo /> : null}
                <div className='flex justify-between items-center gap-2'>
                    <span className='text-header font-bold dark:text-white' onClick={() => toggleDeleteTask()}>Platform Launch</span>
                    <DeleteTask isDeleteTaskOpen={isDeleteTaskOpen} toggleDeleteTask={toggleDeleteTask} />
                    {viewportWidth < 768 ? <Arrow onClick={() => setIsSelectBoardOpen(!isSelectBoardOpen)} className={isSelectBoardOpen ? 'rotate-180' : null} /> : null}
                </div>
                <SelectBoard isSelectBoardOpen={isSelectBoardOpen} theme={theme} setTheme={setTheme} toggleSelectBoard={toggleSelectBooard} />
            </div>
            <div className='flex justify-between items-center gap-4'>
                <button className='border-none bg-purple rounded-2xl px-4 py-1 text-white text-[15px] font-semibold md:h-12 md:rounded-3xl ' onClick={() => toggleAddNewTask()}>+ {viewportWidth >= 768 ? 'Add New Task' : null}</button>
                <AddNewTask isAddNewTaskOpen={isAddNewTaskOpen} toggleAddNewTask={toggleAddNewTask} />
                <Ellipses onClick={() => toggleDeleteboard()} />
                <DeleteBoard isDeleteBoardOpen={isDeleteBoardOpen} toggleDeleteBoard={toggleDeleteboard} />
            </div>
        </header>
    )
}

export default Header;
