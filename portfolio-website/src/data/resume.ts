export interface Experience {
    role: string;
    company: string;
    period: string;
    achievements: string[];
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export const resumeData = {
    experience: [
        {
            role: "Internal Medicine Resident",
            company: "ULS Braga",
            period: "2024 - Present",
            achievements: [
                "Provide comprehensive patient care across internal medicine, managing complex cases requiring diagnostic reasoning and evidence-based treatment protocols",
                "Identify clinical workflow inefficiencies and design digital solutions to improve care delivery at scale",
                "Collaborate with multidisciplinary teams (specialists, nurses, administration) — managing stakeholder needs across clinical and operational functions"
            ]
        },
        {
            role: "Medical Intern",
            company: "Centro Hospitalar de Leiria",
            period: "2023",
            achievements: [
                "Completed internship year with rotations across Internal Medicine, General Surgery, Pediatrics, and Primary Care",
                "Cross-functional care delivery across multiple specialties in high-volume clinical settings"
            ]
        },
        {
            role: "MSc Researcher",
            company: "Stem Cell Bioengineering Lab (IBB/IST)",
            period: "2015",
            achievements: [
                "Conducted research on cardiac regenerative therapies: 'Evaluation of the cardiac regenerative potential of mesenchymal stem/stromal cells from different human sources'",
                "Isolated and expanded bone marrow-derived MSCs from Acute Myocardial Infarction patients, studying expansion potential and potency across different sources"
            ]
        }
    ],
    education: [
        {
            degree: "MD in Medicine",
            institution: "Faculdade de Medicina da Universidade do Porto",
            period: "2016 - 2022"
        },
        {
            degree: "MSc Biomedical Engineering",
            institution: "Instituto Superior Técnico, Lisbon",
            period: "2010 - 2015"
        },
        {
            degree: "Erasmus Exchange (Cell Systems Engineering)",
            institution: "TU Delft",
            period: "2014 - 2015"
        }
    ],
    certifications: [
        {
            name: "Medical License",
            issuer: "Ordem dos Médicos (Portugal)",
            date: "2022"
        },
        {
            name: "Certificate in Advanced English (CAE)",
            issuer: "Cambridge Assessment English",
            date: "Certified"
        }
    ],
    skills: {
        clinical: [
            "Internal Medicine",
            "Patient Management",
            "Diagnostic Reasoning",
            "Evidence-Based Practice"
        ],
        digital: [
            "AI Product Development",
            "Healthcare Systems",
            "Clinical Operations",
            "Electronic Health Records"
        ],
        technical: [
            "React", "TypeScript", "Python", "Next.js", "TensorFlow", "Tailwind CSS", "Gemini API", "Data Analysis"
        ]
    }
};
