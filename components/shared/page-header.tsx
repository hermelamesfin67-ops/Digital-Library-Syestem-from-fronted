import React from "react"

function PageHeader({ title, desc, children }: { title: string, desc?: string | React.ReactNode, children?: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-between md:flex-row gap-3">
            <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">{title}</h1>
                {desc}
            </div>
            {children}
        </div>
    )
}

export default PageHeader