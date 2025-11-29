import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Upload, Send, Bot, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
}

interface ChatbotInterfaceProps {
  jobTitle: string;
}

const ChatbotInterface = ({ jobTitle }: ChatbotInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: `¡Hola! Estoy aquí para ayudarte con tu postulación para ${jobTitle}. Para empezar, ¿podrías subir tu CV en formato PDF?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const adaptiveQuestions = [
    "Cuéntame sobre tu experiencia más relevante para este puesto.",
    "¿Qué te motiva a aplicar para esta posición?",
    "¿Cuál consideras que es tu mayor fortaleza profesional?",
    "Describe un desafío que hayas enfrentado y cómo lo resolviste.",
    "¿Dónde te ves en tu carrera profesional en 3 años?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setCvUploaded(true);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: "¡Perfecto! He recibido tu CV. Ahora me gustaría hacerte algunas preguntas para conocerte mejor.",
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      setTimeout(() => {
        const firstQuestion: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: adaptiveQuestions[0],
        };
        setMessages((prev) => [...prev, firstQuestion]);
      }, 1000);

      toast({
        title: "CV subido exitosamente",
        description: "Ahora puedes continuar con la entrevista.",
      });
    } else {
      toast({
        title: "Error",
        description: "Por favor sube un archivo PDF válido.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      if (questionIndex < adaptiveQuestions.length - 1) {
        const nextQuestion: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: adaptiveQuestions[questionIndex + 1],
        };
        setMessages((prev) => [...prev, nextQuestion]);
        setQuestionIndex((prev) => prev + 1);
      } else {
        const finalMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content:
            "¡Muchas gracias por completar la entrevista! Tu postulación ha sido registrada exitosamente. El equipo de recursos humanos revisará tu perfil y se pondrá en contacto contigo pronto. ¡Mucha suerte! 🎉",
        };
        setMessages((prev) => [...prev, finalMessage]);
        
        toast({
          title: "¡Postulación enviada!",
          description: "Recibirás una notificación cuando tu perfil sea revisado.",
        });
      }
    }, 1500);
  };

  return (
    <Card className="flex flex-col h-[600px] shadow-custom-md">
      <div className="flex items-center space-x-3 p-4 border-b border-border bg-muted/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Bot className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Asistente de Reclutamiento</h3>
          <p className="text-sm text-muted-foreground">Entrevista para {jobTitle}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
      </div>

      <div className="p-4 border-t border-border bg-muted/30">
        {!cvUploaded ? (
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full gradient-secondary"
            >
              <Upload className="h-4 w-4 mr-2" />
              Subir CV (PDF)
            </Button>
          </div>
        ) : (
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
        )}
      </div>
    </Card>
  );
};

export default ChatbotInterface;
