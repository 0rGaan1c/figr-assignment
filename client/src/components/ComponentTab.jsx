import { Card, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateComponentStyles } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import EditComponentStyle from "./EditComponentStyle";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";

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
        <CardContent className="p-0 h-[400px]">
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
        <ScrollArea className="h-[400px]">
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
                        type="button"
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
                        type="input"
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
            <div className="flex mt-32 w-full items-center justify-center">
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Compact</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div
            style={{
              display: selectedComponent === "Checkbox" ? "block" : "none",
            }}
          >
            <div className="flex mt-32 w-full items-center justify-center">
              <div>
                <div className="flex items-center space-x-2 mb-10">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
                <div className="items-top flex space-x-2">
                  <Checkbox id="terms1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">
                      You agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: selectedComponent === "Select" ? "block" : "none",
            }}
          >
            {componentsStyles &&
              componentsStyles.map((component, idx) => {
                return (
                  <div
                    key={idx}
                    className="mb-8 grid grid-cols-3 gap-4 items-center pl-4"
                  >
                    <Select style={component}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent style={component}>
                        <SelectItem
                          value="light"
                          style={{ color: component.color }}
                        >
                          Light
                        </SelectItem>
                        <SelectItem
                          value="dark"
                          style={{ color: component.color }}
                        >
                          Dark
                        </SelectItem>
                        <SelectItem
                          value="system"
                          style={{ color: component.color }}
                        >
                          System
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
        </ScrollArea>
      </Card>
    </>
  );
};

export default ComponentTab;
