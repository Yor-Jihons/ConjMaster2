import { FormEvent, useRef, useState } from 'react';
import TextContainerBox from '../TextContainerBox/TextContainerBox';

interface Props {
    onInput?: ( isCorrect: boolean ) => void;
    person: string;
    answer: string;
}

const ConjTestBox = ({ onInput, person, answer }: Props) => {
    const [text, setText] = useState<string>( "" );
    const ref = useRef<HTMLInputElement>( null );
    const texbox_input = (  event: FormEvent<HTMLInputElement> ) => {
        const text: string = event.currentTarget.value;
        const answer: string = event.currentTarget.dataset.answer || "";
        setText( text );
        if( ref === null || ref.current === null ) return;

        if( text === answer ){
            ref.current.style.backgroundColor = "#ccffcc";
            onInput!( true );
        }else{
            ref.current.style.backgroundColor = "#ff0000";
            onInput!( false );
        }
    }

    const id: string = person + "." + answer + ".testbox";
    return (
        <>
            <TextContainerBox person={person} htmlFor={id}>
                <input type="text" value={text} onInput={texbox_input} id={id}
                    data-answer={answer} ref={ref} />
            </TextContainerBox>
        </>
    );
};

export default ConjTestBox;
