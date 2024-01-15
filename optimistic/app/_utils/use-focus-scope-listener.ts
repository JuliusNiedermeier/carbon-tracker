import { RefObject, useEffect, useState } from "react";

type FocusScope = ReturnType<typeof createFocusScope>;

const dataAttributeName = "data-focus-scope";
const scopeSeperator = ":";

export const createFocusScope = (namespace: string, identifier: string) => `${namespace}${scopeSeperator}${identifier}` as const;

export const parseFocusScope = (ID: FocusScope) => {
  const [namespace, key] = ID.split(scopeSeperator);
  return { namespace, key };
};

const findSurroundingFocusScope = (namespace: string, element: Element): string | null => {
  if (!element.parentElement) return null;
  if (!element.hasAttribute(dataAttributeName)) return findSurroundingFocusScope(namespace, element.parentElement);

  const { namespace: foundNamespace, key } = parseFocusScope(element.getAttribute(dataAttributeName) as FocusScope);
  if (foundNamespace !== namespace) findSurroundingFocusScope(namespace, element.parentElement);

  return key;
};

export const useFocusScopeListener = (element: RefObject<Element>, namespace: string) => {
  const [activeFocusScope, setActiveFocusScope] = useState<string | null>(null);

  useEffect(() => {
    // Track the currently focused element
    const handleFocus: EventListenerOrEventListenerObject = (event) => {
      // NOTE: event.currentTarget is the scroll container. event.target is the actual focussed element
      // TODO: Handle the case when the focussed element is the scroll container itself.
      // Cut off the search if it hits the container element.
      setActiveFocusScope(findSurroundingFocusScope(namespace, event.target as Element));
    };

    const handleBlur: EventListenerOrEventListenerObject = (event) => setActiveFocusScope(null);

    const el = element.current;
    if (!el) return;
    el.addEventListener("focus", handleFocus, true);
    el.addEventListener("blur", handleBlur, true);

    return () => {
      el.removeEventListener("focus", handleFocus, true);
      el.removeEventListener("blur", handleBlur, true);
    };
  }, [element.current]);

  return activeFocusScope;
};

export const createFocusScopeProps = (focusScope: FocusScope) => ({ [dataAttributeName]: focusScope });
