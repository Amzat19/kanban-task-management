import { deleteTask, selectBoardsState } from "@/redux/features/boards";
import { selectModalsState, toggleActiveModal } from "@/redux/features/modals";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteTask: React.FC = () => {
  const modalsState = useSelector(selectModalsState);
  const boardsState = useSelector(selectBoardsState);
  const dispatch = useDispatch();

  const [deleteTaskDetails, setDeleteTaskDetails] = useState<Task>({
    id: '',
    title: '',
    description: '',
    status: '',
    subtasks: []
  });

  const getTaskById = useCallback(() => {
    for (const board of boardsState.project.boards) {
      for (const columns of board.columns) {
        const task = columns.tasks.find((task) => task.id === modalsState.openTaskById);
        if (task) {
          setDeleteTaskDetails(task);
          return;
        }
      }
    }
  }, [boardsState.project.boards, modalsState.openTaskById]);

  const handleDeleteTask = (task: Task) => {
    dispatch(deleteTask(task));
    dispatch(toggleActiveModal(null))
  }

  const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
  };

  useEffect(() => {
    getTaskById();
  }, [getTaskById]);

  return (
    <dialog open={modalsState.activeModal === 'deleteTask'} className="bg-[#000] bg-opacity-60 min-h-full w-screen absolute top-0 py-48 z-10" onClick={() => dispatch(toggleActiveModal('deleteTask'))}>
      {
        deleteTaskDetails && (
          <article onClick={stopElementEventPropagation} className="bg-white w-[21.4375rem] p-6 rounded-lg mx-auto dark:bg-darkGray md:w-[30rem]">
            <h2 className="text-red text-lg font-bold mb-6">Delete this task?</h2>
            <p className="text-lightGray text-[0.8125rem] font-medium mb-6">Are you sure you want to delete the ‘{deleteTaskDetails.title}’ task and its subtasks? This action cannot be reversed.</p>
            <div className="md:flex md:justify-between md:items-center md:gap-4">
              <button type="button" className="bg-red text-white h-10 font-semibold text-[0.8125rem] w-full rounded-[1.25rem] mb-4 md:m-0 hover:bg-red-hover" onClick={() => handleDeleteTask(deleteTaskDetails)}>Delete</button>
              <button type="button" className="bg-grey-button text-purple h-10 font-semibold text-[0.8125rem] w-full rounded-[1.25rem] dark:bg-white hover:bg-purple-hover" onClick={() => dispatch(toggleActiveModal(null))}>Cancel</button>
            </div>
          </article>
        )
      }
    </dialog>
  )
}

export default DeleteTask;