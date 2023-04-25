import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import NotesListPage from "./Pages/NotesListPage";
import NotePage from "./Pages/NotePage";
function App() {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<NotesListPage />} />
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
