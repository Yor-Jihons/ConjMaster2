import { ReactNode } from 'react';
import styles from "./textcontainerbox.module.css";

interface Props {
    children: ReactNode;
    htmlFor: string;
    person: string;
}

const TextContainerBox = ({ children, htmlFor, person }: Props) => {
    return (
        <p>
            <label htmlFor={htmlFor} className={styles.label1}>{person}</label>
            {children}
        </p>
    );
};

export default TextContainerBox;
