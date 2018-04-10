package com.igt.todoapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igt.todoapp.entity.Todo;
import com.igt.todoapp.repository.TodoRepository;

@Service("TodoService")
public class TodoServiceImpl implements TodoService {
	
	@Autowired
    TodoRepository todoRepository;
	

	public TodoServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Todo> getAllTodos() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Todo getTodoById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Todo createTodo(Todo todo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Todo updateTodo(String id, Todo todo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteTodo(String id) {
		// TODO Auto-generated method stub
		return false;
	}

}
