import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Resume from "./pages/Resume";
import Copilot from "./pages/Copilot";
import CareerTools from "./pages/CareerTools";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Home from "./pages/Home";

import JobMatcher from "./pages/JobMatcher";
import ApplicationTracker from "./pages/ApplicationTracker";
import InterviewPage from "./pages/InterviewSimulator";
import CoverLetter from "./pages/CoverLetter";
import OfficerDashboard from "./pages/OfficerDashboard";
import OfficerSignup from "./pages/OfficerSignup";

import Signup from "./pages/Signup";
import Upload from "./pages/Upload";


function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    

      <Routes>

        <Route
  path="/"
  element={<Home />}
/>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
  path="/signup"
  element={<Signup />}
/>
<Route
  path="/upload"
  element={
    <PrivateRoute>
      <Upload />
    </PrivateRoute>
  }
/>

        <Route
  path="/officer-signup"
  element={<OfficerSignup />}
/>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <PrivateRoute>
              <Resume />
            </PrivateRoute>
          }
        />

        <Route
          path="/copilot"
          element={
            <PrivateRoute>
              <Copilot />
            </PrivateRoute>
          }
        />

        <Route
          path="/tools"
          element={
            <PrivateRoute>
              <CareerTools />
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />

        <Route
          path="/job-matcher"
          element={
            <PrivateRoute>
              <JobMatcher />
            </PrivateRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <PrivateRoute>
              <ApplicationTracker />
            </PrivateRoute>
          }
        />

        <Route
  path="/interview"
  element={
    <PrivateRoute>
      <InterviewPage />
    </PrivateRoute>
  }
/>

        <Route
          path="/cover-letter"
          element={
            <PrivateRoute>
              <CoverLetter />
            </PrivateRoute>
          }
        />
        <Route
  path="/officer-dashboard"
  element={
    <PrivateRoute>
      <OfficerDashboard />
    </PrivateRoute>
  }
/>
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>

    
  );
}