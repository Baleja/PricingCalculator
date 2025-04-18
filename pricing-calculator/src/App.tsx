import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State management
  const [followerCount, setFollowerCount] = useState<number>(50000);
  const [engagementRate, setEngagementRate] = useState<number>(3);
  const [creatorHandle, setCreatorHandle] = useState<string>('');
  const [contentType, setContentType] = useState<string>('instagram-video');
  const [contentDuration, setContentDuration] = useState<number>(60);
  const [industry, setIndustry] = useState<string>('fashion');
  const [exclusivity, setExclusivity] = useState<string>('none');
  const [brandRepost, setBrandRepost] = useState<boolean>(false);
  const [paidAds, setPaidAds] = useState<boolean>(false);
  const [website, setWebsite] = useState<boolean>(false);
  const [qualityRating, setQualityRating] = useState<string>('green');
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Analyze creator function
  const analyzeCreator = () => {
    if (!creatorHandle) {
      alert('Please enter a creator handle');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      try {
        // Simple algorithm to generate pseudo-random but consistent data
        const hashCode = creatorHandle.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0);
        
        const seed = Math.abs(hashCode) / 2147483647;
        
        const followers = Math.floor(seed * 900000) + 10000;
        const fakeFollowerPercent = Math.min(Math.floor(seed * 60), 55);
        const realFollowers = Math.round(followers * (1 - (fakeFollowerPercent / 100)));
        const engRate = (seed * 5) + 0.5;
        
        // Update state
        setFollowerCount(realFollowers);
        setEngagementRate(parseFloat(engRate.toFixed(1)));
      } catch (error) {
        console.error("Error analyzing creator:", error);
        alert("Error analyzing creator profile. Please try again later.");
      } finally {
        setIsAnalyzing(false);
      }
    }, 1500);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto p-6 max-w-3xl bg-white">
        <h1 className="text-3xl font-light text-gray-800 mb-6">Influencer Pricing Calculator</h1>
        
        {/* Welcome message */}
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-700">
            Welcome to the Universal Influencer Pricing Calculator 3.0, used for estimating fair compensation for influencer marketing.
          </p>
        </div>

        {/* Creator Analysis Section */}
        <div className="mb-8 border p-6 rounded-lg bg-indigo-50">
          <h2 className="text-2xl font-light mb-4">Creator Analysis</h2>
          
          {/* Handle Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Enter Instagram Handle (@username)</label>
            <div className="flex">
              <span className="inline-flex items-center px-4 bg-gray-200 text-gray-600 border border-r-0 border-gray-300 rounded-l-md text-lg">@</span>
              <input
                type="text"
                value={creatorHandle}
                onChange={(e) => setCreatorHandle(e.target.value)}
                placeholder="username"
                className="flex-1 p-3 border border-gray-300 rounded-r text-lg"
              />
            </div>
            <button
              onClick={analyzeCreator}
              disabled={isAnalyzing}
              className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Creator'}
            </button>
          </div>

          {/* API Integration Notice */}
          <div className="mb-6 p-4 bg-blue-100 rounded-lg flex items-start space-x-3">
            <span className="text-blue-500">ℹ️</span>
            <div>
              <span className="font-medium text-blue-700">API Integration:</span>
              <span className="text-blue-700"> In production, this tool would connect to the Influencer Club API or similar service to pull real-time influencer data. Currently showing simulated data for demonstration purposes. </span>
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">Learn more about API setup</a>
            </div>
          </div>

          {/* Quality Rating Section */}
          <div className="mt-6">
            <h3 className="text-lg text-gray-700 mb-4">Influencer Quality Rating</h3>
            <div className="space-y-4 bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 p-6 rounded-lg">
              {/* Green Rating */}
              <div className="flex items-start space-x-3">
                <input 
                  type="radio" 
                  id="green-rating" 
                  name="qualityRating" 
                  value="green" 
                  checked={qualityRating === 'green'}
                  onChange={(e) => setQualityRating(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="green-rating" className="flex items-center text-green-800 font-medium">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    GREEN: Recommended (+25% premium)
                  </label>
                  <ul className="mt-2 ml-5 text-sm text-gray-600 space-y-1">
                    <li>• Engagement rate above 2% for accounts under 100K</li>
                    <li>• Authentic comments showing real community</li>
                    <li>• Content naturally aligns with cause marketing</li>
                    <li>• Consistent, quality posting schedule</li>
                    <li>• Previous cause-related content success</li>
                  </ul>
                </div>
              </div>

              {/* Amber Rating */}
              <div className="flex items-start space-x-3">
                <input 
                  type="radio" 
                  id="amber-rating" 
                  name="qualityRating" 
                  value="amber"
                  checked={qualityRating === 'amber'}
                  onChange={(e) => setQualityRating(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="amber-rating" className="flex items-center text-yellow-800 font-medium">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    AMBER: Consider with Conditions (standard rate)
                  </label>
                  <ul className="mt-2 ml-5 text-sm text-gray-600 space-y-1">
                    <li>• Engagement rate between 1-2% for smaller accounts</li>
                    <li>• Mixed comment quality</li>
                    <li>• Some content alignment but inconsistent</li>
                    <li>• Irregular posting schedule</li>
                    <li>• Limited cause-related content experience</li>
                  </ul>
                </div>
              </div>

              {/* Red Rating */}
              <div className="flex items-start space-x-3">
                <input 
                  type="radio" 
                  id="red-rating" 
                  name="qualityRating" 
                  value="red"
                  checked={qualityRating === 'red'}
                  onChange={(e) => setQualityRating(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="red-rating" className="flex items-center text-red-800 font-medium">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    RED: Not Recommended (25% discount)
                  </label>
                  <ul className="mt-2 ml-5 text-sm text-gray-600 space-y-1">
                    <li>• Engagement rate below 1% for smaller accounts</li>
                    <li>• Few or low-quality comments</li>
                    <li>• Following count disproportionately high</li>
                    <li>• No content related to causes or campaign themes</li>
                    <li>• Sporadic posting or poor content quality</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Details Section */}
        <div className="mb-8 border p-6 rounded-lg bg-white">
          <h2 className="text-2xl font-light mb-6">Partnership Details</h2>
          
          {/* Basic Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 mb-2">Follower Count</label>
              <input
                type="number"
                value={followerCount}
                onChange={(e) => setFollowerCount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded text-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Engagement Rate (%)</label>
              <input
                type="number"
                value={engagementRate}
                onChange={(e) => setEngagementRate(Number(e.target.value))}
                step="0.1"
                className="w-full p-3 border border-gray-300 rounded text-lg"
              />
            </div>
          </div>

          {/* Usage Rights */}
          <div className="mb-8">
            <h3 className="text-lg text-gray-700 mb-4">Usage Rights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="brandRepost"
                  checked={brandRepost}
                  onChange={(e) => setBrandRepost(e.target.checked)}
                  className="w-5 h-5 text-indigo-600"
                />
                <label htmlFor="brandRepost">Brand Repost (+10%)</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="paidAds"
                  checked={paidAds}
                  onChange={(e) => setPaidAds(e.target.checked)}
                  className="w-5 h-5 text-indigo-600"
                />
                <label htmlFor="paidAds">Paid Ads (+20%)</label>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
          <h2 className="text-2xl font-light mb-4">Price Breakdown</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base Rate:</span>
              <span className="text-xl font-medium">${finalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Quality Rating Adjustment:</span>
              <span className="text-xl font-medium text-green-600">+25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Usage Rights:</span>
              <span className="text-xl font-medium text-blue-600">+30%</span>
            </div>
            <div className="border-t border-indigo-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Final Price:</span>
                <span className="text-2xl font-bold text-indigo-600">${finalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
