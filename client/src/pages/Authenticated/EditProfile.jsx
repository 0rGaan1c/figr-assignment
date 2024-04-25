import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { AxiosContext } from "@/context/AxiosContext";
import { getUserFromLocalStorage } from "@/lib/utils";
import { useContext, useState } from "react";

const EditProfile = () => {
  const user = getUserFromLocalStorage();
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { updateUserDetails } = useContext(AxiosContext);

  const handleSaveUserDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserDetails("user", {
        name,
        email,
        oldPassword,
        newPassword,
      });

      toast({
        title: "✅ Details updated.",
      });
      setOldPassword("");
      setNewPassword("");
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (err) {
      console.error(err);
      toast({
        title: "⛔ Something went wrong.",
        description: "Please try again.",
      });
    }
  };

  return (
    <div>
      <Nav />
      <div className="w-10/12 mx-auto mt-10">
        <form
          className="w-2/4"
          onSubmit={(e) => {
            handleSaveUserDetails(e);
          }}
        >
          <div className="space-y-1 my-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1 my-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1 my-2">
            <Label htmlFor="password">Old Password *</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1 my-2">
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
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <Button className="mt-4">Save Details</Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
