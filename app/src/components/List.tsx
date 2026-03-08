import React from "react";

type ListProps = {
    items: React.ReactNode[];
    separator?: React.ReactElement;
    className?: string;
};

export default function List({ items, separator, className }: ListProps) {
    return (
        <ul className={className}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <li>
                        {item}
                    </li>

                    {separator && index < items.length - 1 && separator}
                </React.Fragment>
            ))}
        </ul>
    );
}