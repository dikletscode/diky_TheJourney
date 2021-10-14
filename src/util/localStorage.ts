import React, { useEffect, useState } from "react";

const getLocalStorage = (key: string) => {
  const value = (): string | null => {
    const data = localStorage.getItem(key);
    if (data != null) return JSON.parse(data);
    return null;
  };

  return value;
};

export default getLocalStorage;
