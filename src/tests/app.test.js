import { render, fireEvent } from "@testing-library/react";
import App from "../App";

test("The Application Successfully rendered", () => {
  const { container } = render(<App />);
  const app = container.querySelector(".App");
  const tableContainer = container.querySelector(".main-container");
  const tableTitle = container.querySelector(".table-title");
  expect(app).toBeVisible();
  expect(tableContainer).toBeVisible();
  expect(tableTitle).toBeVisible();
});

test("Expand button successfully working", () => {
  const { container, getByText } = render(<App />);

  const expandButtons = container.querySelectorAll(".expand-arrow");
  expect(expandButtons[0]).toBeVisible();
  fireEvent.click(expandButtons[0]);
  const childTable = container.querySelector(".child-table");
  expect(childTable).toBeVisible();

  const childColumn = getByText("Relative ID");
  const relativeIdValue = getByText("1007");
  expect(childColumn).toBeVisible();
  expect(relativeIdValue).toBeVisible();
});
