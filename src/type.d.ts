type BriefType = {
    name: string
    description: string
    questions: Array<QuestionType>
}

type QuestionType = {
    id?: number
    name: string
    description: string
    questionType: QuestionTypes
    isRequired: boolean
    hasCustomFieldForFill?: boolean // For question checkbox type
    countRow?: number
    options?: Array<OptionType>
    from?: string // For slider question type
    to?: string // For slider question type
}

type OptionType = {
    name: string
    defaultIsChecked: boolean
    image: File | null
}
