import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div>
        <Link to="/comments">Comments</Link>
      </div>
      <div>
        <Link to="/issues">Issues</Link>
      </div>
      <div>
        <Link to="/issues-type">Issues Types</Link>
      </div>
      <div>
        <Link to="/projects">Projects</Link>
      </div>
      <div>
        <Link to="/stages">Stages</Link>
      </div>
      <div>
        <Link to="/users">Users</Link>
      </div>
    </div>
  );
}
