import { createSelector } from '@ngrx/store';
import { AppState, FormState } from '../states/form.state';

export const selectFormState = (state: AppState) => state.form;

export const selectFormValue = createSelector(
  selectFormState,
  (state: FormState) => state.formValue
);

export const selectCanUndo = createSelector(
  selectFormState,
  (state: FormState) => state.canUndo
);

export const selectCanRedo = createSelector(
  selectFormState,
  (state: FormState) => state.canRedo
);
