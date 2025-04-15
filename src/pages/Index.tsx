
import { Link } from "react-router-dom";
import { ArrowRight, Users, FileText, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-migii-primary" />,
      title: "Worker Registration",
      description: "Register workers with identity verification and skill classification",
    },
    {
      icon: <FileText className="h-10 w-10 text-migii-primary" />,
      title: "Unique ID Generation",
      description: "Auto-generate secure unique IDs with QR codes for easy verification",
    },
    {
      icon: <Shield className="h-10 w-10 text-migii-primary" />,
      title: "Secure Dashboard",
      description: "Access worker profile, status updates, and support history",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-migii-primary" />,
      title: "Admin Control",
      description: "Search, filter and manage worker database with advanced controls",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                <span className="block">Worker Management</span>
                <span className="block text-migii-primary">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Securely register, verify, and manage workers with our comprehensive
                platform. Generate unique IDs with just a few clicks.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild>
                  <Link to="/register">
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/worker-login">Worker Login</Link>
                </Button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 animate-fade-in">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Worker Registration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Features that make a difference
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools you need to efficiently manage
              worker registration and identification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover-scale card-hover"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-migii-primary to-migii-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of NGOs and organizations already using our platform
            to manage their workforce efficiently.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Register Workers</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-migii-primary" asChild>
              <Link to="/admin-login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              A simple three-step process for worker registration and ID generation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Register Worker",
                description:
                  "Collect basic details including name, age, phone, origin state, and skills.",
              },
              {
                step: "02",
                title: "Verify Identity",
                description:
                  "Capture photo and optional Aadhaar information for verification.",
              },
              {
                step: "03",
                title: "Generate ID",
                description:
                  "System automatically generates unique ID and QR code for the worker.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-migii-primary text-white font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
