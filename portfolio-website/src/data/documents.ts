import heartGuidePrd from '../assets/docs/HeartGuide-AI-PRD.md?raw';
import breathEasyPrd from '../assets/docs/BreathEasy-AI-PRD.md?raw';
import glucoWisePrd from '../assets/docs/GlucoWise-AI-PRD.md?raw';
import docuFlowPrd from '../assets/docs/DocuFlow-PRD.md?raw';
import swordTeardown from '../assets/docs/Sword-Health-Teardown.md?raw';
import omadaTeardown from '../assets/docs/Omada-Health-Teardown.md?raw';
import helloHeartTeardown from '../assets/docs/Hello-Heart-Teardown.md?raw';


export interface Document {
    id: string;
    title: string;
    type: 'PRD' | 'Teardown' | 'Blog';
    content: string;
    originalUrl?: string;
}

export const documents: Record<string, Document> = {
    'heartguide-prd': {
        id: 'heartguide-prd',
        title: 'HeartGuide AI PRD',
        type: 'PRD',
        content: heartGuidePrd,
        originalUrl: 'https://github.com/fpinheiro921/healthcare-ai-product-portfolio/blob/master/project-2-prd/HeartGuide-AI-PRD.md'
    },
    'breatheasy-prd': {
        id: 'breatheasy-prd',
        title: 'BreathEasy AI PRD',
        type: 'PRD',
        content: breathEasyPrd,
        originalUrl: 'https://github.com/fpinheiro921/healthcare-ai-product-portfolio/blob/master/project-2-prd/BreathEasy-AI-PRD.md'
    },
    'glucowise-prd': {
        id: 'glucowise-prd',
        title: 'GlucoWise AI PRD',
        type: 'PRD',
        content: glucoWisePrd,
        originalUrl: 'https://github.com/fpinheiro921/healthcare-ai-product-portfolio/blob/master/project-2-prd/GlucoWise-AI-PRD.md'
    },
    'docuflow-prd': {
        id: 'docuflow-prd',
        title: 'DocuFlow PRD',
        type: 'PRD',
        content: docuFlowPrd,
        originalUrl: 'https://github.com/fpinheiro921/healthcare-ai-product-portfolio/blob/master/project-2-prd/DocuFlow-PRD.md'
    },
    'sword-teardown': {
        id: 'sword-teardown',
        title: 'Sword Health Teardown',
        type: 'Teardown',
        content: swordTeardown,
        originalUrl: 'https://github.com/fpinheiro921/healthcare-ai-product-portfolio/blob/master/project-1-teardowns/Sword-Health-Teardown.md'
    },
    'omada-teardown': {
        id: 'omada-teardown',
        title: 'Omada Health Teardown',
        type: 'Teardown',
        content: omadaTeardown,
        originalUrl: 'https://github.com/fpinheiro921/healthcare-ai-product-portfolio/blob/master/project-1-teardowns/Omada-Health-Teardown.md'
    },
    'hello-heart-teardown': {
        id: 'hello-heart-teardown',
        title: 'Hello Heart Teardown',
        type: 'Teardown',
        content: helloHeartTeardown,
        originalUrl: 'https://github.com/fpinheiro921/healthcare-ai-product-portfolio/blob/master/project-1-teardowns/Hello-Heart-Teardown.md'
    },

};
