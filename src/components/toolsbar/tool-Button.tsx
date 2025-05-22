import React from "react";
import { type LucideIcon } from "lucide-react";
import Hint from "../hint";
import { Button } from "../ui/button";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  // style?: object;
}

const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
  // style,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="top" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolButton;
