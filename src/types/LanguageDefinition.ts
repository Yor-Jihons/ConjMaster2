export interface LanguageDefinitionTense{
    id: string; // 英名
    label: string; // 日本語表記
}

export interface LanguageDefinitionGroup{
    id: string; // 英名
    label: string; // 日本語表記
    tenses: LanguageDefinitionTense[]; // このグループに属する活用列
}

export interface LanguageDefinition{
    language: string; // "spanish" or "french" or "italian"
    groups: LanguageDefinitionGroup[]; // 「直説法」等のグループ
    persons: string[]; // 人称配列
}
