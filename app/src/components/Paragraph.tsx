export default function Paragraph({ children, justify = "justify" }: { children: React.ReactNode; justify?: "left" | "center" | "right" | "justify" }) {
    return (
        <p className={`text-[#e8f8ee] text-${justify} my-5`}>
            {children}
        </p>
    );
}