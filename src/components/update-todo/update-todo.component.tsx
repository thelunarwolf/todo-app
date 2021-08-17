import styles from './update-todo.module.css';
import React, { useState } from 'react'
import { ITodoItem } from '../../interfaces/todo-item.interface';
import Input from '../input/input.component';
import TextArea from '../text-area/text-area.component';
import { useDispatch } from 'react-redux';
import { createTodo, updateTodo } from '../../store/actions/todo.actions';

function UpdateTodo(props: any): JSX.Element {
    const dispatch = useDispatch()
    const {mode, todo, onClose} = props;
    const [todoItem, setTodoItem] = useState({
        title: todo.title, 
        description: todo.description, 
    } as ITodoItem);

    const updateInputElement = (elem: string, value: any) => {
        setTodoItem({...todoItem, [elem]: value})
    }

    const submitTodoHandler = () => {    
        if (mode === 'create') {
            dispatch(createTodo(todoItem));
        } else if (mode === 'update') {
            dispatch(updateTodo({
                ...todo,
                ...todoItem,
            }))
        }
        onClose()
    }
   
    return (
        <div className={styles.update_todo}>
           <header>
              <h3> {mode === 'update' ? 'Update Todo' : 'Create Todo'}</h3>
              <span className={styles.close_button} onClick={onClose}>Close</span>
           </header>
           <section>
               <div className={styles.input_field}>
                {todoItem.title ? <label>Todo Title</label> :  null}
                <Input clear value={todoItem.title} placeholder="Enter Todo Title" type="text" name="search" changed={(value: any) => {updateInputElement('title', value)}}  cleared={(value: any) => {updateInputElement('title', '')}} ></Input>
               </div>
               <div className={styles.input_field}>
               {todoItem.description ? <label>Todo Description</label> :  null}
                <TextArea clear value={todoItem.description} placeholder="Enter Todo Description" name="description" changed={(value: any) => {updateInputElement('description', value)}} cleared={(value: any) => {updateInputElement('description', '')}}></TextArea>
               </div>
           </section>
           <footer>
               {/* {mode !== 'update' ? <button type="reset" className={`${styles.button} ${styles.reset_button}`}>Reset</button> : null} */}
               <button disabled={!todoItem.title || !todoItem.description} type="submit" className={`${styles.button} ${styles.submit_button}`} onClick={submitTodoHandler}>{mode === 'update' ? 'Update Todo' : 'Create Todo'}</button>
           </footer>
        </div>
    )
}

export default UpdateTodo;