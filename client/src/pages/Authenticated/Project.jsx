import { Button } from "@/components/ui/button";
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
import ColorsTab from "@/components/ColorsTab";
import SpacingTab from "@/components/SpacingTab";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosContext } from "@/context/AxiosContext";
import { toast } from "@/components/ui/use-toast";
import RadiusTab from "@/components/RadiusTab";
import ComponentTab from "@/components/ComponentTab";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [enums, setEnums] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSpacingSize, setSelectedSpacingSize] = useState(6);
  const [selectedRadiusSize, setSelectedRadiusSize] = useState({
    baseSize: 4,
    multiplier: 1,
  });
  const { getProjectById } = useContext(AxiosContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProjectById(`projects/${id}`);
        setProject(projectData.data.data);
        setEnums(projectData.data.enums);
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
      <Tabs defaultValue="component" className="w-10/12 mx-auto mt-20">
        <TabsList className="grid w-full grid-cols-4 bg-slate-500 text-white">
          <TabsTrigger value="color">Color</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="radius">Radius</TabsTrigger>
          <TabsTrigger value="component">Component</TabsTrigger>
        </TabsList>
        <TabsContent value="color" className="grid grid-cols-4 gap-4">
          <ColorsTab
            project={project}
            setProject={setProject}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </TabsContent>
        <TabsContent value="spacing" className="grid grid-cols-4 gap-4">
          <SpacingTab
            project={project}
            setProject={setProject}
            enums={enums}
            selectedSpacingSize={selectedSpacingSize}
            setSelectedSpacingSize={setSelectedSpacingSize}
          />
        </TabsContent>
        <TabsContent value="radius" className="grid grid-cols-4 gap-4">
          <RadiusTab
            project={project}
            setProject={setProject}
            enums={enums}
            selectedRadiusSize={selectedRadiusSize}
            setSelectedRadiusSize={setSelectedRadiusSize}
          />
        </TabsContent>
        <TabsContent value="component" className="grid grid-cols-4 gap-4">
          <ComponentTab
            project={project}
            selectedSpacingSize={selectedSpacingSize}
            selectedRadiusSize={selectedRadiusSize}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
