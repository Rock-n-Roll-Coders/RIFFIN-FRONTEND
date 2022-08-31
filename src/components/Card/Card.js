// Components and hooks
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";

//MUI
import { Paper } from "@mui/material";
import { Box } from "@mui/system";


// props: tabData, authorData
const Card = (props) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const contentBoxStyles = {
    display: "flex",
    justifyContent: "center"
  }

  const cardStyles = {
    padding: "15px",
  };

  const handleEdit = () => navigate(`/edit/${props.tabData._id}`)

  console.log(props)
  return (
    <Paper style={cardStyles}>
      <Header
        tabName={props.tabData.name}
        showOwnerControls={user?.username === props.tabData.owner.user}
        isExpanded={props.isExpanded}
        handleExpand={props.handleExpand}
        handleEdit={handleEdit}
      />
      <Box style={contentBoxStyles}>
        <Content bars={props.tabData.bars} isExpanded={props.isExpanded} />
      </Box>
      <Footer
        preferredUsername={props.tabData.owner.preferredUsername}
        user={props.tabData.owner.user}
        tags={props.tabData.tags}
      />
    </Paper>
  );
};

export default Card;
