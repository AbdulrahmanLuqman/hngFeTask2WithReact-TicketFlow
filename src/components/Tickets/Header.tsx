import { v4 as uuidv4 } from "uuid";

import { ArrowLeft, Plus } from "lucide-react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/useUserContext"
import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    // id: z.uuid(),
    title: z.string().min(1,"title is required"),
    description: z.string().optional(),
    status: z.enum(["Open", "In progress", "Closed"]),
    priority: z.enum(["None", "Low", "Medium", "High"])
})


const Header = () => {
    const navigate = useNavigate()
    const {
      setUserInfo,
      editingTicket,
      setEditingTicket,
      isEditDialogOpen,
      setIsEditDialogOpen,
      editTicket,
    } = useUser();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "Open",
            priority: "None"
        }
    })

    useEffect(() => {
      if (editingTicket) {
        form.reset(editingTicket);
      }
    }, [editingTicket, form]);

    const onSubmit = (data: z.infer<typeof formSchema>) => {
      if (editingTicket) {
        editTicket(editingTicket.id, data);
        setEditingTicket(null);
      } else {
        const newTicket = { id: uuidv4(), ...data };
        setUserInfo((prev) => ({
          ...prev,
          tickets: [...prev.tickets, newTicket],
        }));
      }
      setIsEditDialogOpen(false);
      form.reset()
    };
  return (
    <header>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <ArrowLeft size={24} className="text-slate-600" />
              </button>
              <div>
                <h1 className="text-4xl font-bold text-slate-900">Ticket Management</h1>
                <p className="text-slate-600 mt-2">Create, view, edit, and manage your tickets</p>
              </div>
            </div>
            <Dialog onOpenChange={setIsEditDialogOpen} open={isEditDialogOpen}>
                <form id="tickets" onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogTrigger asChild>
                        <Button
                          className="px-6 py-7 cursor-pointer bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <Plus size={20} />
                          Create Ticket
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle> {editingTicket ? "Update Ticket" : "Create New Ticket"}</DialogTitle>
                        </DialogHeader>

                        <FieldGroup>
                            <Controller
                                name="title"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="title">
                                            Title
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Title"
                                        />
                                        {
                                            fieldState.invalid && (
                                              <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />
                            <Controller
                                name="description"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="desc">
                                            Description
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="desc"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="description"
                                        />
                                        {
                                            fieldState.invalid && (
                                              <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />
                            <Controller
                                name="status"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="status">
                                            Status
                                        </FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            defaultValue="Open"
                                        >
                                          <SelectTrigger id="status" aria-invalid={fieldState.invalid}>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Open">Open</SelectItem>
                                            <SelectItem value="In progress">In progress</SelectItem>
                                            <SelectItem value="Closed">Closed</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        {
                                            fieldState.invalid && (
                                              <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />
                            <Controller
                                name="priority"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="priority">
                                            Priority
                                        </FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            defaultValue="Open"
                                        >
                                          <SelectTrigger id="priority" aria-invalid={fieldState.invalid}>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="None">None</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        {
                                            fieldState.invalid && (
                                              <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <DialogFooter>
                            <Field orientation="horizontal">
                                <Button type="submit" form="tickets">
                                   {editingTicket ? "Update Ticket" : "Create Ticket"}
                                </Button>
                                <DialogClose asChild>
                                 {editingTicket ? 
                                 <Button type="button" variant="outline">
                                        Cancel
                                    </Button> : 
                                <Button type="button" variant="outline" onClick={() => form.reset()}>
                                        Reset
                                    </Button>}
                                </DialogClose>
                            </Field>
                        </DialogFooter>
                    </DialogContent>
                </form>
                
            </Dialog>
            
          </div>
        </div>
    </header>
  )
}

export default Header