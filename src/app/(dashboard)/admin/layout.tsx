import React, { ReactNode } from 'react'
import DashboardShell from '../../../components/dashboard/dashbaord-shell'
import RoleGuard from '../../../components/auth/role-gurd'


const layout = ({children}:{children:ReactNode}) => {
  return (
    <RoleGuard roles={['ADMIN']}><DashboardShell>{children}</DashboardShell></RoleGuard>
  )
}

export default layout