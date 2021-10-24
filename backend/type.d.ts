type QuestionType = {
    id?: number
    name: string
    description: string
    questionType: QuestionTypes
    isRequired: boolean
    countRow?: number
    hasCustomFieldForFill?: boolean // For question checkbox type
    options?: Array<OptionType>
    from?: string // For slider question type
    to?: string // For slider question type
}

type OptionType = {
    name: string
    defaultIsChecked: boolean
    image: File | null
}
