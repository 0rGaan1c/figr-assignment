import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import VariableTable from "./VariableTable";
import { generateSpacingVariables } from "@/lib/utils";
import { useState } from "react";

const ComponentTab = ({ project, selectedSpacingSize, selectedRadiusSize }) => {
  const [selectedComponent, setSelectedComponent] = useState("Button");

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
        <div
          style={{ display: selectedComponent === "Button" ? "block" : "none" }}
        >
          Button Selected
        </div>
        <div
          style={{
            display: selectedComponent === "Input-Text" ? "block" : "none",
          }}
        >
          Input-Text Selected
        </div>
        <div
          style={{ display: selectedComponent === "Radio" ? "block" : "none" }}
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
          style={{ display: selectedComponent === "Select" ? "block" : "none" }}
        >
          Select Selected
        </div>
      </Card>
    </>
  );
};

export default ComponentTab;
