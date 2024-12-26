import { API_BASE_URL } from '../../config/api';
import type { Portfolio, Position, Transaction } from '../../types/portfolio';

export const portfolioService = {
  async getPortfolio(id: string): Promise<Portfolio> {
    const response = await fetch(`${API_BASE_URL}/portfolios/${id}`);
    return response.json();
  },

  async getPositions(portfolioId: string): Promise<Position[]> {
    const response = await fetch(`${API_BASE_URL}/portfolios/${portfolioId}/positions`);
    return response.json();
  },

  async createTransaction(portfolioId: string, transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/portfolios/${portfolioId}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    return response.json();
  }
};