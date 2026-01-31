import type React from "react"
import { FeatureCard } from "../FeatureCard"

export const FineGrainedPermissionsCard: React.FC = () => (
  <FeatureCard
    customContent={
      <div className="w-full h-32 mb-6 rounded-lg bg-gray-900/50 backdrop-blur-sm p-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 bg-gray-800/60 border border-gray-700/50 rounded-lg">
            <span className="text-gray-300 font-mono text-sm">ERC-8004</span>
          </div>
          <div className="px-3 py-2 bg-gray-800/60 border border-gray-700/50 rounded-lg">
            <span className="text-gray-300 font-mono text-sm">x402</span>
          </div>
          <div className="px-3 py-2 bg-gray-800/60 border border-gray-700/50 rounded-lg">
            <span className="text-gray-300 font-mono text-sm">ENS</span>
          </div>
          <div className="px-3 py-2 bg-gray-800/60 border border-gray-700/50 rounded-lg">
            <span className="text-gray-300 font-mono text-sm">A2A</span>
          </div>
        </div>
      </div>
    }
    title="Open Standards Integration"
    description="Built on open agent standards like ERC-8004, x402, ENS, and A2A to enable identity, payments, and cross-platform interoperability."
  />
)
