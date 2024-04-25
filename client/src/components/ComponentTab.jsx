import { Card, CardContent } from "./ui/card";
import { generateComponentStyles } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import EditComponentStyle from "./EditComponentStyle";
import { ScrollArea } from "./ui/scroll-area";

const ComponentTab = ({ colors, selectedSpacingSize, selectedRadiusSize }) => {
  const [selectedComponent, setSelectedComponent] = useState("Button");
  const [componentsStyles, setComponentsStyles] = useState(null);

  useEffect(() => {
    if (colors && colors.length > 0) {
      const componentStyles = generateComponentStyles(
        colors,
        selectedSpacingSize,
        selectedRadiusSize
      );
      setComponentsStyles(componentStyles);
    }
  }, [colors, selectedSpacingSize, selectedRadiusSize]);

  return (
    <>
      <Card className="col-span-1">
        <CardContent className="p-0 h-[450px]">
          <div
            className={`space-y-1 p-4 cursor-pointer ${
              selectedComponent === "Button"
                ? "bg-blue-500 text-white font-medium"
                : ""
            }`}
            onClick={() => setSelectedComponent("Button")}
          >
            Button
          </div>
          <hr />
          <div
            className={`space-y-1 p-4 cursor-pointer ${
              selectedComponent === "Input-Text"
                ? "bg-blue-500 text-white font-medium"
                : ""
            }`}
            onClick={() => setSelectedComponent("Input-Text")}
          >
            Input-Text
          </div>
          <hr />
          <div
            className={`space-y-1 p-4 cursor-pointer ${
              selectedComponent === "Radio"
                ? "bg-blue-500 text-white font-medium"
                : ""
            }`}
            onClick={() => setSelectedComponent("Radio")}
          >
            Radio
          </div>
          <hr />
          <div
            className={`space-y-1 p-4 cursor-pointer ${
              selectedComponent === "Checkbox"
                ? "bg-blue-500 text-white font-medium"
                : ""
            }`}
            onClick={() => setSelectedComponent("Checkbox")}
          >
            Checkbox
          </div>
          <hr />
          <div
            className={`space-y-1 p-4 cursor-pointer ${
              selectedComponent === "Select"
                ? "bg-blue-500 text-white font-medium"
                : ""
            }`}
            onClick={() => setSelectedComponent("Select")}
          >
            Select
          </div>
          <hr />
        </CardContent>
      </Card>
      <Card className="col-span-3 p-4">
        <ScrollArea className="h-[450px]">
          <div
            style={{
              display: selectedComponent === "Button" ? "block" : "none",
            }}
          >
            {componentsStyles &&
              componentsStyles.map((component, idx) => {
                return (
                  <div
                    key={idx}
                    className="mb-8 grid grid-cols-3 gap-4 items-center"
                  >
                    <Button style={component} className="col-span-1">
                      {component.label}
                    </Button>
                    <div className="col-span-2 px-4">
                      <EditComponentStyle
                        componentsStyles={componentsStyles}
                        componentStyle={component}
                        setComponentsStyles={setComponentsStyles}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            style={{
              display: selectedComponent === "Input-Text" ? "block" : "none",
            }}
          >
            {componentsStyles &&
              componentsStyles.map((component, idx) => {
                return (
                  <div
                    key={idx}
                    className="mb-8 grid grid-cols-3 gap-4 items-center"
                  >
                    <Input style={component} defaultValue={component.label} />
                    <div className="col-span-2 px-4">
                      <EditComponentStyle
                        componentsStyles={componentsStyles}
                        componentStyle={component}
                        setComponentsStyles={setComponentsStyles}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            style={{
              display: selectedComponent === "Radio" ? "block" : "none",
            }}
          >
            Radio Selected
          </div>
          <div
            style={{
              display: selectedComponent === "Checkbox" ? "block" : "none",
            }}
          >
            Checkbox Selected
          </div>
          <div
            style={{
              display: selectedComponent === "Select" ? "block" : "none",
            }}
          >
            Select Selected
          </div>
        </ScrollArea>
      </Card>
    </>
  );
};

export default ComponentTab;
