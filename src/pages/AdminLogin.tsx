
import AdminLoginForm from "@/components/AdminLoginForm";

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12 flex flex-col justify-center">
      <div className="max-w-md mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Admin Login</h1>
        <p className="text-gray-600">
          Access the NGO/Admin dashboard to manage workers and support requests.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;
