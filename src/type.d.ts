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
    defaultDate?: any
    hasCustomFieldForFill?: boolean // For question checkbox type
    countRow?: string
    options?: Array<OptionType>
    from?: string // For slider question type
    to?: string // For slider question type
}

type OptionType = {
    name: string
    defaultIsChecked: boolean
    image: File | null
}

type UserType = {
    id: number
    login: string
    createdAt: Date
    updatedAt: Date
}
