export interface AppState {
  form: FormState; // This will reference your form's slice of the state
}

export interface FormState {
  formValue: any;
  undoStack: any[];
  redoStack: any[];
  canUndo: boolean;
  canRedo: boolean;
}

export const initialState: FormState = {
  formValue: {},
  undoStack: [],
  redoStack: [],
  canUndo: false,
  canRedo: false,
};
