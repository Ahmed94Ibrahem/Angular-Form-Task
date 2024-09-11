import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface Model {
  name: string;
  email: string;
  acceptTerms: boolean;
  conuntry: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  form: FormGroup;
  undoStack: any[] = [];
  redoStack: any[] = [];
  canUndo = false;
  canRedo = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      userName: [''],
      email: [''],
      phoneNumber: [''],
      acceptTerms: [false],
      country: [''],
    });

    this.undoStack.push(this.form.value);
  }

  captureState() {
    const currentState = this.form.value;
    const lastState = this.undoStack[this.undoStack.length - 1];

    if (JSON.stringify(currentState) !== JSON.stringify(lastState)) {
      this.undoStack.push({ ...currentState });
      this.canUndo = this.undoStack.length > 1;
      this.redoStack = [];
      this.canRedo = false;
    }
  }
  undo() {
    if (this.undoStack.length > 1) {
      const lastState = this.undoStack.pop();
      this.redoStack.push(lastState);

      const previousState = this.undoStack[this.undoStack.length - 1];
      this.form.setValue(previousState);

      this.canUndo = this.undoStack.length > 1;
      this.canRedo = this.redoStack.length > 0;
    }
  }
  redo() {
    if (this.redoStack.length > 0) {
      const restoredState = this.redoStack.pop();
      this.undoStack.push(restoredState);
      this.form.setValue(restoredState);

      this.canUndo = this.undoStack.length > 1;
      this.canRedo = this.redoStack.length > 0;
    }
  }
}
