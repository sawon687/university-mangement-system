import React from "react";
import CouresesTable from "../../../../components/modules/courses/coureses-table";
import CreateCourse from "../../../../components/modal/create-course.modal";

export default function page() {
  return (
    <div className="space-y-6 px-5 py-10">
      {/* Header */}
      <div className='flex justify-between'>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Course Assignment
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage courses and assign instructors to their respective
            departments.
          </p>
        </div>

        <CreateCourse />
      </div>
      <CouresesTable />
    </div>
  );
}
