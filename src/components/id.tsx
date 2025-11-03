import React from "react";

interface IdProps {
  id: string;
}

const Id = ({ id }: IdProps) => (
    <div
      id={id}
      className="md:-mt-26 pointer-events-none absolute inset-x-0 -mt-[72px] h-24"
    />
);

export { Id };
