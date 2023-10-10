import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function ToHome() {
  return (
    <Link to="/">
      <Button>Ir para Home</Button>
    </Link>
  );
}
