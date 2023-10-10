import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <Link to="/comments">
          <Button>Comments</Button>
        </Link>
      </div>
      <div>
        <Link to="/issues">
          <Button>Issues</Button>
        </Link>
      </div>
      <div>
        <Link to="/issues-type">
          <Button>Issues Types</Button>
        </Link>
      </div>
      <div>
        <Link to="/projects">
          <Button>Projects</Button>
        </Link>
      </div>
      <div>
        <Link to="/stages">
          <Button>Stages</Button>
        </Link>
      </div>
      <div>
        <Link to="/users">
          <Button>Users</Button>
        </Link>
      </div>
    </div>
  );
}
