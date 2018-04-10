import {Todo} from './todo';

export const TodoData: Todo[] = [
 {
   id: '1',
   name: 'Lunch with Lily',
   notes: 'sea food',
   createdAt: new Date(),
   dueDate: new Date(new Date().setDate(new Date().getDate() + 4)),
   done: false
 }, {
   id: '2',
   name: 'Visit N. Hirano',
   notes: 'confirm the meeting ahead of time',
   createdAt: new Date(),
   dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
   done: false
 }, {
   id: '3',
   name: 'Do the groceries',
   notes: '',
   createdAt: new Date(),
   dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
   done: true
 }
];