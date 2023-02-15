// Services
import { useState, useContext } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useForm } from "react-hook-form";

// Components
import { Button, TextField, Select, MenuItem, Stack } from "@mui/material";

// TODO: RYAN - Revamp ContactForm function for current applicable fields below. Initial Stub-up is based off of the LoginForm component, thus potentially not all hooks are applicable to the ContactForm component. Please review and adjust accordingly.
const ContactForm = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const { authenticate } = useContext(UserContext);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  /**
   * Handles Email form submit.
   * @param {{Email}} data - the form data
   */
  const onSubmit = (data) => {
    setErrorMessage(null);
    setWaitingForResponse(true);
    authenticate(data["Email"])
      .then((user) => {
        setWaitingForResponse(false);
      })
      .catch((error) => {
        setWaitingForResponse(false);
        console.error("Incorrect Email: ", error);
        if (error.code === "NotAuthorizedException") {
          setErrorMessage("* Incorrect email, dude!");
        } else {
          setErrorMessage("* Something went wrong, sorry! Try again, dude!");
        }
      });
  };

  // TODO adjust handleChange function to update the messageType state
  const handleChange = (event) => {
    event.preventDefault();
    const action = {
      type: "updateMessageType",
      name: event.target.value,
    };
    // dispatch(action);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="ContactForm">
      <Stack spacing={2}>
        <TextField
          required
          type="text"
          variant="outlined"
          placeholder="Name"
          {...register("Name", { required: true })}
          aria-label="Name"
        />
        <TextField
          required
          type="email"
          variant="outlined"
          placeholder="Email"
          {...register("Email", { required: true })}
          aria-label="Email"
        />
        <Select
          labelId="message-type-select-label"
          value={""}
          label="Message Type"
          onChange={handleChange}
        >
          <MenuItem value={"Feedback"}>Feedback</MenuItem>
          <MenuItem value={"Request Help"}>Request Help</MenuItem>
          <MenuItem value={"Report a Bug"}>Report a Bug</MenuItem>
          <MenuItem value={"Request a Feature"}>Request a Feature</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
        <TextField
          required
          type="text"
          variant="outlined"
          placeholder=""
          {...register("Message", { required: true })}
          aria-label="Message"
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Button variant="contained" type="submit" disabled={waitingForResponse}>
          <span data-testid="send-button">Send</span>
        </Button>
      </Stack>
    </form>
  );
};

export default ContactForm;
