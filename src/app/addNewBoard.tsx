import Close from '../../public/assets/close.svg';

interface AddNewBoardProps {
    isAddNewBoardOpen: boolean;
    toggleAddNewBoard: () => void;
}

const AddNewBoard: React.FC<AddNewBoardProps> = ({ isAddNewBoardOpen, toggleAddNewBoard }) => {
    const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
    };
    return (
        <dialog open={isAddNewBoardOpen} onClick={() => toggleAddNewBoard()} className="bg-[#000] bg-opacity-60 min-h-screen w-screen absolute top-0 py-48 z-10">
            <article className="bg-white w-[21.4375rem] p-6 rounded-lg mx-auto dark:bg-darkGray md:w-[30rem]" onClick={stopElementEventPropagation}>
                <h2 className="text-darkBlack text-lg font-bold mb-6">Add New board</h2>
                <form>
                    <label className="text-lightGray text-xs font-semibold grid gap-2 mb-6">
                        Board Name
                        <input type="text" name="newTaskTitle" placeholder="e.g Web Design" className="text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2" />
                    </label>
                    <span className='h-max block mb-6'>
                        <h3 className="text-lightGray text-xs font-semibold mb-2">Board Columns</h3>
                        <div className='flex justify-between items-center gap-4'>
                            <input type="text" name="subtasks" placeholder="e.g. Todo" className="text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 mb-2 flex-1" />
                            <Close />
                        </div>
                        <div className='flex justify-between items-center gap-4'>
                            <input type="text" name="subtasks" placeholder="e.g. Doing" className="text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 mb-2 flex-1" />
                            <Close />
                        </div>
                        <button className='bg-grey-button text-purple rounded-[1.25rem] h-10 w-full text-[0.8125rem] font-semibold'>+ Add New Column</button>
                    </span>
                    <button className='bg-purple text-white h-10 text-semibold text-[0.8125rem] w-full rounded-[1.25rem]'>Create Board</button>
                </form>
            </article>
        </dialog>
    )
}

export default AddNewBoard;