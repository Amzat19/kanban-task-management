import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: OpenModals = {
    openTaskById: null,
    activeModal: null
};

export const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        toggleOpenTaskById: (state, action) => {
            const clickedTaskId: string = action.payload;
            if (state.openTaskById === clickedTaskId) {

                return { ...state, openTaskById: null };
            } else {
                return { ...state, openTaskById: clickedTaskId };
            }
        },
        toggleActiveModal: (state, action) => {
            const modalName = action.payload;

            // Toggle the specified modal
            if (state.activeModal === modalName) {
                state.activeModal = null; // Close the modal if it's already open
            } else {
                state.activeModal = modalName; // Open the specified modal
            }
        }
    }
});

export const { toggleOpenTaskById, toggleActiveModal } = modalsSlice.actions;
export const selectModalsState = (state: RootState) => state.modals;
export default modalsSlice.reducer