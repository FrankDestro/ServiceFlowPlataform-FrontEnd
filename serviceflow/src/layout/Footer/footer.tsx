import "./footer.css";
import { useLocation } from "react-router-dom";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <footer className={`footer ${isLoginPage ? "footer-login" : ""} ${className}`}>
    <p>
      © {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.
    </p>
    <p>Termos de Serviço | Política de Privacidade | ServiceFlow v5.2 </p>
  </footer>
  );
};

export default Footer;
