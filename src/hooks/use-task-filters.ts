import { parseAsString, useQueryStates } from "nuqs"

export const useTaskFilters = () => {
    return useQueryStates({
        status: parseAsString
    })
}