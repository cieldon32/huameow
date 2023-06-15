import { useState } from "react";

export function useFocus() {
  const [focused, setFocus] = useState(false);
  function doBlur() {
    setFocus(false);
  }
  function doFocus() {
    setFocus(true);
  }
  return {
    focused,
    doBlur,
    doFocus
  }
}
