import Ellipses from '../../public/assets/ellipses.svg';

interface ViewTaskProps {
    isTaskOpen: boolean;
    toggleTask: () => void;
}

const ViewTask: React.FC<ViewTaskProps> = ({ toggleTask, isTaskOpen }) => {

    const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
    };

    return (
        <dialog open={isTaskOpen} className='bg-[#000] bg-opacity-60 min-h-screen w-screen absolute top-0  flex items-center justify-center py-48' onClick={() => toggleTask()}>
            <article className='bg-white w-[21.4375rem] p-6 rounded-lg dark:bg-darkGray' onClick={stopElementEventPropagation}>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-bold leading-5 w-64 dark:text-white'>Research pricing points of various competitors and trial different business models</h3>
                    <Ellipses />
                </div>
                <p className='text-[0.8125rem] text-lightGray font-medium mb-4'>We know what were planning to build for version one. Now we need to finalise the first pricing model well use. Keep iterating the subtasks until we have a coherent proposition.</p>
                <span className='text-lightGray text-xs font-bold mb-4 block'>Subtasks (2 of 3)</span>
                <div className='mb-2'>
                    <span className='bg-lightBlue h-[3.6875rem] w-full block px-3 py-4 dark:bg-veryDarkGray'>
                        <label htmlFor='subtaskTitle' className='text-xs text-lightGray font-bold flex items-center gap-4'>
                            <input type='checkbox' id='subtaskTitle' className='dark:bg-white' />
                            Research competitor pricing and business models
                        </label>
                    </span>
                </div>
                <div className='mb-2'>
                    <span className='bg-lightBlue h-[3.6875rem] w-full block px-3 py-4 dark:bg-veryDarkGray'>
                        <label htmlFor='subtaskTitle' className='text-xs text-lightGray font-bold flex items-center gap-4'>
                            <input type='checkbox' id='subtaskTitle' />
                            Research competitor pricing and business models
                        </label>
                    </span>
                </div>
                <div className='mb-2'>
                    <span className='bg-lightBlue h-[3.6875rem] w-full block px-3 py-4 dark:bg-veryDarkGray'>
                        <label htmlFor='subtaskTitle' className='text-xs text-lightGray font-bold flex items-center gap-4'>
                            <input type='checkbox' id='subtaskTitle' />
                            Research competitor pricing and business models
                        </label>
                    </span>
                </div>
                <label htmlFor='taskStatus' className='text-lightGray font-bold text-xs grid mt-6'>
                    Current Status
                    <select id='taskStatus' className='border border-lightGray border-opacity-25 rounded-[0.25rem] mt-2 h-10 text-darkBlack px-4 dark:bg-darkGray dark:text-white'>
                        <option>Doing</option>
                    </select>
                </label>
            </article>
        </dialog>
    )
}

export default ViewTask;