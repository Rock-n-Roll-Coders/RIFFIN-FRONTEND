import { Button, Stack } from "@mui/material";

// TODO: Plug in ContactForm component in place of Airtable link
const ContactButton = () => {
  return (
    <Stack>
      <a href="https://airtable.com/shreuEqEiILbGu7NN" target="_blank" rel="noreferrer" style={{textDecoration: 'none', width: '100%', maxWidth: '250px',margin: '0px auto'}}>
        <Button variant="outlined" size="large" style={{width: '100%'}}>
          contact
        </Button>
      </a>
    </Stack>
  );
}
 
export default ContactButton;