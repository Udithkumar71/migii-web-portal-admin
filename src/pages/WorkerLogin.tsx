
import LoginForm from "@/components/LoginForm";

const WorkerLogin = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12 flex flex-col justify-center">
      <div className="max-w-md mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Worker Login</h1>
        <p className="text-gray-600">
          Login with your registered phone number to access your worker dashboard.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  );
};

export default WorkerLogin;
