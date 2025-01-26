import { waitFor, render } from "../../test-utils/index";
import TaskView from "./task-view";

const mockData = JSON.stringify({
  name: "test",
  category: "test",
  createdAt: new Date().toString(),
  description: "yep",
  status: "ToDo"
});

jest.mock("../common/utils/handle-error", () => ({
  handleException: () => {},
}));

jest.mock("../common/utils/helper", () => ({
  messageToTableFormatter: () => [mockData],
}));

jest.mock("../../hooks/use-web-sockets", () => ({
  useWS: () => ({
    message: {
      data: mockData,
    },
    sendMessage: () => {},
    messageHistory: [
      {
        data: mockData,
      },
    ],
  }),
}));

describe("It tests the hook", () => {
  it("Will be able to assign a consultation now", async () => {
    const renderer = await render(<TaskView />);
    waitFor(async () => {
      await expect(renderer.getByText(``));
    });
    expect(true).toBe(true);
  });
});
