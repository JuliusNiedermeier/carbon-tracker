import { createFocusScope, createFocusScopeProps, useFocusScopeListener } from "@/app/_utils/use-focus-scope-listener";
import { useVirtualizer as useCoreVirtualizer } from "@tanstack/react-virtual";
import { RefObject, useCallback } from "react";

type Config<Item> = {
  key: string;
  items: Item[];
  scrollElement: RefObject<Element>;
  estimateItemSize: number;
};

export const useVirtualizer = <Item>(config: Config<Item>) => {
  const virtualizer = useCoreVirtualizer({
    count: config.items.length,
    getScrollElement: () => config.scrollElement.current,
    estimateSize: () => config.estimateItemSize,
    overscan: 10,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const paddingStart = virtualItems.length ? virtualItems[0].start : 0;
  const paddingEnd = virtualItems.length ? virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end : 0;

  const virtualItemsStartIndex = virtualItems.at(0)?.index || 0;
  const virtualItemsEndIndex = virtualItems.at(-1)?.index || 0;
  const items = config.items.slice(virtualItemsStartIndex, virtualItemsEndIndex + 1);

  // Focus row preservation
  const activeItemKey = parseInt(useFocusScopeListener(config.scrollElement, config.key) || "");
  const hasPreservedItem = !isNaN(activeItemKey) && (activeItemKey < virtualItemsStartIndex || activeItemKey > virtualItemsEndIndex);
  if (hasPreservedItem) items.push(config.items[activeItemKey]);

  const createItemProps = useCallback((itemID: string) => createFocusScopeProps(createFocusScope(config.key, itemID)), [config.key]);

  return { items, preservedIndex: hasPreservedItem ? items.length - 1 : null, padding: { start: paddingStart, end: paddingEnd }, createItemProps };
};
