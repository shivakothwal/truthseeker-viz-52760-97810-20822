# Testing Mode Guide

## Overview
This application includes a comprehensive testing mode that allows you to test the loading screen and various credibility assessment outcomes without requiring a live API connection.

## How to Enable Testing Mode

1. Navigate to the **Detection Tool** page (main page)
2. Look for the **"TESTING MODE"** toggle in the top-right corner of the Analysis Console header
3. Click the switch to enable Testing Mode

## Mock Scenarios

Once Testing Mode is enabled, you'll see a testing panel with three predefined scenarios:

### ✅ High Credibility Scenario
- **Credibility Score:** 95/100
- **Simulated Delay:** 3 seconds
- **Label:** CREDIBLE
- **Key Features:**
  - Multiple verified sources
  - Strong reputation indicators
  - Positive contributing words
  - 5 suggested trusted sources
  - Low bias and high readability

**Use Case:** Demonstrates successful analysis of highly credible news content

---

### ⚠️ Medium Credibility Scenario
- **Credibility Score:** 55/100
- **Simulated Delay:** 4 seconds
- **Label:** CREDIBLE (with warnings)
- **Key Features:**
  - Mixed signals in analysis
  - Moderate trust indicators
  - Some conflicting information detected
  - Limited verification history
  - Moderate bias detected

**Use Case:** Demonstrates borderline credibility with cautionary flags

---

### ❌ Low Credibility Scenario
- **Credibility Score:** 10/100
- **Simulated Delay:** 5 seconds
- **Label:** FAKE
- **Key Features:**
  - Multiple red flags detected
  - Source flagged as unreliable
  - Sensationalized language
  - Extreme bias indicators
  - High emotional content
  - Contradicts established facts

**Use Case:** Demonstrates detection of misinformation and fake news

## Testing the Loading Screen

Each scenario includes a simulated delay to properly test the loading screen animation:

1. Click any of the three scenario buttons
2. The **ScanLoadingScreen** component will activate
3. Watch the progress bar advance through 4 stages:
   - 📊 Analyzing data sources
   - ✨ Cross-referencing against verified records
   - ⚠️ Detecting misinformation patterns
   - ✅ Finalizing analysis
4. After the simulated delay (3-5 seconds), the results will be displayed

## Implementation Details

### Mock Data Location
All mock data is defined in: `src/lib/mockData.ts`

### Key Components
- **MockPayload Interface:** Defines the structure for test scenarios
- **simulateMockAnalysis():** Simulates API call with configurable delay
- **MOCK_SCENARIOS:** Collection of all three predefined scenarios

### Context Integration
The mock mode is integrated into `AnalysisContext`:
- `useMockMode`: Boolean state for testing mode
- `performMockAnalysis(scenario)`: Triggers mock analysis
- Maintains same loading time constraints as real API

## Development Usage

### Testing New Features
1. Enable Testing Mode
2. Click through all three scenarios
3. Verify UI renders correctly for each state
4. Check loading screen transitions smoothly
5. Validate result cards display properly

### Debugging
The mock mode ensures:
- Consistent test data
- No external API dependencies
- Predictable timing for animations
- Reproducible states for debugging

## Disabling Testing Mode

1. Toggle the "TESTING MODE" switch off
2. The regular analysis console will be restored
3. The "Initiate Credibility Scan" button will connect to the real Flask API

## Benefits

- ✅ Test without running Flask backend
- ✅ Consistent, reproducible test cases
- ✅ Validate UI across different credibility states
- ✅ Demo the application without live data
- ✅ Faster development iterations
- ✅ No API keys or external dependencies needed

## Notes

- Testing mode is purely client-side
- Mock delays respect minimum loading time (3.6s) for UX consistency
- All mock data matches the real `AnalysisResult` interface
- Testing mode can be toggled on/off at any time
