import { useState } from "react";

export function useActive(children: any, value?: string) {
  const list = children.map((child: any) => child.props.name);
  const [active, setActive] = useState(value || list[0]);
  function toggleActive(name: string) {
    setActive(name);
  }
  return {
    active,
    toggleActive
  }
}
