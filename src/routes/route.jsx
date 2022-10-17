import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Route() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/Validation");
  }, []);
}

export default Route;