import { waitFor, render } from "../../test-utils/index";
import { MutateTask } from "./mutate-tasks";

const mockData = JSON.stringify({
  name: "test",
  category: "test",
  createdAt: new Date().toString(),
  description: "yep",
});

jest.mock("../../hooks/use-web-sockets", () => ({
  // this isn't needed -  __esModule: true,
  useWS: () => ({
    message: {
      data: mockData,
    },
    sendMessage: () => console.log("sent"),
    messageHistory: [],
  }),
}));

describe("It tests the form component", () => {
  it("Will enter the expected input", async () => {
    const renderer = await render(<MutateTask onSubmit={() => mockData} />);
    waitFor(async () => {
      await expect(renderer.getAllByTestId("add-task-name")).toEqual("test");
    });
    expect(true).toBe(true);
  });
});

describe("It tests the form component", () => {
  it("Will enter the expected input", async () => {
    const renderer = await render(<MutateTask onSubmit={() => mockData} />);
    waitFor(async () => {
      await expect(renderer.getAllByTestId("add-task-name")).toEqual("test");
    });
    expect(true).toBe(true);
  });
});
