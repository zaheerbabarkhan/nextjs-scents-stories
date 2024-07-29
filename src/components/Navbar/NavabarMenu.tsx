"use client"
import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '../ui/navigation-menu';


const components: { title: string; href: string; }[] = [
    {
        title: "SUMMER DEALS",
        href: "/",
    },
    {
        title: "LESS THAN 1500",
        href: "/",
    },
    {
        title: "BUNDLES",
        href: "/",
    },
    {
        title: "ATTARS",
        href: "/",
    },
    {
        title: "BLOGS",
        href: "/",
    },
    {
        title: "CONTACT",
        href: "/",
    },

];

const NavabarMenu = () => {
    return (
        <main>
            <NavigationMenu className='mx-auto text-white bg-black text-sm'>
                <NavigationMenuList className='gap-5 flex-wrap'>
                    <NavigationMenuItem className='border-2 border-transparent border-x-0 border-t-0 hover:border-white'>
                        <NavigationMenuTrigger className={` bg-inherit hover:!bg-inherit hover:!text-inherit focus:!bg-inherit focus:!text-inherit  text-lg`}>SHOP</NavigationMenuTrigger>
                    </NavigationMenuItem>
                    {
                        components.map(component => {
                            return <NavigationMenuItem  key={component.title} className='h-full border-2 border-transparent border-x-0 border-t-0 hover:border-white'>
                                <NavigationMenuLink href={component.href} className={`${navigationMenuTriggerStyle()} bg-inherit hover:!bg-inherit hover:!text-white focus:!bg-inherit focus:!text-white  `}>
                                    {component.title}

                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        })
                    }
                </NavigationMenuList>
            </NavigationMenu>
        </main>
    )
}

export default NavabarMenu
