import React, { ReactNode } from 'react'
import AuthGuard from '../../components/auth/auth-gurd'


const layout = ({children}:{children:ReactNode}) => {
  return (
   <AuthGuard>{children}</AuthGuard>
  )
}

export default layout
