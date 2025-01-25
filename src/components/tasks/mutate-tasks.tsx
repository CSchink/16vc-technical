import { Task } from "src/api/schemas/tasks.schemas";
import { TextInput, Button } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";

export const AddTask = (props: { onSubmit: (value: Task) => void }) => {
  const form: UseFormReturnType<Task> = useForm();

  return (
    <form
      onSubmit={form.onSubmit(
        (values) => props.onSubmit(values),
        (errors) => console.log(errors)
      )}
    >
      <TextInput
        label={"Name"}
        placeholder="Add Task"
        required
        {...form.getInputProps("name")}
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
      <Button
        variant={"outline"}
        type="submit"
      >
        Add Task
      </Button>
    </form>
  );
};
