"use client"

import type React from "react"

import { useState, useRef } from "react"
import { LeftSidebar } from "@/components/left-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Camera, Upload, Edit2, Save } from "lucide-react"
import Image from "next/image"
import { mockQuestions } from "@/lib/mock-openai-responses"

type ProfileSection = "personal" | "company" | "responses"

export function ProfilePage() {
  const [activeSection, setActiveSection] = useState<ProfileSection>("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Personal details state
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "Kevin",
    lastName: "Liu",
    email: "kevin@kulkan.ai",
    username: "kevinliu",
    phone: "+1 (555) 123-4567",
    password: "••••••••",
    shareContact: false,
  })

  // Company details state
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "Kulkan AI",
    industry: "Artificial Intelligence",
    website: "https://kulkan.ai",
    founded: "2024",
    size: "1-10 employees",
    stage: "Seed",
    location: "San Francisco, CA",
  })

  // Responses to the 12 questions
  const [responses, setResponses] = useState([
    "Kulkan is an AI-powered validation assistant for entrepreneurs to test their business ideas quickly and affordably.",
    "Early-stage founders who need to validate their business ideas before investing significant time and resources.",
    "The high failure rate of startups due to lack of proper validation before building products.",
    "Traditional consultants, market research firms, and DIY validation methods.",
    "Our AI-driven approach provides faster, more affordable, and more comprehensive validation than alternatives.",
    "Freemium model with basic validation free and premium features for paying subscribers.",
    "Direct to founder marketing through startup communities, accelerators, and content marketing.",
    "AI expertise, validation frameworks, and startup ecosystem connections.",
    "Market adoption and building trust in AI-generated validation insights.",
    "Built MVP, conducted user interviews with 50+ founders, and secured initial seed funding.",
    "Expand validation frameworks, build partnerships with accelerators, and launch premium subscription tiers.",
    "Ensuring our validation methodology stays ahead of rapidly evolving markets and technologies.",
  ])

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatar(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handlePersonalDetailChange = (field: keyof typeof personalDetails, value: string | boolean) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCompanyDetailChange = (field: keyof typeof companyDetails, value: string) => {
    setCompanyDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleResponseChange = (index: number, value: string) => {
    const newResponses = [...responses]
    newResponses[index] = value
    setResponses(newResponses)
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Left sidebar */}
      <LeftSidebar />

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className="text-sm text-gray-500">Manage your personal information and company details</p>
            </div>
            <Button
              onClick={toggleEditMode}
              className={
                isEditing ? "bg-[#ebfc72] text-black hover:bg-[#d9e968]" : "bg-black text-white hover:bg-gray-800"
              }
            >
              {isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          {/* Avatar section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {avatar ? (
                    <Image
                      src={avatar || "/placeholder.svg"}
                      alt="Company Logo"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-3xl font-bold text-gray-400">{companyDetails.companyName.charAt(0)}</div>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-[#ebfc72] rounded-full p-2 shadow-md"
                  >
                    <Camera className="h-4 w-4 text-black" />
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-bold">{companyDetails.companyName}</h2>
                <p className="text-sm text-gray-500">{companyDetails.industry}</p>
                {isEditing && (
                  <button
                    onClick={triggerFileInput}
                    className="mt-2 text-sm flex items-center text-gray-600 hover:text-black"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload company logo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="personal" className="mb-6">
            <TabsList className="bg-white mb-6">
              <TabsTrigger
                value="personal"
                onClick={() => setActiveSection("personal")}
                className={activeSection === "personal" ? "bg-[#ebfc72] text-black" : ""}
              >
                Personal Details
              </TabsTrigger>
              <TabsTrigger
                value="company"
                onClick={() => setActiveSection("company")}
                className={activeSection === "company" ? "bg-[#ebfc72] text-black" : ""}
              >
                Company Details
              </TabsTrigger>
              <TabsTrigger
                value="responses"
                onClick={() => setActiveSection("responses")}
                className={activeSection === "responses" ? "bg-[#ebfc72] text-black" : ""}
              >
                Validation Responses
              </TabsTrigger>
            </TabsList>

            {/* Personal Details Tab */}
            <TabsContent value="personal" className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={personalDetails.firstName}
                    onChange={(e) => handlePersonalDetailChange("firstName", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalDetails.lastName}
                    onChange={(e) => handlePersonalDetailChange("lastName", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalDetails.email}
                    onChange={(e) => handlePersonalDetailChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={personalDetails.username}
                    onChange={(e) => handlePersonalDetailChange("username", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={personalDetails.phone}
                    onChange={(e) => handlePersonalDetailChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="flex mt-1">
                    <Input
                      id="password"
                      type="password"
                      value={personalDetails.password}
                      disabled={true}
                      className="flex-1 rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none border-l-0" disabled={!isEditing}>
                      Change
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Share contact information</h3>
                    <p className="text-sm text-gray-500">Allow others to see your contact details</p>
                  </div>
                  <Switch
                    checked={personalDetails.shareContact}
                    onCheckedChange={(checked) => handlePersonalDetailChange("shareContact", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                    Delete Account
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Company Details Tab */}
            <TabsContent value="company" className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyDetails.companyName}
                    onChange={(e) => handleCompanyDetailChange("companyName", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={companyDetails.industry}
                    onChange={(e) => handleCompanyDetailChange("industry", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={companyDetails.website}
                    onChange={(e) => handleCompanyDetailChange("website", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="founded">Founded</Label>
                  <Input
                    id="founded"
                    value={companyDetails.founded}
                    onChange={(e) => handleCompanyDetailChange("founded", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="size">Company Size</Label>
                  <Input
                    id="size"
                    value={companyDetails.size}
                    onChange={(e) => handleCompanyDetailChange("size", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="stage">Company Stage</Label>
                  <Input
                    id="stage"
                    value={companyDetails.stage}
                    onChange={(e) => handleCompanyDetailChange("stage", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={companyDetails.location}
                    onChange={(e) => handleCompanyDetailChange("location", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Validation Responses Tab */}
            <TabsContent value="responses" className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-sm text-gray-500 mb-6">
                Your responses to the 12 validation questions. These answers inform your business analysis and reports.
                Keeping them updated ensures your reports remain accurate as your business evolves.
              </p>

              <div className="space-y-6">
                {mockQuestions.map((question, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <Label className="font-medium mb-2 block truncate-1">
                      {index + 1}. {question}
                    </Label>
                    {isEditing ? (
                      <Textarea
                        value={responses[index] || ""}
                        onChange={(e) => handleResponseChange(index, e.target.value)}
                        className="mt-1 min-h-[100px]"
                      />
                    ) : (
                      <p className="text-gray-700 mt-1 truncate-3">{responses[index] || "No response provided."}</p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
