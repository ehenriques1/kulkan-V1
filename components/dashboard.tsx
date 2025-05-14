"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("insights")

  return (
    <Layout title="Explore/Explore GPTs">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Your insights // Idea #1</h1>
          <p className="text-gray-600">
            Here is where your feasibility, ideal customer profiles and overall product market fit live, along with your
            follow up questions per study. As we progress, we will have other tools you can use to go, pivot or start
            anew, in your startup journey.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Dig deeper</h2>
          <p className="text-gray-600 mb-6">
            Choose any of the studies below to dig deeper by running follow up questions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Market Fit Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-orange-100 p-2 rounded-md mr-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-md"></div>
                  </div>
                  <div>
                    <h3 className="font-bold">Your idea Vs. the market</h3>
                    <p className="text-sm text-gray-600">
                      A feasibility study of how your idea stands against the industry and market overall. 6 different
                      analysis run to see where you stand.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mb-4">
                  View Analysis
                </Button>
                <div className="bg-gray-200 rounded-md p-2 text-center">
                  <span className="text-sm">6.5 / 10 • Conditional Go</span>
                </div>
              </CardContent>
            </Card>

            {/* Ideal Customer Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <div className="w-6 h-6 bg-green-500 rounded-md"></div>
                  </div>
                  <div>
                    <h3 className="font-bold">Your Ideal Customer(s)</h3>
                    <p className="text-sm text-gray-600">
                      Because a business without customers it isn't a business. We run a deep analysis to get to your
                      true ideal customer profiles right from the start.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mb-4">
                  View Analysis
                </Button>
                <div className="bg-gray-200 rounded-md p-2 text-center">
                  <span className="text-sm">3 / 3</span>
                </div>
              </CardContent>
            </Card>

            {/* Product Market Fit Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-yellow-100 p-2 rounded-md mr-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-md"></div>
                  </div>
                  <div>
                    <h3 className="font-bold">Your Product Market Fit</h3>
                    <p className="text-sm text-gray-600">
                      Yep. This is how you know if your idea truly has legs. We analyze it against various research
                      methodologies to get you the true Go / Pivot / Kill score.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mb-4">
                  View Analysis
                </Button>
                <div className="bg-gray-200 rounded-md p-2 text-center">
                  <span className="text-sm">6 / 10 • Conditional Go</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
