import { useDispatch, useSelector } from 'react-redux';
import Close from '../../../public/assets/close.svg';
import { selectModalsState, toggleActiveModal } from '@/redux/features/modals';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTaskToColumn, selectBoardsState } from '@/redux/features/boards';

const AddNewTask: React.FC = () => {
  const modalsState = useSelector(selectModalsState);
  const dispatch = useDispatch();
  const boardsState = useSelector(selectBoardsState);

  const [newTask, setNewTask] = useState<Task>({
    id: '',
    title: '',
    description: '',
    subtasks: [],
    status: '',
  });
  const [taskTitleError, setTaskTitleError] = useState<string>('');
  const [taskDescriptionError, setTaskDescriptionError] = useState<string>('');
  const [taskStatusError, setTaskStatusError] = useState<string>('');
  const [subtaskErrors, setSubtaskErrors] = useState<string[]>([]);

  const editNewTaskDetails = (event: ChangeEventType) => {
    const { name, value } = event.target;

    setNewTask({
      ...newTask,
      [name]: value
    })
  };

  const addNewSubtask = () => {
    setNewTask({
      ...newTask,
      subtasks: [
        ...newTask.subtasks,
        {
          id: uuidv4(),
          title: '',
          isCompleted: false
        }
      ]
    })
  };

  const editSubtaskTitle = (event: ChangeEventType, subtaskIndex: number) => {
    const { value } = event.target;

    const updatedTasks = { ...newTask };
    updatedTasks.subtasks[subtaskIndex].title = value;

    setNewTask({
      ...updatedTasks
    })
  }

  const removeSubtask = (subtaskIndex: number) => {
    const updatedSubtasks = newTask.subtasks.filter((subtask, index) => index !== subtaskIndex);

    setNewTask({
      ...newTask,
      subtasks: updatedSubtasks
    })
  }

  const validateForm = () => {
    let isValid = true;

    // Validate task title
    if (newTask.title.trim() === '') {
      setTaskTitleError('Title is required');
      isValid = false;
    } else {
      setTaskTitleError('');
    }

    // Validate task description
    if (newTask.description.trim() === '') {
      setTaskDescriptionError('Description is required');
      isValid = false;
    } else {
      setTaskDescriptionError('');
    }

    // Validate task status
    if (newTask.description.trim() === '') {
      setTaskStatusError('Status is required');
      isValid = false;
    } else {
      setTaskStatusError('');
    }

    // Validate subtasks
    const subtaskErrorsArray: string[] = [];
    newTask.subtasks.forEach((subtask) => {
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

  const handleAddTask = () => {
    if (validateForm()) {
      dispatch(addTaskToColumn(newTask));
      dispatch(toggleActiveModal(null));
      setNewTask({
        id: '',
        description: '',
        title: '',
        status: '',
        subtasks: []
      })
    }

  }

  const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
  };
  return (
    <dialog open={modalsState.activeModal === 'addNewTask'} onClick={() => dispatch(toggleActiveModal('addNewTask'))} className="bg-[#000] bg-opacity-30 min-h-full w-screen absolute top-0 py-48">
      <article className="bg-white w-[21.4375rem] p-6 rounded-lg mx-auto dark:bg-darkGray md:w-[30rem]" onClick={stopElementEventPropagation}>
        <h2 className="text-darkBlack text-lg font-bold mb-6 dark:text-white">Add New Task</h2>
        <form>
          <label className="text-lightGray text-xs font-semibold grid gap-2 mb-6 dark:text-white">
            Title
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={(e) => {
                editNewTaskDetails(e)
                setTaskTitleError('');
              }
              }
              placeholder="e.g Take coffee break"
              className={`text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 outline-none dark:bg-darkGray hover:border-purple focus:border-purple ${taskTitleError ? 'border-red' : null}`} />
            {taskTitleError ? <span className='text-xs text-red'>{taskTitleError}</span> : null}
          </label>
          <label className="text-lightGray text-xs font-semibold grid gap-2 mb-6 dark:text-white">
            Description
            <textarea
              name="description"
              value={newTask.description}
              onChange={
                (e) => {
                  editNewTaskDetails(e);
                  setTaskDescriptionError('')
                }
              }
              placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
              className={`text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-28 px-4 py-2 resize-none outline-none dark:bg-darkGray hover:border-purple focus:border-purple ${taskDescriptionError ? 'border-red' : null}`} />
            {taskDescriptionError ? <span className='text-xs text-red'>{taskDescriptionError}</span> : null}
          </label>
          <span className='h-max block mb-6'>
            <h3 className="text-lightGray text-xs font-semibold mb-2 dark:text-white">Subtasks</h3>
            {
              newTask.subtasks.map((subtask, subtaskIndex) => {
                return (
                  <div key={subtask.id} className='relative flex justify-between items-center gap-4'>
                    <input
                      type="text"
                      name={`subtask-${subtask}`}
                      value={subtask.title}
                      onChange={(e) => {
                        editSubtaskTitle(e, subtaskIndex);
                        const updatedSubtaskErrors = [...subtaskErrors];
                        updatedSubtaskErrors[subtaskIndex] = ''; // Clear the error message
                        setSubtaskErrors(updatedSubtaskErrors);
                      }}
                      placeholder="e.g. Make coffee"
                      className={`text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 mb-2 flex-1 outline-none dark:bg-darkGray hover:border-purple focus:border-purple ${subtaskErrors[subtaskIndex] ? 'border-red' : null}`} />
                    <Close className='cursor-pointer fill-svg-red' onClick={() => removeSubtask(subtaskIndex)} />
                    {subtaskErrors[subtaskIndex] ? <span className='text-xs text-red absolute right-10 top-3 font-medium'>Cant be Empty</span> : null}
                  </div>
                )

              })
            }
            <button
              type='button'
              className='bg-grey-button text-purple rounded-[1.25rem] h-10 w-full text-[0.8125rem] font-semibold dark:bg-white hover:bg-purple-hover'
              onClick={() => addNewSubtask()}>+ Add New Subtask</button>
          </span>
          <label className='text-lightGray text-xs font-semibold grid gap-2 mb-6 dark:text-white'>
            Status
            <select
              name="status"
              value={newTask.status}
              onChange={(e) => {
                editNewTaskDetails(e);
                setTaskStatusError('');
              }}
              className={`border border-lightGray rounded-[0.25rem] h-10 cursor-pointer outline-none dark:bg-darkGray hover:border-purple focus:border-purple ${taskStatusError ? 'border-red' : null}`}>
              <option hidden>Select status</option>
              {
                boardsState.project.boards[boardsState.currentBoardIndex]?.columns.map((column) => {
                  return (
                    <option key={column.id} value={column.name}>{column.name}</option>
                  )
                })
              }
            </select>
            {taskStatusError ? <span className='text-xs text-red'>{taskStatusError}</span> : null}
          </label>
          <button type='button' className='bg-purple text-white h-10 font-semibold text-[0.8125rem] w-full rounded-[1.25rem] hover:bg-purple-hover' onClick={() => handleAddTask()}>Create Task</button>
        </form>
      </article>
    </dialog>
  )
}

export default AddNewTask;