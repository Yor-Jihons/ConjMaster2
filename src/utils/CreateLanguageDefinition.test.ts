import { describe, it, expect } from 'vitest';
import createLanguageDefinition from './CreateLanguageDefinition';
import { spanishLanguageDefinition } from '../types/SpanishLanguageDefinition';
import { frenchLanguageDefinition } from '../types/FrenchLanguageDefinition';
import { italianLanguageDefinition } from '../types/ItalianLanguageDefinition';

describe('createLanguageDefinition', () => {
    it('returns spanish language definition when languageName is "spanish"', () => {
        expect(createLanguageDefinition('spanish')).toEqual(spanishLanguageDefinition);
    });

    it('returns french language definition when languageName is "french"', () => {
        expect(createLanguageDefinition('french')).toEqual(frenchLanguageDefinition);
    });

    it('returns italian language definition when languageName is "italian"', () => {
        expect(createLanguageDefinition('italian')).toEqual(italianLanguageDefinition);
    });

    it('returns null for unknown language names', () => {
        expect(createLanguageDefinition('unknown')).toBeNull();
    });

    it('returns null for empty string', () => {
        expect(createLanguageDefinition('')).toBeNull();
    });
});
