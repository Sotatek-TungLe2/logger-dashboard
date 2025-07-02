type TooltipProps = {
    message: string;
    children: React.ReactNode;
};

export default function Tooltips({ message, children }: TooltipProps) {
    return (
        <div className="group relative inline-flex">
            {children}
            <span className="
                absolute top-10 left-0
                scale-0 group-hover:scale-100 transition-all
                rounded-sm bg-black/90 p-2 text-xs text-base-content
                whitespace-nowrap min-w-max z-50
                shadow-2xl shadow-white/10
                backdrop-brightness-90
            ">
                {message}
            </span>
        </div>
    );
}
