"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types for bucket data
export type BucketType = "idea" | "byproduct"

export type Bucket = {
  id: string
  name: string
  type: BucketType
  createdAt: Date
  responses: Map<number, string>
  isRecent: boolean
}

interface BucketContextType {
  buckets: Bucket[]
  activeBucketId: string | null
  setActiveBucketId: (id: string | null) => void
  addBucket: (name: string, type: BucketType) => string
  saveBucketResponse: (bucketId: string, questionId: number, response: string) => void
  getBucketResponses: (bucketId: string) => Map<number, string>
  renameBucket: (bucketId: string, newName: string) => void
}

const BucketContext = createContext<BucketContextType | undefined>(undefined)

// Sample initial buckets
const initialBuckets: Bucket[] = [
  {
    id: "bucket-1",
    name: "Idea 1",
    type: "idea",
    createdAt: new Date(2024, 10, 2), // Nov 2, 2024
    responses: new Map(),
    isRecent: true,
  },
  {
    id: "bucket-2",
    name: "Idea 2",
    type: "idea",
    createdAt: new Date(2025, 0, 2), // Jan 2, 2025
    responses: new Map(),
    isRecent: true,
  },
  {
    id: "bucket-3",
    name: "Idea 3",
    type: "byproduct",
    createdAt: new Date(2025, 2, 24), // Mar 24, 2025
    responses: new Map(),
    isRecent: true,
  },
]

export function BucketProvider({ children }: { children: ReactNode }) {
  const [buckets, setBuckets] = useState<Bucket[]>(initialBuckets)
  const [activeBucketId, setActiveBucketId] = useState<string | null>(null)

  // Add a new bucket
  const addBucket = (name: string, type: BucketType): string => {
    const newBucket: Bucket = {
      id: `bucket-${Date.now()}`,
      name,
      type,
      createdAt: new Date(),
      responses: new Map(),
      isRecent: true,
    }

    setBuckets((prev) => [newBucket, ...prev])
    return newBucket.id
  }

  // Save a response for a specific bucket and question
  const saveBucketResponse = (bucketId: string, questionId: number, response: string) => {
    setBuckets((prev) =>
      prev.map((bucket) => {
        if (bucket.id === bucketId) {
          const updatedResponses = new Map(bucket.responses)
          updatedResponses.set(questionId, response)
          return {
            ...bucket,
            responses: updatedResponses,
          }
        }
        return bucket
      }),
    )
  }

  // Get all responses for a specific bucket
  const getBucketResponses = (bucketId: string): Map<number, string> => {
    const bucket = buckets.find((b) => b.id === bucketId)
    return bucket ? bucket.responses : new Map()
  }

  // Rename a bucket
  const renameBucket = (bucketId: string, newName: string) => {
    setBuckets((prev) =>
      prev.map((bucket) => {
        if (bucket.id === bucketId) {
          return {
            ...bucket,
            name: newName,
          }
        }
        return bucket
      }),
    )
  }

  // Store buckets in localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Convert Map to array for JSON serialization
      const bucketsForStorage = buckets.map((bucket) => ({
        ...bucket,
        responses: Array.from(bucket.responses.entries()),
        createdAt: bucket.createdAt.toISOString(),
      }))
      localStorage.setItem("kulkan-buckets", JSON.stringify(bucketsForStorage))
    }
  }, [buckets])

  // Load buckets from localStorage on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBuckets = localStorage.getItem("kulkan-buckets")
      if (storedBuckets) {
        try {
          const parsedBuckets = JSON.parse(storedBuckets)
          // Convert array back to Map and ISO string back to Date
          const hydratedBuckets = parsedBuckets.map((bucket: any) => ({
            ...bucket,
            responses: new Map(bucket.responses),
            createdAt: new Date(bucket.createdAt),
          }))
          setBuckets(hydratedBuckets)
        } catch (error) {
          console.error("Error parsing stored buckets:", error)
        }
      }
    }
  }, [])

  return (
    <BucketContext.Provider
      value={{
        buckets,
        activeBucketId,
        setActiveBucketId,
        addBucket,
        saveBucketResponse,
        getBucketResponses,
        renameBucket,
      }}
    >
      {children}
    </BucketContext.Provider>
  )
}

export function useBucketContext() {
  const context = useContext(BucketContext)
  if (context === undefined) {
    throw new Error("useBucketContext must be used within a BucketProvider")
  }
  return context
}
