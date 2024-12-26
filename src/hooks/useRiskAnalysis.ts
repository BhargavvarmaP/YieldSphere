import { useState, useEffect } from 'react';
import { riskService } from '../services/api/riskService';
import type { RiskAssessment } from '../types/risk';

export const useRiskAnalysis = (portfolioId: string) => {
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRiskAssessment = async () => {
      try {
        const assessment = await riskService.getRiskAssessment(portfolioId);
        setRiskAssessment(assessment);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch risk assessment'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRiskAssessment();
  }, [portfolioId]);

  return { riskAssessment, isLoading, error };
};