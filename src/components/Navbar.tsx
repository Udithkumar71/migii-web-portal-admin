
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle, Users } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Register", href: "/register" },
    { name: "Worker Login", href: "/worker-login" },
    { name: "Admin", href: "/admin-login" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-migii-primary flex items-center"
            >
              <span className="mr-2">
                <Users className="h-8 w-8" />
              </span>
              Migii
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-migii-primary hover:bg-gray-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/worker-login")}
                  className="animate-fade-in"
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button 
                  onClick={() => navigate("/register")}
                  className="animate-fade-in"
                >
                  Register
                </Button>
              </div>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-migii-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-migii-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden",
          isMenuOpen ? "block animate-fade-in" : "hidden animate-fade-out"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-migii-primary hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <SignedIn>
            <div className="px-3 py-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex flex-col space-y-2 p-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  navigate("/worker-login");
                  setIsMenuOpen(false);
                }}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button 
                onClick={() => {
                  navigate("/register");
                  setIsMenuOpen(false);
                }}
              >
                Register
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
