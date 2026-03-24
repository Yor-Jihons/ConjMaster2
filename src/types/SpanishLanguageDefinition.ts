import { LanguageDefinition } from "./LanguageDefinition";


export const spanishLanguageDefinition: LanguageDefinition = {
    language: "spanish",
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
                { id: "pret_ind", label: "点過去" },
                { id: "imp_ind", label: "線過去" },
                { id: "fut_ind", label: "未来" },
                { id: "cond_ind", label: "過去未来（条件法）" }
            ]
        },
        {
            id: "subjunctive",
            label: "接続法",
            tenses: [
                { id: "pres_sub", label: "現在" },
                { id: "imp_sub_ra", label: "過去 (-ra形)" },
                { id: "imp_sub_se", label: "過去 (-se形)" },
                { id: "fut_sub", label: "未来" }
            ]
        },
        {
            id: "imperative",
            label: "命令法",
            tenses: [
                { id: "aff_imp", label: "肯定命令" },
                { id: "neg_imp", label: "否定命令" }
            ]
        }
    ],
    persons: ["yo", "tú", "él", "nosotros", "vosotros", "ellos"]
};
