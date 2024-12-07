import React, { useState, useRef } from "react";
import {
  MenuItem,
  Menu,
  Dropdown, 
  Button,
  Header
} from "semantic-ui-react";

/* List of shape filter option */
const searchOptions = [
  { key: "rectangle", text: "Rectangle", value: "rect" },
  { key: "circle", text: "Circle", value: "circle" },
  { key: "star", text: "Star", value: "polygon" },
  { key: "none", text: "None", value: "none" },
];

export const EditMenu = (props: any) => {
  const [color, setColor] = useState<any>(props.colorProps);
  const [shape, setShape] = useState<any>(props.shapeProps);
  const colorInput = useRef<HTMLInputElement>(null);
  return (
    <Menu>
      <MenuItem name="rotate180">
        <Button
          content="Rotate"
          icon="redo alternate"
          labelPosition="left"
          size="mini"
          data-testid="buttonRotate"
          onClick={() => props.rotate(180)}
        />
      </MenuItem>
      <MenuItem name="label"><Header as='h4'>Color</Header></MenuItem>
      <MenuItem name="upcomingEvents">
        <input
          type="color"
          id="head"
          name="head"
          value={color}
          ref={colorInput}
          onChange={() =>
            props.color(colorInput.current?.value) &&
            setColor(colorInput.current?.value)
          }
          data-testid="colorTest"
        />
      </MenuItem>
      <MenuItem name="filter-label"><Header as='h4'>Filter</Header></MenuItem>
      <MenuItem name="filter">
        <Dropdown
          placeholder="Filter"
          fluid
          search
          selection
          options={searchOptions}
          onChange={(e, { value }) => {
            props.filter(e, { value });
            setShape({ value }.value);
          }}
          value={shape}
          data-testid="shapeId"
        />
      </MenuItem>
      <MenuItem name="reset" >
        <Button color="orange" size="mini" data-testid="buttonReset" onClick={() => props.reset()}>
          Reset
        </Button>
      </MenuItem>
    </Menu>
  );
};

