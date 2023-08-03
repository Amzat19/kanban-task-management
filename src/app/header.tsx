'use client'
import KanbanLogo from '../../public/assets/kanban-logo.svg';
import Arrow from '../../public/assets/arrow-down.svg';
import Ellipses from '../../public/assets/ellipses.svg';
import useViewport from '@/utils/useViewport';
import SelectBoard from './selectBoard';
import { useState } from 'react';
import AddNewTask from './addNewTask';

interface HeaderProps {
    theme: string | undefined;
    setTheme: (theme: string) => void
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
    const { width: viewportWidth }: { width: number } = useViewport();
    const [isSelectBoardOpen, setIsSelectBoardOpen] = useState(true);
    const [isAddNewTaskOpen, setIsAddNewTaskOpen] = useState(false);

    const toggleAddNewTask = () => {
        setIsAddNewTaskOpen(!isAddNewTaskOpen);
    }

    return (
        <header className='flex justify-between items-center h-16 p-4 bg-white md:h-20 md:p-6 md:border-b md:border-b-lightBlue desktop:h-24 dark:bg-darkGray dark:md:border-b-gray'>
            <div className='flex justify-between items-center gap-4'>
                {viewportWidth < 768 ? <KanbanLogo /> : null}
                <div className='flex justify-between items-center gap-2'>
                    <span className='text-header font-bold dark:text-white'>Platform Launch</span>
                    {viewportWidth < 768 ? <Arrow onClick={() => setIsSelectBoardOpen(!isSelectBoardOpen)} className={isSelectBoardOpen ? 'rotate-180' : null} /> : null}
                </div>
                {viewportWidth < 768 ? <SelectBoard isSelectBoardOpen={isSelectBoardOpen} theme={theme} setTheme={setTheme} /> : null}
            </div>
            <div className='flex justify-between items-center gap-4'>
                <button className='border-none bg-purple rounded-2xl px-4 py-1 text-white text-[15px] font-semibold md:h-12 md:rounded-3xl ' onClick={() => toggleAddNewTask()}>+ {viewportWidth >= 768 ? 'Add New Task' : null}</button>
                <AddNewTask isAddNewTaskOpen={isAddNewTaskOpen} toggleAddNewTask={toggleAddNewTask} />
                <Ellipses />
            </div>
        </header>
    )
}

export default Header;
