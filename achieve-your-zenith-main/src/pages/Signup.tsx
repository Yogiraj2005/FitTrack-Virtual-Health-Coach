
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import AuthLayout from "@/components/AuthLayout";
// import { LogIn } from "lucide-react";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = (e: React.FormEvent) => {
//     e.preventDefault();
//     // In a real app, this would create an account with a backend
//     // For now, just navigate to dashboard
//     navigate("/dashboard");
//   };

//   return (
//     <AuthLayout 
//       title="Create your account" 
//       subtitle="Start your fitness journey today"
//     >
//       <div className="mt-8 space-y-6">
//         <Button className="w-full bg-[#4285F4] hover:bg-[#4285F4]/90 text-white" onClick={() => navigate("/dashboard")}>
//           <LogIn className="mr-2 h-4 w-4" />
//           Sign up with Google
//         </Button>
        
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <span className="w-full border-t border-gray-300" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-slate-50 px-2 text-gray-500">Or continue with</span>
//           </div>
//         </div>
        
//         <form className="space-y-6" onSubmit={handleSignup}>
//           <div>
//             <Label htmlFor="name">Full Name</Label>
//             <Input
//               id="name"
//               name="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="mt-1"
//               placeholder="John Doe"
//             />
//           </div>

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

//           <div className="text-sm">
//             <Link to="/login" className="text-[#3D9DA1] hover:underline font-medium">
//               Already have an account? Sign in
//             </Link>
//           </div>

//           <Button type="submit" className="w-full bg-[#3D9DA1] hover:bg-[#3D9DA1]/90">
//             Sign up
//           </Button>
//         </form>
//       </div>
//     </AuthLayout>
//   );
// };

// export default Signup;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import { LogIn } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/fituser-api/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start your fitness journey today">
      <div className="mt-8 space-y-6">
        <Button
          className="w-full bg-[#4285F4] hover:bg-[#4285F4]/90 text-white"
          onClick={() => navigate("/dashboard")}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-50 px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1"
              placeholder="nipun Bhadane"
            />
          </div>

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

          <div className="text-sm">
            <Link to="/login" className="text-[#3D9DA1] hover:underline font-medium">
              Already have an account? Sign in
            </Link>
          </div>

          <Button type="submit" className="w-full bg-[#3D9DA1] hover:bg-[#3D9DA1]/90">
            Sign up
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
