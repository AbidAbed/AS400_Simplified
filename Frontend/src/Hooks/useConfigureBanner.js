import { CgProfile } from "react-icons/cg";
import { MdManageAccounts } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";

// FUNCTION TO RETURN PATHS DEPENDING ON AUTH CODE

function useConfigureBanner() {

  return (authrizations, isLoggedIn, currentPath) => {
    const isRoot = authrizations.find(
      (authrization) => authrization.name.toLowerCase() === "root"
    );
    if (isLoggedIn) {
      if (isRoot) {
        return [
          {
            path: "/home",
            label: "Home",
            icon: <IoHomeOutline size={20} color="white" />,
          },
          {
            path: "/profile",
            label: "Profile",
            icon: <CgProfile size={20} color="white" />,
          },
          {
            path: "/manage-users",
            label: "Manage Users",
            icon: <MdManageAccounts size={20} color="white" />,
          },
          {
            path: "/options-manager",
            label: "Manage Options",
            icon: <IoHomeOutline size={20} color="white" />,
          },
          {
            path: "/logout",
            label: "Logout",
            icon: <IoIosLogOut size={20} color="white" />,
          },
        ];
      } else {
        return [
          {
            path: "/home",
            label: "Home",
            icon: <IoHomeOutline size={20} color="white" />,
          },
          {
            path: "/profile",
            label: "Profile",
            icon: <CgProfile size={20} color="white" />,
          },
          {
            path: "/logout",
            label: "Logout",
            icon: <IoIosLogOut size={20} color="white" />,
          },
        ];
      }
    }
  };
}

export default useConfigureBanner;
