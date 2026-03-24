import { LanguageDefinition } from "./LanguageDefinition";


export const italianLanguageDefinition: LanguageDefinition = {
    language: "italian",
    groups: [
        {
            id: "non_finite",
            label: "分詞・準動詞",
            tenses: [
                { id: "present_participle", label: "現在分詞" },
                { id: "past_participle", label: "過去分詞" },
                { id: "gerund", label: "ジェルンディオ (現在)" },
                { id: "infinitive", label: "不定詞" }
            ]
        },
        {
            id: "indicative",
            label: "直説法",
            tenses: [
                { id: "pres_ind", label: "現在" },
                { id: "imp_ind", label: "半過去" },
                { id: "rem_ind", label: "遠過去" },
                { id: "fut_ind", label: "単純未来" },
                { id: "cond_ind", label: "条件法現在" }
            ]
        },
        {
            id: "subjunctive",
            label: "接続法",
            tenses: [
                { id: "pres_sub", label: "現在" },
                { id: "imp_sub", label: "半過去" }
            ]
        },
        {
            id: "imperative",
            label: "命令法",
            tenses: [
                { id: "pres_imp", label: "現在" }
            ]
        }
    ],
    // イタリア語の標準的な人称代名詞
    persons: ["io", "tu", "lui", "noi", "voi", "loro"]
};
