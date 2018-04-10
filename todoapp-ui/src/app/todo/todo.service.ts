import { Injectable } from '@angular/core';
import {Todo} from './todo';
import { TodoData } from './todo.data';

import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import { Resolve } from "@angular/router/src/interfaces";

@Injectable()
export class TodoService {

  pItems: Todo[] = TodoData;

  constructor(private http: Http) { }

  getAllTodos(): Observable<Todo[]> {
    // To convert Observable<Response> to Observable<Todo[]>
    // we are using the map operator
    return this.http.get('http://localhost:8080/todoapp/todos')
        .map(this.extractData)
        .catch(this.handleErrorObservable);
        
}

private extractData(res: Response) {
	let body = res.json();
        return body || {};
    }
    private handleErrorObservable (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.message || error);
    }

  getTodosFromData(): Todo[] {
    return this.pItems;
  }
  addTodo(todo: Todo): Observable<Todo> {
    let url = 'http://localhost:8080/todoapp/addTodo';
    return this.http.post(url, todo)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  updateTodo(todo: Todo): Observable<Todo> {
    let url = 'http://localhost:8080/todoapp/update';
    let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
    return this.http.put(url, todo)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  deleteTodo(id: string) {
    let url = 'http://localhost:8080/todoapp/delete?id='+ id;
    return this.http.delete(url);
  }

}
