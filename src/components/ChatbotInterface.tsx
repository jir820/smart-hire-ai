import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Upload, Send, Bot, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { candidatoService } from "@/services/candidatoService";
import { vacantesService, DetalleVacante } from "@/services/vacantesService";
import { ApiError } from "@/config/api";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
}

interface ChatbotInterfaceProps {
  vacanteId: string;
}

const ChatbotInterface = ({ vacanteId }: ChatbotInterfaceProps) => {
  const [detalleVacante, setDetalleVacante] = useState<DetalleVacante | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"form" | "questions" | "complete">("form");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [aplicacionId, setAplicacionId] = useState<string>("");
  const [preguntas, setPreguntas] = useState<Array<{ pregunta_id: string; pregunta: string }>>([]);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    experiencia: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Cargar detalles de la vacante
  useEffect(() => {
    cargarDetalleVacante();
  }, [vacanteId]);

  const cargarDetalleVacante = async () => {
    try {
      const detalle = await vacantesService.obtenerDetalle(vacanteId);
      setDetalleVacante(detalle);
      setMessages([
        {
          id: "1",
          type: "bot",
          content: `¡Hola! Estoy aquí para ayudarte con tu postulación para ${detalle.vacante.titulo}. Por favor completa el formulario para comenzar.`,
        },
      ]);
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Error",
        description: apiError.message || "No se pudo cargar la vacante",
        variant: "destructive",
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setCvFile(file);
      toast({
        title: "CV seleccionado",
        description: file.name,
      });
    } else {
      toast({
        title: "Error",
        description: "Por favor sube un archivo PDF válido.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cvFile) {
      toast({
        title: "Error",
        description: "Por favor sube tu CV",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await candidatoService.aplicar({
        vacante_id: vacanteId,
        nombre_anonimo: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        ciudad: formData.ciudad,
        años_experiencia: parseInt(formData.experiencia),
        cv_pdf: cvFile,
      });

      setAplicacionId(response.aplicacion_id);
      setPreguntas(response.preguntas);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: "¡Perfecto! He analizado tu CV. Ahora me gustaría hacerte algunas preguntas para conocerte mejor.",
      };
      setMessages((prev) => [...prev, botMessage]);
      
      setTimeout(() => {
        if (response.preguntas.length > 0) {
          const firstQuestion: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: response.preguntas[0].pregunta,
          };
          setMessages((prev) => [...prev, firstQuestion]);
        }
      }, 1000);

      setStep("questions");
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Error",
        description: apiError.message || "No se pudo enviar la aplicación",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    
    // Guardar respuesta
    const preguntaActual = preguntas[questionIndex];
    setRespuestas((prev) => ({
      ...prev,
      [preguntaActual.pregunta_id]: input,
    }));
    
    setInput("");
    setIsLoading(true);

    try {
      if (questionIndex < preguntas.length - 1) {
        // Siguiente pregunta
        const nextQuestion: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: preguntas[questionIndex + 1].pregunta,
        };
        setMessages((prev) => [...prev, nextQuestion]);
        setQuestionIndex((prev) => prev + 1);
      } else {
        // Enviar todas las respuestas
        const respuestasArray = preguntas.map(p => ({
          pregunta_id: p.pregunta_id,
          respuesta: respuestas[p.pregunta_id] || (p.pregunta_id === preguntaActual.pregunta_id ? input : ""),
        }));

        const response = await candidatoService.responder({
          aplicacion_id: aplicacionId,
          respuestas: respuestasArray,
        });

        const finalMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: `¡Muchas gracias por completar la entrevista! Tu postulación ha sido registrada exitosamente con una puntuación de ${response.puntuacion_ia}/100 y ${response.compatibilidad_porcentaje}% de compatibilidad. El equipo de recursos humanos revisará tu perfil y se pondrá en contacto contigo pronto. ¡Mucha suerte! 🎉`,
        };
        setMessages((prev) => [...prev, finalMessage]);
        setStep("complete");
        
        toast({
          title: "¡Postulación enviada!",
          description: `Puntuación: ${response.puntuacion_ia}/100`,
        });
      }
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Error",
        description: apiError.message || "No se pudo enviar la respuesta",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!detalleVacante) {
    return (
      <Card className="flex items-center justify-center h-[600px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Información de la vacante */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold text-foreground mb-2">{detalleVacante.vacante.titulo}</h3>
        <p className="text-sm text-muted-foreground mb-4">{detalleVacante.empresa.nombre_empresa}</p>
        <p className="text-sm text-muted-foreground">{detalleVacante.vacante.descripcion}</p>
      </Card>

      <Card className="flex flex-col h-[600px] shadow-custom-md">
        <div className="flex items-center space-x-3 p-4 border-b border-border bg-muted/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Asistente de Reclutamiento</h3>
            <p className="text-sm text-muted-foreground">Entrevista para {detalleVacante.vacante.titulo}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {step === "form" ? (
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre completo</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input
                  id="ciudad"
                  value={formData.ciudad}
                  onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experiencia">Años de experiencia</Label>
                <Input
                  id="experiencia"
                  type="number"
                  value={formData.experiencia}
                  onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cv">CV (PDF)</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {cvFile ? cvFile.name : "Subir CV (PDF)"}
                </Button>
              </div>
              <Button type="submit" className="w-full gradient-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Comenzar Entrevista"
                )}
              </Button>
            </form>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      message.type === "bot" ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {message.type === "bot" ? (
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <User className="h-5 w-5 text-secondary-foreground" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.type === "bot"
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {step === "questions" && (
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Escribe tu respuesta..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatbotInterface;
