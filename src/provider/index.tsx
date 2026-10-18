 import React, { ReactNode } from 'react'
import QueryProvider from './query.provider'
import { ThemeProvider } from './ThemeProvider'
 
 const Provider = ({children}:{children:ReactNode}) => {
   return (

     <ThemeProvider>
       <QueryProvider>{children}</QueryProvider>
     </ThemeProvider>
    
   )
 }
 
 export default Provider