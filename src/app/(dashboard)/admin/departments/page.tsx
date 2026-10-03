import React from "react";
import { Building2} from "lucide-react";
import DepartmentPage from "../../../../components/modules/departments/department-page";
import DepartmentCreate from '../../../../components/modal/create-department.modal';



const page = () => {


  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="size-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage university departments, programs, courses and faculty.
          </p>
        </div>
       <DepartmentCreate/>
      </div>
      {/* department page */}

      <DepartmentPage />
    </div>
  );
};

export default page;
