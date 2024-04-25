import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorsTab from "@/components/ColorsTab";
import SpacingTab from "@/components/SpacingTab";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosContext } from "@/context/AxiosContext";
import { toast } from "@/components/ui/use-toast";
import RadiusTab from "@/components/RadiusTab";
import ComponentTab from "@/components/ComponentTab";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [colors, setColors] = useState(null);
  const [enums, setEnums] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSpacingSize, setSelectedSpacingSize] = useState(null);
  const [selectedRadiusSize, setSelectedRadiusSize] = useState(null);
  const [isAutosaving, setIsAutoSaving] = useState(false);
  const { getProjectById, updateProject } = useContext(AxiosContext);

  useEffect(() => {
    const updateData = async () => {
      try {
        setIsAutoSaving(true);
        const projectDataToUpdate = {
          colors,
          radius: selectedRadiusSize,
          spacing: { baseSize: selectedSpacingSize },
        };

        const {
          data: { data },
        } = await updateProject(`projects/${id}`, projectDataToUpdate);
        setProject(data.project);
        setIsAutoSaving(false);
      } catch (err) {
        setIsAutoSaving(false);
        toast({
          title: "⛔ Something went wrong while autosaving.",
        });
        console.error(err);
      }
    };

    const interval = setInterval(() => {
      updateData();
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedRadiusSize, colors, selectedSpacingSize, id, updateProject]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await getProjectById(`projects/${id}`);
        setProject(data.project);
        setColors(data.project.colors);
        setEnums(data.enums);
        setSelectedSpacingSize(data.project.spacing.baseSize);
        setSelectedRadiusSize(data.project.radius);
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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSaveProject = async () => {
    setIsAutoSaving(true);
    const projectDataToUpdate = {
      colors,
      radius: selectedRadiusSize,
      spacing: { baseSize: selectedSpacingSize },
    };
    console.log(projectDataToUpdate);

    const {
      data: { data },
    } = await updateProject(`projects/${id}`, projectDataToUpdate);
    setProject(data.project);
    setIsAutoSaving(false);
    toast({
      title: "✅ Project data saved.",
    });
  };

  return (
    <div>
      <Nav />
      <div className="w-10/12 mx-auto mt-10">
        <div className="mb-4 flex justify-between items-center gap-4">
          <p className="text-2xl font-bold">{project?.name}</p>
          <div>
            <p>{isAutosaving ? "Saving..." : ""}</p>
            <Button onClick={handleSaveProject}>Save Project</Button>
          </div>
        </div>
        <Tabs defaultValue="color">
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
    </div>
  );
}
