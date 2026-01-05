'use client';

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              Smart Farming
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Modern agriculture management system with real-time monitoring,
            AI-powered insights, and comprehensive crop management.
          </p>
        
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <FeatureCard
            icon="🌱"
            title="Crop Management"
            description="Monitor and manage your crops with ease"
          />
          <FeatureCard
            icon="📊"
            title="Real-time Analytics"
            description="Get insights from your farming data"
          />
          <FeatureCard
            icon="🤖"
            title="AI Predictions"
            description="Smart recommendations for better yield"
          />
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);