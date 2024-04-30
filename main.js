import './style.css'
import { App } from './src/todos/app'
import TodoStore from './src/store/todo.store';

TodoStore.initStore();

App('#app');

