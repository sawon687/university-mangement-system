"use client";
import { useState } from "react";
import DepartmentsTable from "./departments-table";
import { useGetDepartment } from "../../../hooks/department.hook";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { inputClass } from "../../../utils/input-class";
import { useDebaunce } from '../../../hooks/debaunce.hook';

const DepartmentPage = () => {

  const [search, setSearch] = useState("");
  const searchTarm=useDebaunce(search,500)
    const { data, isLoading } = useGetDepartment(searchTarm);
//   console.log("search", search);
    console.log("search debutnce", searchTarm);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Departments</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                View and manage all academic departments.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search departments..."
                className={`${inputClass} h-10  border-muted-/20 bg-muted/30 pl-9 pr-3 transition-all
                  focus-visible:bg-background`}
              />
            </div>
          </div>
        </CardHeader>
        <DepartmentsTable departments={data?.data} loading={isLoading} />
      </Card>
    </>
  );
};

export default DepartmentPage;
