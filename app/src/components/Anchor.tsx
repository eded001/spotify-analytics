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
    const linkColor =
        target === "_blank"
            ? "text-[#77d598]"
            : "text-[#4ac776]";

    return (
        <Link
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className={`${linkColor} hover:underline cursor-pointer`}
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