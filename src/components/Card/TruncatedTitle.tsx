import React, { useEffect, useRef, useState } from "react";

interface SmartTruncatedTitleProps {
  title: string;
}

const SmartTruncatedTitle: React.FC<SmartTruncatedTitleProps> = ({ title }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (el) {
      setIsOverflowed(el.scrollWidth > el.clientWidth);
    }
  }, [title]);

  return (
    <div className="relative flex items-center gap-2 w-[88%]">
      <div
        ref={titleRef}
        className="truncate max-w-full text-sm text-system-content cursor-default"
          onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {title}
      </div>

      {/* Tooltip nếu bị truncate */}
       {showTooltip && isOverflowed && (
        <div className="absolute -top-[20px] max-w-[300%] left-1/2 mt-1 z-10 bg-base-175 text-system-content text-sm rounded-lg px-2 py-1 shadow-sm/50 shadow-system-content whitespace-nowrap border-1 border-inlinecode-100 pointer-events-none">
          {title}
        </div>
       )} 
    </div>
  );
};

export default SmartTruncatedTitle;
