import useViewport from '@/utils/useViewport';
import PurpleEyeBox from '../../public/assets/purple-eye-box.svg';
import ViewTask from './viewTask';
import EditTask from './editTask';
import { useState } from 'react';

interface BoardProps {
    isSideBarOpen: boolean;
    toggleSideBar: () => void;
}

const Board: React.FC<BoardProps> = ({ isSideBarOpen, toggleSideBar }) => {
    const { width: viewportWidth }: { width: number } = useViewport();
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);

    const toggleTask = () => {
        setIsTaskOpen(!isTaskOpen);
    }

    const toggleEditTask = () => {
        setIsEditTaskOpen(!isEditTaskOpen);
    }

    return (
        <section className="flex gap-6 w-full overflow-x-auto mt-6 px-6">
            <div>
                <div>
                    <span></span>
                    <h2 className="text-lightGray text-xs font-semibold tracking-[0.15rem] mb-6">TODO (4)</h2>
                </div>
                <article className="bg-white w-[17.5rem] h-[5.5rem] px-4 py-[1.44rem] rounded-lg shadow-md mb-5 dark:bg-darkGray" onClick={() => toggleTask()}>
                    <h3 className="text-medium font-bold text-darkBlack dark:text-white">Build UI for onboarding flow</h3>
                    <p className="text-xs text-lightGray font-semibold">0 of 3 substasks</p>
                </article>
                <ViewTask toggleTask={toggleTask} isTaskOpen={isTaskOpen} />
                <article className="bg-white w-[17.5rem] h-[5.5rem] px-4 py-[1.44rem] rounded-lg shadow-md mb-5 dark:bg-darkGray" onClick={() => toggleEditTask()}>
                    <h3 className="text-medium font-bold text-darkBlack dark:text-white">Build UI for onboarding flow</h3>
                    <p className="text-xs text-lightGray font-semibold">0 of 3 substasks</p>
                </article>
                <EditTask isEditTaskOpen={isEditTaskOpen} toggleEditTask={toggleEditTask} />
                <article className="bg-white w-[17.5rem] h-[5.5rem] px-4 py-[1.44rem] rounded-lg shadow-md mb-5 dark:bg-darkGray ">
                    <h3 className="text-medium font-bold text-darkBlack dark:text-white">Build UI for onboarding flow</h3>
                    <p className="text-xs text-lightGray font-semibold">0 of 3 substasks</p>
                </article>
            </div>
            <div>
                <div>
                    <span></span>
                    <h2 className="text-lightGray text-xs font-semibold tracking-[0.15rem] mb-6">TODO (4)</h2>
                </div>
                <article className="bg-white w-[17.5rem] h-[5.5rem] px-4 py-[1.44rem] rounded-lg shadow-md mb-5 dark:bg-darkGray">
                    <h3 className="text-medium font-bold text-darkBlack dark:text-white">Build UI for onboarding flow</h3>
                    <p className="text-xs text-lightGray font-semibold">0 of 3 substasks</p>
                </article>
                <article className="bg-white w-[17.5rem] h-[5.5rem] px-4 py-[1.44rem] rounded-lg shadow-md mb-5 dark:bg-darkGray">
                    <h3 className="text-medium font-bold text-darkBlack dark:text-white">Build UI for onboarding flow</h3>
                    <p className="text-xs text-lightGray font-semibold">0 of 3 substasks</p>
                </article>
                <article className="bg-white w-[17.5rem] h-[5.5rem] px-4 py-[1.44rem] rounded-lg shadow-md mb-5 dark:bg-darkGray">
                    <h3 className="text-medium font-bold text-darkBlack dark:text-white">Build UI for onboarding flow</h3>
                    <p className="text-xs text-lightGray font-semibold">0 of 3 substasks</p>
                </article>
            </div>
            <div>
                <div>
                    <span></span>
                    <h2 className="text-lightGray text-xs font-semibold tracking-[0.15rem] mb-6">TODO (4)</h2>
                </div>
                <article className="bg-white w-[17.5rem] h-[5.5rem] px-4 py-[1.44rem] rounded-lg shadow-md mb-5 dark:bg-darkGray">
                    <h3 className="text-medium font-bold text-darkBlack dark:text-white">Build UI for onboarding flow</h3>
                    <p className="text-xs text-lightGray font-semibold">0 of 3 substasks</p>
                </article>
                <article className="bg-white w-[17.5rem] h-[5.5rem] px-4 py-[1.44rem] rounded-lg shadow-md mb-5 dark:bg-darkGray">
                    <h3 className="text-medium font-bold text-darkBlack dark:text-white">Build UI for onboarding flow</h3>
                    <p className="text-xs text-lightGray font-semibold">0 of 3 substasks</p>
                </article>
                <article className="bg-white w-[17.5rem] h-[5.5rem] px-4 py-[1.44rem] rounded-lg shadow-md mb-5 dark:bg-darkGray">
                    <h3 className="text-medium font-bold text-darkBlack dark:text-white">Build UI for onboarding flow</h3>
                    <p className="text-xs text-lightGray font-semibold">0 of 3 substasks</p>
                </article>
            </div>
            <div>
                <article className="bg-lightBlue h-[calc(100%-3rem)] rounded-lg mt-[2.5rem] w-[17.5rem] flex items-center justify-center dark:bg-darkGray">
                    <span className="text-header text-lightGray font-bold">+ New Column</span>
                </article>
            </div>
            {viewportWidth > 768 && !isSideBarOpen ? <PurpleEyeBox className='absolute bottom-8 left-0' onClick={() => toggleSideBar()} /> : null}
        </section>
    )
}

export default Board;