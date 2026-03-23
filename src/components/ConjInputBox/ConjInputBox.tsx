import { FormEvent, useState } from 'react';
import TextContainerBox from '../TextContainerBox/TextContainerBox';

interface Props {
    onInput: ( langId: number, verbId: number, conjId:number, conjText: string ) => void;
    langId: number;
    verbId: number;
    conjId: number;
    person: string;
}

const ConjInputBox = ({ onInput, langId, verbId, conjId, person }: Props) => {
    const [text, setText] = useState<string>( "" );
    const texbox_input = (  event: FormEvent<HTMLInputElement> ) => {
        const t: string = event.currentTarget.value;
        const langId = Number( event.currentTarget.dataset.langid );
        const verbId = Number( event.currentTarget.dataset.verbid );
        const conjId = Number( event.currentTarget.dataset.verbid );
        setText( t );
        onInput( langId, verbId, conjId, t );
    }

    const id: string = langId + "." + verbId + "." + conjId + ".inputbox";
    return (
        <>
            <TextContainerBox person={person} htmlFor={id}>
                <input type="text" value={text} onInput={texbox_input} id={id}
                    data-langid={langId} data-verbid={verbId} data-conjid={conjId} />
            </TextContainerBox>
        </>
    );
};

export default ConjInputBox;
