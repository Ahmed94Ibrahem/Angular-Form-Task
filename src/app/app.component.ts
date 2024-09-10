import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { select, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { redo, undo, updateForm } from './store/actions/form.actions';
import {
  selectCanRedo,
  selectCanUndo,
  selectFormValue,
} from './store/selectors/form.selector';

import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { formReducer } from './store/reducers/form.reducer';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ form: formReducer }),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  form: FormGroup;
  formValue$: Observable<any>;
  canUndo$: Observable<boolean>;
  canRedo$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      subscribe: [false],
    });

    this.formValue$ = this.store.pipe(select(selectFormValue));
    this.canUndo$ = this.store.pipe(select(selectCanUndo));
    this.canRedo$ = this.store.pipe(select(selectCanRedo));

    this.form.valueChanges.subscribe((value: any) => {
      this.store.dispatch(updateForm({ formValue: value }));
    });
  }

  undo() {
    this.store.dispatch(undo());
  }

  redo() {
    this.store.dispatch(redo());
  }
}
