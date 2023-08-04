interface DeleteBoardProps {
    isDeleteBoardOpen: boolean;
    toggleDeleteBoard: () => void;
}

const DeleteBoard: React.FC<DeleteBoardProps> = ({ isDeleteBoardOpen, toggleDeleteBoard }) => {
    const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
    };
    return (
        <dialog open={isDeleteBoardOpen} className="bg-[#000] bg-opacity-60 min-h-screen w-screen absolute top-0 py-48 z-10" onClick={() => toggleDeleteBoard()}>
            <article onClick={stopElementEventPropagation} className="bg-white w-[21.4375rem] p-6 rounded-lg mx-auto dark:bg-darkGray md:w-[30rem]">
                <h2 className="text-red text-lg font-bold mb-6">Delete this board?</h2>
                <p className="text-lightGray text-[0.8125rem] font-medium mb-6">Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
                <div className="md:flex md:justify-between md:items-center md:gap-4">
                    <button className="bg-red text-white h-10 text-semibold text-[0.8125rem] w-full rounded-[1.25rem] mb-4 md:m-0">Delete</button>
                    <button className="bg-grey-button text-purple h-10 text-semibold text-[0.8125rem] w-full rounded-[1.25rem] dark:bg-white">Cancel</button>
                </div>
            </article>
        </dialog>
    )
}

export default DeleteBoard;