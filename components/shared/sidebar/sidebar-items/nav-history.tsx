"use client"

import * as React from "react"
import {
    MoreHorizontal,
    Trash2,
    Pencil,
    MessageSquare,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"

interface Chat {
    id: string
    name: string
    url: string
}

export function NavHistory({
    initialChats,
}: {
    initialChats: Chat[]
}) {
    const { isMobile } = useSidebar()
    const [chats, setChats] = React.useState(initialChats)
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)
    const [editName, setEditName] = React.useState("")

    const handleRenameStart = (chat: Chat) => {
        setEditingId(chat.id)
        setEditName(chat.name)
    }

    const handleRenameSave = () => {
        if (editingId) {
            setChats(chats.map(c => c.id === editingId ? { ...c, name: editName } : c))
            setEditingId(null)
        }
    }

    const handleDelete = () => {
        if (deleteId) {
            setChats(chats.filter(c => c.id !== deleteId))
            setDeleteId(null)
        }
    }

    return (
        <>
            <SidebarGroup className="group-data-[collapsible=icon]:hidden py-0">
                <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground/70 uppercase tracking-wider mt-4 mb-2">
                    Recents
                </SidebarGroupLabel>
                <SidebarMenu>
                    {chats.map((item) => (
                        <SidebarMenuItem key={item.id} className="group/item">
                            {editingId === item.id ? (
                                <div className="flex items-center px-2 py-1">
                                    <Input
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        onBlur={handleRenameSave}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleRenameSave()
                                        }}
                                        autoFocus
                                        className="h-8 text-sm"
                                    />
                                </div>
                            ) : (
                                <>
                                    <SidebarMenuButton asChild className="h-9 rounded-lg px-3 hover:bg-sidebar-accent/50 transition-all duration-200">
                                        <a href={item.url} className="flex items-center gap-3">
                                            <MessageSquare className="h-4 w-4 text-muted-foreground/50 group-hover/item:text-primary/70 transition-colors" />
                                            <span className="truncate text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">{item.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuAction showOnHover className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">More</span>
                                            </SidebarMenuAction>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-48 rounded-lg shadow-lg border-border/50"
                                            side={isMobile ? "bottom" : "right"}
                                            align={isMobile ? "end" : "start"}
                                        >
                                            <DropdownMenuItem onClick={() => handleRenameStart(item)} className="cursor-pointer">
                                                <Pencil className="text-muted-foreground h-4 w-4 mr-2" />
                                                <span>Rename</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => setDeleteId(item.id)} className="cursor-pointer text-destructive focus:text-destructive">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                <span>Delete</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your chat history.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
