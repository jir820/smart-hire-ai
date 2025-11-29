import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChatbotInterface from "@/components/ChatbotInterface";
import { vacantesService, Vacante } from "@/services/vacantesService";
import { ApiError } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  MessageSquare,
  Building2,
  Loader2,
  Search,
} from "lucide-react";

const Candidate = () => {
  const [jobs, setJobs] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [filtros, setFiltros] = useState({
    ciudad: "",
    cargo: "",
    modalidad: "",
  });
  const { toast } = useToast();

  // Cargar vacantes al montar el componente
  useEffect(() => {
    cargarVacantes();
  }, []);

  const cargarVacantes = async () => {
    setLoading(true);
    try {
      const response = await vacantesService.listarPublicadas({
        ...filtros,
        limit: 50,
      });
      setJobs(response.vacantes);
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Error",
        description: apiError.message || "No se pudieron cargar las vacantes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = () => {
    cargarVacantes();
  };

  const formatSalary = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Hace 1 día";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
  };

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

          {/* Filtros de búsqueda */}
          {!selectedJobId && (
            <Card className="p-6 mb-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    placeholder="Ej: Bogotá"
                    value={filtros.ciudad}
                    onChange={(e) => setFiltros({ ...filtros, ciudad: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    placeholder="Ej: Desarrollador"
                    value={filtros.cargo}
                    onChange={(e) => setFiltros({ ...filtros, cargo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modalidad">Modalidad</Label>
                  <Input
                    id="modalidad"
                    placeholder="Ej: Remoto"
                    value={filtros.modalidad}
                    onChange={(e) => setFiltros({ ...filtros, modalidad: e.target.value })}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleBuscar} className="w-full gradient-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Buscar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {!selectedJobId ? (
            loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : jobs.length === 0 ? (
              <Card className="p-12 text-center max-w-2xl mx-auto">
                <p className="text-muted-foreground">No se encontraron vacantes. Intenta con otros filtros.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {jobs.map((job) => (
                  <Card
                    key={job.id}
                    className="p-6 space-y-6 hover:shadow-glow-primary transition-base cursor-pointer border-primary/10 hover:border-primary/30"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <h3 className="text-foreground font-semibold">{job.titulo}</h3>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            <span className="text-sm">{job.empresa_nombre}</span>
                          </div>
                        </div>
                        <Badge variant="secondary">{job.modalidad}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.ciudad}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{formatSalary(job.salario_min, job.salario_max)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(job.fecha_publicacion)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Habilidades requeridas:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.habilidades_requeridas.slice(0, 5).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button onClick={() => setSelectedJobId(job.id)} className="w-full gradient-primary">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ver Detalles y Postular
                    </Button>
                  </Card>
                ))}
              </div>
            )
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setSelectedJobId(null)}>
                  ← Ver otras vacantes
                </Button>
              </div>

              <ChatbotInterface vacanteId={selectedJobId} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Candidate;
