import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";


import App from "./App";
describe("App", () => {
  it("tests rotate features", async () => {
    render(<App />);
    expect(screen.getByText("Implementation")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
    const locationNode = screen.getByText("Germany");
    fireEvent.click(locationNode);
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    const berlinNode = screen.getByText("Berlin");
    fireEvent.click(berlinNode);

    expect(screen.getByText("Building B")).toBeInTheDocument();
    const buildingB = screen.getByText("Building B");
    fireEvent.click(buildingB);

    const imgSelection = await screen.findByTestId("selection_img");
    expect(imgSelection).toBeInTheDocument();
    expect(imgSelection).toHaveStyle(`transform: rotate(0deg)`);

    const rotateButton = await screen.findByTestId("buttonRotate");
    expect(rotateButton).toBeInTheDocument();
    fireEvent.click(rotateButton);

    const imgRotation = await screen.findByTestId("rotation_img");
    expect(imgRotation).toBeInTheDocument();
    expect(imgRotation).toHaveStyle(`transform: rotate(180deg)`);
  });

  it("tests color change features", async () => {
    render(<App />);
    expect(screen.getByText("Implementation")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
    const locationNode = screen.getByText("Germany");
    fireEvent.click(locationNode);
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    const berlinNode = screen.getByText("Berlin");
    fireEvent.click(berlinNode);

    expect(screen.getByText("Building B")).toBeInTheDocument();
    const buildingB = screen.getByText("Building B");
    fireEvent.click(buildingB);

    const imgSelection = await screen.findByTestId("selection_img");
    expect(imgSelection).toBeInTheDocument();
    expect(imgSelection).toHaveStyle(`transform: rotate(0deg)`);

    const inputColorButton = await screen.findByTestId("colorTest");
    expect(inputColorButton).toBeInTheDocument();
    fireEvent.change(inputColorButton, { target: { value: "#FF0000" } });

    const imgColor = await screen.findByTestId("color_img");
    expect(imgColor).toBeInTheDocument();
  });

  it("tests shape filter features", async () => {
    const { getByTestId } = render(<App />);
    expect(screen.getByText("Implementation")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
    const locationNode = screen.getByText("Germany");
    fireEvent.click(locationNode);
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    const berlinNode = screen.getByText("Berlin");
    fireEvent.click(berlinNode);

    expect(screen.getByText("Building B")).toBeInTheDocument();
    const buildingB = screen.getByText("Building B");
    fireEvent.click(buildingB);

    const imgSelection = await screen.findByTestId("selection_img");
    expect(imgSelection).toBeInTheDocument();
    expect(imgSelection).toHaveStyle(`transform: rotate(0deg)`);

    const shapeElement = await screen.findByTestId("shapeId");
    expect(shapeElement).toBeInTheDocument();
    
    const dropdownOptions = screen.getAllByRole("option");
    fireEvent.click(dropdownOptions[1]);

    const fileterImg = await screen.findByTestId("filter_img");
    expect(fileterImg).toBeInTheDocument();
  });
 
  it("tests all the features together", async () => {
    render(<App />);
    expect(screen.getByText("Implementation")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
    const locationNode = screen.getByText("Germany");
    fireEvent.click(locationNode);
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    const berlinNode = screen.getByText("Berlin");
    fireEvent.click(berlinNode);

    expect(screen.getByText("Building B")).toBeInTheDocument();
    const buildingB = screen.getByText("Building B");
    fireEvent.click(buildingB);

    const imgSelection = await screen.findByTestId("selection_img");
    expect(imgSelection).toBeInTheDocument();
    expect(imgSelection).toHaveStyle(`transform: rotate(0deg)`);

    const rotateButton = await screen.findByTestId("buttonRotate");
    expect(rotateButton).toBeInTheDocument();
    fireEvent.click(rotateButton);

    const imgRotation = await screen.findByTestId("rotation_img");
    expect(imgRotation).toBeInTheDocument();
    expect(imgRotation).toHaveStyle(`transform: rotate(180deg)`);

    const inputColorButton = await screen.findByTestId("colorTest");
    expect(inputColorButton).toBeInTheDocument();
    fireEvent.change(inputColorButton, { target: { value: "#FF0000" } });

    const imgColor = await screen.findByTestId("color_img");
    expect(imgColor).toBeInTheDocument();

    const shapeElement = await screen.findByTestId("shapeId");
    expect(shapeElement).toBeInTheDocument();
    
    const dropdownOptions = screen.getAllByRole("option");
    fireEvent.click(dropdownOptions[1]);

    const fileterImg = await screen.findByTestId("filter_img");
    expect(fileterImg).toBeInTheDocument();
  });

  it("tests reset features", async () => {
    render(<App />);
    expect(screen.getByText("Implementation")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
    const locationNode = screen.getByText("Germany");
    fireEvent.click(locationNode);
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    const berlinNode = screen.getByText("Berlin");
    fireEvent.click(berlinNode);

    expect(screen.getByText("Building B")).toBeInTheDocument();
    const buildingB = screen.getByText("Building B");
    fireEvent.click(buildingB);

    const imgSelection = await screen.findByTestId("selection_img");
    expect(imgSelection).toBeInTheDocument();
    expect(imgSelection).toHaveStyle(`transform: rotate(0deg)`);

    const rotateButton = await screen.findByTestId("buttonRotate");
    expect(rotateButton).toBeInTheDocument();
    fireEvent.click(rotateButton);

    const imgRotation = await screen.findByTestId("rotation_img");
    expect(imgRotation).toBeInTheDocument();
    expect(imgRotation).toHaveStyle(`transform: rotate(180deg)`);

    const inputColorButton = await screen.findByTestId("colorTest");
    expect(inputColorButton).toBeInTheDocument();
    fireEvent.change(inputColorButton, { target: { value: "#FF0000" } });

    const imgColor = await screen.findByTestId("color_img");
    expect(imgColor).toBeInTheDocument();

    const shapeElement = await screen.findByTestId("shapeId");
    expect(shapeElement).toBeInTheDocument();
    
    const dropdownOptions = screen.getAllByRole("option");
    fireEvent.click(dropdownOptions[1]);

    const fileterImg = await screen.findByTestId("filter_img");
    expect(fileterImg).toBeInTheDocument();

    const resetElement = await screen.findByTestId("buttonReset");
    expect(resetElement).toBeInTheDocument();
    fireEvent.click(resetElement);

    expect(imgSelection).not.toBeInTheDocument();
    expect(imgRotation).not.toBeInTheDocument();
    expect(imgColor).not.toBeInTheDocument();
    expect(shapeElement).not.toBeInTheDocument();
    expect(resetElement).not.toBeInTheDocument();


  });

});
