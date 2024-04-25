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
import { toast } from "@/components/ui/use-toast";
import { AxiosContext } from "@/context/AxiosContext";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";

export default function CreateAccount() {
  const [, setCookie] = useCookies(["authToken"]);
  const [currentTab, setCurrentTab] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup } = useContext(AxiosContext);

  const handleSignup = async () => {
    try {
      console.log(name, email, password);
      await signup("signup", {
        name,
        email,
        password,
      });

      setCurrentTab("login");
      toast({
        title: "✅ Account Created",
        description: "Please login.",
      });
    } catch (error) {
      toast({
        title: "⛔ Something went wrong.",
        description: "Please try again.",
      });
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login("login", {
        email,
        password,
      });

      setCookie("authToken", response.data.data.token, { path: "/" });
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    } catch (error) {
      toast({
        title: "⛔ Invalid Email or Password.",
        description: "Please try again.",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <Tabs
        defaultValue="signup"
        className="w-[400px] shadow-md"
        value={currentTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="signup"
            onClick={() => {
              setCurrentTab("signup");
            }}
          >
            Signup
          </TabsTrigger>
          <TabsTrigger
            value="login"
            onClick={() => {
              setCurrentTab("login");
            }}
          >
            Login
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create your account to start creating projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">
                  Password,{" "}
                  <span className="text-gray-500 font-normal">
                    atleast 6 digits long *
                  </span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignup}>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login using email and password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
