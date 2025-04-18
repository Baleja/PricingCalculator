// Constants
const INDUSTRY_CPM_RATES = {
    'fashion': 18,
    'beauty': 20,
    'fitness': 15,
    'food': 12,
    'travel': 22,
    'gaming': 25,
    'tech': 16,
    'finance': 8,
    'education': 5,
    'nonprofit': 5
};

const EXCLUSIVITY_RATES = {
    'none': 0,
    '30-day': 0.1,
    '90-day': 0.2,
    '180-day': 0.3,
    '365-day': 0.5
};

// DOM Elements
const followerCountInput = document.getElementById('followerCount');
const engagementRateInput = document.getElementById('engagementRate');
const creatorHandleInput = document.getElementById('creatorHandle');
const analyzeButton = document.getElementById('analyzeButton');
const finalPriceDisplay = document.getElementById('finalPrice');
const followerDisplay = document.getElementById('followerDisplay');
const contentTypeDisplay = document.getElementById('contentTypeDisplay');
const deliverablesCountDisplay = document.getElementById('deliverablesCount');
const durationSection = document.getElementById('durationSection');
const durationDisplay = document.getElementById('durationDisplay');
const contentDurationInput = document.getElementById('contentDuration');
const industrySelect = document.getElementById('industry');
const exclusivitySelect = document.getElementById('exclusivity');
const brandRepostCheckbox = document.getElementById('brandRepost');
const paidAdsCheckbox = document.getElementById('paidAds');
const websiteCheckbox = document.getElementById('website');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for all inputs
    const inputs = document.querySelectorAll('input[type="number"], input[type="radio"], input[type="checkbox"], select');
    inputs.forEach(input => {
        input.addEventListener('change', calculatePrice);
    });

    // Analyze button click handler
    analyzeButton.addEventListener('click', analyzeCreator);

    // Content type change handler
    document.querySelectorAll('input[name="contentType"]').forEach(radio => {
        radio.addEventListener('change', handleContentTypeChange);
    });

    // Duration input handler
    contentDurationInput.addEventListener('input', (e) => {
        durationDisplay.textContent = e.target.value;
        calculatePrice();
    });

    // Initial calculation
    calculatePrice();
});

// Handle content type changes
function handleContentTypeChange(e) {
    const contentType = e.target.value;
    durationSection.style.display = ['instagram-video', 'tiktok', 'youtube'].includes(contentType) ? 'block' : 'none';
    calculatePrice();
}

// Calculate base rate based on platform and followers
function getBaseRate(contentType, followerCount, engagementRate, qualityRating) {
    let base;
    
    // Set initial platform rate
    if (['instagram-video', 'tiktok'].includes(contentType)) {
        base = 300; // Premium
    } else if (['youtube', 'linkedin'].includes(contentType)) {
        base = 150; // Standard
    } else {
        base = 100; // Basic
    }
    
    // Apply follower count multiplier
    if (followerCount >= 1000000) {
        base *= 5;
    } else if (followerCount >= 500000) {
        base *= 3.5;
    } else if (followerCount >= 100000) {
        base *= 2.5;
    } else if (followerCount >= 50000) {
        base *= 1.5;
    }
    
    // Apply engagement rate multiplier
    base *= (1 + (Math.min(engagementRate, 15) / 10));
    
    // Apply quality rating factor
    if (qualityRating === 'green') {
        base *= 1.25;
    } else if (qualityRating === 'amber') {
        base *= 1.0;
    } else if (qualityRating === 'red') {
        base *= 0.75;
    }
    
    return Math.round(base);
}

