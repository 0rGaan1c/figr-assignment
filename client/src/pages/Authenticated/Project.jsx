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
  const [colors, setColors] = useState(null);
  const [enums, setEnums] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSpacingSize, setSelectedSpacingSize] = useState(6);
  const [selectedRadiusSize, setSelectedRadiusSize] = useState({
    baseSize: 4,
    multiplier: 1,
  });
  const { getProjectById, updateProject } = useContext(AxiosContext);

  // useEffect(() => {
  //   const updateData = async () => {
  //     const res = await updateProject(`projects/${id}`, {
  //       radius: {
  //         baseSize: selectedRadiusSize.baseSize,
  //         multiplier: selectedRadiusSize.multiplier,
  //       },
  //     });
  //     console.log(res);
  //   };

  //   const interval = setInterval(() => {
  //     updateData();
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, [selectedRadiusSize]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await getProjectById(`projects/${id}`);
        setProject(data.project);
        setColors(data.project.colors);
        setEnums(data.enums);
        setSelectedColor(data.project.colors[0]);
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

  // console.log(project, colors);

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
          <ColorsTab
            project={project}
            setProject={setProject}
            colors={colors}
            setColors={setColors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </TabsContent>
        <TabsContent value="spacing" className="grid grid-cols-4 gap-4">
          <SpacingTab
            enums={enums}
            selectedSpacingSize={selectedSpacingSize}
            setSelectedSpacingSize={setSelectedSpacingSize}
          />
        </TabsContent>
        <TabsContent value="radius" className="grid grid-cols-4 gap-4">
          <RadiusTab
            enums={enums}
            selectedRadiusSize={selectedRadiusSize}
            setSelectedRadiusSize={setSelectedRadiusSize}
          />
        </TabsContent>
        <TabsContent value="component" className="grid grid-cols-4 gap-4">
          <ComponentTab
            colors={colors}
            selectedSpacingSize={selectedSpacingSize}
            selectedRadiusSize={selectedRadiusSize}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
