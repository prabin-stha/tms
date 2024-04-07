import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

import {
  CarTaxiFrontIcon,
  LogOut,
  MessageSquare,
  ParkingMeterIcon,
  UserRoundCheck,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/store/auth";
import { extractInitials, getImageSrcFromServer } from "@/lib/utils";
import { ThemeToggle } from "@/components/template/theme-toggle";
import { SideSheet } from "@/components/template/sidesheet";
import { useToast } from "@/components/ui/use-toast";

export const Route = createFileRoute("/_authenticated/_root-layout")({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="p-2 flex flex-col min-h-screen">
      <div className="border-b-2 pb-2 mb-2">
        <nav className="container flex justify-between items-center my-1">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-semibold"
          >
            <CarTaxiFrontIcon />
            CarPark
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <ShoppingCart />
            <Profile />
          </div>
        </nav>
      </div>
      <div className="container mb-2">
        <Outlet />
      </div>
      <div className="border-t-2 pt-2 mt-auto">
        <footer className="container flex items-center my-1 text-sm font-semibold">
          &copy; CarPark 2024. All Rights Reserved
        </footer>
      </div>
      <SideSheet />
    </div>
  );
}

function ShoppingCart() {
  return (
    <Link to="/bookings">
      <Button variant="outline">
        <ParkingMeterIcon className="h-4 w-4" />
      </Button>
    </Link>
  );
}

function Profile() {
  const { user, promoteUser } = useAuth(({ user, promoteUser }) => ({
    user,
    promoteUser,
  }));
  const { toast } = useToast();

  const handleUserPromote = async () => {
    const promoted = await promoteUser();
    if (promoted)
      toast({
        title: "Update Success",
        description: "Sucessfully promoted user to provider.",
      });
    else
      toast({
        title: "Update Failure",
        description: "Error promoting user!",
      });
  };

  const fallbackName = extractInitials(user?.username ?? "AN");
  const isProvider = user?.role_type === "provider";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user?.profilePic && (
            <AvatarImage src={getImageSrcFromServer(user.profilePic)} />
          )}
          <AvatarFallback>{fallbackName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isProvider && (
          <DropdownMenuItem>
            <Link className="flex items-center gap-1" to="/my-slots">
              <MessageSquare className="mr-2 h-4 w-4" /> My Slots
            </Link>
          </DropdownMenuItem>
        )}
        {!isProvider && (
          <DropdownMenuItem className="bg-yellow-300 focus:bg-yellow-400">
            <div
              className="flex items-center gap-1"
              onClick={handleUserPromote}
            >
              <UserRoundCheck className="mr-2 h-4 w-4" /> Promote to Provider?
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Logout() {
  const logout = useAuth(({ logout }) => logout);

  const handleLogoutClick = () => logout();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogoutClick}>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
