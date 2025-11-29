import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Briefcase } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-lg shadow-custom-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 transition-base hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">RecruitIA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-sm font-medium text-foreground transition-base hover:text-primary">
              Inicio
            </Link>
            <Link to="/candidate" className="text-sm font-medium text-foreground transition-base hover:text-primary">
              Candidatos
            </Link>
            <Link to="/company" className="text-sm font-medium text-foreground transition-base hover:text-primary">
              Empresas
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="outline" asChild>
              <Link to="/candidate">Soy Candidato</Link>
            </Button>
            <Button asChild className="gradient-primary">
              <Link to="/company">Soy Empresa</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted transition-base"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-in fade-in slide-in-from-top-2">
            <Link
              to="/"
              className="block text-sm font-medium text-foreground hover:text-primary transition-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/candidate"
              className="block text-sm font-medium text-foreground hover:text-primary transition-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Candidatos
            </Link>
            <Link
              to="/company"
              className="block text-sm font-medium text-foreground hover:text-primary transition-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Empresas
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                <Link to="/candidate">Soy Candidato</Link>
              </Button>
              <Button asChild className="gradient-primary" onClick={() => setIsMenuOpen(false)}>
                <Link to="/company">Soy Empresa</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
