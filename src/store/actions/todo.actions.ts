import { ITodoItem } from "../../interfaces/todo-item.interface"
import { fetchData, storeData } from "../../utils/storage.util";
import { UPDATE_TODO } from "../events/events";

export const createTodo = (todo: ITodoItem) => {
    return async (dispatch: any, getState: any) => { 
        todo.id = new Date().getTime() + '';
        todo.createdOn = new Date().toString();
        const _temp = getState().todos.list.concat(todo);
        storeData('TODOS', _temp).then(_res => {
            dispatch({type: UPDATE_TODO, payload: {todos: _temp}})
        }).catch(err => {
            console.error('Error', err);
        })
    }
}

export const updateTodo = (todo: ITodoItem) => {
    return async (dispatch: any, getState: any) => { 
        const data = getState().todos.list;
        const idx = data.findIndex((el: ITodoItem) => el.id === todo.id);
        const _temp = [...data];
        _temp[idx] = todo;
        storeData('TODOS', _temp).then(_res => {
            dispatch({type: UPDATE_TODO, payload: {todos: _temp}})
        }).catch(err => {
            console.error('Error', err);
        })
    }
}

export const deleteTodos = (id: string) => {
    return async (dispatch: any, getState: any) => { 
        const data = getState().todos.list;
        const idx = data.findIndex((el: ITodoItem) => el.id === id);
        const _temp = [...data];
        _temp.splice(idx, 1)
        storeData('TODOS', _temp).then(_res => {
            dispatch({type: UPDATE_TODO, payload: {todos: _temp}})
        }).catch(err => {
            console.error('Error', err);
        })
    }
}

export const fetchTodos = () => {
    return async (dispatch: any, getState: any) => { 
        fetchData('TODOS').then(_res => {
            dispatch({type: UPDATE_TODO, payload: {todos: _res}})
        }).catch(err => {
            console.error('Error', err);
        })
    }
}

export const updateTodoOrder = (todos: ITodoItem[]) => {
    return async (dispatch: any, getState: any) => { 
        storeData('TODOS', todos).then(_res => {
            dispatch({type: UPDATE_TODO, payload: {todos}})
        }).catch(err => {
            console.error('Error', err);
        });
    }
}