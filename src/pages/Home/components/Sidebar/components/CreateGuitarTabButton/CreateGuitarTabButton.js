// Components / hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
// MUI
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";

const CreateGuitarTabButton = (props) => {
  const [variant, setVariant] = useState("text");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const handleClick = () => {
    user ? navigate(`/new/guitar`) : navigate("/login");
  };

  useEffect(() => {
    const urlData = location.pathname.split("/");
    const path = urlData[2];
    if (path === "guitar") {
      setVariant("contained");
    } else {
      setVariant("text");
    }
  }, [location, user]);

  return (
    <Button
      startIcon={<AddCircleIcon />}
      onClick={handleClick}
      sx={{
        fontWeight: "bold",
        justifyContent: "left",
        textTransform: "none",
        my: 0.5,
        px: 1.5,
      }}
      disabled={props.disabled}
      disableElevation
      variant={variant}
      size="large"
    >
      Guitar tab
    </Button>
  );
};

export default CreateGuitarTabButton;
