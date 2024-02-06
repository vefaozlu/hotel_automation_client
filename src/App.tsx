import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Reservations from "./Components/Reservations/Reservations";
import Home from "./Routes/Home";
import Rooms from "./Routes/Rooms";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </>
  );
}

export default App;