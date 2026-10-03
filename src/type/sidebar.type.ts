import { LucideIcon } from 'lucide-react';

export interface ISidebarItem{
    title:string,
    url:string,
    icon:LucideIcon
}

export interface ISidebarGroup{
    title:string
    items:ISidebarItem[]
}

export type SidbarItems=ISidebarGroup[]