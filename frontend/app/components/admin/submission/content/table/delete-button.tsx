"use client";

import { useState, useTransition } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/app/components/ui/dialog";
import { deleteSubmissionById } from "../../actions/deleteSubmissionById";
import toast from "react-hot-toast";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteSubmissionButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteSubmissionById(id);
        toast.success("Submission deleted.");
        setOpen(false);
      } catch (error) {
        toast.error("Failed to delete submission.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          aria-label="Delete submission"
          title="Delete submission"
          className="flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this submission? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
