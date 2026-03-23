import { FormEvent, useState } from 'react';
import TextContainerBox from '../TextContainerBox/TextContainerBox';

interface Props {
    onInput: ( userAnswer: string, answer: string ) => void;
    person: string;
    answer: string;
}

const ConjTestBox = ({ onInput, person, answer }: Props) => {
    const [text, setText] = useState<string>( "" );
    const texbox_input = (  event: FormEvent<HTMLInputElement> ) => {
        const text: string = event.currentTarget.value;
        const answer: string = event.currentTarget.dataset.answer || "";
        setText( text );
        onInput( text, answer );
    }

    const id: string = person + "." + answer + ".testbox";
    return (
        <>
            <TextContainerBox person={person} htmlFor={id}>
                <input type="text" value={text} onInput={texbox_input} id={id}
                    data-answer={answer} />
            </TextContainerBox>
        </>
    );
};

export default ConjTestBox;
