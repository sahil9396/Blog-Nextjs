"use client";
import React from "react";
import { useLoadData } from "./admin-provider";

type Props = {
  children: React.ReactNode;
};

const LoadData = ({ children }: Props) => {
  useLoadData();
  return <div>{children}</div>;
};

export default LoadData;
