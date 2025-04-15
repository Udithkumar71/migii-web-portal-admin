
import RegistrationForm from "@/components/RegistrationForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12 flex flex-col justify-center">
      <div className="max-w-md mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Worker Registration</h1>
        <p className="text-gray-600">
          Register as a worker to get your unique ID and access to all our services.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Register;
