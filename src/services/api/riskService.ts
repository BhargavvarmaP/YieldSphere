import { API_BASE_URL } from '../../config/api';
import type { RiskAssessment, RiskProfile } from '../../types/risk';

export const riskService = {
  async getRiskAssessment(portfolioId: string): Promise<RiskAssessment> {
    const response = await fetch(`${API_BASE_URL}/risk/assessment/${portfolioId}`);
    return response.json();
  },

  async getRiskProfile(userId: string): Promise<RiskProfile> {
    const response = await fetch(`${API_BASE_URL}/risk/profile/${userId}`);
    return response.json();
  }
};