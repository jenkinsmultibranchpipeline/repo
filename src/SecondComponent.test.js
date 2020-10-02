import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./SecondComponent";
import { act } from "react-dom/test-utils";

jest.mock("axios");

describe("App", () => {
  test("fetches stories from an API and displays them", async () => {
    const stories = [
      { objectID: "1", title: "Hello" },
      { objectID: "2", title: "React" },
    ];

    axios.get.mockImplementationOnce(async () => {
      return {
        data: {
          hits: stories,
        },
      };
    });

    render(<App />);

    await act(async () => {
      await userEvent.click(screen.getByRole("button"));
    });

    const items = await screen.findAllByRole("listitem");

    expect(items).toHaveLength(2);
  });
  test("fetches stories from an API and fails", async () => {
    axios.get.mockImplementationOnce(async () => {
      return new Error();
    });

    render(<App />);

    await act(async () => {
      await userEvent.click(screen.getByRole("button"));
    });

    const message = await screen.findByText(/Something went wrongkk/);

    expect(message).toBeInTheDocument();
  });
});
