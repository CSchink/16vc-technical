import { Task } from "src/api/schemas/tasks.schemas";
import { TextInput, Button, Modal, Center, Select } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

export const MutateTask = (props: {
  onSubmit: (value: Task, isEditing: boolean) => void;
  task?: Task;
}) => {
  const { task } = props;
  const isEditing = !!task;
  const [opened, { open, close }] = useDisclosure(isEditing);
  const form: UseFormReturnType<Task> = useForm();

  useEffect(() => {
    if (task) {
      form.setValues(task);
      open();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task, open]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Tasks">
        <form
          onSubmit={form.onSubmit(
            (values) => {
              props.onSubmit(values, isEditing);
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
          <Select
            label="Status"
            placeholder="Pick value"
            data={["ToDo", "InProgress"]}
            {...form.getInputProps("status")}
          />
          <Center>
            <Button mt="sm" variant={"outline"} type="submit">
              Submit
            </Button>
            {isEditing && (
              <Button
                onClick={() => {
                  form.setFieldValue("status", "Deleted");
                }}
                mt="sm"
                ml="sm"
                variant={"outline"}
                c="red"
                type="submit"
              >
                Delete
              </Button>
            )}
          </Center>
        </form>
      </Modal>
      <Button variant="default" onClick={open}>
        Add Task
      </Button>
    </>
  );
};
