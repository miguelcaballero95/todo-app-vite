import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderPending, renderTodos } from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompletedBtn: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'
};

export const App = (elementId) => {

    const displayTodos = () => {

        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }

    (() => {

        const app = document.createElement('div');
        app.innerHTML = html;

        document.querySelector(elementId).append(app);

        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedBtn = document.querySelector(ElementIDs.ClearCompletedBtn);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

    newDescriptionInput.addEventListener('keyup', (event) => {

        if (event.keyCode !== 13)
            return;

        if (event.target.value.trim().length <= 0)
            return;

        todoStore.addTodo(event.target.value);
        displayTodos();

        event.target.value = '';

    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        if (!event.target.classList.contains('destroy'))
            return;

        const element = event.target.closest('[data-id]');
        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodos();
    });

    clearCompletedBtn.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach(element => {
        element.addEventListener('click', (event) => {
            filtersLIs.forEach(el => el.classList.remove('selected'));
            event.target.classList.add('selected');
            switch (event.target.text) {
                case 'All':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendings':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completed':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }
            displayTodos();
        });
    });


}