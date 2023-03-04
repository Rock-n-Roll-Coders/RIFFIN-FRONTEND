// Components / hooks
import { useState } from "react";
// MUI
import BugReportIcon from "@mui/icons-material/BugReport";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Button from "@mui/material/Button";
import { Stack, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const buttonStyle = {
  fontWeight: "bold",
  justifyContent: "left",
  textTransform: "none",
  my: 0.5,
  px: 1.5,
};
const SupportButtons = (props) => {
  const [open, setOpen] = useState(false);
  const [dialogueData, setDialogueData] = useState({
    icon: null,
    title: null,
    body: null,
  });
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleDialogueOpen = () => {
    setOpen(true);
  };

  const handleDialogueClose = () => {
    setOpen(false);
    setMessage("");
    setEmail("");
  };

  const handleBugReport = () => {
    setDialogueData({
      icon: <BugReportIcon sx={{ mr: 1 }} />,
      title: "Bug Report",
      body: "Sorry about the bug, dude! It's mighty kind of you to report it. Please provide as much information as possible so we can replicate the issue and find a fix.",
    });
    handleDialogueOpen();
  };
  const handleFeedback = () => {
    setDialogueData({
      icon: <ChatBubbleIcon sx={{ mr: 1 }} />,
      title: "Feedback",
      body: "🤘Riffin was made by guitarists for guitarists. We welcome all feedback, ideas, and criticism.",
    });
    handleDialogueOpen();
  };
  const handleSupport = () => {
    setDialogueData({
      icon: <SupportAgentIcon sx={{ mr: 1 }} />,
      title: "Support",
      body: "Let us know what we can help with:",
    });
    handleDialogueOpen();
  };

  const sendFormData = async () => {
    setSending(true);
    let response = await fetch(
      "https://formsubmit.co/ajax/0c3a672bb53b4a714e085110446f8f92",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message_type: dialogueData.title,
          message: message,
          email: email === "" ? "no email" : email,
        }),
      }
    );
    setSending(false);
    setMessage("");
    handleDialogueClose();
  };

  return (
    <>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleDialogueClose}>
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          {dialogueData.icon}
          {dialogueData.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            {dialogueData.body}
          </DialogContentText>
          {dialogueData.title === "Support" && (
            <TextField
              autoFocus
              margin="dense"
              id="message"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => setMessage(e.target.value)}
            />
          )}
          <TextField
            autoFocus={!(dialogueData.title === "Support")}
            margin="dense"
            id="message"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            minRows={4}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogueClose}>Cancel</Button>
          <Button onClick={sendFormData} disabled={sending}>Send</Button>
        </DialogActions>
      </Dialog>
      <Stack>
        <Divider sx={{ mt: 3, mb: 1 }} />
        <Button
          startIcon={<BugReportIcon />}
          onClick={handleBugReport}
          sx={buttonStyle}
          disabled={props.disabled}
          disableElevation
          variant="text"
          size="large"
        >
          Report Bug
        </Button>
        <Button
          startIcon={<ChatBubbleIcon />}
          onClick={handleFeedback}
          sx={buttonStyle}
          disabled={props.disabled}
          disableElevation
          variant="text"
          size="large"
        >
          Feedback
        </Button>
        <Button
          startIcon={<SupportAgentIcon />}
          onClick={handleSupport}
          sx={buttonStyle}
          disabled={props.disabled}
          disableElevation
          variant="text"
          size="large"
        >
          Support
        </Button>
      </Stack>
    </>
  );
};

export default SupportButtons;
