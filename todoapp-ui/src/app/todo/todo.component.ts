import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import {Todo} from './todo';
import {TodoService} from './todo.service';

export enum SaveMode {
  None,
  New,
  Edit
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  formGroup: FormGroup;
  todos: Todo[] = [];
  saveMode: SaveMode = SaveMode.None;
  headerText: string;

  constructor(private _todoService: TodoService, private _formBuilder: FormBuilder) {
    this.formGroup = _formBuilder.group({
      'id': '',
      'name': '',
      'createdAt':  '',
      'dueDate': '',
      'done': '',
      'notes': ''});
  }

  ngOnInit() {
    this.getAllTodos();
  }

   getAllTodos() {
    this._todoService.getAllTodos().subscribe(todosData => this.todos = todosData,
    //  error => this.statusMessage = 'Problem with service please try again after some time');
    error => console.log('Problem with service please try again after some time'));
  }

  saveTodo(todo: Todo) {
    if (todo.id) {
      this._todoService.updateTodo(todo).subscribe(
        result => {
          let existingTodo = this.todos.find(todo => todo.id === result.id);
      Object.assign(existingTodo, result);
          },
        error => console.log(error)); 
       
    } else {
      this._todoService.addTodo(todo).subscribe(
      result => {console.log(result);
        this.todos.unshift(result);
      },
      error => console.log(error)); 
     }
    this.saveMode = SaveMode.None;
  }

  removeToDo(todo: Todo) {
    this._todoService.deleteTodo(todo.id).subscribe(
      result => {console.log(result);
        this.todos = this.todos.filter(to => todo.id != to.id);},
      error => console.log(error)); 
  }

  cancelEditTodo() {
    this.formGroup.reset();
    this.saveMode = SaveMode.None;
  }

  showEditForm(todo: Todo) {
    if (!todo) {
      return;
    }
    this.saveMode = SaveMode.Edit;
    this.headerText = 'Edit To-Do';
    const editedTodo = Object.assign({}, todo, { dueDate: this.applyLocale(todo.dueDate) });
    this.formGroup.setValue(editedTodo);
  }

  showNewForm() {
    this.formGroup.reset();
    this.saveMode = SaveMode.New;
    this.headerText = 'New ToDo';
  }

  showForm() {
    return this.saveMode !== SaveMode.None;
  }

  applyLocale(due) {
    return new DatePipe(navigator.language).transform(due, 'y-MM-dd');
  }
}
