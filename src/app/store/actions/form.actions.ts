import { createAction, props } from '@ngrx/store';

export const updateForm = createAction(
  '[Form] Update Form',
  props<{ formValue: any }>()
);

export const undo = createAction('[Form] Undo');

export const redo = createAction('[Form] Redo');
