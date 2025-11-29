import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ChatbotInterface from "@/components/ChatbotInterface";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  MessageSquare,
  Building2,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  posted: string;
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Desarrollador Full Stack",
    company: "TechStart Solutions",
    location: "Remoto",
    type: "Tiempo Completo",
    salary: "$2,500 - $3,500 USD",
    description:
      "Buscamos un desarrollador full stack con experiencia en React y Node.js para unirse a nuestro equipo en crecimiento.",
    requirements: [
      "3+ años de experiencia en desarrollo web",
      "Dominio de React, Node.js y TypeScript",
      "Experiencia con bases de datos SQL y NoSQL",
      "Conocimientos de Git y metodologías ágiles",
    ],
    posted: "Hace 2 días",
  },
  {
    id: "2",
    title: "Diseñador UX/UI",
    company: "Creative Agency",
    location: "Bogotá, Colombia",
    type: "Híbrido",
    salary: "$1,800 - $2,500 USD",
    description:
      "Empresa de diseño busca diseñador UX/UI apasionado por crear experiencias digitales excepcionales.",
    requirements: [
      "2+ años de experiencia en diseño UX/UI",
      "Portafolio demostrando proyectos web y móviles",
      "Dominio de Figma, Adobe XD o Sketch",
      "Conocimientos de Design Systems",
    ],
    posted: "Hace 1 semana",
  },
  {
    id: "3",
    title: "Analista de Datos",
    company: "DataDriven Corp",
    location: "Ciudad de México",
    type: "Tiempo Completo",
    salary: "$2,000 - $3,000 USD",
    description:
      "Únete a nuestro equipo de analytics y ayuda a las empresas a tomar decisiones basadas en datos.",
    requirements: [
      "Experiencia con Python y SQL",
      "Conocimientos de visualización de datos (Tableau, Power BI)",
      "Análisis estadístico y machine learning básico",
      "Capacidad de comunicar insights complejos",
    ],
    posted: "Hace 3 días",
  },
];

const Candidate = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-foreground">Vacantes Disponibles</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora oportunidades laborales y postula con nuestro asistente inteligente que te guiará
              en el proceso.
            </p>
          </div>

          {!selectedJob ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {mockJobs.map((job) => (
                <Card
                  key={job.id}
                  className="p-6 space-y-6 hover:shadow-custom-lg transition-base cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h3 className="text-foreground font-semibold">{job.title}</h3>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          <span className="text-sm">{job.company}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{job.type}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{job.description}</p>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Requisitos:</p>
                    <ul className="space-y-1">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-secondary mr-2">✓</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button onClick={() => setSelectedJob(job)} className="w-full gradient-primary">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Postular con Chatbot
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{selectedJob.title}</h2>
                  <p className="text-muted-foreground">
                    {selectedJob.company} • {selectedJob.location}
                  </p>
                </div>
                <Button variant="outline" onClick={() => setSelectedJob(null)}>
                  Ver otras vacantes
                </Button>
              </div>

              <ChatbotInterface jobTitle={selectedJob.title} />

              <Card className="p-6 space-y-4 bg-muted/30">
                <h3 className="font-semibold text-foreground">Sobre la vacante</h3>
                <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Requisitos completos:</p>
                  <ul className="space-y-1">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-secondary mr-2">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Tipo de contrato</p>
                    <p className="text-sm font-medium text-foreground">{selectedJob.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Rango salarial</p>
                    <p className="text-sm font-medium text-foreground">{selectedJob.salary}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Candidate;
