import { useEffect, useState } from "react";

const useLocalStorage = (key: string, init: any) => {
  const [data, setData] = useState(() => {
    const dataLs = localStorage.getItem(key);
    if (dataLs != null) return JSON.parse(dataLs);
    if (typeof init == typeof Function) return init();
    return init;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(init));
  }, [key, init]);
  return [data, setData];
};
export default useLocalStorage;
