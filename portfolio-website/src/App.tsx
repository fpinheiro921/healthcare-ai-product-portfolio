import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';

import { ThemeProvider } from './contexts/ThemeContext';

const Home = React.lazy(() => import('./pages/Home'));
const DocumentPage = React.lazy(() => import('./pages/DocumentPage'));
const SNSTransformation = React.lazy(() => import('./pages/SNSTransformation'));
const SNSSimulator = React.lazy(() => import('./pages/SNSSimulator'));
const DocuFlowShowcase = React.lazy(() => import('./pages/DocuFlowShowcase'));
const DocuFlowLive = React.lazy(() => import('./pages/DocuFlowLive'));
const PhoenixLive = React.lazy(() => import('./pages/PhoenixLive'));
const DesignSystem = React.lazy(() => import('./pages/DesignSystem'));

// New Flagship Showcases
const HeartGuideShowcase = React.lazy(() => import('./pages/HeartGuideShowcase'));
const BreathEasyShowcase = React.lazy(() => import('./pages/BreathEasyShowcase'));
const GlucoWiseShowcase = React.lazy(() => import('./pages/GlucoWiseShowcase'));

// Live App Pages
const HeartGuideLive = React.lazy(() => import('./pages/HeartGuideLive'));
const BreathEasyLive = React.lazy(() => import('./pages/BreathEasyLive'));
const GlucoWiseLive = React.lazy(() => import('./pages/GlucoWiseLive'));
const Experiments = React.lazy(() => import('./pages/Experiments'));

function App() {
    return (
        <ThemeProvider>
            <Router>
                <ScrollToTop />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/experiments" element={<Experiments />} />
                        <Route path="/sns-transformation" element={<SNSTransformation />} />
                        <Route path="/sns-simulator" element={<SNSSimulator />} />
                        <Route path="/docuflow-showcase" element={<DocuFlowShowcase />} />
                        <Route path="/docuflow-live" element={<DocuFlowLive />} />
                        <Route path="/phoenix-live" element={<PhoenixLive />} />
                        <Route path="/design-system" element={<DesignSystem />} />
                        <Route path="/documents/:id" element={<DocumentPage />} />

                        {/* Flagship Showcases */}
                        <Route path="/heartguide-showcase" element={<HeartGuideShowcase />} />
                        <Route path="/breatheasy-showcase" element={<BreathEasyShowcase />} />
                        <Route path="/glucowise-showcase" element={<GlucoWiseShowcase />} />

                        {/* Live App Pages */}
                        <Route path="/heartguide-live" element={<HeartGuideLive />} />
                        <Route path="/breatheasy-live" element={<BreathEasyLive />} />
                        <Route path="/glucowise-live" element={<GlucoWiseLive />} />
                    </Routes>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
}

export default App;
