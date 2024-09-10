import { createReducer, on } from '@ngrx/store';
import { initialState } from '../states/form.state';
import { redo, undo, updateForm } from '../actions/form.actions';

export const formReducer = createReducer(
  initialState,
  on(updateForm, (state, { formValue }) => {
    return {
      ...state,
      formValue,
      undoStack: [...state.undoStack, state.formValue],
      canUndo: true,
      redoStack: [],
      canRedo: false,
    };
  }),
  on(undo, (state) => {
    if (state.undoStack.length === 0) return state;

    const previousState = state.undoStack[state.undoStack.length - 1];
    const newUndoStack = state.undoStack.slice(0, -1);

    return {
      ...state,
      formValue: previousState,
      undoStack: newUndoStack,
      redoStack: [...state.redoStack, state.formValue],
      canUndo: newUndoStack.length > 0,
      canRedo: true,
    };
  }),
  on(redo, (state) => {
    if (state.redoStack.length === 0) return state;

    const nextState = state.redoStack[state.redoStack.length - 1];
    const newRedoStack = state.redoStack.slice(0, -1);

    return {
      ...state,
      formValue: nextState,
      undoStack: [...state.undoStack, state.formValue],
      redoStack: newRedoStack,
      canUndo: true,
      canRedo: newRedoStack.length > 0,
    };
  })
);
