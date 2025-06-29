// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import UserCard from "./pages/UserCard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserCard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
