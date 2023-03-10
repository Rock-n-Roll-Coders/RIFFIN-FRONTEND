// MUI
import { Box, Chip } from "@mui/material";


const tagContainer = {
  display: "flex",
  maxWidth: "80%",
  alignItems: "end",
  overflow: "hidden",
  mb: 1
};

const spacer = {
  mr: 1,
  mb: 1,
}

const TagGroup = (props) => {
  return (
    <Box sx={tagContainer}>
      {props.tags?.map((tag, i) =>(
        <Box sx={spacer} key={tag + i}>
          <Chip 
            sx={{textTransform: "none"}}
            key={i}
            label={tag} 
            size="small"
            variant="outlined"
          />
        </Box>
      ))}
    </Box>
  );
};

export default TagGroup;
