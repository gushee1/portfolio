export type WorkPosition = {
  title: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  remote?: boolean;
  location?: string;
  summary?: string;
  highlights: string[];
  technologies?: string[];
};

export type WorkExperience = {
  company: string;
  location: string;
  remote?: boolean;
  companyUrl?: string;
  omittedFromResume?: boolean;
  positions: WorkPosition[];
};

export type Education = {
  school: string;
  location: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  graduationDate?: string;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
  activities?: string[];
  schoolUrl?: string;
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export function formatResumeLocation(location: string, remote?: boolean) {
  return remote ? `${location} (Remote)` : location;
}

export const formatLocation = formatResumeLocation;

export function formatDateRange(startDate?: string, endDate?: string, current?: boolean) {
  if (!startDate) {
    return current ? "Present" : endDate ?? "";
  }

  return `${startDate} - ${current ? "Present" : endDate ?? "Present"}`;
}

export function formatWorkPositionLocation(experience: WorkExperience, position: WorkPosition) {
  return formatResumeLocation(position.location ?? experience.location, position.remote ?? experience.remote);
}

export const workExperience: WorkExperience[] = [
  {
    company: "Space Ground System Solutions",
    location: "Alexandria, VA",
    positions: [
      {
        title: "Software Engineer I",
        startDate: "August 2025",
        current: true,
        highlights: [
          "Technical program lead for a government-sponsored continuity-of-operations project, designing and implementing a hybrid cloud antenna network broker in AWS GovCloud to serve as a backup Network Operations Center (NOC) for a 2027 satellite launch.",
          "Serving as primary technical liaison to government PMO, coordinating requirements, system design, integration efforts, and delivery timelines; participating in sponsor demos, technical reviews, and acceptance testing.",
          "Implementing and deploying containerized services to Kubernetes (EKS) as part of a distributed hybrid cloud NOC that enables satellite ops via multiple commercial antenna providers using a common interface."
        ],
        technologies: ["AWS GovCloud", "Docker", "Kubernetes", "EKS", "Helm"]
      },
      {
        title: "Associate Software Engineer",
        startDate: "August 2024",
        endDate: "July 2025",
        highlights: [
          "Developed core messaging SDK features in Go, Python, and Java, including cross-language large-message transport over NATS.",
          "Designed and deployed a distributed full-stack application, Antenna Almanac, in AWS GovCloud using Go, MongoDB, and NATS, demonstrating integration patterns for a real-time messaging SDK.",
          "Built and maintained CI/CD pipelines in GitLab to automate container builds, vulnerability scanning, and deployment workflows for multiple services, integrating RMF-driven software hardening and compliance validation throughout the pipeline."
        ],
        technologies: ["Go", "Python", "Java", "NATS", "AWS GovCloud", "MongoDB", "GitLab CI/CD"]
      }
    ]
  },
  {
    company: "University of Michigan - Center for Academic Innovation",
    location: "Ann Arbor, MI",
    positions: [
      {
        title: "XR Developer Fellow",
        startDate: "March 2024",
        endDate: "July 2024",
        highlights: [
          "Developed a real-time, human-in-the-loop VR simulation in Unreal Engine 5 to train sports medicine students on SCAT-6 concussion evaluation protocol, focusing on immersive and realistic user interaction.",
          "Designed and implemented interactive user interfaces in VR, including tablet-based touch input and voice-driven interactions.",
          "Utilized Cascadeur to refactor raw motion capture footage into high fidelity MetaHuman animations for Unreal Engine integration.",
          "Supervised test events with researchers to collect usability metrics and iterate on simulation fidelity and user experience."
        ],
        technologies: ["Unreal Engine 5", "Cascadeur", "Metahuman", "VR"]
      }
    ]
  },
  {
    company: "Stellantis",
    location: "Auburn Hills, MI",
    remote: true,
    positions: [
      {
        title: "Software Engineering Intern",
        startDate: "May 2023",
        endDate: "August 2023",
        highlights: [
          "Independently built Android app from POC to MVP stage, enabling Maserati passengers to wirelessly modify their vehicle settings.",
          "Refactored and adapted two third-party mobile games using the Construct 2 engine for native deployment in vehicle head units."
        ],
        technologies: ["Kotlin", "Android", "MQTT", "Construct 2"]
      }
    ]
  },
  {
    company: "Miller Electric Mfg.",
    location: "Appleton, WI",
    positions: [
      {
        title: "Software Engineering Intern",
        startDate: "June 2022",
        endDate: "August 2022",
        highlights: [
          "Developed a Python application to monitor machine components during stress testing, enabling troubleshooting across 5000+ machines and saving thousands of labor hours.",
          "Collaborated with mechanical and electrical engineers to design and implement software-driven reliability improvements in embedded C for systems operating in extreme environments, contributing to EPA compliance efforts."
        ],
        technologies: ["Python", "Embedded C"]
      }
    ]
  }
];

export const education: Education[] = [
  {
    school: "University of Michigan",
    location: "Ann Arbor, MI",
    degree: "Bachelor of Science in Engineering",
    field: "Computer Science",
    startDate: "2020",
    endDate: "2024",
    graduationDate: "2024",
    honors: ["Summa Cum Laude"],
    activities: [
      "WolverineSoft",
      "The Michigan Daily",
      "Institute for Study Abroad",
      "Michigan Men's Rowing Team"
    ]
  }
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["C++", "Python", "Golang", "Java", "C#"]
  },
  {
    category: "Technologies/Tools",
    skills: [
      "Unreal Engine 5",
      "Unity",
      "Linux",
      "Docker",
      "Kubernetes (EKS)",
      "Helm",
      "NATS",
      "MongoDB",
      "Git",
      "Protobuf"
    ]
  }
];
