function useConfigureBanner(pathname, role, isLoggedIn) {
  if (isLoggedIn) {
    if (role.toLower() === "root") {
      return [
        {
          path: "/profile",
          label: "Profile",
          icon: "",
        },
        {
          path: "/manage-users",
          label: "Manage Users",
          icon: "",
        },
        {
          path: "/logout",
          label: "Logout",
          icon: "",
        },
      ];
    } else {
      return [
        {
          path: "/profile",
          label: "Profile",
          icon: "",
        },
        {
          path: "/logout",
          label: "Logout",
          icon: "",
        },
      ];
    }
  }
}

export default useConfigureBanner;
