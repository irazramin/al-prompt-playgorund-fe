"use client"

import React from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface HeaderProps {
    breadcrumbs?: {
        items: Array<{
            label: string
            href?: string
        }>
    }
}

export function Header({ breadcrumbs }: HeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                {breadcrumbs && (
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.items.map((item, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                                    <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                                        {item.href ? (
                                            <BreadcrumbLink href={item.href}>
                                                {item.label}
                                            </BreadcrumbLink>
                                        ) : (
                                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                        )}
                                    </BreadcrumbItem>
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                )}
            </div>
        </header>
    )
}
