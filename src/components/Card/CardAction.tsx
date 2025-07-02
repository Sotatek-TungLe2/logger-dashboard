import React, { useState } from "react";
import { Card, CardContent } from "./Card";
import { EllipsisVertical, X } from "lucide-react";
import { Button } from "../base/Button";
import TruncatedTitle from "./TruncatedTitle";

interface CardWithActionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onRemove: () => void;
}

export default function CardWithAction({ title, children, onRemove, className }: CardWithActionProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleRemove = () => {
    setShowMenu(false);
    if (window.confirm("이 위젯을 삭제하시겠습니까?")) {
      onRemove();
    }
  };

  return (
    <Card className={`relative ${className}`}>
      <div className="flex items-center justify-between pb-2">

        <TruncatedTitle title={title} />
        <div className="relative">
          <Button
            variant="outline"
            size="xs"

            className=" !h-6 w-6 flex items-center justify-center rounded cursor-pointer text-system-content "
            onClick={() => setShowMenu((v) => !v)}
          >
            <EllipsisVertical width="18" height="18" color="currentColor" />
          </Button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-neutral-800 rounded shadow z-10">
              <Button
                variant="text"
                className="flex align-center !justify-between w-full text-left text-primary py-1 px-2 hover:bg-neutral-700"
                onClick={handleRemove}
              >
                삭제됨
                <X width={18} height={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
      <CardContent>{children}</CardContent>
    </Card>
  );
}