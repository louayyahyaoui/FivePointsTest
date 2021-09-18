import axios from "axios";
import React, { useState } from "react";
import { Button, Dropdown, Feed, Form, Icon, Message, Modal } from "semantic-ui-react";

function ModalAddTopic() {

    const [titre, SetTitre] = useState("");
    const [description, SetDescription] = useState("");
    const [formSuccessMessage, SetFormSuccessMessage] = useState("");
    const [formErrorMessage, SetFormErrorMessage] = useState("");
    const [formClassName, SetFormClassName] = useState("");
    const [open, setOpen] = React.useState(false)

    const handleTitreChanges = (e) => {
      
        SetTitre(e.target.value);
      };
      const handleDescriptionChanges = (e) => {
        SetDescription(e.target.value);
      };

      const AddTopic = (e, form) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        if(!titre || !description)
        {
            alert("Please enter a description | title")
        }
        else {
            e.preventDefault();
        axios
      .post("http://localhost:5000/sujet", {
        titre: titre,
        description: description,
        createdBy : userId
      })
      .then((res) => {
        console.log(res.data);
        SetFormClassName("success");
        SetFormSuccessMessage("Topic was added succefully ;)");
        setTimeout(() => {
            setOpen(false)  
        },2000)
       
       
      })
      .catch((err) => {
        console.log(err.response.data);
        SetFormClassName("warning");
        SetFormSuccessMessage(err.response.data);
      });
        }
        

      };

  return (
    <>
      <Modal
        trigger={
            <Button positive floated='right'>
            <Icon name='add' /> Add new
          </Button>
        }
        open={open}
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Header>Add new Topic</Modal.Header>
        <Modal.Content>
        <Form className={formClassName}>
        <Form.Input
          label="Titre"
          type="text"
          placeholder="Title Example"
          name="Titre"
          maxLength="40"
          required
          value={titre}
          onChange={handleTitreChanges}
        />
        <Form.TextArea
          label="Description"
          type="TextArea"
          placeholder="This is a brieve description..."
          name="Description"
          maxLength="5000"
          required
          alue={description}
          onChange={handleDescriptionChanges}
        />
        <Message
          success
          color="green"
          header="Nice one! 📚 "
          content={formSuccessMessage}
        />
        <Message
          warning
          color="yellow"
          header="Woah! 😱 😨"
          content={formErrorMessage}
        />
        <Button color="green" floated="right" onClick={AddTopic}>
          Save
        </Button>
        <br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default ModalAddTopic;
