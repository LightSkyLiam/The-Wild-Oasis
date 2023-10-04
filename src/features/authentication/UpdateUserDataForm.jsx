import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import ComingSoonModal from "../../ui/ComingSoonModal";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const [email, setEmail] = useState(``);
  const [fullName, setFullName] = useState(``);
  const [openModal, setOpenModal] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setOpenModal(true);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Email address">
          <Input onChange={(e) => setEmail(e.target.value)} value={email} />
        </FormRow>
        <FormRow label="Full name">
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="fullName"
          />
        </FormRow>
        <FormRow label="Avatar image">
          <FileInput id="avatar" accept="image/*" />
        </FormRow>
        <FormRow>
          <Button type="reset" variation="secondary">
            Cancel
          </Button>
          <Button>Update account</Button>
        </FormRow>
      </Form>
      {openModal && <ComingSoonModal onClose={() => setOpenModal(false)} />}
    </>
  );
}

export default UpdateUserDataForm;
