import TextContainerBox from '../TextContainerBox/TextContainerBox';

interface Props {
    person: string;
    conjText: string;
}

const ConjSpanBox = ({ person, conjText }: Props) => {
    const id: string = person + "." + conjText + ".spanbox";
    return (
        <>
            <TextContainerBox person={person} htmlFor={id}>
                <span id={id}>{conjText}</span>
            </TextContainerBox>
        </>
    );
};

export default ConjSpanBox;
