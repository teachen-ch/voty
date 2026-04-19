import { Flex } from "components/ui";
import React from "react";
import isFunction from "lodash/isFunction";
import Image from "next/image";
import IconX from "../public/images/icon_x.svg";

export const CircleBullet: React.FC<
  React.PropsWithChildren<{
    value: string | number;
    bg?: string;
    color?: string;
    className?: string;
    onClick?: () => void;
  }>
> = ({ value, bg = "#fff", color = "gray", className, onClick }) => (
  <span
    className={`font-semibold text-base inline-block rounded-[25px] shrink-0 mr-2 p-1 size-8 text-center ${
      onClick ? "cursor-pointer" : ""
    } ${className ?? ""}`}
    style={{ backgroundColor: bg, color }}
    onClick={onClick}
  >
    {value}
  </span>
);

export const Pill: React.FC<
  React.PropsWithChildren<{
    deleteLink?: boolean | (() => void);
    bg?: string;
    color?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
  }>
> = ({
  deleteLink,
  bg = "var(--color-primary)",
  color = "#fff",
  children,
  onClick,
  className,
  ...props
}) => (
  <Flex
    className={`items-center px-3 py-1 mr-2 my-1 text-sm rounded-[20px] ${
      onClick ? "cursor-pointer" : ""
    } ${className ?? ""}`}
    style={{ backgroundColor: bg, color }}
    onClick={onClick}
    {...props}
  >
    <span>{children}</span>
    {deleteLink && isFunction(deleteLink) && (
      <span className="inline-block ml-1 -mr-1 text-white">
        <Image
          src={IconX}
          onClick={deleteLink}
          className="pointer white"
          alt="Löschen"
        />
      </span>
    )}
  </Flex>
);
