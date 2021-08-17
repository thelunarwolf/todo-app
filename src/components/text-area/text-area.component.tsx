import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react"
import styles from './text-area.module.css';

const TextArea = (props: ITextArea) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const changeHandler = (ev: any) => {
        props.changed(ev.target.value)
    };
    const clearInputHandler = (ev: any) => {
        props.changed('');
    };
    return (
        <div className={styles.textarea_container}>
            <textarea disabled={props.disabled} readOnly={props.readonly} className={styles.textarea_fld}
                value={props.value} onChange={changeHandler} ref={ref} autoCapitalize='on' autoComplete="off" 
                placeholder={props.placeholder} name={props.name} id={props.name} required={props.required}
            />
            {props.clear && props.value ? <div className={styles.clear_ic} onClick={clearInputHandler}><span>Clear</span></div> : ''}
        </div>
    )
}

export default TextArea;

export interface ITextArea {
    value?: string;
    readonly?: boolean;
    disabled?: boolean;
    name?: string;
    required?: boolean;
    clear?: boolean;
    cleared?: any;
    placeholder?: string;
    changed?: any;
}