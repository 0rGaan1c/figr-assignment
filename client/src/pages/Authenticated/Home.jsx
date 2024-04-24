import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { AxiosContext } from "@/context/AxiosContext";
import { getUserFromLocalStorage } from "@/lib/utils";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Home = () => {
  const { getUserProjects, createProject, logout } = useContext(AxiosContext);
  const [projects, setProjects] = useState(null);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const user = getUserFromLocalStorage();

  const handleCreateProject = async () => {
    if (!projectName) {
      toast({
        title: "⛔ Project needs a name.",
        description: "Please try again.",
      });
      return;
    }

    try {
      const response = await createProject("projects", {
        name: projectName,
      });
      console.log(response);
      if (response.data.success) {
        navigate(`/project/${response.data.data._id}`);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "⛔ Something went wrong.",
        description: "Please try again.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getUserProjects("projects");
        setProjects(projectsData.data.data);
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
      <nav className="sticky top-0 z-10 bg-white shadow px-24 flex items-center justify-between py-4">
        <span className="font-bold text-3xl">Figr</span>
        <div>
          <div>
            {user?.name}
            <Button
              variant="outline"
              className="ml-2"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8">
        <div className="mb-4">
          <ProjectDialog
            projectName={projectName}
            setProjectName={setProjectName}
            handleCreateProject={handleCreateProject}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {projects &&
            projects.map((project) => (
              <Link to={`/project/${project._id}`} key={project._id}>
                <Card
                  className="bg-white shadow-md p-10"
                  style={{
                    borderRadius:
                      project.radius.baseSize * project.radius.multiplier,
                  }}
                >
                  <CardHeader className="text-xl font-bold mb-6 p-0">
                    {project.name}
                  </CardHeader>
                  <CardDescription>
                    {project.colors.map((color, index) => (
                      <span
                        key={index}
                        className="inline-block rounded-full h-4 w-4 mr-2"
                        style={{ backgroundColor: color.value }}
                      />
                    ))}
                  </CardDescription>
                </Card>
              </Link>
            ))}
        </div>
      </main>
    </div>
  );
};

function ProjectDialog({ projectName, setProjectName, handleCreateProject }) {
  return (
    <Dialog>
      <div className="w-full flex justify-end">
        <DialogTrigger asChild>
          <Button>Create Project</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-6 items-center gap-4 px-2">
            <Label htmlFor="name" className="text-right col-span-2">
              Project Name*
            </Label>
            <Input
              value={projectName}
              id="name"
              className="col-span-4"
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateProject}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Home;
