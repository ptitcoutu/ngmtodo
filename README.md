# Ngmtodo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Step to create todo
### create application with ng cli
```
ng new ngmtodo
cd ngmtodo
```
### install ng cli latest version and install material latest verstion with npm
```
npm install --save --save @angular/cli@latest @angular/cdk@latest @angular/animation@latest @angular/material@latest
ng update
```
 check material icon are added
```
cd src
vi index.html
# then add following line
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
 copy past link to material style (get the one of the material documentation)
```
vi style.css
# then add following line
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
``` 

### add dialog to add a todo

```
cd app
ng generate component dialog
```

add component input fields and output emiter

```
vi dialog/dialog.component.ts
```
Replace the content of the class with following lines
```  @Input() value: string;
  @Input() showPrompt: boolean;
  @Input() placeholder: string;
  @Input() title: string;
  @Input() template: string;
  @Input() okText: string;
  @Input() cancelText: string;
  @Output() valueEmitted = new EventEmitter<string>();

  constructor() {
    this.okText = 'OK';
    this.cancelText = 'Cancel';
  }

  ngOnInit() {
  }

  emitValue(value) {
   this.valueEmitted.emit(value);
  }
```
don't forget to import Input, Output, EventEmitter from angular core

### add dialog template content using mat card and mat-field-form

```
vi dialog/dialog.component.html
```
replace the content of the template with the following lines
```
<div class="overlay" *ngIf="showPrompt">
  <mat-card class="modalDialog">
    <mat-toolbar color="primary">
      {{title}}
    </mat-toolbar>
    <mat-card-content>
      <br>{{template}}<br><br>
      <mat-form-field class="full-width">
        <input matInput [placeholder]="placeholder"
               [(ngModel)]="value"
               (keyup.enter)="emitValue(value)"
               (keyup.escape)="emitValue(null)"/>
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions class="center">
      <button mat-button (click)="emitValue(null)" color="primary">{{cancelText}}</button>
      <button mat-raised-button (click)="emitValue(value)" color="primary">{{okText}}</button>
    </mat-card-actions>
  </mat-card>
</div>
```

### add todo logic structure
```
vi app.component.ts
```
replace the content of the class with the following lines
```
  showDialog = false;
  editingTodo: any = null;
  fieldValue = '';
  todoList: any = [];
  okButtonText = 'Create task';

  todoDialog(todo = null) {
    this.okButtonText = 'Create task';
    this.fieldValue = '';
    this.editingTodo = todo;
    if (todo) {
      this.fieldValue = todo.title;
      this.okButtonText = 'Edit task';
    }
    this.showDialog = true;
  }

  remove(index: number) {
    this.todoList.splice(index, 1);
  }

  editTodo(title) {
    this.editingTodo.title = title;
  }

  updateTodo(title) {
    if (title) {
      title = title.trim();
      if (this.editingTodo) {
        this.editTodo(title);
      } else {
        this.addTodo(title);
      }
    }
    this.hideDialog();
  }

  addTodo(title) {
    const todo = {title: title, completed: false};
    this.todoList.push(todo);
  }

  hideDialog() {
    this.showDialog = false;
    this.editingTodo = null;
    this.fieldValue = null; // make sure Input is new
  }

```

# add toto list template
```
vi app.component.html
```
and replace the content of the template with the following lines
```
<mat-card class="todoapp">
  <mat-toolbar color="primary">
    material-todo
    <button mat-fab class="fab-add" (click)="todoDialog()">
      <mat-icon>add</mat-icon>
    </button>
  </mat-toolbar>

  <mat-card-content *ngIf="todoList.length">
    <mat-list>
      <form>
        <mat-list-item *ngFor="let todo of todoList; let index=index" class="list-item">

          <mat-checkbox color="primary" type="checkbox" [name]="'item'+index" [(ngModel)]="todo.completed">
            <span [class.completed]="todo.completed">{{todo.title}}</span>
          </mat-checkbox>

          <span>
           <button mat-mini-fab (click)="remove(index)" color="primary">
             <mat-icon>delete_forever</mat-icon>
           </button>

           <button mat-mini-fab (click)="todoDialog(todo)" color="primary"
                   [disabled]="todo.completed">
             <mat-icon>mode_edit</mat-icon>
           </button>
         </span>

        </mat-list-item>
      </form>
    </mat-list>
  </mat-card-content>
</mat-card>

<app-dialog [title]="'New Task'"
            [template]="'Enter Task:'"
            [placeholder]="'What do you need to do?'"
            [okText]="okButtonText"
            [value]="fieldValue"
            (valueEmitted)="updateTodo($event)"
            [showPrompt]="showDialog">
</app-dialog>

```

# check mat modules are imported
```
vi app.module.ts
```
add following section to the import section of the app module
```
import {
  MatDialogModule, MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatButtonModule,
  MatCheckboxModule, MatListModule, MatIconModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
...

imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule, MatToolbarModule,
    MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule
  ]
```

# add style of the app

```
vi app.component.css
```
add following lines 
```
.list-item {
  width: 100%;
  border-bottom: 1px solid #CCC;
}

.list-item button .material-icons {
  font-size: 16px;
  padding: 0;
}

.list-item:hover button {
  display: block;
}

.list-item button {
  display: none;
  float: right;
  margin: -4px 5px;
  width: 30px;
  height: 30px;
}

.list-item /deep/ .md-checkbox-label {
  margin: 10px 0;
}

.completed {
  color: #9d9d9d;
  text-decoration: line-through;
}

.fab-add {
  position: absolute;
  right: 30px;
  top: 50px;
}
```

# Start the app and have fun :-)

```
ng server --open
```

