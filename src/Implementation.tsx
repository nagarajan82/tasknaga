import React, { useState } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import "./implementation.css";
import { locationsData } from "./data/locations";
import { EditMenu } from "./EditMenu";
import {
  GridColumn,
  Divider,
  Grid,
  Segment,
  Image,
  Header,
} from "semantic-ui-react";
import { processingSVG } from "./utils/services";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";

const svgSources: any = [];

/* 
    Preprocessing Location Data
    Description : Preprocess Data to make suitable for react-accessible-treeview plugin 
*/
const preProcess = (data: any) => {
  try {
    let preprocessedData = {
      name: "FLOOR PLAN - TREE VIEW",
      children: data,
    };
    data.forEach((child: any) => {
      child.children.forEach((gchild: any) => {
        gchild.children.forEach((grandchild: any) => {
          svgSources.push({
            id: grandchild.id,
            floorplan: grandchild.floorplan,
          });
        });
      });
    });
    return preprocessedData;
  } catch (error) {
    let preprocessedData = {
      name: "FLOOR PLAN - TREE VIEW",
      children: [],
    };
    return preprocessedData;
    // Log the error in ELK stack and Enable Monitoring
  }
};

/* 
    Make Flatten Tree
    Description : Create Parenet-Child relationship with react-accessible-treeview plugin 
*/
const preprocessedData = flattenTree(preProcess(locationsData));

/* 
    Attach Folder ICON for Parent that is going to be rendered  using react-accessible-treeview plugin   
*/
const FolderIcon = ({ isOpen }: any) =>
  isOpen ? (
    <FaRegFolderOpen color="e8a87c" className="icon" />
  ) : (
    <FaRegFolder color="e8a87c" className="icon" />
  );

/* 
    Attach File ICON for Children that is going to be rendered  using react-accessible-treeview plugin   
*/

const FileIcon = ({ filename }: any) => {
  try {
    const extension = filename.slice(filename.lastIndexOf(".") + 1);
    switch (extension) {
      case "js":
        return <DiJavascript color="yellow" className="icon" />;
      case "css":
        return <DiCss3 color="turquoise" className="icon" />;
      case "json":
        return <FaList color="yellow" className="icon" />;
      case "npmignore":
        return <DiNpm color="red" className="icon" />;
      default:
        return null;
    }
  } catch (error) {
    return null
    // Log the error in ELK stack and Enable Monitoring
  }
};

export const Implementation = () => {
  const [locationData] = useState(preprocessedData);
  const [svgSrc, setsvgSrc] = useState<string>();
  const [imgPath, setimgPath] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [shape, setShape] = useState<string>("none");
  const [rotation, setRotation] = useState<number>(0);
  const [mode, setMode] = useState<string>("");

  /* change Handler For Rotation Features */
  const onRotate = async (degree: number) => {
    try {
      setMode("ROTATION");
      let newRotation = rotation + degree;
      if (newRotation >= 360) {
        newRotation = -360;
      }
      setRotation(newRotation);
      let url = await processingSVG(imgPath, color, shape);
      let image: any = document.getElementById("rotation_img");
      image.src = url;
      image.addEventListener("load", () => URL.revokeObjectURL(url), {
        once: true,
      });
    } catch (error) {
      // Log the error in ELK stack and Enable Monitoring
    }
  };
  /* change Handler For Building Selection Features */
  const onSelection = async (selected: any) => {
    try {
      await onReset();
      if (selected.element.children.length === 0) {
        let selectedId = selected.element.id;
        const sourceSvg = svgSources.find(({ id }: any) => id === selectedId);
        const imgPath = `assets/${sourceSvg.floorplan}`;
        setimgPath(imgPath);
        import(`/${imgPath}`).then((image) => {
          setsvgSrc(image.default);
        });
        setMode("SELECTION");
      } else {
        setMode("");
      }
    } catch (error) {
      // Log the error in ELK stack and Enable Monitoring
    }
  };

  /* change Handler For Color Selection Features */
  const onColorChange = async (colorParam: any) => {
    try {
      setMode("COLOR");
      let url = await processingSVG(imgPath, colorParam, shape);
      let image: any = document.getElementById("color_img");
      image.src = url;
      image.addEventListener("load", () => URL.revokeObjectURL(url), {
        once: true,
      });
      setColor(colorParam);
    } catch (error) {
      // Log the error in ELK stack and Enable Monitoring
    }
  };

  /* change Handler For Shape filter Selection Features */
  const onFilterChange = async (e: any, value: any) => {
    try {
      setMode("FILTER");
      let url = await processingSVG(imgPath, color, value.value);
      let image: any = document.getElementById("filter_img");
      image.src = url;
      image.addEventListener("load", () => URL.revokeObjectURL(url), {
        once: true,
      });
      setShape(value.value);
    } catch (error) {
      // Log the error in ELK stack and Enable Monitoring
    }
  };

  /* change Handler For Reset Features */
  const onReset = async () => {
    try {
      setsvgSrc("");
      setimgPath("");
      setColor("#000000");
      setShape("none");
      setMode("");
      setRotation(0);
    } catch (error) {
      // Log the error in ELK stack and Enable Monitoring
    }
  };
  return (
    <>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <GridColumn className="segmentSize">
            <div className="directory">
              <TreeView
                data={locationData}
                onNodeSelect={onSelection}
                aria-label="directory tree"
                nodeRenderer={({
                  element,
                  isBranch,
                  isExpanded,
                  getNodeProps,
                  level,
                }) => (
                  <div
                    {...getNodeProps()}
                    style={{ paddingLeft: 20 * (level - 1) }}
                  >
                    {isBranch ? (
                      <FolderIcon isOpen={isExpanded} />
                    ) : (
                      <FileIcon filename={element.name} />
                    )}

                    {element.name}
                  </div>
                )}
              />
            </div>
          </GridColumn>

          <GridColumn verticalAlign="middle" className="menuAdjust">
            {mode ? (
              <EditMenu
                rotate={onRotate}
                color={onColorChange}
                filter={onFilterChange}
                colorProps={color}
                shapeProps={shape}
                reset={onReset}
              />
            ) : (
              <Segment placeholder>
                <Header icon>Select Location From Left</Header>
              </Segment>
            )}

            {mode === "SELECTION" && (
              <Image
                id="selection_img"
                src={svgSrc}
                style={{ transform: `rotate(${rotation}deg)` }}
                centered
                className="imageSize"
                data-testid="selection_img"
              />
            )}
            {mode === "ROTATION" && (
              <Image
                id="rotation_img"
                src={svgSrc}
                style={{ transform: `rotate(${rotation}deg)` }}
                centered
                className="imageSize"
                data-testid="rotation_img"
              />
            )}
            {mode === "COLOR" && (
              <Image
                id="color_img"
                src={svgSrc}
                style={{ transform: `rotate(${rotation}deg)` }}
                centered
                className="imageSize"
                data-testid="color_img"
              />
            )}
            {mode === "FILTER" && (
              <Image
                id="filter_img"
                src={svgSrc}
                style={{ transform: `rotate(${rotation}deg)` }}
                centered
                className="imageSize"
                data-testid="filter_img"
              />
            )}
          </GridColumn>
        </Grid>
        <Divider vertical></Divider>
      </Segment>
    </>
  );
};
