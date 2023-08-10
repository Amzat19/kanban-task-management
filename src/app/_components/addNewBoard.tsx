import { useDispatch, useSelector } from 'react-redux';
import Close from '../../../public/assets/close.svg';
import { selectModalsState, toggleActiveModal } from '@/redux/features/modals';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createNewBoard } from '@/redux/features/boards';

const AddNewBoard: React.FC = () => {
  const modalsState = useSelector(selectModalsState);
  const dispatch = useDispatch();

  const [newBoard, setNewBoard] = useState<Board>({
    id: '',
    name: '',
    isActive: false,
    columns: [],
  });
  const [boardNameError, setBoardNameError] = useState<string>('');
  const [columnsErrors, setColumnsErrors] = useState<string[]>([]);

  const addNewColumn = () => {
    setNewBoard({
      ...newBoard,
      columns: [
        ...newBoard.columns,
        {
          id: uuidv4(),
          name: '',
          tasks: []
        }
      ]
    })
  }

  const editNewBoard = (event: ChangeEventType) => {
    const { name, value } = event.target;

    setNewBoard({
      ...newBoard,
      [name]: value
    })
  }

  const editColumnName = (event: ChangeEventType, columnIndex: number) => {
    const { value } = event.target;
    const updatedColumns = [...newBoard.columns];
    updatedColumns[columnIndex].name = value;

    setNewBoard({
      ...newBoard,
      columns: updatedColumns
    })
  }

  const removeColumn = (columnIndex: number) => {
    const updatedColumns = newBoard.columns.filter((column, index) => index !== columnIndex);
    setNewBoard({
      ...newBoard,
      columns: updatedColumns
    })
  }

  const validateForm = () => {
    let isValid = true;

    // Validate board name
    if (newBoard.name.trim() === '') {
      setBoardNameError('Board name is required');
      isValid = false;
    } else {
      setBoardNameError('');
    }

    // Validate subtasks
    const columnsErrorArray: string[] = [];
    newBoard.columns.forEach((column) => {
      if (column.name === '') {
        columnsErrorArray.push('Column cannot be empty');
        isValid = false;
      } else {
        columnsErrorArray.push('')
      }
    });
    setColumnsErrors(columnsErrorArray);

    return isValid;
  };

  const handleSubmitNewBoard = () => {
    if (validateForm()) {
      const newBoardWithId = {
        ...newBoard,
        id: uuidv4()
      }

      dispatch(createNewBoard(newBoardWithId));

      dispatch(toggleActiveModal(null));
    }

  }

  const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
  };

  return (
    <dialog
      open={modalsState.activeModal === 'addNewboard'}
      onClick={() => dispatch(toggleActiveModal(null))}
      className="bg-[#000] bg-opacity-60 min-h-full w-screen absolute bottom-0 top-0 py-48 z-10">
      <article
        className="bg-white w-[21.4375rem] p-6 rounded-lg mx-auto dark:bg-darkGray md:w-[30rem]" onClick={stopElementEventPropagation}>
        <h2 className="text-darkBlack text-lg font-bold mb-6 dark:text-white">Add New board</h2>
        <form>
          <label className="text-lightGray text-xs font-semibold grid gap-2 mb-6 dark:text-white">
            Board Name
            <input
              type="text"
              name="name"
              placeholder="e.g Web Design"
              value={newBoard.name}
              onChange={(e) => {
                editNewBoard(e);
                setBoardNameError('');
              }}
              className={`text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 outline-none dark:bg-darkGray hover:border-purple focus:border-purple ${boardNameError ? 'border-red' : null}`} />

            {boardNameError ? <span className='text-xs text-red'>{boardNameError}</span> : null}
          </label>
          <span className='h-max block mb-6'>
            <h3 className="text-lightGray text-xs font-semibold mb-2 dark:text-white">Board Columns</h3>
            {
              newBoard.columns.map((column, columnIndex) => {
                return (
                  <div key={column.id} className='relative
                                    flex justify-between items-center gap-4'>
                    <input
                      type="text"
                      name={`column-${columnIndex}`}
                      placeholder="e.g. Doing"
                      value={column.name}
                      onChange={(e) => {
                        editColumnName(e, columnIndex);
                        const updatedColumnErrors = [...columnsErrors];
                        updatedColumnErrors[columnIndex] = ''; // Clear the error message
                        setColumnsErrors(updatedColumnErrors);
                      }
                      }
                      className={`text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 mb-2 flex-1 outline-none dark:bg-darkGray  hover:border-purple focus:border-purple  ${columnsErrors[columnIndex] ? 'border-red' : null} `} />

                    <Close className='cursor-pointer fill-svg-red' onClick={() => removeColumn(columnIndex)} />
                    {columnsErrors[columnIndex] ? <span className='text-xs text-red absolute right-10 top-3 font-medium'>Cant be Empty</span> : null}
                  </div>
                )
              })
            }
            <button
              type='button'
              className='bg-grey-button text-purple rounded-[1.25rem] h-10 w-full text-[0.8125rem] font-semibold dark:bg-white hover:bg-purple-hover'
              onClick={() => addNewColumn()}>+ Add New Column</button>
          </span>
          <button
            type='button'
            className='bg-purple text-white h-10 font-semibold text-[0.8125rem] w-full rounded-[1.25rem] hover:bg-opacity-50'
            onClick={() => handleSubmitNewBoard()}>Create Board</button>
        </form>
      </article>
    </dialog>
  )
}

export default AddNewBoard;