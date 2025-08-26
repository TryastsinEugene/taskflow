import { ListCheckIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select"
import { useTaskFilters } from "@/hooks/use-task-filters"

export const DataFilters = () =>{

    const [{
        status
    }, setFilters] = useTaskFilters();

    const onStatusChange = (value: string) => {
        if(value === "all"){
            setFilters({ status: null });
        }else{
            setFilters({ status: value })
        }

    }
    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select defaultValue={status ?? undefined}
                    onValueChange={(value) => onStatusChange(value)}
                    >

                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                       <ListCheckIcon className="size-4 mr-2" /> 
                       <SelectValue placeholder="All statuses" />
                    </div>    
                </SelectTrigger>       
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="undone">Undone</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}