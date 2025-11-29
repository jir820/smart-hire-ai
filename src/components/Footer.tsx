import { Link } from "react-router-dom";
import { Mail, Linkedin, Github, Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">RecruitIA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Conectando talento con oportunidades a través de inteligencia artificial.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/candidate" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Para Candidatos
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Para Empresas
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Cómo funciona
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  Guías
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-base">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">contacto@recruitia.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-base">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-base">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-center text-muted-foreground">
            © 2024 RecruitIA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
