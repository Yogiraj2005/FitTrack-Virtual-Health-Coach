
import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to welcome page instead of redirecting to itself
  return <Navigate to="/welcome" replace />;
};

export default Index;
