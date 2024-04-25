import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { AxiosContext } from "@/context/AxiosContext";
import { getUserFromLocalStorage } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const { logout } = useContext(AxiosContext);
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();

  return (
    <nav className="sticky top-0 z-10 bg-white shadow px-24 flex items-center justify-between py-4">
      <span className="font-bold text-3xl">
        <Link to="/">Figr</Link>
      </span>
      <div>
        <div>
          {user?.name}
          <Dialog>
            <DialogTrigger className="ml-2">
              <Button variant="outline">Logout</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Do you want to log out?</DialogTitle>
                <DialogDescription>
                  <p className="mb-4">Make sure to save any unsaved changes.</p>
                  <Button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
