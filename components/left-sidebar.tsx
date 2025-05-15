"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  User,
  Settings,
  MoreHorizontal,
  Edit2,
  Folder,
  FolderPlus,
  Clock,
  BookmarkIcon,
} from "lucide-react"
import { useMobileNav } from "@/hooks/use-mobile-nav"
import { useBucketContext } from "@/context/bucket-context"
import { CreateBucketModal } from "@/components/create-bucket-modal"
import { RenameBucketDialog } from "@/components/rename-bucket-dialog"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LeftSidebar() {
  const { isOpen, setIsOpen } = useMobileNav()
  const { buckets, setActiveBucketId } = useBucketContext()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [renameDialogState, setRenameDialogState] = useState<{ isOpen: boolean; bucketId: string; name: string }>({
    isOpen: false,
    bucketId: "",
    name: "",
  })
  const router = useRouter()

  // Filter buckets by recent and saved
  const recentBuckets = buckets.filter((bucket) => bucket.isRecent).slice(0, 3)
  const savedBuckets = buckets.slice(0, 3) // Just showing first 3 for now

  // Base classes for the sidebar
  const sidebarClasses =
    "bg-white h-screen flex flex-col w-[350px] border-r border-gray-200 transition-all duration-300 ease-in-out"

  // Additional classes based on mobile state
  const mobileClasses = isOpen ? "fixed left-0 top-0 z-50 shadow-xl" : "fixed -left-[350px] top-0 z-50"

  // Combine classes based on viewport
  const combinedClasses = `${sidebarClasses} hidden md:block md:relative md:left-0 md:top-0 md:z-auto md:shadow-none ${isOpen ? "block" : ""} md:w-[350px]`

  // Mobile overlay backdrop
  const backdropClasses = `fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  } md:hidden`

  // Brand color for icons
  const iconColor = "#ebfc72"

  const handleBucketClick = (bucketId: string) => {
    setActiveBucketId(bucketId)
    router.push("/")
    if (isOpen) {
      setIsOpen(false) // Close mobile sidebar if open
    }
  }

  const openRenameDialog = (bucketId: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent bucket click
    setRenameDialogState({
      isOpen: true,
      bucketId,
      name,
    })
  }

  const closeRenameDialog = () => {
    setRenameDialogState({
      isOpen: false,
      bucketId: "",
      name: "",
    })
  }

  return (
    <>
      {/* Mobile backdrop */}
      <div className={backdropClasses} onClick={() => setIsOpen(false)} aria-hidden="true" />

      {/* Create Bucket Modal */}
      <CreateBucketModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

      {/* Rename Bucket Dialog */}
      <RenameBucketDialog
        isOpen={renameDialogState.isOpen}
        onClose={closeRenameDialog}
        bucketId={renameDialogState.bucketId}
        currentName={renameDialogState.name}
      />

      {/* Sidebar */}
      <div className={combinedClasses}>
        {/* Buckets section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium flex items-center">
              <Folder className="h-5 w-5 mr-2" style={{ color: iconColor }} />
              Your Buckets
            </div>
            <Search className="h-5 w-5" style={{ color: iconColor }} />
          </div>

          <button
            className="w-full border border-gray-300 rounded-md p-2 flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition-colors"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <FolderPlus className="h-4 w-4" style={{ color: iconColor }} />
            Create New Bucket
          </button>
        </div>

        {/* Recent buckets */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5" style={{ color: iconColor }} />
            <div className="text-sm font-medium">Recent Buckets</div>
          </div>

          <div className="space-y-2 mt-4">
            {recentBuckets.map((bucket, index) => (
              <button
                key={bucket.id}
                className="flex items-center gap-2 w-full text-left hover:bg-gray-100 p-1 rounded-md transition-colors"
                onClick={() => handleBucketClick(bucket.id)}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs`}
                  style={{ backgroundColor: "#ebfc72", color: "#000000" }}
                >
                  {bucket.type === "idea" ? "I" : "B"}
                </div>
                <div className="text-sm">{bucket.name}</div>
                <div className="ml-auto">
                  <div
                    className="h-5 w-5 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: "#ebfc72" }}
                  >
                    <Plus className="h-3 w-3 text-black" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Saved buckets */}
        <div className="p-4 border-b border-gray-200 flex-grow overflow-auto">
          <div className="flex items-center gap-2 mb-2">
            <BookmarkIcon className="h-5 w-5" style={{ color: iconColor }} />
            <div className="text-sm font-medium">Saved Buckets</div>
            <div className="text-xs text-gray-500 ml-auto">
              // {savedBuckets.length} of {buckets.length}
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {savedBuckets.map((bucket, index) => (
              <div
                key={bucket.id}
                className="flex items-center gap-2 w-full text-left hover:bg-gray-100 p-1 rounded-md transition-colors group"
              >
                <button className="flex items-center gap-2 flex-grow" onClick={() => handleBucketClick(bucket.id)}>
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs`}
                    style={{ backgroundColor: "#ebfc72", color: "#000000" }}
                  >
                    {bucket.type === "idea" ? "I" : "B"}
                  </div>
                  <div className="text-sm">{bucket.name}</div>
                  <div className="text-xs text-gray-500 ml-1">({bucket.createdAt.toLocaleDateString()})</div>
                </button>

                <div className="ml-auto flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-5 w-5 rounded-md flex items-center justify-center hover:bg-gray-200">
                        <MoreHorizontal className="h-3 w-3" style={{ color: iconColor }} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => openRenameDialog(bucket.id, bucket.name, e)}>
                        <Edit2 className="h-4 w-4 mr-2" style={{ color: iconColor }} />
                        Rename
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div
                    className="h-5 w-5 rounded-md flex items-center justify-center ml-1"
                    style={{ backgroundColor: "#ebfc72" }}
                  >
                    <Plus className="h-3 w-3 text-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer navigation */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="flex flex-col">
            <Link href="/profile" className="flex items-center gap-2 text-sm hover:text-gray-600">
              <User className="h-5 w-5" style={{ color: iconColor }} />
              Profile
            </Link>
            <div style={{ height: 24 }} />
            <Link href="/settings" className="flex items-center gap-2 text-sm hover:text-gray-600">
              <Settings className="h-5 w-5" style={{ color: iconColor }} />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
