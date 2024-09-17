import { useEffect } from "react";
import { refreshAccessToken } from "../api/auth.js";
import MonthStats from "../components/MonthStats.jsx";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Dashboard = () => {
  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <div className=" bg-primary w-10/12 px-10 pt-10 pb-20 ">
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
        className=" mt-10 mb-12"
      >
        <BreadcrumbItem className="text-gray-500 text-sm font-bold">
          <BreadcrumbLink href="#">Početna</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage className="text-white text-sm font-bold">
          <BreadcrumbLink href="#">Kontrolna tabla</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <MonthStats />
    </div>
  );
};

export default Dashboard;
