/**
 * 
 */
package com.igt.todoapp.controller;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.igt.todoapp.entity.Todo;
import com.igt.todoapp.repository.TodoRepository;

/**
 * @author PRAVEEN REDDY
 *
 */

@RestController
@RequestMapping("/todoapp")
@CrossOrigin("*")
public class TodoController {

	@Autowired
    TodoRepository todoRepository;

    @GetMapping("/todos")
    public List<Todo> getAllTodos() {
    	
        Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createdAt");
        return todoRepository.findAll(sortByCreatedAtDesc);
    }
    
    @PostMapping("/addTodo")
    public Todo createTodo(@Valid @RequestBody Todo todo) {
        //todo.setDone(false);
        return todoRepository.save(todo);
    }
    
    @GetMapping(value="/getTodo")
    public ResponseEntity<Todo> getTodoById(@RequestParam("id") String id) {
    	
    	Todo todo =  todoRepository.findOne(id);
    	
    	if(todo != null) {
    		return ResponseEntity.ok().body(todo);
    	} else {
    		return ResponseEntity.notFound().build();
    	}
    }
    
    @PutMapping(value="/update")
    public ResponseEntity<Todo> updateTodo(@Valid @RequestBody Todo todoInput) {
    
    	Todo todoEntity =  null;
    	
    	if(todoInput != null) {
    		todoEntity = todoRepository.findOne(todoInput.getId());
    		todoEntity.setName(todoInput.getName());
    		todoEntity.setNotes(todoInput.getNotes());
    		todoEntity.setDone(todoInput.isDone());
    		todoEntity.setDueDate(new Date(2018, 04, 16));
    		Todo updatedEntity = todoRepository.save(todoEntity);
    		if(updatedEntity != null) {
        		return ResponseEntity.ok().body(updatedEntity);
        	} else {
        		return ResponseEntity.notFound().build();
        	}
    	} else {
    		return ResponseEntity.notFound().build();
    	}
    }
    
    @DeleteMapping(value="/delete")
    public ResponseEntity<?> deleteTodo(@RequestParam("id") String id) {
    	
    	Todo todoEntity =  todoRepository.findOne(id);
    	
    	if(todoEntity != null) {
    		todoRepository.delete(todoEntity);
    		return ResponseEntity.ok().build();
    	} else {
    		return ResponseEntity.notFound().build();
    	}
    }
}
