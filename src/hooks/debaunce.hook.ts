import { useEffect, useState } from 'react'

export const useDebaunce=(value:string,delay:number=500)=>{
    const [searchTram,setSearctTram]=useState('')
    useEffect(()=>{
      const timer=  setTimeout(()=>{
            setSearctTram(value)
        },delay)
        return()=>{
            clearTimeout(timer)
        }
    },[value])

  return searchTram
}