import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { empresaService, PreguntaSugerida } from "@/services/empresaService";
import { ApiError } from "@/config/api";
import {
  Building2,
  Users,
  Sparkles,
  CheckCircle2,
  Brain,
  FileText,
  Target,
  Loader2,
} from "lucide-react";

const Company = () => {
  const [step, setStep] = useState<"info" | "job" | "questions" | "success">("info");
  const [loading, setLoading] = useState(false);
  const [empresaId, setEmpresaId] = useState<string>("");
  const [vacanteId, setVacanteId] = useState<string>("");
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    nit: "",
    industry: "",
    size: "",
    description: "",
    city: "",
    email: "",
  });
  const [jobInfo, setJobInfo] = useState({
    title: "",
    description: "",
    requirements: "",
    salary_min: "",
    salary_max: "",
    location: "",
    type: "",
    modalidad: "",
    cargo: "",
    experiencia_min: "",
    experiencia_max: "",
  });
  const [aiQuestions, setAiQuestions] = useState<PreguntaSugerida[]>([]);
  const { toast } = useToast();

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await empresaService.registrar({
        nombre_empresa: companyInfo.name,
        nit: companyInfo.nit,
        industria: companyInfo.industry,
        tamaño_empresa: companyInfo.size,
        descripcion: companyInfo.description,
        ciudad: companyInfo.city,
        email: companyInfo.email,
      });
      
      setEmpresaId(response.empresa_id);
      toast({
        title: "Información registrada",
        description: response.mensaje,
      });
      setStep("job");
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Error",
        description: apiError.message || "No se pudo registrar la empresa",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Parsear habilidades desde el campo requirements
      const habilidades = jobInfo.requirements
        .split('\n')
        .map(req => req.trim())
        .filter(req => req.length > 0);

      const response = await empresaService.crearVacante({
        empresa_id: empresaId,
        titulo: jobInfo.title,
        descripcion: jobInfo.description,
        cargo: jobInfo.cargo || jobInfo.title,
        tipo_contrato: jobInfo.type,
        modalidad: jobInfo.modalidad,
        habilidades_requeridas: habilidades,
        experiencia_min: parseInt(jobInfo.experiencia_min) || 0,
        experiencia_max: parseInt(jobInfo.experiencia_max) || 10,
        salario_min: parseFloat(jobInfo.salary_min) || 0,
        salario_max: parseFloat(jobInfo.salary_max) || 0,
        ciudad: jobInfo.location,
      });
      
      setVacanteId(response.vacante_id);
      setAiQuestions(response.preguntas_sugeridas);
      
      toast({
        title: "Preguntas generadas",
        description: "La IA ha creado preguntas personalizadas para evaluar candidatos.",
      });
      setStep("questions");
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Error",
        description: apiError.message || "No se pudo crear la vacante",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    
    try {
      // Aprobar todas las preguntas por defecto
      const preguntasAprobadas = aiQuestions.map(q => ({
        pregunta_id: q.pregunta_id || "",
        aprobada: true,
      }));

      const response = await empresaService.aprobarPreguntas({
        vacante_id: vacanteId,
        preguntas_aprobadas: preguntasAprobadas,
      });
      
      toast({
        title: "¡Convocatoria publicada!",
        description: response.mensaje,
      });
      setStep("success");
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Error",
        description: apiError.message || "No se pudo publicar la vacante",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
                      <Label htmlFor="nit">NIT</Label>
                      <Input
                        id="nit"
                        placeholder="Ej: 900123456"
                        value={companyInfo.nit}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, nit: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contacto@empresa.com"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                        required
                      />
                    </div>
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
                        placeholder="Ej: 11-50"
                        value={companyInfo.size}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, size: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      placeholder="Ej: Bogotá"
                      value={companyInfo.city}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                      required
                    />
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

                  <Button type="submit" className="w-full gradient-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Continuar con IA
                      </>
                    )}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salary_min">Salario Mínimo</Label>
                      <Input
                        id="salary_min"
                        type="number"
                        placeholder="Ej: 3000000"
                        value={jobInfo.salary_min}
                        onChange={(e) => setJobInfo({ ...jobInfo, salary_min: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salary_max">Salario Máximo</Label>
                      <Input
                        id="salary_max"
                        type="number"
                        placeholder="Ej: 5000000"
                        value={jobInfo.salary_max}
                        onChange={(e) => setJobInfo({ ...jobInfo, salary_max: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experiencia_min">Experiencia Mínima (años)</Label>
                      <Input
                        id="experiencia_min"
                        type="number"
                        placeholder="Ej: 2"
                        value={jobInfo.experiencia_min}
                        onChange={(e) => setJobInfo({ ...jobInfo, experiencia_min: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experiencia_max">Experiencia Máxima (años)</Label>
                      <Input
                        id="experiencia_max"
                        type="number"
                        placeholder="Ej: 5"
                        value={jobInfo.experiencia_max}
                        onChange={(e) => setJobInfo({ ...jobInfo, experiencia_max: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Ciudad</Label>
                      <Input
                        id="location"
                        placeholder="Ej: Bogotá"
                        value={jobInfo.location}
                        onChange={(e) => setJobInfo({ ...jobInfo, location: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Contrato</Label>
                      <Input
                        id="type"
                        placeholder="Ej: Tiempo completo"
                        value={jobInfo.type}
                        onChange={(e) => setJobInfo({ ...jobInfo, type: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modalidad">Modalidad</Label>
                      <Input
                        id="modalidad"
                        placeholder="Ej: Remoto, Híbrido"
                        value={jobInfo.modalidad}
                        onChange={(e) => setJobInfo({ ...jobInfo, modalidad: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="button" variant="outline" onClick={() => setStep("info")}>
                      Atrás
                    </Button>
                    <Button type="submit" className="flex-1 gradient-primary" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generando...
                        </>
                      ) : (
                        <>
                          <Brain className="mr-2 h-4 w-4" />
                          Generar Preguntas con IA
                        </>
                      )}
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
                            Pregunta {index + 1} - {question.tipo_pregunta}
                          </p>
                          <p className="text-sm text-muted-foreground">{question.pregunta}</p>
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
                  <Button onClick={handlePublish} className="flex-1 gradient-secondary" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Publicando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Publicar Convocatoria
                      </>
                    )}
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
                    setCompanyInfo({ name: "", nit: "", industry: "", size: "", description: "", city: "", email: "" });
                    setJobInfo({ title: "", description: "", requirements: "", salary_min: "", salary_max: "", location: "", type: "", modalidad: "", cargo: "", experiencia_min: "", experiencia_max: "" });
                    setAiQuestions([]);
                    setEmpresaId("");
                    setVacanteId("");
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
