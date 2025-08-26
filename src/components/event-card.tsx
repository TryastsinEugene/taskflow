import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface EventCardProps{
    title: string;
    status: string;
    id: string;
}

export const EventCard = ({
    title,
    status,
    id
} : EventCardProps) => {
    return(
        <div className="px-2 flex flex-col justify-between gap-10 items-center">
            <div className={cn(
                "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition"
            )}>
                <p>{title}</p>
                
            </div>
            <Badge variant={status === "Done" ? "done" : "undone"}>{status}</Badge>
        </div>
    )
}