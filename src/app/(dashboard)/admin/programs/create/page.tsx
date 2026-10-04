import React from "react";
import ProgramFrom from "../../../../../components/form/program-from";

const CreateProgramPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Add Program</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Create a new academic program for your university.
      </p>

      <ProgramFrom />
    </div>
  );
};

export default CreateProgramPage;
