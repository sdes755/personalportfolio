import { Calendar, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

export default function Experience() {
  const experiences: Experience[] = [
    {
      title: "Software Engineering Intern",
      company: "Aderant",
      period: "Nov 2024 - Feb 2025, July 2025 - Present",
      location: "Auckland, New Zealand",
      description:
        "Settled into a fast-paced Agile team, contributing across the full stack to enhance a large-scale enterprise application. Gained hands-on experience in modern web development, collaborative problem-solving, CI/CD workflows, and delivering production-ready features that improved internal tooling and client-facing functionality.",
      achievements: [
        "Co-Built and Co-Deployed 2 Micro Frontend Components (MFCs) using React, TypeScript, Node.js and Express for the internal Product Library, improving Code Modularity and enabling faster feature development.",
        "Resolved ~20 Client-Facing bugs and authored 3 new Feature Pages for the Cloud-GL application, directly enhancing usability and client requirements.",
        "Co-Developed a production-grade API for a major application module, enabling critical functionality and supporting scalability across the Cloud-GL platform.",
      ],
    },
    {
      title: "Lead Mathematics Tutor",
      company: "Seriously Addictive Mathematics",
      period: "2023 - Present",
      location: "Auckland, New Zealand",
      description:
        "As Lead Tutor, I am responsible for delivering high-quality lessons to students across a range of age groups and abilities. My role involves overseeing lesson delivery, supporting student learning, and contributing to a positive and engaging educational environment.",
      achievements: [
        "Conducted one-on-one and group sessions whilst utilising creative and engaging teaching methods to promote participation and ensure knowledge retention.",
        "Tracked student progress, provided regular feedback to parents on student development, and catered to feedback received.",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "Orion Health",
      period: "November 2025 - February 2026",
      location: "Auckland, New Zealand",
      description:
        "Currently placed on the Patient Engagement Team working on the Digital Front Door Product.",
      achievements: ["Still to come!"],
    },
  ];

  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My professional journey and the experiences that have shaped my
            career so far.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={exp.title} className="relative mb-12 last:mb-0">
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-30" />
              )}

              <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 bg-white rounded-full" />
                </div>

                {/* Content */}
                <Card className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-white text-xl">
                          {exp.title}
                        </CardTitle>
                        <CardDescription className="text-blue-300 font-medium">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col md:items-end gap-1">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-white font-medium">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="text-gray-300 text-sm flex items-start gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
