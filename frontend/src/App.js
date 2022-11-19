import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import "./dist/css/home.scss";
import "./dist/css/sidebar.scss";
import "./dist/css/Responsive.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/housePrice" element={<Predict />}></Route>
        {/* <Route path="/about" element={<About />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
