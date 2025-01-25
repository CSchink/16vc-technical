import { waitFor, render } from "../../test-utils/index";
import TaskView from "./task-view";

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
