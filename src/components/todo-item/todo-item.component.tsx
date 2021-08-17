import { faGripVertical, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './todo-item.module.css';

function TodoItem(props: any) {
    const {todo, onEdit, onDelete} = props;
    return (
        <div className={styles.todo_item}>
            <div className={styles.drag_option}>
                <FontAwesomeIcon icon={faGripVertical} />
            </div>
            <div className={styles.text_area}>
                <h4>{todo.title}</h4>
                <p>{todo.description}</p>
            </div>
            <div className={styles.edit_icons}>
                <FontAwesomeIcon icon={faPencilAlt} onClick={onEdit} />
                <FontAwesomeIcon icon={faTrashAlt} onClick={onDelete} />
            </div>
        </div>
    )
}

export default TodoItem;