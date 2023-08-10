import { changeBoardIndex, deleteBoard, selectBoardsState } from "@/redux/features/boards";
import { selectModalsState, toggleActiveModal } from "@/redux/features/modals";
import { useDispatch, useSelector } from "react-redux";

const DeleteBoard: React.FC = () => {
  const modalsState = useSelector(selectModalsState);
  const boardsState = useSelector(selectBoardsState);
  const dispatch = useDispatch();

  const handleDeleteBoard = () => {
    dispatch(deleteBoard());
    dispatch(toggleActiveModal(null));
    dispatch(changeBoardIndex(0))
  }

  const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
  };

  return (
    <dialog open={modalsState.activeModal === 'deleteBoard'} className="bg-[#000] bg-opacity-60 min-h-full w-screen absolute top-0 py-48 z-10" onClick={() => dispatch(toggleActiveModal('deleteBoard'))}>
      <article onClick={stopElementEventPropagation} className="bg-white w-[21.4375rem] p-6 rounded-lg mx-auto dark:bg-darkGray md:w-[30rem]">
        <h2 className="text-red text-lg font-bold mb-6">Delete this board?</h2>
        <p className="text-lightGray text-[0.8125rem] font-medium mb-6">Are you sure you want to delete the ‘{boardsState.project.boards[boardsState.currentBoardIndex]?.name}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className="md:flex md:justify-between md:items-center md:gap-4">
          <button className="bg-red text-white h-10 font-semibold text-[0.8125rem] w-full rounded-[1.25rem] mb-4 md:m-0 hover:bg-red-hover" onClick={() => handleDeleteBoard()}>Delete</button>
          <button className="bg-grey-button text-purple h-10 font-semibold text-[0.8125rem] w-full rounded-[1.25rem] dark:bg-white hover:bg-purple-hover" onClick={() => dispatch(toggleActiveModal('deleteBoard'))}>Cancel</button>
        </div>
      </article>
    </dialog>
  )
}

export default DeleteBoard;