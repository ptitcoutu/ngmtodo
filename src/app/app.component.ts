import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showDialog = false;
  editingTodo: any = null;
  fieldValue = '';
  todoList: any[] = [];
  $todoList$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  todoListLenght$: Observable<number> = this.$todoList$.map((todoList: any[]) => {
    console.log(todoList);
    return todoList.length;
  });

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
    this.$todoList$.next(this.todoList);
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
    this.$todoList$.next(this.todoList);
  }

  hideDialog() {
    this.showDialog = false;
    this.editingTodo = null;
    this.fieldValue = null; // make sure Input is new
  }
}
