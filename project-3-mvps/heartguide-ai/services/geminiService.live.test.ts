import { describe, it, expect } from 'vitest';
import { chatWithNurseAI, estimateSodium, checkLLMStatus } from './geminiService';

// Live tests — require LM Studio running at localhost:1234
describe('geminiService live integration', () => {
    it('reports LM Studio online with a model', async () => {
        const status = await checkLLMStatus();
        expect(status.online).toBe(true);
        expect(status.model).toBeTruthy();
    }, 15000);

    it('chatWithNurseAI returns a non-empty reply', async () => {
        const reply = await chatWithNurseAI('I feel fine today', 'test patient');
        expect(typeof reply).toBe('string');
        expect(reply.length).toBeGreaterThan(0);
    }, 120000);

    it('estimateSodium parses structured JSON', async () => {
        const result = await estimateSodium('grilled chicken salad');
        expect(result).toHaveProperty('sodiumMg');
        expect(typeof result.sodiumMg).toBe('number');
    }, 120000);
});
