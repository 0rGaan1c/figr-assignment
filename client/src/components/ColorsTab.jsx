import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AxiosContext } from "@/context/AxiosContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { generateHexColorCode } from "@/lib/utils";

const ColorsTab = ({
  project,
  setProject,
  selectedColor,
  setSelectedColor,
}) => {
  const { id } = useParams();
  const { updateProject } = useContext(AxiosContext);

  const handleColorValueChange = ({ id, hexValue }) => {
    setProject((prevProject) => {
      let updatedColor = [];
      prevProject.colors.forEach(({ _id, value, label }) => {
        let color = {};
        if (_id === id) {
          color = { _id, label, value: hexValue };
        } else {
          color = { _id, value, label };
        }
        updatedColor.push(color);
      });
      return { ...prevProject, colors: updatedColor };
    });
    setSelectedColor({ ...selectedColor, value: hexValue });
  };

  const handleColorVariableNameChange = ({ id, varibleName }) => {
    setProject((prevProject) => {
      let updatedColor = [];
      prevProject.colors.forEach(({ _id, value, label }) => {
        let color = {};
        if (_id === id) {
          color = { _id, label: varibleName, value };
        } else {
          color = { _id, value, label };
        }
        updatedColor.push(color);
      });
      return { ...prevProject, colors: updatedColor };
    });
    setSelectedColor({ ...selectedColor, label: varibleName });
  };

  const handleAddColor = async () => {
    setProject((prevProject) => {
      let colors = prevProject.colors;
      colors.push({
        label: `Color ${colors.length + 1}`,
        value: generateHexColorCode(),
      });
      return { ...prevProject, colors };
    });
    setSelectedColor(project.colors[project.colors.length - 1]);

    try {
      const response = await updateProject(`projects/${id}`, {
        colors: project.colors,
      });
      setProject(response.data.data);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Colors</CardTitle>
          <Button onClick={handleAddColor}>+</Button>
        </CardHeader>
        <CardContent className="space-y-1 h-[450px]">
          <Accordion type="single" collapsible>
            {project &&
              project?.colors.map(({ label, value, _id }) => {
                return (
                  <div key={_id}>
                    <AccordionItem value={_id}>
                      <AccordionTrigger
                        onClick={() => {
                          setSelectedColor({ label, value, _id });
                        }}
                      >
                        <span style={{ color: value }}>{label}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="mb-2">
                          <Label htmlFor="name">Variable Name</Label>
                          <Input
                            className="focus-visible:ring-transparent"
                            type="text"
                            value={label}
                            onChange={(e) => {
                              handleColorVariableNameChange({
                                id: _id,
                                varibleName: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="name">Hex Code</Label>
                          <Input
                            className="focus-visible:ring-transparent"
                            type="text"
                            value={value}
                            onChange={(e) => {
                              handleColorValueChange({
                                id: _id,
                                hexValue: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                );
              })}
          </Accordion>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <div
          className="w-2/4 h-[90%] p-4 m-4 rounded-sm"
          style={{ backgroundColor: selectedColor?.value }}
        >
          <span className="bg-white rounded-sm p-2">
            {selectedColor?.label} - {selectedColor?.value}
          </span>
        </div>
      </Card>
    </>
  );
};

export default ColorsTab;
