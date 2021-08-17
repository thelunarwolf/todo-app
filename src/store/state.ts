import { combineReducers, createStore, applyMiddleware } from 'redux';
import todosReducer from './reducers/todo.reducer';
import thunk from 'redux-thunk';


const AppReducers = combineReducers({
  todos: todosReducer,
});


let store = createStore(AppReducers, applyMiddleware(thunk));

export default store;