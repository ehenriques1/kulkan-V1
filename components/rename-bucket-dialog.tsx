"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useBucketContext } from "@/context/bucket-context"
import { Edit2 } from "lucide-react"

interface RenameBucketDialogProps {
  isOpen: boolean
  onClose: () => void
  bucketId: string
  currentName: string
}

export function RenameBucketDialog({ isOpen, onClose, bucketId, currentName }: RenameBucketDialogProps) {
  const [newName, setNewName] = useState(currentName)
  const [error, setError] = useState("")
  const { renameBucket } = useBucketContext()

  const handleRename = () => {
    if (!newName.trim()) {
      setError("Please enter a name for your bucket")
      return
    }

    // Rename the bucket
    renameBucket(bucketId, newName.trim())

    // Reset and close
    setError("")
    onClose()
  }

  const handleClose = () => {
    // Reset form
    setNewName(currentName)
    setError("")
    onClose()
  }

  // Brand color
  const brandColor = "#ebfc72"

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Edit2 className="h-5 w-5 mr-2" style={{ color: brandColor }} />
            Rename Bucket
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Input
              placeholder="Enter a new name for your bucket"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              style={{ backgroundColor: brandColor, color: "black" }}
              className="hover:bg-opacity-90"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
