import React from "react"

function PageHeader({ title, children }: { title: string, children?: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-between md:flex-row gap-3">
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>
            {children}
        </div>
    )
}

export default PageHeader