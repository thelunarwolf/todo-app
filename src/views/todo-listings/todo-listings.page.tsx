import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, TodoItem, UpdateTodo, PlaceholderImage } from '../../components/index.component'
import { ITodoItem } from '../../interfaces/todo-item.interface'
import { deleteTodos, fetchTodos, updateTodoOrder } from '../../store/actions/todo.actions'
import styles from './todo-listings.module.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoListingsPage() {
    const [showDialog, setShowDialog] = useState({
        isOpen: false,
        mode: 'create',
        todo: {} as ITodoItem
    });
    const todoList = useSelector((state: any) => state.todos.list)
    const dispatch = useDispatch();
    const [dateHolder, setdateHolder] = useState({
        day: '',
        date: '',
        month: '',
    });

    useEffect(() => {
        setDateHandler()
        dispatch(fetchTodos());
    }, []);

    const setDateHandler = () => {
        const date = new Date().toString().split(' ');
        setdateHolder({
            day: date[0],
            date: date[2],
            month: date[1],
        })
    }
    const handleOnDragEnd = (result: any) => {
        const items = Array.from(todoList) as ITodoItem[];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        dispatch(updateTodoOrder(items));
    }
    return (
        <div className={styles.list_page_container}>

            <div className={styles.page_content}>
                <h1 style={{ color: 'var(--primary-white)' }}>Todo App</h1>
                <div className={styles.header}>
                    <div className={styles.date_section}>
                        <h2>{dateHolder.day}, {dateHolder.date}</h2>
                        <p>{dateHolder.month}</p>
                    </div>
                    <p>{(todoList || []).length} Items</p>
                </div>
                <div style={{ position: 'relative' }}>
                    <div className={styles.add_icon} onClick={() => setShowDialog({
                        ...showDialog,
                        isOpen: true,
                    })}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
                <div className={styles.list_section}>
                    {(todoList || []).length ? <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="todos">
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef}>
                                    {(todoList || []).map((todo: ITodoItem, idx: number) => (<Draggable draggableId={todo.id + (idx + '')} index={idx} key={todo.id + (idx + '')} >
                                        {(provided) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <TodoItem todo={todo}
                                                    onEdit={() => {
                                                        setShowDialog({
                                                            isOpen: true,
                                                            mode: 'update',
                                                            todo: todo
                                                        })
                                                    }}
                                                    onDelete={() => dispatch(deleteTodos(todo.id))} />
                                            </li>
                                        )}
                                    </Draggable>))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>

                    </DragDropContext> : <><PlaceholderImage /></>}
                </div>
            </div>
            <Dialog isOpen={showDialog.isOpen}>
                <div>
                    <UpdateTodo mode={showDialog.mode} todo={showDialog.todo} onClose={() => setShowDialog({
                        isOpen: false,
                        mode: 'create',
                        todo: {} as ITodoItem
                    })} />
                </div>
            </Dialog>
        </div>
    )
}


export default TodoListingsPage;
