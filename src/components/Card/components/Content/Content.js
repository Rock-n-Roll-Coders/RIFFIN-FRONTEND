// Components and hooks
import TablatureBlock from "components/TablatureBlock/TablatureBlock";

// MUI
import { Box, Typography } from "@mui/material";

const scrollWrapper = {
  overflowY: "scroll",
};

const boxStyles = {
  margin: "10px 0",
  width: "100%",
  textAlign: "center",
}

const Content = (props) => {
  return (
    <Box style={boxStyles}>
      {props.isExpanded ? 
        (
          <div style={scrollWrapper}>
            {props.tablatureBlocks.map((block, i) => (
              <div key={i}>
                <Typography>{block.label}</Typography>
                <TablatureBlock blockData={block} readOnly={true} />
              </div>
            ))}
          </div>
        ) : ( <TablatureBlock blockData={props.tablatureBlocks[0]} readOnly={true} /> )
      }
    </Box>
  );
};

export default Content;
