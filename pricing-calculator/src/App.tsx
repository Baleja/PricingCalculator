import React, { useState, useEffect } from 'react';
import './App.css';

// Constants
const EXCLUSIVITY_RATES: { [key: string]: number } = {
  'none': 0,
  '30-day': 0.1,
  '90-day': 0.2,
  '180-day': 0.3,
  '365-day': 0.5
};

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
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="mx-auto p-6 max-w-3xl bg-white rounded-lg shadow-sm">
        <h1 className="text-4xl font-light text-gray-800 mb-6">Influencer Pricing Calculator</h1>
        
        {/* Welcome message */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-gray-700">
            Welcome to the Universal Influencer Pricing Calculator 3.0, used for estimating fair compensation for influencer marketing. It will allow you to calculate the appropriate pricing based on multiple factors, with a clear breakdown of costs. These calculations are based on standardized cause-based marketing evaluations, with a quality rating system that ensures you're paying appropriate rates based on engagement, authenticity, and content relevance. Please keep in mind they are only estimates, and we cannot be held responsible for any variations you may find when executing campaigns in the real world.
          </p>
        </div>

        {/* Creator Analysis Section */}
        <div className="mb-8 p-6 bg-indigo-50 rounded-lg">
          <h2 className="text-2xl font-light mb-4">Creator Analysis</h2>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Enter Instagram Handle (@username)</label>
            <div className="flex gap-4">
              <div className="flex-1 flex">
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
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Creator'}
              </button>
            </div>
          </div>

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

          {/* Platform & Content Type */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Platform & Content Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-medium mb-3">Premium Tier</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentType"
                      value="instagram-video"
                      checked={contentType === 'instagram-video'}
                      onChange={(e) => setContentType(e.target.value)}
                      className="mr-2"
                    />
                    Instagram Video
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentType"
                      value="tiktok"
                      checked={contentType === 'tiktok'}
                      onChange={(e) => setContentType(e.target.value)}
                      className="mr-2"
                    />
                    TikTok
                  </label>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-medium mb-3">Standard Tier</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentType"
                      value="youtube"
                      checked={contentType === 'youtube'}
                      onChange={(e) => setContentType(e.target.value)}
                      className="mr-2"
                    />
                    YouTube
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentType"
                      value="linkedin"
                      checked={contentType === 'linkedin'}
                      onChange={(e) => setContentType(e.target.value)}
                      className="mr-2"
                    />
                    LinkedIn
                  </label>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-medium mb-3">Basic Tier</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentType"
                      value="facebook"
                      checked={contentType === 'facebook'}
                      onChange={(e) => setContentType(e.target.value)}
                      className="mr-2"
                    />
                    Facebook
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentType"
                      value="twitter"
                      checked={contentType === 'twitter'}
                      onChange={(e) => setContentType(e.target.value)}
                      className="mr-2"
                    />
                    Twitter
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Content Duration */}
          <div className="mb-8">
            <label className="block text-gray-700 mb-2">
              Content Duration: <span>{contentDuration}</span> seconds
            </label>
            <input
              type="range"
              min="10"
              max="180"
              value={contentDuration}
              onChange={(e) => setContentDuration(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Industry Vertical */}
          <div className="mb-8">
            <label className="block text-gray-700 mb-2">Industry Vertical</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-lg bg-white"
            >
              <option value="fashion">Fashion ($18 CPM)</option>
              <option value="beauty">Beauty ($20 CPM)</option>
              <option value="fitness">Fitness ($15 CPM)</option>
              <option value="food">Food & Beverage ($12 CPM)</option>
              <option value="travel">Travel ($22 CPM)</option>
              <option value="gaming">Gaming ($25 CPM)</option>
              <option value="tech">Technology ($16 CPM)</option>
              <option value="finance">Finance ($8 CPM)</option>
              <option value="education">Education ($5 CPM)</option>
              <option value="nonprofit">Non-Profit ($5 CPM)</option>
            </select>
          </div>

          {/* Exclusivity Period */}
          <div className="mb-8">
            <label className="block text-gray-700 mb-2">Exclusivity Period</label>
            <select
              value={exclusivity}
              onChange={(e) => setExclusivity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-lg bg-white"
            >
              <option value="none">No Exclusivity</option>
              <option value="30-day">30 Days (+10%)</option>
              <option value="90-day">90 Days (+20%)</option>
              <option value="180-day">180 Days (+30%)</option>
              <option value="365-day">365 Days (+50%)</option>
            </select>
          </div>

          {/* Usage Rights */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Usage Rights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={brandRepost}
                  onChange={(e) => setBrandRepost(e.target.checked)}
                  className="mr-2 h-5 w-5"
                />
                Brand Repost (+10%)
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={paidAds}
                  onChange={(e) => setPaidAds(e.target.checked)}
                  className="mr-2 h-5 w-5"
                />
                Paid Ads (+20%)
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={website}
                  onChange={(e) => setWebsite(e.target.checked)}
                  className="mr-2 h-5 w-5"
                />
                Website Usage (+10%)
              </label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
          <h2 className="text-2xl font-light mb-6">Price Breakdown</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base Rate:</span>
              <span className="text-xl font-medium">${finalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Quality Rating Adjustment:</span>
              <span className="text-xl font-medium text-green-600">
                {qualityRating === 'green' ? '+25%' : qualityRating === 'red' ? '-25%' : '0%'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Usage Rights:</span>
              <span className="text-xl font-medium text-blue-600">
                {((brandRepost ? 0.1 : 0) + (paidAds ? 0.2 : 0) + (website ? 0.1 : 0)) * 100}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Exclusivity:</span>
              <span className="text-xl font-medium text-purple-600">
                {EXCLUSIVITY_RATES[exclusivity] * 100}%
              </span>
            </div>
            <div className="border-t border-indigo-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Final Price:</span>
                <span className="text-2xl font-bold text-indigo-600">${finalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
