import React from "react";
import { Link } from "react-router-dom";

interface AnchorProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: (data: any) => void;
}

const Anchor: React.FC<AnchorProps> = ({
  children,
  href,
  className,
  onClick,
}) => {
  return (
    <Link onClick={onClick} className={className} to={href}>
      {children}
    </Link>
  );
};

export default Anchor;
