import { frenchLanguageDefinition } from "../types/FrenchLanguageDefinition";
import { italianLanguageDefinition } from "../types/ItalianLanguageDefinition";
import { spanishLanguageDefinition } from "../types/SpanishLanguageDefinition";

export default function createLanguageDefinition( languageName: string ){
    if( languageName === "spanish" ) return spanishLanguageDefinition;
    if( languageName === "french" ) return frenchLanguageDefinition;
    if( languageName === "italian" ) return italianLanguageDefinition;
return null;
}