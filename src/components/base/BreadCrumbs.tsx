import React from "react";

interface BreadCrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

interface BreadCrumbsProps {
  items: BreadCrumbItem[];
  className?: string;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ items, className = "" }) => {
  return (
    <ul className={`breadcrumbs flex items-center gap-1 ${className}`}>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center">
          {item.href ? (
            <a
              href={item.href}
              className="cursor-pointer text-blue-500 hover:underline"
              onClick={item.onClick}
            >
              {item.label}
            </a>
          ) : (
            <span className="text-gray-300">{item.label}</span>
          )}
          {idx < items.length - 1 && (
            <span className="breadcrumbs-caret mx-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"
                  fill="#808080"
                />
              </svg>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BreadCrumbs;