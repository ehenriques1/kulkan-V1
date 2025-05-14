"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useBucketContext, type BucketType } from "@/context/bucket-context"
import { useRouter } from "next/navigation"
import { FolderPlus, Lightbulb, Layers } from "lucide-react"

interface CreateBucketModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateBucketModal({ isOpen, onClose }: CreateBucketModalProps) {
  const [step, setStep] = useState<"type" | "name">("type")
  const [bucketType, setBucketType] = useState<BucketType | null>(null)
  const [bucketName, setBucketName] = useState("")
  const [error, setError] = useState("")
  const { addBucket, setActiveBucketId } = useBucketContext()
  const router = useRouter()

  // Brand colors
  const brandColor = "#ebfc72"
  const brandYellow = "#ffff00"
  const lightGray = "#e6e6e6"

  const handleTypeSelection = (type: BucketType) => {
    setBucketType(type)
    setStep("name")
  }

  const handleCreateBucket = () => {
    if (!bucketName.trim()) {
      setError("Please enter a name for your bucket")
      return
    }

    if (!bucketType) {
      setError("Please select a bucket type")
      return
    }

    // Create the bucket and get its ID
    const newBucketId = addBucket(bucketName, bucketType)

    // Set it as active
    setActiveBucketId(newBucketId)

    // Reset the form
    setBucketName("")
    setBucketType(null)
    setStep("type")
    setError("")

    // Close the modal
    onClose()

    // Navigate to the chat interface to start answering questions
    router.push("/")
  }

  const handleClose = () => {
    // Reset the form
    setBucketName("")
    setBucketType(null)
    setStep("type")
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FolderPlus className="h-5 w-5 mr-2" style={{ color: brandColor }} />
            {step === "type" ? "What type of bucket are you creating?" : "Name your bucket"}
          </DialogTitle>
        </DialogHeader>

        {step === "type" ? (
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button
              onClick={() => handleTypeSelection("idea")}
              className="flex items-center justify-center gap-2 h-16 hover:bg-opacity-90"
              style={{ backgroundColor: brandColor, color: "black" }}
            >
              <Lightbulb className="h-5 w-5" />
              <span className="text-lg">New Business Idea</span>
            </Button>
            <Button
              onClick={() => handleTypeSelection("byproduct")}
              className="flex items-center justify-center gap-2 h-16 hover:bg-opacity-90"
              style={{ backgroundColor: lightGray, color: "black" }}
            >
              <Layers className="h-5 w-5" />
              <span className="text-lg">Byproduct of Existing Business</span>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div>
              <Input
                placeholder="Enter a name for your bucket"
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
                className="w-full"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("type")}>
                Back
              </Button>
              <Button
                onClick={handleCreateBucket}
                style={{ backgroundColor: brandColor, color: "black" }}
                className="hover:bg-opacity-90"
              >
                Create & Start
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
