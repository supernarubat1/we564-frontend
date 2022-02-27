import { render, screen } from "@testing-library/react";
import axios from "axios";
import App from "./App";

describe("Test API", () => {
  it("test get data from database | status 200", async () => {
    const info = await axios.get(`${process.env.REACT_APP_API}/get`);
    expect(info.status).toBe(200);
  });
});

describe("Test Loading Screen", () => {
  it("check loading data in to the state", async () => {
    render(<App />);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeDefined();
  });
});
