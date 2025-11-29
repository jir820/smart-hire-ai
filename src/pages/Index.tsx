import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Users,
  Building2,
  Bot,
  TrendingUp,
  CheckCircle2,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import heroImage from "@/assets/hero-recruitment.jpg";
import aiImage from "@/assets/ai-recruitment.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative gradient-hero py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary mix-blend-multiply" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-foreground">
                Transforma tu proceso de{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  reclutamiento
                </span>{" "}
                con IA
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Conecta talento excepcional con oportunidades ideales. Nuestra plataforma
                inteligente optimiza el reclutamiento para PYMEs, reduciendo tiempo y costos mientras
                mejora la calidad de las contrataciones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="gradient-primary shadow-glow-primary hover:shadow-lg transition-base text-lg">
                  <Link to="/candidate">
                    <Users className="mr-2 h-5 w-5" />
                    Soy Candidato
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg border-2">
                  <Link to="/company">
                    <Building2 className="mr-2 h-5 w-5" />
                    Soy Empresa
                  </Link>
                </Button>
              </div>
            </div>
            <div className="animate-in fade-in slide-in-from-right duration-700 delay-200">
              <img
                src={heroImage}
                alt="Plataforma de reclutamiento inteligente"
                className="rounded-2xl shadow-custom-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-foreground">El Desafío del Reclutamiento</h2>
            <p className="text-lg text-muted-foreground">
              Las PYMEs enfrentan procesos de contratación ineficientes que consumen tiempo valioso y
              recursos limitados, dificultando encontrar el talento adecuado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 bg-destructive/5 border-destructive/20 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <BarChart3 className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-foreground">Problemas Actuales</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-destructive mr-2">•</span>
                  Filtrado manual de cientos de hojas de vida
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">•</span>
                  Falta de herramientas para evaluar habilidades técnicas
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">•</span>
                  Procesos largos y costosos de entrevistas
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">•</span>
                  Decisiones basadas en información incompleta
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-secondary/5 border-secondary/20 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <CheckCircle2 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-foreground">Nuestra Solución</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Análisis automático e inteligente de CVs
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Entrevistas adaptativas con IA conversacional
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Evaluación objetiva de habilidades y compatibilidad
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Recomendaciones basadas en datos y machine learning
                </li>
              </ul>
            </Card>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-custom-lg">
            <img src={aiImage} alt="Tecnología de IA para reclutamiento" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-foreground">Beneficios para Todos</h2>
            <p className="text-lg text-muted-foreground">
              Una plataforma diseñada para conectar empresas con talento de forma eficiente y justa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6 hover:shadow-custom-lg transition-base">
              <div className="flex items-center space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary">
                  <Users className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-foreground">Para Candidatos</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Proceso Rápido</p>
                    <p className="text-sm text-muted-foreground">
                      Postula en minutos y recibe feedback inmediato
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Evaluación Justa</p>
                    <p className="text-sm text-muted-foreground">
                      Análisis objetivo basado en habilidades y experiencia
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Bot className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Entrevista Inteligente</p>
                    <p className="text-sm text-muted-foreground">
                      Chatbot que se adapta a tu perfil y experiencia
                    </p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-6 hover:shadow-custom-lg transition-base">
              <div className="flex items-center space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-secondary">
                  <Building2 className="h-7 w-7 text-secondary-foreground" />
                </div>
                <h3 className="text-foreground">Para Empresas</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Ahorro de Tiempo</p>
                    <p className="text-sm text-muted-foreground">
                      Reduce el proceso de selección en hasta 70%
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <BarChart3 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Mejores Contrataciones</p>
                    <p className="text-sm text-muted-foreground">
                      IA recomienda los candidatos más compatibles
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Fácil Gestión</p>
                    <p className="text-sm text-muted-foreground">
                      Panel intuitivo para administrar vacantes y candidatos
                    </p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-foreground">Tecnología Open-Source</h2>
            <p className="text-lg text-muted-foreground">
              Construido con modelos de IA de código abierto y datos curados para garantizar
              transparencia, seguridad y mejora continua.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center space-y-4 hover:shadow-custom-lg transition-base">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary/10">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Modelos Open-Source</h3>
              <p className="text-sm text-muted-foreground">
                Utilizamos modelos de IA de última generación, transparentes y verificables
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-custom-lg transition-base">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-secondary/10">
                <BarChart3 className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground">Datos Curados</h3>
              <p className="text-sm text-muted-foreground">
                Dataset de CVs anonimizados y descripciones de cargos para entrenar la IA
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-custom-lg transition-base">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-accent/10">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Efecto de Red</h3>
              <p className="text-sm text-muted-foreground">
                La plataforma mejora continuamente con cada empresa y candidato que participa
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-primary-foreground">¿Listo para transformar tu reclutamiento?</h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Únete a las empresas que están revolucionando su proceso de contratación con inteligencia
            artificial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg">
              <Link to="/candidate">
                <Users className="mr-2 h-5 w-5" />
                Buscar Oportunidades
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="text-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link to="/company">
                <Building2 className="mr-2 h-5 w-5" />
                Publicar Vacante
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
