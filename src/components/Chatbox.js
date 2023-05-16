import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function Chatbox(props) {
  const [messageValue, setMessageValue] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    setMessageValue("");
  }

  return (
    <div id="chatboxDiv" className="bg-dark">
      <Form onSubmit={onSubmit}>
        <Form.Control
          required={true}
          autoComplete="false"
          autoCapitalize="false"
          maxLength={200}
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          placeholder="type anything here"
          id="chatbox"         className=""
        ></Form.Control>
      </Form>
    </div>
  );
}
