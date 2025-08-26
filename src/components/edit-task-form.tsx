"use client"

import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Separator } from "./ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { DatePicker } from "./date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "@/tasks/type";
import { parseAsBoolean } from "nuqs";

interface EditTaskFormProps{
    onCancel: () => void;
    taskId: string;
}

export const EditTaskForm = ({
    onCancel,
    taskId
}: EditTaskFormProps) => {

    const [task, setTask] = useState<Task>();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
            const url = `https://taskflow-api-lcfd.onrender.com/tasks/${taskId}`

            const response = await axios.get<Task>(url);
            setTask(response.data); 
            console.log(response.data.priority)
            form.reset({
                            title: response.data.title,
                            description: response.data.description,
                            status: response.data.status,
                            priority: response.data.priority.toString(),
                        })
            } catch (error) {
            console.error("Error fetching tasks", error);
            }
        };

        fetchTasks();
        
    }, []);

    const formSchema = z.object({
        title: z.string().min(2).max(50),
        description: z.string(),
        status: z.boolean(),
        priority: z.string(),
        dueDate: z.date()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
                            title: "",
                            description: "",
                            status: false,
                            priority: "",
                            dueDate: new Date(),
                        },
    });

    function onSubmit(values: z.infer<typeof formSchema>){
        const payload = {
                            ...values,
                            priority: Number(values.priority), 
                        };

        axios.patch(`https://taskflow-api-lcfd.onrender.com/tasks/${taskId}`, payload )            
            .then(function (response) {
                onCancel();
                toast.success("Task updated!");
            })
            .catch(function (error) {
                toast.success("Task did not updated!");
            });
    }

    
    return(
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Edit a task
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <Separator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField control={form.control}
                                    name="title"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    placeholder="Enter name"  
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                                    name="description"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    placeholder="Enter description"  
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                                    name="dueDate"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Due Date
                                            </FormLabel>
                                            <FormControl>
                                               <DatePicker {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between">
                                <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select
                                        onValueChange={(val) => field.onChange(val === "true")}   
                                        value={field.value?.toString()} 
                                        >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem  value="true">
                                                Done
                                            </SelectItem>
                                            <SelectItem  value="false">
                                                Undone
                                            </SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl>
                                        <Select
                                        onValueChange={field.onChange}   
                                        value={field.value?.toString()} 
                                        >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num}
                                            </SelectItem>
                                            ))}
                                        </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                        
                        
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Button type="button" size="lg" variant="secondary" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" size="lg" variant="primary">
                                Save
                            </Button>
                        </div>
                        </div>
                    </form>
                </Form>
                
            </CardContent>
        </Card>
    )
}