import axios, { AxiosInstance } from 'axios';
import Logger from 'server/logger';
import { env } from './env.mjs';

interface PredictPayload {
  word: string;
  guess: string;
}

interface PredictResponse {
  similarity: string;
}

class Inference {
  client: AxiosInstance;
  logger = new Logger({ name: 'Inference' });

  constructor() {
    this.client = axios.create({
      baseURL: env.INFERENCE_ENDPOINT,
      timeout: 10_000,
    });
  }

  async predict({ word, guess }: PredictPayload): Promise<PredictResponse> {
    try {
      this.logger.info('Fetching predict', { word, guess });
      const { data } = await this.client.post<PredictResponse>('/predict', { word, guess });
      return data;
    } catch (err) {
      this.logger.error('Failed to fetch predict', { err });
      return { similarity: '0' };
    }
  }
}

const inference = new Inference();

export default inference;
