import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { AxiosContext } from "@/context/AxiosContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Project() {
  const { id } = useParams();
  const { getProjectById } = useContext(AxiosContext);
  const [project, setProject] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

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

  const handleAddColor = () => {
    setProject((prevProject) => {
      let colors = prevProject.colors;
      colors.push({
        _id: "will_generate",
        label: `Color ${colors.length + 1}`,
        value: "#403A8C",
      });
      return { ...prevProject, colors };
    });
    setSelectedColor(project.colors[project.colors.length - 1]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProjectById(`projects/${id}`);
        setProject(projectData.data.data);
        setSelectedColor(projectData.data.data.colors[0]);
      } catch (err) {
        console.error(err);
        toast({
          title: "⛔ Something went wrong while fetching projects.",
          description: "Please try again.",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Tabs defaultValue="color" className="w-10/12 mx-auto mt-20">
        <TabsList className="grid w-full grid-cols-4 bg-slate-500 text-white">
          <TabsTrigger value="color">Color</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="radius">Radius</TabsTrigger>
          <TabsTrigger value="component">Component</TabsTrigger>
        </TabsList>
        <TabsContent value="color" className="grid grid-cols-4 gap-4">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Colors</CardTitle>
              <Button onClick={handleAddColor}>+</Button>
            </CardHeader>
            <CardContent className="space-y-1">
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
              className="w-2/4 h-[400px] p-4 m-4 rounded-sm"
              style={{ backgroundColor: selectedColor?.value }}
            >
              <span className="bg-white rounded-sm p-2">
                {selectedColor?.value}
              </span>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="spacing">
          <Card>
            <CardHeader>
              <CardTitle>Spacing</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="radius">
          <Card>
            <CardHeader>
              <CardTitle>Radius</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="component">
          <Card>
            <CardHeader>
              <CardTitle>Component</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
