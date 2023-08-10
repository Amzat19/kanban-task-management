import { createSlice } from "@reduxjs/toolkit";
import Boards from "../../../data.json";
import { RootState } from "../store";

const initialState: ProjectAndBoardStatus = {
    project: Boards,
    currentBoardIndex: 0
};

export const boardSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        changeBoardIndex: (state, action) => {
            return { ...state, currentBoardIndex: action.payload }
        },
        createNewBoard: (state, action) => {
            state.project.boards.push(action.payload)
        },
        editExistingBoard: (state, action) => {
            state.project.boards[state.currentBoardIndex] = action.payload
        },
        deleteBoard: (state) => {
            state.project.boards.splice(state.currentBoardIndex, 1);
        },
        addTaskToColumn: (state, action) => {
            const { status } = action.payload;
            const column = state.project.boards[state.currentBoardIndex].columns.find((column) => column.name === status);
            if (column) {
                column.tasks.push(action.payload)
            }
        },
        updateTask: (state, action) => {
            const { id, status } = action.payload;
            const newColumn = state.project.boards[state.currentBoardIndex].columns.find((column) => column.name === status);

            if (newColumn) {
                const taskIndex = newColumn.tasks.findIndex((task) => task.id === id);

                if (taskIndex !== -1) {
                    // Task exists in the new column, update it
                    newColumn.tasks[taskIndex] = action.payload;
                } else {
                    // Task not found in the new column, add it to the new column and remove from the old column
                    const oldColumn = state.project.boards[state.currentBoardIndex].columns.find((column) => column.tasks.some((task) => task.id === id));
                    if (oldColumn) {
                        const taskToRemoveIndex = oldColumn.tasks.findIndex((task) => task.id === id);
                        if (taskToRemoveIndex !== -1) {
                            oldColumn.tasks.splice(taskToRemoveIndex, 1);
                            newColumn.tasks.push(action.payload);
                        }
                    }
                }
            }
        },
        deleteTask: (state, action) => {
            const { id, status } = action.payload;
            const columnToDeleteFrom = state.project.boards[state.currentBoardIndex].columns.find((column) => column.name === status);
            if (columnToDeleteFrom) {
                console.log(columnToDeleteFrom)
                const taskIndex = columnToDeleteFrom.tasks.findIndex((task) => task.id === id);
                if (taskIndex !== -1) {
                    console.log(taskIndex !== -1)
                    columnToDeleteFrom.tasks.splice(taskIndex, 1);
                }
            }
        },
        toggleSubtaskCompletion: (state, action) => {
            const { taskId, subtaskId, isCompleted } = action.payload;

            const board = state.project.boards[state.currentBoardIndex];

            const column = board.columns.find((col) => col.tasks.some((task) => task.id === taskId));
            if (column) {
                const task = column.tasks.find((task) => task.id === taskId);
                if (task) {
                    const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);
                    if (subtask) {
                        subtask.isCompleted = isCompleted;
                    }
                }
            }
        }
    }
});

export const { changeBoardIndex, createNewBoard, editExistingBoard, deleteBoard, addTaskToColumn, updateTask, deleteTask, toggleSubtaskCompletion } = boardSlice.actions;
export const selectBoardsState = (state: RootState) => state.boards;
export default boardSlice.reducer