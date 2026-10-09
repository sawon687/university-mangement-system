
import React from "react";
import StudentProfile from '../../../../components/modules/studentProfile/studentProfile';




const page = () => {

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Page Header */}
        <div>
          <p className="text-sm font-medium text-orange-600">
            Student Dashboard / Profile
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information and academic identity.
          </p>
        </div>
        <StudentProfile/>
      </div>
    </div>
  );
};



export default page;