// Analyze creator function
function analyzeCreator() {
    const handle = creatorHandleInput.value.trim();
    if (!handle) {
        alert('Please enter a creator handle');
        return;
    }

    // Simulate API delay
    analyzeButton.disabled = true;
    analyzeButton.textContent = 'Analyzing...';

    setTimeout(() => {
        try {
            // Simple algorithm to generate pseudo-random but consistent data
            const hashCode = handle.split('').reduce((a, b) => {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
            }, 0);
            
            const seed = Math.abs(hashCode) / 2147483647;
            
            const followers = Math.floor(seed * 900000) + 10000;
            const fakeFollowerPercent = Math.min(Math.floor(seed * 60), 55);
            const realFollowers = Math.round(followers * (1 - (fakeFollowerPercent / 100)));
            const engRate = (seed * 5) + 0.5;
            
            // Update the form with the analyzed data
            followerCountInput.value = realFollowers;
            engagementRateInput.value = parseFloat(engRate.toFixed(1));
            
            // Update displays
            followerDisplay.textContent = realFollowers.toLocaleString();
            
            // Recalculate price
            calculatePrice();
        } catch (error) {
            console.error("Error analyzing creator:", error);
            alert("Error analyzing creator profile. Please try again later.");
        } finally {
            analyzeButton.disabled = false;
            analyzeButton.textContent = 'Analyze Creator';
        }
    }, 1500);
}

// Main calculation function
function calculatePrice() {
    try {
        const followerCount = parseInt(followerCountInput.value) || 0;
        const engagementRate = parseFloat(engagementRateInput.value) || 0;
        const contentType = document.querySelector('input[name="contentType"]:checked').value;
        const qualityRating = document.querySelector('input[name="qualityRating"]:checked')?.value || 'amber';
        const contentDuration = parseInt(contentDurationInput.value) || 60;
        const industry = industrySelect.value;
        const exclusivity = exclusivitySelect.value;
        
        // Calculate base rate
        let finalPrice = getBaseRate(contentType, followerCount, engagementRate, qualityRating);
        
        // Apply duration modifier for video content
        if (['instagram-video', 'tiktok', 'youtube'].includes(contentType)) {
            if (contentType === 'youtube') {
                if (contentDuration > 300) finalPrice *= 2;
                else if (contentDuration > 60) finalPrice *= 1.5;
            } else {
                if (contentDuration > 60) finalPrice *= 1.5;
                else if (contentDuration < 30) finalPrice *= 0.8;
            }
        }
        
        // Add usage rights fees
        if (brandRepostCheckbox.checked) finalPrice += finalPrice * 0.1;
        if (paidAdsCheckbox.checked) finalPrice += finalPrice * 0.2;
        if (websiteCheckbox.checked) finalPrice += finalPrice * 0.1;
        
        // Add exclusivity premium
        finalPrice += finalPrice * (EXCLUSIVITY_RATES[exclusivity] || 0);
        
        // Round up for contract simplicity
        if (finalPrice < 500) {
            finalPrice = Math.ceil(finalPrice / 25) * 25;
        } else if (finalPrice < 2000) {
            finalPrice = Math.ceil(finalPrice / 50) * 50;
        } else {
            finalPrice = Math.ceil(finalPrice / 100) * 100;
        }
        
        // Update displays
        finalPriceDisplay.textContent = finalPrice.toLocaleString();
        contentTypeDisplay.textContent = contentType.replace('-', ' ');
        
        // Calculate and display EMV
        const reachRate = contentType === 'youtube' ? 0.3 : 
                         contentType === 'tiktok' ? 0.4 : 0.2;
        const engagementMultiplier = 1 + (Math.min(engagementRate, 15) / 5);
        const estimatedReach = followerCount * reachRate * engagementMultiplier;
        const industryRate = INDUSTRY_CPM_RATES[industry] || 10;
        const emv = estimatedReach * (industryRate / 1000);
        
        // Update EMV display if it exists
        const emvDisplay = document.getElementById('emvDisplay');
        if (emvDisplay) {
            emvDisplay.textContent = Math.round(emv).toLocaleString();
        }
    } catch (error) {
        console.error("Error calculating price:", error);
        alert("Error calculating price. Please check your inputs and try again.");
    }
} 