
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">LeafDetective</h1>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
