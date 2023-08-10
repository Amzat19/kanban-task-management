import { useDispatch, useSelector } from 'react-redux';
import Close from '../../../public/assets/close.svg';
import { selectModalsState, toggleActiveModal } from '@/redux/features/modals';
import { useState, useEffect, useCallback } from 'react';
import { editExistingBoard, selectBoardsState } from '@/redux/features/boards';
import { v4 as uuidv4 } from 'uuid';

const EditBoard: React.FC = () => {
  const modalsState = useSelector(selectModalsState);
  const boardsState = useSelector(selectBoardsState);
  const dispatch = useDispatch();

  const [editBoard, setEditBoard] = useState<Board | null>(null);
  const [boardNameError, setBoardNameError] = useState<string>('');
  const [columnsErrors, setColumnsErrors] = useState<string[]>([]);

  const setExistingBoardData = useCallback(() => {
    const boardData = boardsState.project.boards[boardsState.currentBoardIndex];
    setEditBoard({ ...boardData });
  }, [boardsState.currentBoardIndex, boardsState.project.boards]);

  const editBoardData = (event: ChangeEventType) => {
    const { name, value } = event.target;
    if (editBoard) {
      setEditBoard({
        ...editBoard,
        [name]: value
      })
    }
  }

  const addNewColumn = () => {
    if (editBoard) {
      setEditBoard({
        ...editBoard,
        columns: [
          ...editBoard.columns,
          {
            id: uuidv4(),
            name: '',
            tasks: []
          }
        ]
      })

    }
  }

  const editColumnName = (event: ChangeEventType, columnIndex: number) => {
    const { value } = event.target;

    if (editBoard) {
      //Since youre trying to modify a mutable state in redux, you have mutate it like this
      const updatedColumns = editBoard.columns.map((column, index) => {
        if (index === columnIndex) {
          return {
            ...column,
            name: value
          };
        }
        return column;
      });

      setEditBoard({
        ...editBoard,
        columns: updatedColumns
      });
    }
  }

  const removeColumn = (columnIndex: number) => {
    if (editBoard) {
      const updatedColumns = editBoard.columns.filter((_, index) => index !== columnIndex);

      setEditBoard({
        ...editBoard,
        columns: updatedColumns
      });
    }
  }

  const validateForm = () => {
    let isValid = true;
    if (editBoard) {
      // Validate board name
      if (editBoard.name.trim() === '') {
        setBoardNameError('Board name is required');
        isValid = false;
      } else {
        setBoardNameError('');
      }

      // Validate subtasks
      const columnsErrorArray: string[] = [];
      editBoard.columns.forEach((column) => {
        if (column.name === '') {
          columnsErrorArray.push('Column cannot be empty');
          isValid = false;
        } else {
          columnsErrorArray.push('')
        }
      });
      setColumnsErrors(columnsErrorArray);

      return isValid;
    }
  };

  const saveEditedBoardData = () => {
    if (editBoard && validateForm()) {
      dispatch(editExistingBoard(editBoard));
      dispatch(toggleActiveModal(null))
    }
  }

  const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
  };

  useEffect(() => {
    setExistingBoardData()
  }, [setExistingBoardData]);

  return (
    <dialog open={modalsState.activeModal === 'editBoard'} onClick={() => dispatch(toggleActiveModal('editBoard'))} className="bg-[#000] bg-opacity-60 min-h-full w-screen absolute top-0 py-48 z-10">
      <article className="bg-white w-[21.4375rem] p-6 rounded-lg mx-auto dark:bg-darkGray md:w-[30rem]" onClick={stopElementEventPropagation}>
        <h2 className="text-darkBlack text-lg font-bold mb-6 dark:text-white">Edit board</h2>
        {
          editBoard && (
            <form>
              <label className="text-lightGray text-xs font-semibold grid gap-2 mb-6 dark:text-white">
                Board Name
                <input
                  type="text"
                  name="name"
                  value={editBoard.name}
                  onChange={(e) => {
                    editBoardData(e);
                    setBoardNameError('');
                  }}
                  placeholder="e.g Web Design"
                  className={`text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 outline-none dark:bg-darkGray hover:border-purple focus:border-purple ${boardNameError ? 'border-red' : null}`} />
                {boardNameError ? <span className='text-xs text-red'>{boardNameError}</span> : null}
              </label>
              <span className='h-max block mb-6'>
                <h3 className="text-lightGray text-xs font-semibold mb-2 dark:text-white">Board Columns</h3>
                {
                  editBoard.columns?.map((column, columnIndex) => {
                    return (
                      <div key={column.id} className='relative flex justify-between items-center gap-4'>
                        <input
                          type="text"
                          name={`column-${columnIndex}`}
                          placeholder="e.g. Todo"
                          value={column.name}
                          onChange={(e) => editColumnName(e, columnIndex)} className={`text-[0.8125rem] font-normal border border-lightGray rounded-[0.25rem] h-10 px-4 py-2 mb-2 flex-1 outline-none dark:bg-darkGray hover:border-purple focus:border-purple ${columnsErrors[columnIndex] ? 'border-red' : null}`} />
                        <Close className="cursor-pointer fill-svg-red" onClick={() => removeColumn(columnIndex)} />
                        {columnsErrors[columnIndex] ? <span className='text-xs text-red absolute right-10 top-3 font-medium'>Cant be Empty</span> : null}
                      </div>
                    )
                  })
                }
                <button type='button' className='bg-grey-button text-purple rounded-[1.25rem] h-10 w-full text-[0.8125rem] font-semibold dark:bg-white hover:bg-purple-hover' onClick={() => addNewColumn()}>+ Add New Column</button>
              </span>
              <button type='button' className='bg-purple text-white h-10 font-semibold text-[0.8125rem] w-full rounded-[1.25rem] hover:bg-purple-hover' onClick={() => saveEditedBoardData()}>Save Changes</button>
            </form>
          )
        }
      </article>
    </dialog>
  )
}

export default EditBoard;