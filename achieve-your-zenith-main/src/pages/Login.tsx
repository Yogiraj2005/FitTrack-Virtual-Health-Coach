
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import AuthLayout from "@/components/AuthLayout";
// import { LogIn } from "lucide-react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     // In a real app, this would authenticate with a backend
//     // For now, just navigate to dashboard
//     navigate("/dashboard");
//   };

//   return (
//     <AuthLayout 
//       title="Sign in to your account" 
//       subtitle="Get personalized wellness plans"
//     >
//       <div className="mt-8 space-y-6">
//         <Button className="w-full bg-[#4285F4] hover:bg-[#4285F4]/90 text-white" onClick={() => navigate("/dashboard")}>
//           <LogIn className="mr-2 h-4 w-4" />
//           Sign in with Google
//         </Button>
        
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <span className="w-full border-t border-gray-300" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-slate-50 px-2 text-gray-500">Or continue with</span>
//           </div>
//         </div>
        
//         <form className="space-y-6" onSubmit={handleLogin}>
//           <div>
//             <Label htmlFor="email">Email address</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1"
//               placeholder="••••••••"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="text-sm">
//               <Link to="/signup" className="text-[#3D9DA1] hover:underline font-medium">
//                 Don't have an account? Sign up
//               </Link>
//             </div>
//             <div className="text-sm">
//               <a href="#" className="text-[#3D9DA1] hover:underline">
//                 Forgot password?
//               </a>
//             </div>
//           </div>

//           <Button type="submit" className="w-full bg-[#3D9DA1] hover:bg-[#3D9DA1]/90">
//             Sign in
//           </Button>
//         </form>
//       </div>
//     </AuthLayout>
//   );
// };

// export default Login;





import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/fituser-api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Login successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <AuthLayout title="Sign in to your account" subtitle="Get personalized wellness plans">
      <div className="mt-8 space-y-6">
        <Button
          className="w-full bg-[#4285F4] hover:bg-[#4285F4]/90 text-white"
          onClick={() => navigate("/dashboard")}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-50 px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/signup" className="text-[#3D9DA1] hover:underline font-medium">
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="text-sm">
              <a href="#" className="text-[#3D9DA1] hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#3D9DA1] hover:bg-[#3D9DA1]/90">
            Sign in
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
