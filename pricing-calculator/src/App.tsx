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
        <div className="mb-8 border p-4 rounded-lg bg-indigo-50">
          <h2 className="text-xl font-light mb-4">Creator Analysis</h2>
          
          {/* Handle Input */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Enter Instagram Handle (@username)</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-200 text-gray-600 border border-r-0 border-gray-300 rounded-l-md">@</span>
                <input
                  type="text"
                  value={creatorHandle}
                  onChange={(e) => setCreatorHandle(e.target.value)}
                  placeholder="username"
                  className="flex-1 p-2 border border-gray-300 rounded-r"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={analyzeCreator}
                disabled={isAnalyzing}
                className="p-2 px-4 rounded text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Creator'}
              </button>
            </div>
          </div>

          {/* Quality Rating Section */}
          <div className="mt-6 border-t border-indigo-100 pt-6">
            <label className="block text-sm text-gray-600 mb-3">Influencer Quality Rating</label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="green-rating" 
                  name="qualityRating" 
                  value="green" 
                  checked={qualityRating === 'green'}
                  onChange={(e) => setQualityRating(e.target.value)}
                  className="mr-2 h-4 w-4 accent-green-600"
                />
                <label htmlFor="green-rating" className="flex-1 text-green-800 font-medium">GREEN: Recommended (+25% premium)</label>
              </div>
              <div className="text-xs text-gray-600 ml-6 mt-1">
                <ul className="list-disc pl-5">
                  <li>Engagement rate above 2% for accounts under 100K</li>
                  <li>Authentic comments showing real community</li>
                  <li>Content naturally aligns with cause marketing</li>
                </ul>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="amber-rating" 
                  name="qualityRating" 
                  value="amber"
                  checked={qualityRating === 'amber'}
                  onChange={(e) => setQualityRating(e.target.value)}
                  className="mr-2 h-4 w-4 accent-yellow-600"
                />
                <label htmlFor="amber-rating" className="flex-1 text-yellow-800 font-medium">AMBER: Consider with Conditions (standard rate)</label>
              </div>
              <div className="text-xs text-gray-600 ml-6 mt-1">
                <ul className="list-disc pl-5">
                  <li>Engagement rate between 1-2% for smaller accounts</li>
                  <li>Mixed comment quality</li>
                  <li>Some content alignment but inconsistent</li>
                </ul>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="red-rating" 
                  name="qualityRating" 
                  value="red"
                  checked={qualityRating === 'red'}
                  onChange={(e) => setQualityRating(e.target.value)}
                  className="mr-2 h-4 w-4 accent-red-600"
                />
                <label htmlFor="red-rating" className="flex-1 text-red-800 font-medium">RED: Not Recommended (25% discount)</label>
              </div>
              <div className="text-xs text-gray-600 ml-6 mt-1">
                <ul className="list-disc pl-5">
                  <li>Engagement rate below 1% for smaller accounts</li>
                  <li>Few or low-quality comments</li>
                  <li>No content related to causes or campaign themes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of your component */}
      </div>
    </div>
  );
}

export default App;
