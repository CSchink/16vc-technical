import { Task } from "src/api/schemas/tasks.schemas";
import { TextInput, Button, Modal, Center } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export const MutateTask = (props: { onSubmit: (value: Task) => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const form: UseFormReturnType<Task> = useForm();

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <form
          onSubmit={form.onSubmit(
            (values) => {
              props.onSubmit(values);
              form.reset();
              close();
            },
            (errors) => console.log(errors)
          )}
        >
          <TextInput
            label={"Name"}
            placeholder="Add Task"
            required
            {...form.getInputProps("name")}
            data-test-id={"add-task-name"}
          />
          <TextInput
            label={"Description"}
            placeholder="Add Task"
            {...form.getInputProps("description")}
          />
          <TextInput
            label={"Category"}
            placeholder="Add Task"
            required
            {...form.getInputProps("category")}
          />
          <Center>
            <Button mt="sm" variant={"outline"} type="submit">
              Submit
            </Button>
          </Center>
        </form>
      </Modal>
      <Button variant="default" onClick={open}>
        Add Task
      </Button>
    </>
  );
};
