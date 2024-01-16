import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/mainView";
import NavBar from "./components/navBar";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
