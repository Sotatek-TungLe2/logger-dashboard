import { Button } from "@/components/base/Button";
import React, { useRef, useState, useEffect } from "react";

interface DropdownButtonProps {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode; // Menu content
}

export function DropdownButton({ icon, label, children }: DropdownButtonProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const menu = btnRef.current?.nextElementSibling;
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target as Node) &&
        menu &&
        !menu.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative inline-block">
      <Button
        ref={btnRef}
        className="flex items-center gap-1 px-2 rounded-lg"
        variant="outline"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {icon}
        <span>{label}</span>
        <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 0.45 0.45" fill="none"><path d="M0.12 0.18h0.21l-0.105 0.135z" fill="#ebebeb"/></svg>
      </Button>
      {open && children && (
        <div className="absolute right-0 mt-2 min-w-[160px] bg-neutral-900 border border-neutral-700 text-white rounded shadow z-50">
          {children}
        </div>
      )}
    </div>
  );
}