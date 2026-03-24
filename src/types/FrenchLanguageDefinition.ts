import { LanguageDefinition } from "./LanguageDefinition";


export const frenchLanguageDefinition: LanguageDefinition = {
    language: "french",
    groups: [
        {
            id: "non_finite",
            label: "分詞・準動詞",
            tenses: [
                { id: "present_participle", label: "現在分詞" },
                { id: "past_participle", label: "過去分詞" },
                { id: "infinitive", label: "不定詞" }
            ]
        },
        {
            id: "indicative",
            label: "直説法",
            tenses: [
                { id: "pres_ind", label: "現在" },
                { id: "imp_ind", label: "半過去" },
                { id: "ps_ind", label: "単純過去" },
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
    // フランス語特有の3人称単数・複数を考慮した配列
    persons: ["je", "tu", "il", "nous", "vous", "ils"]
};
