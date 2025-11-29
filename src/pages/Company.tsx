import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  Users,
  Sparkles,
  CheckCircle2,
  Brain,
  FileText,
  Target,
} from "lucide-react";

const Company = () => {
  const [step, setStep] = useState<"info" | "job" | "questions" | "success">("info");
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    industry: "",
    size: "",
    description: "",
  });
  const [jobInfo, setJobInfo] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    type: "",
  });
  const [aiQuestions, setAiQuestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Información registrada",
      description: "La IA ha clasificado tu empresa exitosamente.",
    });
    setStep("job");
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular generación de preguntas por IA
    const generatedQuestions = [
      "¿Cuál es tu experiencia previa en proyectos similares a los que desarrollaremos?",
      "Describe tu proceso para resolver problemas técnicos complejos.",
      "¿Cómo te mantienes actualizado con las últimas tecnologías en tu campo?",
      "Cuéntame sobre un proyecto del que te sientas especialmente orgulloso.",
      "¿Cómo describes tu estilo de trabajo en equipo?",
    ];
    
    setAiQuestions(generatedQuestions);
    toast({
      title: "Preguntas generadas",
      description: "La IA ha creado preguntas personalizadas para evaluar candidatos.",
    });
    setStep("questions");
  };

  const handlePublish = () => {
    toast({
      title: "¡Convocatoria publicada!",
      description: "Tu vacante está ahora disponible para candidatos.",
    });
    setStep("success");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-foreground">Portal de Empresas</h1>
              <p className="text-lg text-muted-foreground">
                Encuentra el talento perfecto con ayuda de inteligencia artificial
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12 space-x-4">
              <div
                className={`flex items-center space-x-2 ${
                  step === "info" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    step === "info" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <Building2 className="h-5 w-5" />
                </div>
                <span className="font-medium hidden sm:inline">Info Empresa</span>
              </div>

              <div className="h-px w-12 bg-border" />

              <div
                className={`flex items-center space-x-2 ${
                  step === "job" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    step === "job" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <FileText className="h-5 w-5" />
                </div>
                <span className="font-medium hidden sm:inline">Vacante</span>
              </div>

              <div className="h-px w-12 bg-border" />

              <div
                className={`flex items-center space-x-2 ${
                  step === "questions" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    step === "questions" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <Brain className="h-5 w-5" />
                </div>
                <span className="font-medium hidden sm:inline">Preguntas IA</span>
              </div>
            </div>

            {/* Step 1: Company Info */}
            {step === "info" && (
              <Card className="p-8 space-y-6 shadow-custom-md animate-in fade-in slide-in-from-bottom">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <Building2 className="mr-3 h-6 w-6 text-primary" />
                    Información de la Empresa
                  </h2>
                  <p className="text-muted-foreground">
                    La IA utilizará esta información para clasificar tu empresa y personalizar el proceso.
                  </p>
                </div>

                <form onSubmit={handleCompanySubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre de la empresa</Label>
                    <Input
                      id="name"
                      placeholder="Ej: Tech Solutions SAS"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industria</Label>
                      <Input
                        id="industry"
                        placeholder="Ej: Tecnología, Retail, Finanzas"
                        value={companyInfo.industry}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size">Tamaño de la empresa</Label>
                      <Input
                        id="size"
                        placeholder="Ej: 10-50 empleados"
                        value={companyInfo.size}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, size: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción de la empresa</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe brevemente tu empresa, su cultura y valores..."
                      rows={4}
                      value={companyInfo.description}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, description: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gradient-primary">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Continuar con IA
                  </Button>
                </form>
              </Card>
            )}

            {/* Step 2: Job Details */}
            {step === "job" && (
              <Card className="p-8 space-y-6 shadow-custom-md animate-in fade-in slide-in-from-bottom">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <FileText className="mr-3 h-6 w-6 text-primary" />
                    Detalles de la Vacante
                  </h2>
                  <p className="text-muted-foreground">
                    Describe el puesto que necesitas cubrir con el mayor detalle posible.
                  </p>
                </div>

                <form onSubmit={handleJobSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del puesto</Label>
                    <Input
                      id="title"
                      placeholder="Ej: Desarrollador Full Stack Senior"
                      value={jobInfo.title}
                      onChange={(e) => setJobInfo({ ...jobInfo, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Descripción del puesto</Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Describe las responsabilidades principales..."
                      rows={4}
                      value={jobInfo.description}
                      onChange={(e) => setJobInfo({ ...jobInfo, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requisitos y habilidades</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Lista los requisitos técnicos, experiencia necesaria, etc."
                      rows={4}
                      value={jobInfo.requirements}
                      onChange={(e) => setJobInfo({ ...jobInfo, requirements: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salario</Label>
                      <Input
                        id="salary"
                        placeholder="Ej: $2,000 - $3,000"
                        value={jobInfo.salary}
                        onChange={(e) => setJobInfo({ ...jobInfo, salary: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input
                        id="location"
                        placeholder="Ej: Remoto, Bogotá"
                        value={jobInfo.location}
                        onChange={(e) => setJobInfo({ ...jobInfo, location: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo</Label>
                      <Input
                        id="type"
                        placeholder="Ej: Tiempo completo"
                        value={jobInfo.type}
                        onChange={(e) => setJobInfo({ ...jobInfo, type: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="button" variant="outline" onClick={() => setStep("info")}>
                      Atrás
                    </Button>
                    <Button type="submit" className="flex-1 gradient-primary">
                      <Brain className="mr-2 h-4 w-4" />
                      Generar Preguntas con IA
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Step 3: AI Generated Questions */}
            {step === "questions" && (
              <Card className="p-8 space-y-6 shadow-custom-md animate-in fade-in slide-in-from-bottom">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <Brain className="mr-3 h-6 w-6 text-primary" />
                    Preguntas Generadas por IA
                  </h2>
                  <p className="text-muted-foreground">
                    Basándonos en tu vacante, la IA ha generado estas preguntas para evaluar candidatos.
                    Puedes aceptarlas o modificarlas.
                  </p>
                </div>

                <div className="space-y-4">
                  {aiQuestions.map((question, index) => (
                    <Card key={index} className="p-4 bg-muted/30 border-primary/20">
                      <div className="flex items-start space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mt-1">
                          <Target className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground mb-1">
                            Pregunta {index + 1}
                          </p>
                          <p className="text-sm text-muted-foreground">{question}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-4 bg-secondary/5 border-secondary/20">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Sugerencia de IA</p>
                      <p className="text-sm text-muted-foreground">
                        Estas preguntas están diseñadas para evaluar tanto las habilidades técnicas como
                        las soft skills del candidato. Te recomendamos publicar la convocatoria para
                        empezar a recibir aplicaciones.
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="flex space-x-4">
                  <Button type="button" variant="outline" onClick={() => setStep("job")}>
                    Atrás
                  </Button>
                  <Button onClick={handlePublish} className="flex-1 gradient-secondary">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Publicar Convocatoria
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 4: Success */}
            {step === "success" && (
              <Card className="p-12 text-center space-y-6 shadow-custom-md animate-in fade-in slide-in-from-bottom">
                <div className="flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-secondary">
                    <CheckCircle2 className="h-10 w-10 text-secondary-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold text-foreground">
                    ¡Convocatoria Publicada!
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    Tu vacante para <span className="font-semibold">{jobInfo.title}</span> está ahora
                    disponible para candidatos. Recibirás notificaciones cuando empiecen a postular.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                  <Card className="p-4 bg-muted/30">
                    <Users className="h-8 w-8 text-primary mb-2 mx-auto" />
                    <p className="text-sm font-medium text-foreground">Candidatos</p>
                    <p className="text-2xl font-bold text-primary">0</p>
                  </Card>
                  <Card className="p-4 bg-muted/30">
                    <Brain className="h-8 w-8 text-secondary mb-2 mx-auto" />
                    <p className="text-sm font-medium text-foreground">Evaluados por IA</p>
                    <p className="text-2xl font-bold text-secondary">0</p>
                  </Card>
                  <Card className="p-4 bg-muted/30">
                    <Target className="h-8 w-8 text-accent mb-2 mx-auto" />
                    <p className="text-sm font-medium text-foreground">Recomendados</p>
                    <p className="text-2xl font-bold text-accent">0</p>
                  </Card>
                </div>

                <Button
                  onClick={() => {
                    setStep("info");
                    setCompanyInfo({ name: "", industry: "", size: "", description: "" });
                    setJobInfo({ title: "", description: "", requirements: "", salary: "", location: "", type: "" });
                    setAiQuestions([]);
                  }}
                  className="gradient-primary"
                >
                  Publicar otra vacante
                </Button>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Company;
