import Close from '../../public/assets/close.svg';

interface EditTaskProps {
    isEditTaskOpen: boolean;
    toggleEditTask: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ isEditTaskOpen, toggleEditTask }) => {

    const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
    };

    return (
        <dialog open={isEditTaskOpen} onClick={() => toggleEditTask()} className="bg-[#000] bg-opacity-60 min-h-screen w-screen absolute top-0 py-48">
            <article className="bg-white w-[21.4375rem] p-6 rounded-lg mx-auto dark:bg-darkGray md:w-[30rem]" onClick={stopElementEventPropagation}>
                <h2 className="text-darkBlack text-lg font-bold mb-6">Edit Task</h2>
                <form>
                    <label className="text-lightGray text-xs font-semibold grid gap-2 mb-6">
                        Title
                        <input type="text" name="newTaskTitle" placeholder="e.g Take coffee break" className="text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2" />
                    </label>
                    <label className="text-lightGray text-xs font-semibold grid gap-2 mb-6">
                        Description
                        <textarea name="newTaskDescription" placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little." className="text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-28 px-4 py-2 resize-none" />
                    </label>
                    <span className='h-max block mb-6'>
                        <h3 className="text-lightGray text-xs font-semibold mb-2">Subtasks</h3>
                        <div className='flex justify-between items-center gap-4'>
                            <input type="text" name="subtasks" placeholder="e.g. Make coffee" className="text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 mb-2 flex-1" />
                            <Close />
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <input type="text" name="subtasks" placeholder="e.g. Drink coffee & smile" className="text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 mb-2 flex-1" />
                            <Close />
                        </div>
                        <button className='bg-grey-button text-purple rounded-[1.25rem] h-10 w-full text-[0.8125rem] font-semibold'>+ Add New Subtask</button>
                    </span>
                    <label className='text-lightGray text-xs font-semibold grid gap-2 mb-6'>
                        Status
                        <select name="status" className='border border-lightGray rounded-[0.25rem] h-10'>
                            <option value='Doing'>Doing</option>
                        </select>
                    </label>
                    <button className='bg-purple text-white h-10 text-semibold text-[0.8125rem] w-full rounded-[1.25rem]'>Create Task</button>
                </form>
            </article>
        </dialog>
    )
}

export default EditTask