import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";


function App() {
  return (

      <Router>
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/*" element={ <HomePage />  } />
              
          </Routes>
      </Router>
  
  );
}

export default App;
