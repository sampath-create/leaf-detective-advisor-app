
import { Leaf } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="border-b py-4 bg-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">LeafDetective</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/" ? "text-primary" : "hover:text-primary"
            }`}
          >
            Analyzer
          </Link>
          <Link 
            to="/diseases" 
            className={`text-sm font-medium transition-colors ${
              location.pathname.includes("/diseases") ? "text-primary" : "hover:text-primary"
            }`}
          >
            Diseases
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
