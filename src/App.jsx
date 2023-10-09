import { Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./Routes/Users";
import Home from "./Routes/Home";
import Comments from "./Routes/Comments"
import Issues from "./Routes/Issues";
import IssuesTypes from "./Routes/IssuesTypes";
import Projects from "./Routes/Projects";
import Stages from "./Routes/Stages";

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
