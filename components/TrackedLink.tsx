"use client";

import React from "react";
import Link, { LinkProps } from "next/link";

interface TrackedLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  eventName?: string;
  children: React.ReactNode;
}

export default function TrackedLink({ eventName, onClick, children, ...props }: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (eventName && typeof window !== "undefined") {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: eventName });
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
