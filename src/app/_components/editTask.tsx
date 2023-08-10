import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Close from '../../../public/assets/close.svg';
import { selectModalsState, toggleActiveModal } from '@/redux/features/modals';
import { selectBoardsState, updateTask } from '@/redux/features/boards';
import { v4 as uuidv4 } from 'uuid';

const EditTask: React.FC = () => {
  const modalsState = useSelector(selectModalsState);
  const boardsState = useSelector(selectBoardsState);
  const dispatch = useDispatch();

  const [editTaskDetails, setEditTaskDetails] = useState<Task>({
    id: '',
    title: '',
    description: '',
    status: '',
    subtasks: []
  });
  const [taskTitleError, setTaskTitleError] = useState<string>('');
  const [taskDescriptionError, setTaskDescriptionError] = useState<string>('');
  const [taskStatusError, setTaskStatusError] = useState<string>('');
  const [subtaskErrors, setSubtaskErrors] = useState<string[]>([]);

  const handleEditTaskDetails = (event: ChangeEventType) => {
    const { name, value } = event.target;

    setEditTaskDetails({
      ...editTaskDetails,
      [name]: value
    })
  }

  const handleEditSubtasks = (event: ChangeEventType, subtaskIndex: number) => {
    const { value } = event.target;
    const updatedSubtasks = editTaskDetails.subtasks.map((subtask, index) => {
      if (index === subtaskIndex) {
        return {
          ...subtask,
          title: value
        }
      }
      return subtask
    });

    setEditTaskDetails({
      ...editTaskDetails,
      subtasks: updatedSubtasks
    })
  }

  const addNewSubtask = () => {
    setEditTaskDetails({
      ...editTaskDetails,
      subtasks: [
        ...editTaskDetails.subtasks,
        {
          id: uuidv4(),
          title: '',
          isCompleted: false
        }
      ]
    })
  }

  const removeSubtask = (subtaskIndex: number) => {
    const updatedSubtasks = editTaskDetails.subtasks.filter((subtask, index) => index !== subtaskIndex);

    setEditTaskDetails({
      ...editTaskDetails,
      subtasks: updatedSubtasks
    })
  }

  const validateForm = () => {
    let isValid = true;

    // Validate task title
    if (editTaskDetails.title.trim() === '') {
      setTaskTitleError('Title is required');
      isValid = false;
    } else {
      setTaskTitleError('');
    }

    // Validate task description
    if (editTaskDetails.description.trim() === '') {
      setTaskDescriptionError('Description is required');
      isValid = false;
    } else {
      setTaskDescriptionError('');
    }

    // Validate task status
    if (editTaskDetails.description.trim() === '') {
      setTaskStatusError('Status is required');
      isValid = false;
    } else {
      setTaskStatusError('');
    }

    // Validate subtasks
    const subtaskErrorsArray: string[] = [];
    editTaskDetails.subtasks.forEach((subtask) => {
      if (subtask.title === '') {
        subtaskErrorsArray.push('Subtask cannot be empty');
        isValid = false;
      } else {
        subtaskErrorsArray.push('')
      }
    });
    setSubtaskErrors(subtaskErrorsArray);

    return isValid;
  };

  const handleEditTask = () => {
    dispatch(updateTask(editTaskDetails));
    dispatch(toggleActiveModal(null));
  }

  const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
  };

  const getTaskById = useCallback(() => {
    for (const board of boardsState.project.boards) {
      for (const columns of board.columns) {
        const task = columns.tasks.find((task) => task.id === modalsState.openTaskById);
        if (task) {
          setEditTaskDetails(task)
          return;
        }
      }
    }
  }, [boardsState.project.boards, modalsState.openTaskById]);

  useEffect(() => {
    getTaskById();
  }, [getTaskById]);


  return (
    <dialog open={modalsState.activeModal === 'editTask'} onClick={() => dispatch(toggleActiveModal('editTask'))} className="bg-[#000] bg-opacity-30 min-h-full w-screen absolute top-0 py-48">
      <article className="bg-white w-[21.4375rem] p-6 rounded-lg mx-auto dark:bg-darkGray md:w-[30rem]" onClick={stopElementEventPropagation}>
        <h2 className="text-darkBlack text-lg font-bold mb-6 dark:text-white">Edit Task</h2>
        <form>
          <label className="text-lightGray text-xs font-semibold grid gap-2 mb-6 dark:text-white">
            Title
            <input
              type="text"
              name="title"
              placeholder="e.g Take coffee break"
              value={editTaskDetails.title}
              onChange={(e) => {
                handleEditTaskDetails(e);
                setTaskTitleError('');
              }}
              className={`text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 outline-none dark:bg-darkGray hover:border-purple focus:border-purple  ${taskTitleError ? 'border-red' : null}`} />
            {taskTitleError ? <span className='text-xs text-red'>{taskTitleError}</span> : null}
          </label>
          <label className="text-lightGray text-xs font-semibold grid gap-2 mb-6 dark:text-white">
            Description
            <textarea
              name="description"
              placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
              value={editTaskDetails.description}
              onChange={(e) => {
                handleEditTaskDetails(e);
                setTaskDescriptionError('');
              }}
              className={`text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-28 px-4 py-2 resize-none outline-none dark:bg-darkGray hover:border-purple focus:border-purple  ${taskDescriptionError ? 'border-red' : null}`} />
            {taskDescriptionError ? <span className='text-xs text-red'>{taskDescriptionError}</span> : null}
          </label>
          <span className='h-max block mb-6'>
            <h3 className="text-lightGray text-xs font-semibold mb-2 dark:text-white">Subtasks</h3>
            {
              editTaskDetails.subtasks.map((subtask, subtaskIndex) => {
                return (
                  <div className='relative flex justify-between items-center gap-4' key={subtask.id}>
                    <input
                      type="text"
                      name={`subtask-${subtaskIndex}`}
                      value={subtask.title}
                      onChange={(e) => {
                        handleEditSubtasks(e, subtaskIndex);
                        const updatedSubtaskErrors = [...subtaskErrors];
                        updatedSubtaskErrors[subtaskIndex] = '';
                        setSubtaskErrors(updatedSubtaskErrors);
                      }}
                      placeholder="e.g. Make coffee"
                      className={`text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 mb-2 flex-1 outline-none dark:bg-darkGray hover:border-purple focus:border-purple ${subtaskErrors[subtaskIndex] ? 'border-red' : null}`} />
                    <Close className="cursor-pointer fill-svg-red" onClick={() => removeSubtask(subtaskIndex)} />
                    {subtaskErrors[subtaskIndex] ? <span className='text-xs text-red absolute right-10 top-3 font-medium'>Cant be Empty</span> : null}
                  </div>
                )
              })
            }
            <button type='button' className='bg-grey-button text-purple rounded-[1.25rem] h-10 w-full text-[0.8125rem] font-semibold dark:bg-white hover:bg-purple-hover' onClick={() => addNewSubtask()}>+ Add New Subtask</button>
          </span>
          <label className='text-lightGray text-xs font-semibold grid gap-2 mb-6 dark:text-white'>
            Status
            <select
              name="status"
              className={`border border-lightGray rounded-[0.25rem] h-10 cursor-pointer outline-none dark:bg-darkGray hover:border-purple focus:border-purple  ${taskStatusError ? 'border-red' : null}`}
              value={editTaskDetails.status}
              onChange={(e) => {
                handleEditTaskDetails(e);
                setTaskStatusError('')
              }}
            >
              <option hidden>Select status</option>
              {
                boardsState.project.boards[boardsState.currentBoardIndex].columns.map((column) => {
                  return (
                    <option key={column.id} value={column.name}>{column.name}</option>
                  )
                })
              }
            </select>
            {taskStatusError ? <span className='text-xs text-red'>{taskStatusError}</span> : null}
          </label>
          <button type='button' className='bg-purple text-white h-10 font-semibold text-[0.8125rem] w-full rounded-[1.25rem] hover:bg-purple-hover' onClick={() => handleEditTask()}>Edit Task</button>
        </form>
      </article>
    </dialog>
  )
}

export default EditTask