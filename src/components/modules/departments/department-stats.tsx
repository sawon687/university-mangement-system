import React from 'react'
import { Card, CardContent } from '../../ui/card'
import { Building2, GraduationCap, Users } from 'lucide-react'

const DepartmentStats = () => {
  return (
    <>   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Departments
              </p>
              <p className="mt-1 text-2xl font-bold">
                {departments.length}
              </p>
            </div>

            <div className="rounded-lg bg-primary/10 p-3">
              <Building2 className="size-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Students
              </p>
              <p className="mt-1 text-2xl font-bold">
                {totalStudents}
              </p>
            </div>

            <div className="rounded-lg bg-primary/10 p-3">
              <GraduationCap className="size-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Instructors
              </p>
              <p className="mt-1 text-2xl font-bold">
                {totalTeachers}
              </p>
            </div>

            <div className="rounded-lg bg-primary/10 p-3">
              <Users className="size-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Programs
              </p>
              <p className="mt-1 text-2xl font-bold">
                {totalPrograms}
              </p>
            </div>

            <div className="rounded-lg bg-primary/10 p-3">
              <Building2 className="size-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div></>
  )
}

export default DepartmentStats