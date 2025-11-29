"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeleteAccountSection() {
  const [isDeleting, setIsDeleting] = useState(false)

  function handleDelete() {
    setIsDeleting(true)
    setTimeout(() => setIsDeleting(false), 1000)
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Delete account</h2>
        <p className="text-sm text-muted-foreground">Delete your account and all of its resources</p>
      </div>
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <p className="font-medium text-destructive">Warning</p>
        <p className="text-sm text-destructive/80">Please proceed with caution, this cannot be undone.</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="mt-4" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete account"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete account</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
