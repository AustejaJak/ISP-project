import React from "react";
import { Link } from "react-router-dom";

interface AnchorProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const Anchor: React.FC<AnchorProps> = ({ children, href, className }) => {
  return (
    <Link className={className} to={href}>
      {children}
    </Link>
  );
};

export default Anchor;
