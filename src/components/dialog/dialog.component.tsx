import React, { useContext } from "react"
import styles from './dialog.module.css';
import ReactDOM from "react-dom";
const Dialog = (props: any) => {
    if (!props.isOpen) return null;
    return ReactDOM.createPortal(
        <div className={`${styles.app}`}>
            <div className={styles.overlay}>
                <div className={styles.dialog}>
                    <div className={styles.data_section}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>,
        (document.getElementById('portal') as Element)
    )
}

export default Dialog;