import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import MainView from "./views/mainView";
import Login from "./views/loginView";
import Signup from "./views/signUpView";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import NewNoteView from "./views/newNoteView";
import NoteView from "./views/noteView";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={user ? <MainView /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />

          <Route
            path="/createnote"
            element={user ? <NewNoteView /> : <Navigate to="/login" />}
          />
          <Route
            path="/note/:id"
            element={user ? <NoteView /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
