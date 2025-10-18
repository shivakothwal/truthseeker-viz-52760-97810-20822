import { AnalysisResult } from '@/contexts/AnalysisContext';

export type MockScenario = 'high-credibility' | 'medium-credibility' | 'low-credibility';

export interface MockPayload {
  scenario: MockScenario;
  simulatedDelay: number; // in milliseconds
  result: AnalysisResult;
}

/**
 * ✅ Success Scenario (High Credibility)
 * Demonstrates a highly credible news source with positive indicators
 */
const highCredibilityMock: MockPayload = {
  scenario: 'high-credibility',
  simulatedDelay: 3000,
  result: {
    label: 'CREDIBLE',
    confidence_score: 95,
    explanation_summary: 'This content demonstrates strong credibility indicators. Multiple independent sources have been verified, factual claims are well-supported, and no conflicting information was detected. The source has a strong reputation for accuracy.',
    readability_score: 82,
    sentiment_score: 'Neutral',
    source_reputation_flag: 'Highly Trusted',
    bias_score: 'Low Bias',
    model_version: 'v2.1.0',
    suggested_sources: [
      'Reuters - Global News Agency',
      'Associated Press - Wire Service',
      'BBC News - International Coverage',
      'NPR - National Public Radio',
      'The Guardian - Investigative Journalism'
    ],
    top_contributing_words: [
      { word: 'verified', influence: 'CREDIBLE', weight: 0.89 },
      { word: 'confirmed', influence: 'CREDIBLE', weight: 0.85 },
      { word: 'official', influence: 'CREDIBLE', weight: 0.82 },
      { word: 'study', influence: 'CREDIBLE', weight: 0.78 },
      { word: 'research', influence: 'CREDIBLE', weight: 0.76 },
      { word: 'documented', influence: 'CREDIBLE', weight: 0.73 },
      { word: 'expert', influence: 'CREDIBLE', weight: 0.71 },
      { word: 'evidence', influence: 'CREDIBLE', weight: 0.69 }
    ]
  }
};

/**
 * ⚠️ Warning/Neutral Scenario (Medium Credibility)
 * Demonstrates mixed signals with both positive and concerning indicators
 */
const mediumCredibilityMock: MockPayload = {
  scenario: 'medium-credibility',
  simulatedDelay: 4000,
  result: {
    label: 'CREDIBLE',
    confidence_score: 55,
    explanation_summary: 'This content shows moderate credibility with some concerns. The source is valid but has limited verification history. Some claims lack independent corroboration, and one minor conflicting report was identified. Exercise caution and cross-reference with additional sources.',
    readability_score: 68,
    sentiment_score: 'Slightly Positive',
    source_reputation_flag: 'Moderately Trusted',
    bias_score: 'Moderate Bias',
    model_version: 'v2.1.0',
    suggested_sources: [
      'AP News - Additional Context',
      'ProPublica - Investigative Details',
      'The Economist - Analysis',
      'Factcheck.org - Verification'
    ],
    top_contributing_words: [
      { word: 'claims', influence: 'FAKE', weight: 0.62 },
      { word: 'report', influence: 'CREDIBLE', weight: 0.58 },
      { word: 'alleged', influence: 'FAKE', weight: 0.54 },
      { word: 'sources', influence: 'CREDIBLE', weight: 0.51 },
      { word: 'unconfirmed', influence: 'FAKE', weight: 0.48 },
      { word: 'investigation', influence: 'CREDIBLE', weight: 0.45 }
    ]
  }
};

/**
 * ❌ Failure Scenario (Low Credibility)
 * Demonstrates highly questionable content with multiple red flags
 */
const lowCredibilityMock: MockPayload = {
  scenario: 'low-credibility',
  simulatedDelay: 5000,
  result: {
    label: 'FAKE',
    confidence_score: 10,
    explanation_summary: 'CRITICAL WARNING: This content exhibits multiple red flags indicating potential misinformation. The source has been flagged as unreliable, contains numerous unverified claims, shows signs of sensationalism, and contradicts established facts from trusted sources. High likelihood of fabricated or misleading information.',
    readability_score: 45,
    sentiment_score: 'Highly Emotional',
    source_reputation_flag: 'Flagged as Unreliable',
    bias_score: 'Extreme Bias',
    model_version: 'v2.1.0',
    suggested_sources: [
      'Snopes - Fact Checking',
      'PolitiFact - Truth Rating',
      'Reuters - Verified News',
      'FactCheck.org - Independent Analysis'
    ],
    top_contributing_words: [
      { word: 'shocking', influence: 'FAKE', weight: 0.92 },
      { word: 'unbelievable', influence: 'FAKE', weight: 0.88 },
      { word: 'secret', influence: 'FAKE', weight: 0.85 },
      { word: 'conspiracy', influence: 'FAKE', weight: 0.83 },
      { word: 'exposed', influence: 'FAKE', weight: 0.80 },
      { word: 'rumor', influence: 'FAKE', weight: 0.77 },
      { word: 'allegedly', influence: 'FAKE', weight: 0.74 },
      { word: 'clickbait', influence: 'FAKE', weight: 0.71 },
      { word: 'hoax', influence: 'FAKE', weight: 0.69 }
    ]
  }
};

/**
 * Mock data collection for easy access
 */
export const MOCK_SCENARIOS: Record<MockScenario, MockPayload> = {
  'high-credibility': highCredibilityMock,
  'medium-credibility': mediumCredibilityMock,
  'low-credibility': lowCredibilityMock,
};

/**
 * Get mock data for a specific scenario
 */
export const getMockData = (scenario: MockScenario): MockPayload => {
  return MOCK_SCENARIOS[scenario];
};

/**
 * Simulate API call with mock data
 */
export const simulateMockAnalysis = async (scenario: MockScenario): Promise<AnalysisResult> => {
  const mockPayload = getMockData(scenario);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, mockPayload.simulatedDelay));
  
  return mockPayload.result;
};
