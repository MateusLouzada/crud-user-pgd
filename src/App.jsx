import { Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./Pages/Users";
import Home from "./Pages/Home";
import Comments from "./Pages/Comments"
import Issues from "./Pages/Issues";
import IssuesTypes from "./Pages/IssuesTypes";
import Projects from "./Pages/Projects";
import Stages from "./Pages/Stages";

function App() {
  return(
    <Routes>
        <Route index element={<Home />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues-type" element={<IssuesTypes />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/stages" element={<Stages />} />
        <Route path="/users" element={<Users />} />
    </Routes>
  )
}

export default App;
