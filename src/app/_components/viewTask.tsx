import Ellipses from '../../../public/assets/ellipses.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalsState, toggleActiveModal, toggleOpenTaskById } from '@/redux/features/modals';
import { toggleSubtaskCompletion } from '@/redux/features/boards';

interface ViewTaskProps {
  task: Task;
  column: Column;
}

const ViewTask: React.FC<ViewTaskProps> = ({ task, column }) => {
  const modalsState = useSelector(selectModalsState);
  const dispatch = useDispatch();

  const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
  };

  const toggleModal = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(toggleOpenTaskById(task.id))
    event.stopPropagation()
  }

  const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <dialog open={modalsState.openTaskById === task.id} className='bg-[#000] bg-opacity-60 min-h-full w-screen absolute top-0 py-48' onClick={(e) => toggleModal(e)}>
      <article className='relative bg-white w-[21.4375rem] p-6 rounded-lg mx-auto dark:bg-darkGray md:w-[30rem]' onClick={stopElementEventPropagation}>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-bold leading-5 w-64 dark:text-white'>{task.title}</h3>
          <Ellipses className="cursor-pointer" onClick={() => dispatch(toggleActiveModal('taskMenu'))} />
        </div>
        <p className='text-[0.8125rem] text-lightGray font-medium mb-4'>{task.description}</p>
        <span className='text-lightGray text-xs font-bold mb-4 block'>Subtasks ({completedSubtasks} of {totalSubtasks})</span>
        {task.subtasks.map((subtask) => {
          return (
            <div key={subtask.id} className='mb-2'>
              <span className='bg-lightBlue h-max w-full block px-3 py-4 cursor-pointer dark:bg-veryDarkGray hover:bg-purple hover:bg-opacity-50 dark:hover:bg-purple dark:hover:bg-opacity-50'>
                <label htmlFor='subtaskTitle' className='text-xs text-lightGray font-bold flex items-center gap-4'>
                  <input
                    type='checkbox'
                    id='subtaskTitle'
                    className='cursor-pointer dark:bg-white'
                    checked={subtask.isCompleted}
                    onChange={() => dispatch(toggleSubtaskCompletion({ taskId: task.id, subtaskId: subtask.id, isCompleted: !subtask.isCompleted }))}
                  />
                  {subtask.title}
                </label>
              </span>
            </div>
          )
        })}
        <label htmlFor='taskStatus' className='text-lightGray font-bold text-xs grid mt-6'>
          Current Status
          <select id='taskStatus' className='border border-lightGray border-opacity-25 rounded-[0.25rem] mt-2 h-10 text-darkBlack px-4 dark:bg-darkGray dark:text-white' disabled>
            <option>{column.name}</option>
          </select>
        </label>
        {modalsState.activeModal === 'taskMenu' ? <div className='absolute h-[4.5rem] w-40 bg-white top-20 right-[-1rem] rounded-lg grid gap-2 p-4  md:right-[-5rem] dark:bg-veryDarkGray'>
          <span className='text-[0.8125rem] font-medium text-lightGray hover:opacity-60' onClick={() => { dispatch(toggleActiveModal('editTask')); dispatch(toggleOpenTaskById(null)) }}>Edit Task</span>
          <span className='text-[0.8125rem] font-medium text-red cursor-pointer hover:opacity-60' onClick={() => { dispatch(toggleActiveModal('deleteTask')); dispatch(toggleOpenTaskById(null)) }}>Delete Task</span>
        </div> : null}
      </article>
    </dialog>
  )
}

export default ViewTask;