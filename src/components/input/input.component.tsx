import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react"
import styles from './input.module.css';

const Input = (props: IInput) => {
    const ref = useRef<HTMLInputElement>(null);
    const changeHandler = (ev: any) => {
        props.changed(ev.target.value)
    };
    const clearInputHandler = (ev: any) => {
        props.changed('');
    };
    return (
        <div className={styles.input_container}>
            <input disabled={props.disabled} readOnly={props.readonly} className={styles.input_fld}
                value={props.value} onChange={changeHandler} type={props.type} ref={ref} autoCapitalize='on' autoComplete="off" 
                placeholder={props.placeholder} name={props.name} id={props.name} required={props.required}
            />
            {props.clear && props.value? <div className={styles.clear_ic} onClick={clearInputHandler}><FontAwesomeIcon icon={faTimes} /></div> : ''}
        </div>
    )
}

export default Input;

export interface IInput {
    value?: string;
    readonly?: boolean;
    type?: string;
    disabled?: boolean;
    name?: string;
    required?: boolean;
    clear?: boolean;
    cleared?: any;
    placeholder?: string;
    changed?: any;
}