package com.igt.todoapp.service;

import java.util.List;

import com.igt.todoapp.entity.Todo;

/**
 * 
 *
 */
public interface TodoService {
	
	public List<Todo> getAllTodos();
	
	public Todo getTodoById(String id);
	
	public Todo createTodo(Todo todo);
	
	public Todo updateTodo(String id, Todo todo);
	
	public boolean deleteTodo(String id);
	
}
