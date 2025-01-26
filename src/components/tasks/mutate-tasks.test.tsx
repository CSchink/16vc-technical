import { waitFor, render } from "../../test-utils/index";
import { MutateTask } from "./mutate-tasks";

const mockData = JSON.stringify({
  name: "test",
  category: "test",
  createdAt: new Date().toString(),
  description: "yep",
  status: "ToDo"
});

jest.mock("../../hooks/use-web-sockets", () => ({
  useWS: () => ({
    message: {
      data: mockData,
    },
    sendMessage: () => {},
    messageHistory: [],
  }),
}));

describe("It tests the form component", () => {
  it("Will enter the expected input", async () => {
    const renderer = await render(<MutateTask onSubmit={() => mockData} />);
    waitFor(async () => {
      await expect(renderer.getAllByTestId("add-task-name")).toEqual("test");
    });
  });
});

describe("It tests the form component", () => {
  it("Will enter the expected input", async () => {
    const renderer = await render(<MutateTask onSubmit={() => mockData} />);
    waitFor(async () => {
      await expect(renderer.getAllByTestId("add-task-name")).toEqual("test");
    });
  });
});
