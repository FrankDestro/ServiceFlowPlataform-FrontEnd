import React from "react";
import "./SortableHeader.css"

interface SortableHeaderProps {
    field: string;
    children: React.ReactNode;
    sort?: string;
    onSort: (field: string) => void;
    getSortIcon: (field: string) => React.ReactNode;
}


function SortableHeader({
    field,
    children,
    sort,
    onSort,
    getSortIcon,
}: SortableHeaderProps) {

    const active = sort?.startsWith(field);

    return (
        <th
            className={`sortable ${active ? "active-sort" : ""}`}
            onClick={() => onSort(field)}
        >
            <div className="header-sort-content">
                <span>{children}</span>

                <span className="sort-icon">
                    {getSortIcon(field)}
                </span>
            </div>
        </th>
    );
}

export default SortableHeader;