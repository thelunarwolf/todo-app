import { ITodoItem } from "../../interfaces/todo-item.interface";
import {  UPDATE_TODO } from "../events/events";

const _initialState = {
    list: [] as ITodoItem[]
};

const todosReducer = (state = _initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_TODO: {
            console.log(payload, "[In Reducer, Storing Updated Todo]");
            return {...state, list: payload.todos};
        }
        default:
            return state;
    }
}

export default todosReducer;
