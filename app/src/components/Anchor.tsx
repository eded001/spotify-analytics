import Link from "next/link";

type AnchorTarget = "_self" | "_blank" | "_parent" | "_top";

export default function Anchor({
    children,
    href,
    target = "_self"
}: {
    children: React.ReactNode;
    href: string;
    target?: AnchorTarget;
}) {
    return (
        <Link
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className={`text-[${target === "_blank" ? "#4ac776" : "#1aa74c"}] hover:underline cursor-pointer`}
        >
            {
                target === "_blank" ? (
                    <i>
                        {children}
                    </i>
                ) : (
                    children
                )
            }
        </Link>
    );
}