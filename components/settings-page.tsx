"use client"

import { useState } from "react"
import { LeftSidebar } from "@/components/left-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Bell, Lock, CreditCard, HelpCircle } from "lucide-react"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")

  // Account settings state
  const [accountSettings, setAccountSettings] = useState({
    email: "kevin@kulkan.ai",
    name: "Kevin Liu",
    emailNotifications: true,
    marketingEmails: false,
  })

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: "30",
  })

  // Billing settings state
  const [billingSettings, setBillingSettings] = useState({
    plan: "Free",
    billingCycle: "Monthly",
    autoRenew: true,
  })

  const handleAccountChange = (field: keyof typeof accountSettings, value: any) => {
    setAccountSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSecurityChange = (field: keyof typeof securitySettings, value: any) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleBillingChange = (field: keyof typeof billingSettings, value: any) => {
    setBillingSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Left sidebar */}
      <LeftSidebar />

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
            </div>
          </div>

          {/* Settings tabs */}
          <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-white mb-6">
              <TabsTrigger value="account" className={activeTab === "account" ? "bg-[#ebfc72] text-black" : ""}>
                Account
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className={activeTab === "notifications" ? "bg-[#ebfc72] text-black" : ""}
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className={activeTab === "security" ? "bg-[#ebfc72] text-black" : ""}>
                Security
              </TabsTrigger>
              <TabsTrigger value="billing" className={activeTab === "billing" ? "bg-[#ebfc72] text-black" : ""}>
                Billing
              </TabsTrigger>
              <TabsTrigger value="help" className={activeTab === "help" ? "bg-[#ebfc72] text-black" : ""}>
                Help
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Account Information</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={accountSettings.name}
                      onChange={(e) => handleAccountChange("name", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={accountSettings.email}
                      onChange={(e) => handleAccountChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-4">Email Preferences</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications about your account activity</p>
                      </div>
                      <Switch
                        checked={accountSettings.emailNotifications}
                        onCheckedChange={(checked) => handleAccountChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
                      </div>
                      <Switch
                        checked={accountSettings.marketingEmails}
                        onCheckedChange={(checked) => handleAccountChange("marketingEmails", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button className="bg-[#ebfc72] text-black hover:bg-[#d9e968]">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start mb-6">
                <Bell className="h-6 w-6 mr-3 text-gray-500" />
                <div>
                  <h2 className="text-xl font-bold">Notification Settings</h2>
                  <p className="text-gray-500">Manage how and when you receive notifications</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium mb-4">App Notifications</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Analysis Completed</p>
                        <p className="text-sm text-gray-500">Get notified when your business analysis is ready</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Follow-up Reminders</p>
                        <p className="text-sm text-gray-500">Receive reminders to complete follow-up questions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Product Updates</p>
                        <p className="text-sm text-gray-500">Learn about new features and improvements</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Notification Channels</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Browser</p>
                        <p className="text-sm text-gray-500">Show browser notifications when you're online</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button className="bg-[#ebfc72] text-black hover:bg-[#d9e968]">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start mb-6">
                <Lock className="h-6 w-6 mr-3 text-gray-500" />
                <div>
                  <h2 className="text-xl font-bold">Security Settings</h2>
                  <p className="text-gray-500">Manage your account security and authentication</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium mb-4">Password</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="mt-1" />
                    </div>
                    <div></div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="mt-1" />
                    </div>
                  </div>

                  <Button className="mt-4 bg-[#ebfc72] text-black hover:bg-[#d9e968]">Update Password</Button>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={(checked) => handleSecurityChange("twoFactorEnabled", checked)}
                    />
                  </div>

                  {securitySettings.twoFactorEnabled && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="text-sm">
                        Two-factor authentication is enabled. You'll be asked for a verification code when signing in
                        from a new device.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-4">Session Settings</h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <select
                        id="session-timeout"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                      <p className="text-sm text-gray-500 mt-1">
                        Your session will expire after this period of inactivity
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button className="bg-[#ebfc72] text-black hover:bg-[#d9e968]">
                    <Save className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start mb-6">
                <CreditCard className="h-6 w-6 mr-3 text-gray-500" />
                <div>
                  <h2 className="text-xl font-bold">Billing & Subscription</h2>
                  <p className="text-gray-500">Manage your subscription plan and payment methods</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium mb-4">Current Plan</h3>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-lg">{billingSettings.plan} Plan</p>
                        <p className="text-sm text-gray-500">
                          {billingSettings.plan === "Free"
                            ? "Limited features and analysis"
                            : "Full access to all features and analysis"}
                        </p>
                      </div>
                      {billingSettings.plan === "Free" ? (
                        <Button className="bg-[#ebfc72] text-black hover:bg-[#d9e968]">Upgrade</Button>
                      ) : (
                        <div className="text-right">
                          <p className="font-bold">$29/month</p>
                          <p className="text-sm text-gray-500">Next billing date: June 15, 2025</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {billingSettings.plan !== "Free" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Billing Cycle</p>
                          <p className="text-sm text-gray-500">Choose how often you're billed</p>
                        </div>
                        <select
                          className="p-2 border border-gray-300 rounded-md"
                          value={billingSettings.billingCycle}
                          onChange={(e) => handleBillingChange("billingCycle", e.target.value)}
                        >
                          <option value="Monthly">Monthly</option>
                          <option value="Annually">Annually (Save 20%)</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="font-medium">Auto-renew Subscription</p>
                          <p className="text-sm text-gray-500">Automatically renew your subscription</p>
                        </div>
                        <Switch
                          checked={billingSettings.autoRenew}
                          onCheckedChange={(checked) => handleBillingChange("autoRenew", checked)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {billingSettings.plan !== "Free" && (
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium mb-4">Payment Method</h3>

                    <div className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-blue-500 text-white p-2 rounded-md mr-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                            <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/2026</p>
                        </div>
                      </div>
                      <Button variant="outline">Change</Button>
                    </div>

                    <Button className="mt-4" variant="outline">
                      Add Payment Method
                    </Button>
                  </div>
                )}

                <div>
                  <h3 className="font-medium mb-4">Billing History</h3>

                  {billingSettings.plan === "Free" ? (
                    <p className="text-gray-500">No billing history available on the Free plan.</p>
                  ) : (
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Invoice
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">May 15, 2025</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">$29.00</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Paid
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">Download</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">April 15, 2025</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">$29.00</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Paid
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">Download</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {billingSettings.plan !== "Free" && (
                  <div className="pt-4 border-t border-gray-200">
                    <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                      Cancel Subscription
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Help Tab */}
            <TabsContent value="help" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start mb-6">
                <HelpCircle className="h-6 w-6 mr-3 text-gray-500" />
                <div>
                  <h2 className="text-xl font-bold">Help & Support</h2>
                  <p className="text-gray-500">Get help with using Kulkan AI</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium mb-4">Frequently Asked Questions</h3>

                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">How does Kulkan AI analyze my business idea?</p>
                      <p className="text-sm text-gray-500 mt-1 truncate-2">
                        Kulkan AI uses a combination of market data, competitive analysis, and business model evaluation
                        to provide a comprehensive assessment of your idea's viability.
                      </p>
                    </div>

                    <div>
                      <p className="font-medium">What does "Conditional Go" mean in my report?</p>
                      <p className="text-sm text-gray-500 mt-1 truncate-2">
                        A "Conditional Go" recommendation means your idea shows promise but requires some adjustments or
                        further validation in specific areas before full commitment.
                      </p>
                    </div>

                    <div>
                      <p className="font-medium">How accurate are the analysis results?</p>
                      <p className="text-sm text-gray-500 mt-1 truncate-2">
                        Our analysis is based on current market data and established business validation frameworks.
                        While no prediction is 100% accurate, our methodology provides a solid foundation for
                        decision-making.
                      </p>
                    </div>

                    <div>
                      <p className="font-medium">Can I export my reports?</p>
                      <p className="text-sm text-gray-500 mt-1 truncate-2">
                        Yes, premium users can export reports in PDF format. This feature is coming soon for all users.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium mb-4">Contact Support</h3>

                  <p className="text-sm text-gray-500 mb-4">
                    Need more help? Our support team is available Monday through Friday, 9am-5pm PST.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="support-email">Email</Label>
                      <Input id="support-email" value="support@kulkan.ai" readOnly className="mt-1 bg-gray-50" />
                    </div>

                    <div>
                      <Label htmlFor="support-subject">Subject</Label>
                      <Input id="support-subject" placeholder="Enter the subject of your inquiry" className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="support-message">Message</Label>
                      <textarea
                        id="support-message"
                        rows={4}
                        placeholder="Describe your issue or question in detail"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#ebfc72]"
                      ></textarea>
                    </div>

                    <Button className="bg-[#ebfc72] text-black hover:bg-[#d9e968]">Send Message</Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Resources</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium">Documentation</h4>
                      <p className="text-sm text-gray-500 truncate-1">Detailed guides on using Kulkan AI</p>
                    </div>

                    <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium">Video Tutorials</h4>
                      <p className="text-sm text-gray-500 truncate-1">Step-by-step visual guides</p>
                    </div>

                    <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium">Blog</h4>
                      <p className="text-sm text-gray-500 truncate-1">Tips and insights on business validation</p>
                    </div>

                    <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium">Community Forum</h4>
                      <p className="text-sm text-gray-500 truncate-1">Connect with other entrepreneurs</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
