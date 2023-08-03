interface AddNewTaskProps {
    isAddNewTaskOpen: boolean;
    toggleAddNewTask: () => void;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({ isAddNewTaskOpen, toggleAddNewTask }) => {
    const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
    };
    return (
        <dialog open={isAddNewTaskOpen} onClick={() => toggleAddNewTask}>
            <article onClick={stopElementEventPropagation}>
                <h2>Add New Task</h2>
                <form>
                    <label>
                        Title
                        <input type="text" name="newTaskTitle" placeholder="e.g Take coffee break" />
                    </label>
                    <label>
                        Description
                        <input type="text" name="newTaskDescription" placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little." />
                    </label>
                    <span>
                        <h3>Subtasks</h3>
                        <input type="text" name="subtasks" placeholder="e.g. Make coffee" />
                        <input type="text" name="subtasks" placeholder="e.g. Drink coffee & smile" />
                        <button>+ Add New Subtask</button>
                    </span>
                    <label>
                        <select name="status">
                            <option value='Doing'>Doing</option>
                        </select>
                    </label>
                    <button>Create Task</button>
                </form>
            </article>
        </dialog>
    )
}

export default AddNewTask;