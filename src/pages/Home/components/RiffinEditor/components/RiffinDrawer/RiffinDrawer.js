import { useContext, useState, useEffect } from "react";
import SizeSlider from "./components/SizeSlider/SizeSlider";
import { RiffinEditorDispatch } from "../../RiffinProvider";
import DuplicateBlockButton from "./components/DuplicateBlockButton/DuplicateBlockButton";

import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import DeleteBlockButton from "./components/DeleteBlockButton/DeleteBlockButton";
import SaveTabButton from "../SaveTabButton/SaveTabButton";
import DeleteTabButton from "../DeleteTabButton/DeleteTabButton";
import CustomizedSwitches from "../ModeSwitch/ModeSwitch";
import Legend from "./components/Legend/Legend";

const RiffinDrawer = () => {
  const { editor } = useContext(RiffinEditorDispatch);
  const [selectedBlock, setBlock] = useState(editor.tablature.blocks[editor.selectedBlock.index]);

  useEffect(() => {
    if(editor.selectedBlock.block) {
      setBlock(editor.tablature.blocks[editor.selectedBlock.index]);
    }
  }, [editor])

  return (
    <>
      <Container sx={{mt: 4}}>
        <Stack spacing={2}>
          <CustomizedSwitches />
          <SaveTabButton />
          {editor.tablature._id &&
            <DeleteTabButton />
          }
        </Stack>
        {!editor.previewMode &&
        <>        
          <Stack spacing={2} sx={{my: 4}}>
            <Divider>Staff menu</Divider>
            <Box>
              <Typography>Size</Typography>
              <SizeSlider block={ selectedBlock }/>
            </Box>
            <DuplicateBlockButton />
            <DeleteBlockButton block={ selectedBlock } disabled={(editor.tablature.blocks.length === 1)} />
          </Stack>
          <Divider />
          <Legend />
        </>
        }
      </Container>
    </>
  );
}
 
export default RiffinDrawer;