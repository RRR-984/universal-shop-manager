import { m as createLucideIcon, r as reactExports, j as jsxRuntimeExports, z as useComposedRefs, E as composeRefs, e as cn, c as useApi, X, F as RestaurantCategory, b as useNavigate, d as useStore, S as ShopType, f as Button, G as ClipboardList, y as Plus, v as ChevronDown, P as Package, B as Badge, H as Trash2, M as Metal, I as RestaurantCategory$1, J as StationerySubType, K as SizeSystem, O as PackType } from "./index-T7Sl8NUk.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BBh_2gy7.js";
import { u as useCallbackRef, P as Presence, a as Portal$1, c as composeEventHandlers, b as Primitive, d as createContextScope, h as hideOthers, e as dispatchDiscreteCustomEvent, f as useFocusGuards, R as ReactRemoveScroll, F as FocusScope, D as DismissableLayer, g as createSlot, i as useControllableState, j as useId, k as Dialog, l as DialogContent, m as DialogHeader, n as DialogTitle } from "./dialog-BrfMriH9.js";
import { u as useDirection, c as createCollection } from "./index-BubkxtTJ.js";
import { R as Root2$1, A as Anchor, c as createPopperScope, C as Content, a as Arrow } from "./index-BrXXnJLi.js";
import { I as Item, c as createRovingFocusGroupScope, R as Root, P as Pen } from "./index-BfynfCWZ.js";
import { I as Input } from "./input-BdvWVqhx.js";
import { L as Label$1 } from "./label-iEAq-4xT.js";
import { u as ue } from "./index-BGtHL4Us.js";
import { g as getCurrencyConfig, f as formatCurrency } from "./currency-KTzMGZJt.js";
import { B as BUILDING_MATERIAL_SHOP_TYPE, F as FRUITS_VEGETABLES_SHOP_TYPE } from "./index-GRrUhcmE.js";
import { S as Search } from "./search-DdYa4jFs.js";
import { T as TrendingUp } from "./trending-up-rg0bVzyj.js";
import { T as TriangleAlert } from "./triangle-alert-DXvOFf3p.js";
import { R as RefreshCw } from "./refresh-cw-D8Z5f9LZ.js";
import { C as CircleAlert } from "./circle-alert-D0XN7hmz.js";
import { S as ScanLine, C as Camera } from "./scan-line-D3DjyTfJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M3 5v14", key: "1nt18q" }],
  ["path", { d: "M8 5v14", key: "1ybrkv" }],
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "M17 5v14", key: "ycjyhj" }],
  ["path", { d: "M21 5v14", key: "nzette" }]
];
const Barcode = createLucideIcon("barcode", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
];
const EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
  ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9", key: "19pyzm" }]
];
const GitCompare = createLucideIcon("git-compare", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
var SELECTION_KEYS = ["Enter", " "];
var FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
var LAST_KEYS = ["ArrowUp", "PageDown", "End"];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, "ArrowRight"],
  rtl: [...SELECTION_KEYS, "ArrowLeft"]
};
var SUB_CLOSE_KEYS = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
};
var MENU_NAME = "Menu";
var [Collection, useCollection, createCollectionScope] = createCollection(MENU_NAME);
var [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
  createCollectionScope,
  createPopperScope,
  createRovingFocusGroupScope
]);
var usePopperScope = createPopperScope();
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
var Menu = (props) => {
  const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
  const popperScope = usePopperScope(__scopeMenu);
  const [content, setContent] = reactExports.useState(null);
  const isUsingKeyboardRef = reactExports.useRef(false);
  const handleOpenChange = useCallbackRef(onOpenChange);
  const direction = useDirection(dir);
  reactExports.useEffect(() => {
    const handleKeyDown = () => {
      isUsingKeyboardRef.current = true;
      document.addEventListener("pointerdown", handlePointer, { capture: true, once: true });
      document.addEventListener("pointermove", handlePointer, { capture: true, once: true });
    };
    const handlePointer = () => isUsingKeyboardRef.current = false;
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("pointerdown", handlePointer, { capture: true });
      document.removeEventListener("pointermove", handlePointer, { capture: true });
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuProvider,
    {
      scope: __scopeMenu,
      open,
      onOpenChange: handleOpenChange,
      content,
      onContentChange: setContent,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuRootProvider,
        {
          scope: __scopeMenu,
          onClose: reactExports.useCallback(() => handleOpenChange(false), [handleOpenChange]),
          isUsingKeyboardRef,
          dir: direction,
          modal,
          children
        }
      )
    }
  ) });
};
Menu.displayName = MENU_NAME;
var ANCHOR_NAME = "MenuAnchor";
var MenuAnchor = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, ...anchorProps } = props;
    const popperScope = usePopperScope(__scopeMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
  }
);
MenuAnchor.displayName = ANCHOR_NAME;
var PORTAL_NAME$1 = "MenuPortal";
var [PortalProvider, usePortalContext] = createMenuContext(PORTAL_NAME$1, {
  forceMount: void 0
});
var MenuPortal = (props) => {
  const { __scopeMenu, forceMount, children, container } = props;
  const context = useMenuContext(PORTAL_NAME$1, __scopeMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeMenu, forceMount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children }) }) });
};
MenuPortal.displayName = PORTAL_NAME$1;
var CONTENT_NAME$1 = "MenuContent";
var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME$1);
var MenuContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeMenu, children: rootContext.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRootContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRootContentNonModal, { ...contentProps, ref: forwardedRef }) }) }) });
  }
);
var MenuRootContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    reactExports.useEffect(() => {
      const content = ref.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: context.open,
        disableOutsideScroll: true,
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault(),
          { checkForDefaultPrevented: false }
        ),
        onDismiss: () => context.onOpenChange(false)
      }
    );
  }
);
var MenuRootContentNonModal = reactExports.forwardRef((props, forwardedRef) => {
  const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuContentImpl,
    {
      ...props,
      ref: forwardedRef,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      disableOutsideScroll: false,
      onDismiss: () => context.onOpenChange(false)
    }
  );
});
var Slot = createSlot("MenuContent.ScrollLock");
var MenuContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeMenu,
      loop = false,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEntryFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      disableOutsideScroll,
      ...contentProps
    } = props;
    const context = useMenuContext(CONTENT_NAME$1, __scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME$1, __scopeMenu);
    const popperScope = usePopperScope(__scopeMenu);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
    const getItems = useCollection(__scopeMenu);
    const [currentItemId, setCurrentItemId] = reactExports.useState(null);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
    const timerRef = reactExports.useRef(0);
    const searchRef = reactExports.useRef("");
    const pointerGraceTimerRef = reactExports.useRef(0);
    const pointerGraceIntentRef = reactExports.useRef(null);
    const pointerDirRef = reactExports.useRef("right");
    const lastPointerXRef = reactExports.useRef(0);
    const ScrollLockWrapper = disableOutsideScroll ? ReactRemoveScroll : reactExports.Fragment;
    const scrollLockWrapperProps = disableOutsideScroll ? { as: Slot, allowPinchZoom: true } : void 0;
    const handleTypeaheadSearch = (key) => {
      var _a, _b;
      const search = searchRef.current + key;
      const items = getItems().filter((item) => !item.disabled);
      const currentItem = document.activeElement;
      const currentMatch = (_a = items.find((item) => item.ref.current === currentItem)) == null ? void 0 : _a.textValue;
      const values = items.map((item) => item.textValue);
      const nextMatch = getNextMatch(values, search, currentMatch);
      const newItem = (_b = items.find((item) => item.textValue === nextMatch)) == null ? void 0 : _b.ref.current;
      (function updateSearch(value) {
        searchRef.current = value;
        window.clearTimeout(timerRef.current);
        if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
      })(search);
      if (newItem) {
        setTimeout(() => newItem.focus());
      }
    };
    reactExports.useEffect(() => {
      return () => window.clearTimeout(timerRef.current);
    }, []);
    useFocusGuards();
    const isPointerMovingToSubmenu = reactExports.useCallback((event) => {
      var _a, _b;
      const isMovingTowards = pointerDirRef.current === ((_a = pointerGraceIntentRef.current) == null ? void 0 : _a.side);
      return isMovingTowards && isPointerInGraceArea(event, (_b = pointerGraceIntentRef.current) == null ? void 0 : _b.area);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuContentProvider,
      {
        scope: __scopeMenu,
        searchRef,
        onItemEnter: reactExports.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) event.preventDefault();
          },
          [isPointerMovingToSubmenu]
        ),
        onItemLeave: reactExports.useCallback(
          (event) => {
            var _a;
            if (isPointerMovingToSubmenu(event)) return;
            (_a = contentRef.current) == null ? void 0 : _a.focus();
            setCurrentItemId(null);
          },
          [isPointerMovingToSubmenu]
        ),
        onTriggerLeave: reactExports.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) event.preventDefault();
          },
          [isPointerMovingToSubmenu]
        ),
        pointerGraceTimerRef,
        onPointerGraceIntentChange: reactExports.useCallback((intent) => {
          pointerGraceIntentRef.current = intent;
        }, []),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollLockWrapper, { ...scrollLockWrapperProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FocusScope,
          {
            asChild: true,
            trapped: trapFocus,
            onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = contentRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onUnmountAutoFocus: onCloseAutoFocus,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DismissableLayer,
              {
                asChild: true,
                disableOutsidePointerEvents,
                onEscapeKeyDown,
                onPointerDownOutside,
                onFocusOutside,
                onInteractOutside,
                onDismiss,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Root,
                  {
                    asChild: true,
                    ...rovingFocusGroupScope,
                    dir: rootContext.dir,
                    orientation: "vertical",
                    loop,
                    currentTabStopId: currentItemId,
                    onCurrentTabStopIdChange: setCurrentItemId,
                    onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
                      if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
                    }),
                    preventScrollOnEntryFocus: true,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Content,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": getOpenState(context.open),
                        "data-radix-menu-content": "",
                        dir: rootContext.dir,
                        ...popperScope,
                        ...contentProps,
                        ref: composedRefs,
                        style: { outline: "none", ...contentProps.style },
                        onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                          const target = event.target;
                          const isKeyDownInside = target.closest("[data-radix-menu-content]") === event.currentTarget;
                          const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                          const isCharacterKey = event.key.length === 1;
                          if (isKeyDownInside) {
                            if (event.key === "Tab") event.preventDefault();
                            if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
                          }
                          const content = contentRef.current;
                          if (event.target !== content) return;
                          if (!FIRST_LAST_KEYS.includes(event.key)) return;
                          event.preventDefault();
                          const items = getItems().filter((item) => !item.disabled);
                          const candidateNodes = items.map((item) => item.ref.current);
                          if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
                          focusFirst(candidateNodes);
                        }),
                        onBlur: composeEventHandlers(props.onBlur, (event) => {
                          if (!event.currentTarget.contains(event.target)) {
                            window.clearTimeout(timerRef.current);
                            searchRef.current = "";
                          }
                        }),
                        onPointerMove: composeEventHandlers(
                          props.onPointerMove,
                          whenMouse((event) => {
                            const target = event.target;
                            const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
                            if (event.currentTarget.contains(target) && pointerXHasChanged) {
                              const newDir = event.clientX > lastPointerXRef.current ? "right" : "left";
                              pointerDirRef.current = newDir;
                              lastPointerXRef.current = event.clientX;
                            }
                          })
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
MenuContent.displayName = CONTENT_NAME$1;
var GROUP_NAME$1 = "MenuGroup";
var MenuGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, ...groupProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { role: "group", ...groupProps, ref: forwardedRef });
  }
);
MenuGroup.displayName = GROUP_NAME$1;
var LABEL_NAME$1 = "MenuLabel";
var MenuLabel = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, ...labelProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...labelProps, ref: forwardedRef });
  }
);
MenuLabel.displayName = LABEL_NAME$1;
var ITEM_NAME$1 = "MenuItem";
var ITEM_SELECT = "menu.itemSelect";
var MenuItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { disabled = false, onSelect, ...itemProps } = props;
    const ref = reactExports.useRef(null);
    const rootContext = useMenuRootContext(ITEM_NAME$1, props.__scopeMenu);
    const contentContext = useMenuContentContext(ITEM_NAME$1, props.__scopeMenu);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const isPointerDownRef = reactExports.useRef(false);
    const handleSelect = () => {
      const menuItem = ref.current;
      if (!disabled && menuItem) {
        const itemSelectEvent = new CustomEvent(ITEM_SELECT, { bubbles: true, cancelable: true });
        menuItem.addEventListener(ITEM_SELECT, (event) => onSelect == null ? void 0 : onSelect(event), { once: true });
        dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
        if (itemSelectEvent.defaultPrevented) {
          isPointerDownRef.current = false;
        } else {
          rootContext.onClose();
        }
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItemImpl,
      {
        ...itemProps,
        ref: composedRefs,
        disabled,
        onClick: composeEventHandlers(props.onClick, handleSelect),
        onPointerDown: (event) => {
          var _a;
          (_a = props.onPointerDown) == null ? void 0 : _a.call(props, event);
          isPointerDownRef.current = true;
        },
        onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
          var _a;
          if (!isPointerDownRef.current) (_a = event.currentTarget) == null ? void 0 : _a.click();
        }),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          const isTypingAhead = contentContext.searchRef.current !== "";
          if (disabled || isTypingAhead && event.key === " ") return;
          if (SELECTION_KEYS.includes(event.key)) {
            event.currentTarget.click();
            event.preventDefault();
          }
        })
      }
    );
  }
);
MenuItem.displayName = ITEM_NAME$1;
var MenuItemImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
    const contentContext = useMenuContentContext(ITEM_NAME$1, __scopeMenu);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const [isFocused, setIsFocused] = reactExports.useState(false);
    const [textContent, setTextContent] = reactExports.useState("");
    reactExports.useEffect(() => {
      const menuItem = ref.current;
      if (menuItem) {
        setTextContent((menuItem.textContent ?? "").trim());
      }
    }, [itemProps.children]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeMenu,
        disabled,
        textValue: textValue ?? textContent,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { asChild: true, ...rovingFocusGroupScope, focusable: !disabled, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "menuitem",
            "data-highlighted": isFocused ? "" : void 0,
            "aria-disabled": disabled || void 0,
            "data-disabled": disabled ? "" : void 0,
            ...itemProps,
            ref: composedRefs,
            onPointerMove: composeEventHandlers(
              props.onPointerMove,
              whenMouse((event) => {
                if (disabled) {
                  contentContext.onItemLeave(event);
                } else {
                  contentContext.onItemEnter(event);
                  if (!event.defaultPrevented) {
                    const item = event.currentTarget;
                    item.focus({ preventScroll: true });
                  }
                }
              })
            ),
            onPointerLeave: composeEventHandlers(
              props.onPointerLeave,
              whenMouse((event) => contentContext.onItemLeave(event))
            ),
            onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
            onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
          }
        ) })
      }
    );
  }
);
var CHECKBOX_ITEM_NAME$1 = "MenuCheckboxItem";
var MenuCheckboxItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicatorProvider, { scope: props.__scopeMenu, checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItem,
      {
        role: "menuitemcheckbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        ...checkboxItemProps,
        ref: forwardedRef,
        "data-state": getCheckedState(checked),
        onSelect: composeEventHandlers(
          checkboxItemProps.onSelect,
          () => onCheckedChange == null ? void 0 : onCheckedChange(isIndeterminate(checked) ? true : !checked),
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME$1;
var RADIO_GROUP_NAME$1 = "MenuRadioGroup";
var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(
  RADIO_GROUP_NAME$1,
  { value: void 0, onValueChange: () => {
  } }
);
var MenuRadioGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { value, onValueChange, ...groupProps } = props;
    const handleValueChange = useCallbackRef(onValueChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupProvider, { scope: props.__scopeMenu, value, onValueChange: handleValueChange, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MenuGroup, { ...groupProps, ref: forwardedRef }) });
  }
);
MenuRadioGroup.displayName = RADIO_GROUP_NAME$1;
var RADIO_ITEM_NAME$1 = "MenuRadioItem";
var MenuRadioItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { value, ...radioItemProps } = props;
    const context = useRadioGroupContext(RADIO_ITEM_NAME$1, props.__scopeMenu);
    const checked = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicatorProvider, { scope: props.__scopeMenu, checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItem,
      {
        role: "menuitemradio",
        "aria-checked": checked,
        ...radioItemProps,
        ref: forwardedRef,
        "data-state": getCheckedState(checked),
        onSelect: composeEventHandlers(
          radioItemProps.onSelect,
          () => {
            var _a;
            return (_a = context.onValueChange) == null ? void 0 : _a.call(context, value);
          },
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
MenuRadioItem.displayName = RADIO_ITEM_NAME$1;
var ITEM_INDICATOR_NAME = "MenuItemIndicator";
var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(
  ITEM_INDICATOR_NAME,
  { checked: false }
);
var MenuItemIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
    const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            ...itemIndicatorProps,
            ref: forwardedRef,
            "data-state": getCheckedState(indicatorContext.checked)
          }
        )
      }
    );
  }
);
MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SEPARATOR_NAME$1 = "MenuSeparator";
var MenuSeparator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, ...separatorProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...separatorProps,
        ref: forwardedRef
      }
    );
  }
);
MenuSeparator.displayName = SEPARATOR_NAME$1;
var ARROW_NAME$1 = "MenuArrow";
var MenuArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeMenu, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
MenuArrow.displayName = ARROW_NAME$1;
var SUB_NAME = "MenuSub";
var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
var SUB_TRIGGER_NAME$1 = "MenuSubTrigger";
var MenuSubTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useMenuContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const rootContext = useMenuRootContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const subContext = useMenuSubContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const contentContext = useMenuContentContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const openTimerRef = reactExports.useRef(null);
    const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
    const scope = { __scopeMenu: props.__scopeMenu };
    const clearOpenTimer = reactExports.useCallback(() => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }, []);
    reactExports.useEffect(() => clearOpenTimer, [clearOpenTimer]);
    reactExports.useEffect(() => {
      const pointerGraceTimer = pointerGraceTimerRef.current;
      return () => {
        window.clearTimeout(pointerGraceTimer);
        onPointerGraceIntentChange(null);
      };
    }, [pointerGraceTimerRef, onPointerGraceIntentChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MenuAnchor, { asChild: true, ...scope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItemImpl,
      {
        id: subContext.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": context.open,
        "aria-controls": subContext.contentId,
        "data-state": getOpenState(context.open),
        ...props,
        ref: composeRefs(forwardedRef, subContext.onTriggerChange),
        onClick: (event) => {
          var _a;
          (_a = props.onClick) == null ? void 0 : _a.call(props, event);
          if (props.disabled || event.defaultPrevented) return;
          event.currentTarget.focus();
          if (!context.open) context.onOpenChange(true);
        },
        onPointerMove: composeEventHandlers(
          props.onPointerMove,
          whenMouse((event) => {
            contentContext.onItemEnter(event);
            if (event.defaultPrevented) return;
            if (!props.disabled && !context.open && !openTimerRef.current) {
              contentContext.onPointerGraceIntentChange(null);
              openTimerRef.current = window.setTimeout(() => {
                context.onOpenChange(true);
                clearOpenTimer();
              }, 100);
            }
          })
        ),
        onPointerLeave: composeEventHandlers(
          props.onPointerLeave,
          whenMouse((event) => {
            var _a, _b;
            clearOpenTimer();
            const contentRect = (_a = context.content) == null ? void 0 : _a.getBoundingClientRect();
            if (contentRect) {
              const side = (_b = context.content) == null ? void 0 : _b.dataset.side;
              const rightSide = side === "right";
              const bleed = rightSide ? -5 : 5;
              const contentNearEdge = contentRect[rightSide ? "left" : "right"];
              const contentFarEdge = contentRect[rightSide ? "right" : "left"];
              contentContext.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: event.clientX + bleed, y: event.clientY },
                  { x: contentNearEdge, y: contentRect.top },
                  { x: contentFarEdge, y: contentRect.top },
                  { x: contentFarEdge, y: contentRect.bottom },
                  { x: contentNearEdge, y: contentRect.bottom }
                ],
                side
              });
              window.clearTimeout(pointerGraceTimerRef.current);
              pointerGraceTimerRef.current = window.setTimeout(
                () => contentContext.onPointerGraceIntentChange(null),
                300
              );
            } else {
              contentContext.onTriggerLeave(event);
              if (event.defaultPrevented) return;
              contentContext.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          var _a;
          const isTypingAhead = contentContext.searchRef.current !== "";
          if (props.disabled || isTypingAhead && event.key === " ") return;
          if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
            context.onOpenChange(true);
            (_a = context.content) == null ? void 0 : _a.focus();
            event.preventDefault();
          }
        })
      }
    ) });
  }
);
MenuSubTrigger.displayName = SUB_TRIGGER_NAME$1;
var SUB_CONTENT_NAME$1 = "MenuSubContent";
var MenuSubContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
    const { forceMount = portalContext.forceMount, ...subContentProps } = props;
    const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
    const subContext = useMenuSubContext(SUB_CONTENT_NAME$1, props.__scopeMenu);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuContentImpl,
      {
        id: subContext.contentId,
        "aria-labelledby": subContext.triggerId,
        ...subContentProps,
        ref: composedRefs,
        align: "start",
        side: rootContext.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: false,
        disableOutsideScroll: false,
        trapFocus: false,
        onOpenAutoFocus: (event) => {
          var _a;
          if (rootContext.isUsingKeyboardRef.current) (_a = ref.current) == null ? void 0 : _a.focus();
          event.preventDefault();
        },
        onCloseAutoFocus: (event) => event.preventDefault(),
        onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
          if (event.target !== subContext.trigger) context.onOpenChange(false);
        }),
        onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
          rootContext.onClose();
          event.preventDefault();
        }),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          var _a;
          const isKeyDownInside = event.currentTarget.contains(event.target);
          const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
          if (isKeyDownInside && isCloseKey) {
            context.onOpenChange(false);
            (_a = subContext.trigger) == null ? void 0 : _a.focus();
            event.preventDefault();
          }
        })
      }
    ) }) }) });
  }
);
MenuSubContent.displayName = SUB_CONTENT_NAME$1;
function getOpenState(open) {
  return open ? "open" : "closed";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getCheckedState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst(candidates) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus();
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find(
    (value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextMatch !== currentMatch ? nextMatch : void 0;
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ii = polygon[i];
    const jj = polygon[j];
    const xi = ii.x;
    const yi = ii.y;
    const xj = jj.x;
    const yj = jj.y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function isPointerInGraceArea(event, area) {
  if (!area) return false;
  const cursorPos = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursorPos, area);
}
function whenMouse(handler) {
  return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
var Root3 = Menu;
var Anchor2 = MenuAnchor;
var Portal = MenuPortal;
var Content2$1 = MenuContent;
var Group = MenuGroup;
var Label = MenuLabel;
var Item2$1 = MenuItem;
var CheckboxItem = MenuCheckboxItem;
var RadioGroup = MenuRadioGroup;
var RadioItem = MenuRadioItem;
var ItemIndicator = MenuItemIndicator;
var Separator = MenuSeparator;
var Arrow2 = MenuArrow;
var SubTrigger = MenuSubTrigger;
var SubContent = MenuSubContent;
var DROPDOWN_MENU_NAME = "DropdownMenu";
var [createDropdownMenuContext] = createContextScope(
  DROPDOWN_MENU_NAME,
  [createMenuScope]
);
var useMenuScope = createMenuScope();
var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
var DropdownMenu$1 = (props) => {
  const {
    __scopeDropdownMenu,
    children,
    dir,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  const triggerRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DROPDOWN_MENU_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DropdownMenuProvider,
    {
      scope: __scopeDropdownMenu,
      triggerId: useId(),
      triggerRef,
      contentId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root3, { ...menuScope, open, onOpenChange: setOpen, dir, modal, children })
    }
  );
};
DropdownMenu$1.displayName = DROPDOWN_MENU_NAME;
var TRIGGER_NAME = "DropdownMenuTrigger";
var DropdownMenuTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
    const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor2, { asChild: true, ...menuScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        id: context.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": context.open,
        "aria-controls": context.open ? context.contentId : void 0,
        "data-state": context.open ? "open" : "closed",
        "data-disabled": disabled ? "" : void 0,
        disabled,
        ...triggerProps,
        ref: composeRefs(forwardedRef, context.triggerRef),
        onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
          if (!disabled && event.button === 0 && event.ctrlKey === false) {
            context.onOpenToggle();
            if (!context.open) event.preventDefault();
          }
        }),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          if (disabled) return;
          if (["Enter", " "].includes(event.key)) context.onOpenToggle();
          if (event.key === "ArrowDown") context.onOpenChange(true);
          if (["Enter", " ", "ArrowDown"].includes(event.key)) event.preventDefault();
        })
      }
    ) });
  }
);
DropdownMenuTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DropdownMenuPortal";
var DropdownMenuPortal = (props) => {
  const { __scopeDropdownMenu, ...portalProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...menuScope, ...portalProps });
};
DropdownMenuPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "DropdownMenuContent";
var DropdownMenuContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, ...contentProps } = props;
    const context = useDropdownMenuContext(CONTENT_NAME, __scopeDropdownMenu);
    const menuScope = useMenuScope(__scopeDropdownMenu);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2$1,
      {
        id: context.contentId,
        "aria-labelledby": context.triggerId,
        ...menuScope,
        ...contentProps,
        ref: forwardedRef,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          if (!hasInteractedOutsideRef.current) (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
          hasInteractedOutsideRef.current = false;
          event.preventDefault();
        }),
        onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
        }),
        style: {
          ...props.style,
          // re-namespace exposed content custom properties
          ...{
            "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
            "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
            "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
          }
        }
      }
    );
  }
);
DropdownMenuContent$1.displayName = CONTENT_NAME;
var GROUP_NAME = "DropdownMenuGroup";
var DropdownMenuGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, ...groupProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { ...menuScope, ...groupProps, ref: forwardedRef });
  }
);
DropdownMenuGroup.displayName = GROUP_NAME;
var LABEL_NAME = "DropdownMenuLabel";
var DropdownMenuLabel = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, ...labelProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { ...menuScope, ...labelProps, ref: forwardedRef });
  }
);
DropdownMenuLabel.displayName = LABEL_NAME;
var ITEM_NAME = "DropdownMenuItem";
var DropdownMenuItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, ...itemProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Item2$1, { ...menuScope, ...itemProps, ref: forwardedRef });
  }
);
DropdownMenuItem$1.displayName = ITEM_NAME;
var CHECKBOX_ITEM_NAME = "DropdownMenuCheckboxItem";
var DropdownMenuCheckboxItem = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...checkboxItemProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxItem, { ...menuScope, ...checkboxItemProps, ref: forwardedRef });
});
DropdownMenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME;
var RADIO_GROUP_NAME = "DropdownMenuRadioGroup";
var DropdownMenuRadioGroup = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...radioGroupProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup, { ...menuScope, ...radioGroupProps, ref: forwardedRef });
});
DropdownMenuRadioGroup.displayName = RADIO_GROUP_NAME;
var RADIO_ITEM_NAME = "DropdownMenuRadioItem";
var DropdownMenuRadioItem = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...radioItemProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioItem, { ...menuScope, ...radioItemProps, ref: forwardedRef });
});
DropdownMenuRadioItem.displayName = RADIO_ITEM_NAME;
var INDICATOR_NAME = "DropdownMenuItemIndicator";
var DropdownMenuItemIndicator = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { ...menuScope, ...itemIndicatorProps, ref: forwardedRef });
});
DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
var SEPARATOR_NAME = "DropdownMenuSeparator";
var DropdownMenuSeparator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...separatorProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { ...menuScope, ...separatorProps, ref: forwardedRef });
});
DropdownMenuSeparator$1.displayName = SEPARATOR_NAME;
var ARROW_NAME = "DropdownMenuArrow";
var DropdownMenuArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDropdownMenu, ...arrowProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow2, { ...menuScope, ...arrowProps, ref: forwardedRef });
  }
);
DropdownMenuArrow.displayName = ARROW_NAME;
var SUB_TRIGGER_NAME = "DropdownMenuSubTrigger";
var DropdownMenuSubTrigger = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...subTriggerProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SubTrigger, { ...menuScope, ...subTriggerProps, ref: forwardedRef });
});
DropdownMenuSubTrigger.displayName = SUB_TRIGGER_NAME;
var SUB_CONTENT_NAME = "DropdownMenuSubContent";
var DropdownMenuSubContent = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...subContentProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SubContent,
    {
      ...menuScope,
      ...subContentProps,
      ref: forwardedRef,
      style: {
        ...props.style,
        // re-namespace exposed content custom properties
        ...{
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    }
  );
});
DropdownMenuSubContent.displayName = SUB_CONTENT_NAME;
var Root2 = DropdownMenu$1;
var Trigger = DropdownMenuTrigger$1;
var Portal2 = DropdownMenuPortal;
var Content2 = DropdownMenuContent$1;
var Item2 = DropdownMenuItem$1;
var Separator2 = DropdownMenuSeparator$1;
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator2,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
const QUICK_MENU_CATEGORIES = [
  {
    label: "Breads & Sides",
    items: [
      { name: "Roti", unit: "Piece", category: "Veg" },
      { name: "Butter Roti", unit: "Piece", category: "Veg" },
      { name: "Tandoori Roti", unit: "Piece", category: "Veg" },
      { name: "Rayta", unit: "Bowl", category: "Veg" },
      { name: "Green Salad", unit: "Plate", category: "Veg" },
      { name: "Papad", unit: "Piece", category: "Veg" }
    ]
  },
  {
    label: "Beverages",
    items: [
      { name: "Water Bottle", unit: "Bottle", category: "Veg" },
      { name: "Soda Bottle", unit: "Bottle", category: "Veg" },
      { name: "Cold Drink", unit: "Glass", category: "Veg" },
      { name: "Tea", unit: "Glass", category: "Veg" },
      { name: "Coffee", unit: "Glass", category: "Veg" },
      { name: "Lassi", unit: "Glass", category: "Veg" },
      { name: "Fresh Juice", unit: "Glass", category: "Veg" },
      { name: "Beer", unit: "Glass", category: "NonVeg" }
    ]
  },
  {
    label: "Starters",
    items: [
      { name: "Paneer Tikka", unit: "Plate", category: "Veg" },
      { name: "Veg Spring Roll", unit: "Plate", category: "Veg" },
      { name: "Mushroom Tikka", unit: "Plate", category: "Veg" },
      { name: "Aloo Tikki", unit: "Plate", category: "Veg" },
      { name: "Chicken Tikka", unit: "Plate", category: "NonVeg" },
      { name: "Fish Fry", unit: "Plate", category: "NonVeg" },
      { name: "Egg Roll", unit: "Plate", category: "NonVeg" }
    ]
  },
  {
    label: "Main Course",
    items: [
      { name: "Dal Makhani", unit: "Bowl", category: "Veg" },
      { name: "Paneer Butter Masala", unit: "Bowl", category: "Veg" },
      { name: "Veg Biryani", unit: "Plate", category: "Veg" },
      { name: "Shahi Paneer", unit: "Bowl", category: "Veg" },
      { name: "Chole", unit: "Bowl", category: "Veg" },
      { name: "Chicken Curry", unit: "Bowl", category: "NonVeg" },
      { name: "Mutton Biryani", unit: "Plate", category: "NonVeg" },
      { name: "Egg Curry", unit: "Bowl", category: "NonVeg" },
      { name: "Fish Curry", unit: "Bowl", category: "NonVeg" }
    ]
  },
  {
    label: "Rice & Bread",
    items: [
      { name: "Steamed Rice", unit: "Plate", category: "Veg" },
      { name: "Jeera Rice", unit: "Plate", category: "Veg" },
      { name: "Naan", unit: "Piece", category: "Veg" },
      { name: "Paratha", unit: "Piece", category: "Veg" },
      { name: "Chapati", unit: "Piece", category: "Veg" },
      { name: "Poori", unit: "Piece", category: "Veg" },
      { name: "Bhatura", unit: "Piece", category: "Veg" }
    ]
  },
  {
    label: "Desserts",
    items: [
      { name: "Gulab Jamun", unit: "Piece", category: "Veg" },
      { name: "Ice Cream", unit: "Bowl", category: "Veg" },
      { name: "Kheer", unit: "Bowl", category: "Veg" },
      { name: "Rasgulla", unit: "Piece", category: "Veg" },
      { name: "Jalebi", unit: "Plate", category: "Veg" },
      { name: "Halwa", unit: "Bowl", category: "Veg" }
    ]
  }
];
function RestaurantQuickMenuModal({
  shopId,
  shopType,
  onClose,
  onProductsAdded,
  products,
  onUpdateProduct
}) {
  const { createProduct } = useApi();
  const [activeTab, setActiveTab] = reactExports.useState("add");
  const [activeCategory, setActiveCategory] = reactExports.useState(0);
  const [selectedItems, setSelectedItems] = reactExports.useState({});
  const [saving, setSaving] = reactExports.useState(false);
  const [savedCount, setSavedCount] = reactExports.useState(0);
  const [priceErrors, setPriceErrors] = reactExports.useState({});
  const [stockErrors, setStockErrors] = reactExports.useState({});
  const [editSearch, setEditSearch] = reactExports.useState("");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [editState, setEditState] = reactExports.useState(null);
  const [editSaving, setEditSaving] = reactExports.useState(false);
  const [editError, setEditError] = reactExports.useState(null);
  const currentCategory = QUICK_MENU_CATEGORIES[activeCategory];
  const itemKey = (item) => `${item.name}||${item.unit}||${item.category}`;
  const toggleItem = (item) => {
    const key = itemKey(item);
    setSelectedItems((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = { ...item, price: "", stock: "" };
      }
      return next;
    });
  };
  const selectAll = () => {
    setSelectedItems((prev) => {
      const next = { ...prev };
      for (const item of currentCategory.items) {
        const key = itemKey(item);
        if (!next[key]) next[key] = { ...item, price: "", stock: "" };
      }
      return next;
    });
  };
  const clearAll = () => setSelectedItems({});
  const updateField = (key, field, value) => {
    setSelectedItems((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
    if (field === "price")
      setPriceErrors((p) => {
        const n = { ...p };
        delete n[key];
        return n;
      });
    if (field === "stock")
      setStockErrors((p) => {
        const n = { ...p };
        delete n[key];
        return n;
      });
  };
  const selectedList = Object.entries(selectedItems).map(([key, item]) => ({
    key,
    ...item
  }));
  const handleSave = async () => {
    if (selectedList.length === 0) return;
    const newPE = {};
    const newSE = {};
    for (const item of selectedList) {
      if (!item.price || Number.isNaN(Number.parseFloat(item.price)) || Number.parseFloat(item.price) < 0)
        newPE[item.key] = true;
      if (!item.stock || Number.isNaN(Number.parseInt(item.stock)) || Number.parseInt(item.stock) < 0)
        newSE[item.key] = true;
    }
    if (Object.keys(newPE).length > 0 || Object.keys(newSE).length > 0) {
      setPriceErrors(newPE);
      setStockErrors(newSE);
      return;
    }
    setSaving(true);
    let count = 0;
    for (const item of selectedList) {
      try {
        const restCat = item.category === "NonVeg" ? RestaurantCategory.NonVeg : RestaurantCategory.Veg;
        const price = Number.parseFloat(item.price);
        const stock = Number.parseInt(item.stock);
        await createProduct({
          shopId,
          shopType,
          name: item.name,
          retailPrice: price,
          wholesalePrice: price,
          unit: item.unit,
          isActive: true,
          minStock: 0,
          stock,
          costPrice: 0,
          category: item.category,
          engineFields: {
            __kind__: "Restaurant",
            Restaurant: { category: restCat }
          }
        });
        count++;
      } catch (_e) {
      }
    }
    setSaving(false);
    setSavedCount(count);
    onProductsAdded();
    setTimeout(onClose, 900);
  };
  const filteredProducts = (products ?? []).filter(
    (p) => p.name.toLowerCase().includes(editSearch.toLowerCase())
  );
  const handleEditOpen = (p) => {
    setExpandedId(p.id);
    setEditState({
      name: p.name,
      price: String(p.retailPrice),
      stock: String(p.stock),
      unit: p.unit,
      category: p.category
    });
    setEditError(null);
  };
  const handleEditCancel = () => {
    setExpandedId(null);
    setEditState(null);
    setEditError(null);
  };
  const handleEditSave = async (p) => {
    if (!editState || !onUpdateProduct) return;
    setEditSaving(true);
    setEditError(null);
    try {
      await onUpdateProduct({
        id: p.id,
        shopId: p.shopId,
        name: editState.name,
        retailPrice: Number.parseFloat(editState.price) || 0,
        wholesalePrice: p.wholesalePrice,
        costPrice: p.costPrice,
        unit: editState.unit,
        category: editState.category,
        stock: Number.parseInt(editState.stock) || 0,
        minStock: p.minStock,
        isActive: p.isActive,
        engineFields: p.engineFields,
        barcode: p.barcode
      });
      setExpandedId(null);
      setEditState(null);
    } catch (_e) {
      setEditError("Save failed. Please try again.");
    } finally {
      setEditSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-2 sm:p-4 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-lg my-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Quick Menu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Select items, set price & stock, save all at once" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "text-gray-400 hover:text-gray-700 text-2xl leading-none font-light",
          "aria-label": "Close",
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "quickmenu.add_tab",
          onClick: () => setActiveTab("add"),
          className: `flex-1 py-2.5 text-sm font-medium transition-colors ${activeTab === "add" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`,
          children: "Add Items"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "quickmenu.edit_tab",
          onClick: () => setActiveTab("edit"),
          className: `flex-1 py-2.5 text-sm font-medium transition-colors ${activeTab === "edit" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`,
          children: "Edit Menu"
        }
      )
    ] }),
    activeTab === "edit" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          "data-ocid": "quickmenu.edit_search_input",
          placeholder: "Search items...",
          value: editSearch,
          onChange: (e) => setEditSearch(e.target.value),
          className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        }
      ),
      filteredProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-center text-sm text-gray-400 py-6",
          "data-ocid": "quickmenu.edit_empty_state",
          children: (products ?? []).length === 0 ? "No products added yet" : "No matching items found"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-96 overflow-y-auto pr-1", children: filteredProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `quickmenu.edit_item.${p.id}`,
          className: "border border-gray-200 rounded-lg overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-800 truncate", children: p.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
                  "₹",
                  p.retailPrice,
                  " · Stock: ",
                  p.stock,
                  " · ",
                  p.unit,
                  p.category ? ` · ${p.category}` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `quickmenu.edit_button.${p.id}`,
                  onClick: () => expandedId === p.id ? handleEditCancel() : handleEditOpen(p),
                  className: "p-1.5 rounded-md text-indigo-600 hover:bg-indigo-50 flex-shrink-0",
                  "aria-label": "Edit",
                  children: expandedId === p.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                }
              )
            ] }),
            expandedId === p.id && editState && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-100 bg-gray-50 px-3 py-3 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: `edit-name-${p.id}`,
                      className: "text-xs text-gray-500 mb-0.5 block",
                      children: "Name"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `edit-name-${p.id}`,
                      type: "text",
                      "data-ocid": `quickmenu.edit_name_input.${p.id}`,
                      value: editState.name,
                      onChange: (e) => setEditState(
                        (s) => s ? { ...s, name: e.target.value } : s
                      ),
                      className: "w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: `edit-price-${p.id}`,
                      className: "text-xs text-gray-500 mb-0.5 block",
                      children: "Price"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `edit-price-${p.id}`,
                      type: "number",
                      min: "0",
                      step: "0.01",
                      "data-ocid": `quickmenu.edit_price_input.${p.id}`,
                      value: editState.price,
                      onChange: (e) => setEditState(
                        (s) => s ? { ...s, price: e.target.value } : s
                      ),
                      className: "w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: `edit-stock-${p.id}`,
                      className: "text-xs text-gray-500 mb-0.5 block",
                      children: "Stock"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `edit-stock-${p.id}`,
                      type: "number",
                      min: "0",
                      step: "1",
                      "data-ocid": `quickmenu.edit_stock_input.${p.id}`,
                      value: editState.stock,
                      onChange: (e) => setEditState(
                        (s) => s ? { ...s, stock: e.target.value } : s
                      ),
                      className: "w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: `edit-unit-${p.id}`,
                      className: "text-xs text-gray-500 mb-0.5 block",
                      children: "Unit"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `edit-unit-${p.id}`,
                      type: "text",
                      "data-ocid": `quickmenu.edit_unit_input.${p.id}`,
                      value: editState.unit,
                      onChange: (e) => setEditState(
                        (s) => s ? { ...s, unit: e.target.value } : s
                      ),
                      className: "w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: `edit-category-${p.id}`,
                      className: "text-xs text-gray-500 mb-0.5 block",
                      children: "Category"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `edit-category-${p.id}`,
                      type: "text",
                      "data-ocid": `quickmenu.edit_category_input.${p.id}`,
                      value: editState.category,
                      onChange: (e) => setEditState(
                        (s) => s ? { ...s, category: e.target.value } : s
                      ),
                      className: "w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    }
                  )
                ] })
              ] }),
              editError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-red-500",
                  "data-ocid": `quickmenu.edit_error_state.${p.id}`,
                  children: editError
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `quickmenu.edit_cancel_button.${p.id}`,
                    onClick: handleEditCancel,
                    className: "flex-1 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-xs font-medium hover:bg-gray-100",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `quickmenu.edit_save_button.${p.id}`,
                    onClick: () => handleEditSave(p),
                    disabled: editSaving,
                    className: "flex-1 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                    children: editSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "flex items-center justify-center gap-1",
                        "data-ocid": `quickmenu.edit_loading_state.${p.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "svg",
                            {
                              className: "animate-spin w-3 h-3",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Saving" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "circle",
                                  {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "path",
                                  {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8v8H4z"
                                  }
                                )
                              ]
                            }
                          ),
                          "Saving..."
                        ]
                      }
                    ) : "Save"
                  }
                )
              ] })
            ] })
          ]
        },
        p.id
      )) })
    ] }) : savedCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2 text-green-500", children: "✓" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-600 font-semibold text-lg", children: [
        savedCount,
        " item",
        savedCount > 1 ? "s" : "",
        " added!"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-x-auto gap-1 px-3 pt-3 pb-1", children: QUICK_MENU_CATEGORIES.map((cat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveCategory(idx),
          className: `whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${activeCategory === idx ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
          children: cat.label
        },
        cat.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
          currentCategory.items.length,
          " items"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: selectAll,
            className: "text-xs text-indigo-600 hover:underline font-medium",
            children: "Select All"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2 grid grid-cols-1 gap-1 max-h-52 overflow-y-auto", children: currentCategory.items.map((item) => {
        const key = itemKey(item);
        const checked = !!selectedItems[key];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => toggleItem(item),
            className: `flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-colors ${checked ? "border-indigo-400 bg-indigo-50" : "border-gray-200 hover:border-gray-300 bg-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${checked ? "bg-indigo-600 border-indigo-600" : "border-gray-300"}`,
                  children: checked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      className: "w-2.5 h-2.5 text-white",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Selected" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" })
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-medium text-sm text-gray-800", children: item.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: item.unit }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-1.5 py-0.5 rounded-full font-medium ${item.category === "Veg" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
                  children: item.category === "Veg" ? "Veg" : "Non-Veg"
                }
              )
            ]
          },
          key
        );
      }) }),
      selectedList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 px-3 pt-3 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-gray-700", children: [
            selectedList.length,
            " item",
            selectedList.length > 1 ? "s" : "",
            " — Enter price & stock"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: clearAll,
              className: "text-xs text-gray-400 hover:text-red-500",
              children: "Clear all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-44 overflow-y-auto space-y-2 pr-1", children: selectedList.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 text-xs font-medium text-gray-700 truncate", children: [
            item.name,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400 font-normal", children: [
              "(",
              item.unit,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: "0",
              step: "0.01",
              placeholder: "Price",
              value: item.price,
              onChange: (e) => updateField(item.key, "price", e.target.value),
              className: `w-20 px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 ${priceErrors[item.key] ? "border-red-400" : "border-gray-300"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: "0",
              step: "1",
              placeholder: "Stock",
              value: item.stock,
              onChange: (e) => updateField(item.key, "stock", e.target.value),
              className: `w-16 px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 ${stockErrors[item.key] ? "border-red-400" : "border-gray-300"}`
            }
          )
        ] }, item.key)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-t border-gray-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleSave,
            disabled: selectedList.length === 0 || saving,
            className: "flex-1 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            children: saving ? "Saving..." : selectedList.length > 0 ? `Save ${selectedList.length} Item${selectedList.length > 1 ? "s" : ""}` : "Save All"
          }
        )
      ] })
    ] })
  ] }) });
}
function defaultUnit(shopType) {
  if (shopType === BUILDING_MATERIAL_SHOP_TYPE) return "PCS";
  if (shopType === FRUITS_VEGETABLES_SHOP_TYPE) return "kg";
  const map = {
    [ShopType.Mobile]: "NOS",
    [ShopType.Electronics]: "NOS",
    [ShopType.Electrical]: "Piece",
    [ShopType.Grocery]: "KG",
    [ShopType.Clothing]: "PCS",
    [ShopType.Footwear]: "Pair",
    [ShopType.Medical]: "Strip",
    [ShopType.Stationery]: "PCS",
    [ShopType.AutoParts]: "PCS",
    [ShopType.Hardware]: "PCS",
    [ShopType.Jewelry]: "Gram",
    [ShopType.Restaurant]: "Plate",
    [ShopType.Salon]: "Session",
    [ShopType.General]: "PCS",
    [ShopType.AgroProducts]: "KG"
  };
  return map[shopType] ?? "PCS";
}
function generateAutoName(shopType, form) {
  if (shopType === FRUITS_VEGETABLES_SHOP_TYPE) {
    return [form.fvVariety, form.fvProductType, form.fvUnit, form.fvSeasonalTag].filter(Boolean).join(" ");
  }
  if (shopType === BUILDING_MATERIAL_SHOP_TYPE) {
    return [
      form.bldBrand,
      form.bldMaterialType,
      form.bldGrade,
      form.bldSizeDimensions
    ].filter(Boolean).join(" ");
  }
  switch (shopType) {
    case ShopType.Mobile: {
      const mc = form.mobileCategory || "Mobile";
      if (mc === "Laptop") {
        return [
          form.mobileBrand,
          form.mobileModel,
          form.mobileProcessor,
          form.mobileRam,
          form.mobileStorage,
          form.mobileDisplaySize
        ].filter(Boolean).join(" ");
      }
      if (mc === "Tablet") {
        return [
          form.mobileBrand,
          form.mobileModel,
          form.mobileStorage,
          form.mobileDisplaySize
        ].filter(Boolean).join(" ");
      }
      if (mc === "Accessories") {
        return [
          form.mobileBrand,
          form.mobileAccessoryType,
          form.mobileCompatibility,
          form.mobileColor
        ].filter(Boolean).join(" ");
      }
      return [
        form.mobileBrand,
        form.mobileModel,
        form.mobileStorage,
        form.mobileRam,
        form.mobileColor
      ].filter(Boolean).join(" ");
    }
    case ShopType.Electronics:
      return [form.elecBrand, form.elecModel].filter(Boolean).join(" ");
    case ShopType.Clothing:
      return [form.clothBrand, form.clothItem, form.clothColor, form.clothSize].filter(Boolean).join(" ");
    case ShopType.Footwear:
      return [
        form.footBrand,
        form.footModel,
        form.footSize ? `${form.footSize} (${form.footSizeSystem})` : ""
      ].filter(Boolean).join(" ");
    case ShopType.Stationery:
      switch (form.statSubType) {
        case StationerySubType.Book:
          return [
            "Book",
            form.statBookClass && `Class ${form.statBookClass}`,
            form.statBookSubject
          ].filter(Boolean).join(" – ");
        case StationerySubType.Notebook:
          return [
            "Notebook",
            form.statNbSize,
            form.statNbPages && `${form.statNbPages} Pages`
          ].filter(Boolean).join(" – ");
        case StationerySubType.Pen:
          return [form.statPenBrand, form.statPenColor, "Pen"].filter(Boolean).join(" ");
        default:
          return form.statOtherName;
      }
    case ShopType.AutoParts:
      return [form.autoVehicleBrand, form.autoPartName].filter(Boolean).join(" – ");
    case ShopType.Medical:
      return [form.medName, form.medCompany].filter(Boolean).join(" - ");
    case ShopType.Grocery:
      return form.name;
    case ShopType.Restaurant:
      return form.restName ? `${form.restName} (${form.restCategory})` : "";
    case ShopType.Hardware:
      return form.hwSku ? `${form.name} [${form.hwSku}]` : form.name;
    case ShopType.Jewelry:
      return form.jwWeightGrams && Number(form.jwWeightGrams) > 0 ? [form.jwMetal, `${form.jwWeightGrams}g`].filter(Boolean).join(" ") : "";
    case ShopType.Salon:
      return form.salonServiceName ? `${form.salonServiceName} (${form.salonDuration}min)` : "";
    case ShopType.General:
      return form.genName || form.name;
    case ShopType.AgroProducts:
      return [
        form.agroCropType,
        form.agroProductType,
        form.agroBrand,
        form.agroWeight ? `${form.agroWeight}${form.agroWeightUnit}` : ""
      ].filter(Boolean).join(" ");
    case ShopType.Electrical: {
      const amp = form.elecAmpRating === "Custom" ? form.elecAmpCustom : form.elecAmpRating !== "N/A" ? form.elecAmpRating : "";
      const watt = form.elecWattage === "Custom" ? form.elecWattageCustom : form.elecWattage !== "N/A" ? form.elecWattage : "";
      const gauge = form.elecWireGauge === "Custom" ? form.elecWireGaugeCustom : form.elecWireGauge !== "N/A" ? form.elecWireGauge : "";
      const color = form.elecColor !== "N/A" ? form.elecColor : "";
      return [
        form.elecBrandName,
        amp || watt,
        form.elecItemCategory,
        gauge,
        color,
        form.elecUnit !== "Piece" ? form.elecUnit : ""
      ].filter(Boolean).join(" ");
    }
    default:
      return "";
  }
}
function buildEngineFields(shopType, form) {
  const optExpiry = (date) => date ? [date] : [];
  if (shopType === FRUITS_VEGETABLES_SHOP_TYPE) {
    const f = {
      productType: form.fvProductType || "Fruit",
      variety: form.fvVariety,
      unit: form.fvUnit || "kg",
      seasonalTag: form.fvSeasonalTag || "All-Season",
      originSource: form.fvOriginSource,
      freshnessDate: form.fvFreshnessDate,
      batchNumber: form.fvBatchNumber
    };
    return {
      __kind__: "FruitsVegetables",
      FruitsVegetables: f
    };
  }
  if (shopType === BUILDING_MATERIAL_SHOP_TYPE) {
    const f = {
      brand: form.bldBrand,
      material_type: form.bldMaterialType,
      grade: form.bldGrade,
      size_dimensions: form.bldSizeDimensions,
      weight: form.bldWeight,
      color: form.bldColor,
      expiryDate: optExpiry(form.expiryDate)
    };
    return {
      __kind__: "BuildingMaterial",
      BuildingMaterial: f
    };
  }
  switch (shopType) {
    case ShopType.Mobile: {
      const f = {
        mobileCategory: form.mobileCategory || "Mobile",
        brand: form.mobileBrand,
        model: form.mobileModel,
        imei: form.mobileCategory === "Mobile" ? form.mobileImei : "",
        color: form.mobileColor,
        storage: form.mobileStorage,
        ram: form.mobileRam,
        processor: form.mobileProcessor,
        displaySize: form.mobileDisplaySize,
        accessoryType: form.mobileAccessoryType,
        compatibility: form.mobileCompatibility,
        warrantyMonths: BigInt(Number(form.mobileWarrantyMonths) || 0),
        serialNumber: form.mobileSerialNumber,
        expiryDate: optExpiry(form.expiryDate)
      };
      return { __kind__: "Mobile", Mobile: f };
    }
    case ShopType.Electronics: {
      const f = {
        brand: form.elecBrand,
        model: form.elecModel,
        serialNo: form.elecSerial,
        warrantyMonths: BigInt(Number(form.elecWarranty) || 0),
        expiryDate: optExpiry(form.expiryDate)
      };
      return {
        __kind__: "Electronics",
        Electronics: f
      };
    }
    case ShopType.Medical: {
      const f = {
        company: form.medCompany,
        batchNo: form.medBatch,
        expiryDate: form.medExpiry,
        composition: form.medComposition,
        packType: form.medPackType,
        isControlled: form.medControlled
      };
      return { __kind__: "Medical", Medical: f };
    }
    case ShopType.Clothing: {
      const f = {
        brand: form.clothBrand,
        itemName: form.clothItem,
        size: form.clothSize,
        color: form.clothColor,
        expiryDate: optExpiry(form.expiryDate)
      };
      return { __kind__: "Clothing", Clothing: f };
    }
    case ShopType.Footwear: {
      const f = {
        brand: form.footBrand,
        model: form.footModel,
        size: form.footSize,
        sizeSystem: form.footSizeSystem,
        color: form.footColor,
        expiryDate: optExpiry(form.expiryDate)
      };
      return { __kind__: "Footwear", Footwear: f };
    }
    case ShopType.Grocery: {
      const f = {
        decimalQtyEnabled: form.grocDecimal,
        expiryDate: optExpiry(form.expiryDate)
      };
      return { __kind__: "Grocery", Grocery: f };
    }
    case ShopType.Stationery: {
      const f = {
        subType: form.statSubType,
        bookClass: form.statBookClass,
        bookSubject: form.statBookSubject,
        bookMedium: form.statBookMedium,
        notebookSize: form.statNbSize,
        notebookPages: BigInt(Number(form.statNbPages) || 0),
        penBrand: form.statPenBrand,
        penColor: form.statPenColor,
        expiryDate: optExpiry(form.expiryDate)
      };
      return {
        __kind__: "Stationery",
        Stationery: f
      };
    }
    case ShopType.Restaurant: {
      const f = {
        category: form.restCategory,
        expiryDate: optExpiry(form.expiryDate)
      };
      return {
        __kind__: "Restaurant",
        Restaurant: f
      };
    }
    case ShopType.AutoParts: {
      const f = {
        vehicleBrand: form.autoVehicleBrand,
        vehicleModel: form.autoVehicleModel,
        partName: form.autoPartName,
        partNo: form.autoPartNo,
        expiryDate: optExpiry(form.expiryDate)
      };
      return { __kind__: "AutoParts", AutoParts: f };
    }
    case ShopType.Hardware: {
      const f = {
        sku: form.hwSku,
        expiryDate: optExpiry(form.expiryDate)
      };
      return { __kind__: "Hardware", Hardware: f };
    }
    case ShopType.Jewelry: {
      const weightGrams = Number.parseFloat(form.jwWeightGrams) || 0;
      const makingCharges = Number.parseFloat(form.jwMakingCharges) || 0;
      const metalRate = Number.parseFloat(form.jwMetalRate) || 0;
      const purity = (form.jwPurity ?? "").trim() || "22K";
      const f = {
        metal: form.jwMetal ?? Metal.Gold,
        weightGrams,
        purity,
        makingCharges,
        metalRate,
        // expiryDate is optional string; use undefined (not null/empty) when absent
        expiryDate: form.expiryDate ? form.expiryDate : void 0
      };
      return { __kind__: "Jewelry", Jewelry: f };
    }
    case ShopType.Salon: {
      const f = {
        duration: BigInt(Number(form.salonDuration) || 0),
        staffName: form.salonStaff,
        expiryDate: optExpiry(form.expiryDate)
      };
      return { __kind__: "Salon", Salon: f };
    }
    case ShopType.Electrical: {
      const ampValue = form.elecAmpRating === "Custom" ? form.elecAmpCustom : form.elecAmpRating;
      const voltValue = form.elecVoltage === "Custom" ? form.elecVoltageCustom : form.elecVoltage;
      const wattValue = form.elecWattage === "Custom" ? form.elecWattageCustom : form.elecWattage;
      const gaugeValue = form.elecWireGauge === "Custom" ? form.elecWireGaugeCustom : form.elecWireGauge;
      const f = {
        itemCategory: form.elecItemCategory,
        brand: form.elecBrandName,
        model: form.elecPartModel,
        ampereRating: ampValue,
        voltageRating: voltValue,
        wattage: wattValue,
        wireGauge: gaugeValue,
        lengthUnit: form.elecUnit,
        color: form.elecColor,
        isiCertified: form.elecIsiCertified,
        batchNumber: form.elecBatchNumber,
        expiryDate: form.expiryDate || void 0
      };
      return {
        __kind__: "Electrical",
        Electrical: f
      };
    }
    case ShopType.AgroProducts: {
      const f = {
        productType: form.agroProductType,
        brand: form.agroBrand,
        cropType: form.agroCropType,
        weight: Number(form.agroWeight) || 0,
        weightUnit: form.agroWeightUnit || "kg",
        expiryDate: form.expiryDate || void 0,
        batchNumber: form.agroBatchNumber || void 0
      };
      return {
        __kind__: "AgroProducts",
        AgroProducts: f
      };
    }
    default:
      return {
        __kind__: "General",
        General: {
          expiryDate: optExpiry(form.expiryDate)
        }
      };
  }
}
function extractFormFromProduct(product) {
  const base = {
    name: product.name,
    barcode: product.barcode ?? "",
    supplierId: "",
    category: product.category,
    unit: product.unit,
    retailPrice: String(product.retailPrice),
    wholesalePrice: String(product.wholesalePrice),
    costPrice: String(product.costPrice),
    transportCost: product.transportCost != null ? String(product.transportCost) : "0",
    labourCost: product.labourCost != null ? String(product.labourCost) : "0",
    stock: String(product.stock),
    minStock: String(product.minStock),
    expiryDate: ""
  };
  function readOptExpiry(val) {
    if (Array.isArray(val) && val.length > 0) return val[0];
    return "";
  }
  const ef = product.engineFields;
  if (ef.__kind__ === "Mobile") {
    const m = ef.Mobile;
    Object.assign(base, {
      mobileCategory: m.mobileCategory || "Mobile",
      mobileImei: m.imei,
      mobileBrand: m.brand,
      mobileModel: m.model,
      mobileColor: m.color,
      mobileStorage: m.storage,
      mobileRam: m.ram || "",
      mobileProcessor: m.processor || "",
      mobileDisplaySize: m.displaySize || "",
      mobileAccessoryType: m.accessoryType || "",
      mobileCompatibility: m.compatibility || "",
      mobileWarrantyMonths: m.warrantyMonths != null ? String(m.warrantyMonths) : "12",
      mobileSerialNumber: m.serialNumber || "",
      expiryDate: readOptExpiry(m.expiryDate)
    });
  } else if (ef.__kind__ === "Electronics") {
    const e = ef.Electronics;
    Object.assign(base, {
      elecBrand: e.brand,
      elecModel: e.model,
      elecSerial: e.serialNo,
      elecWarranty: String(e.warrantyMonths),
      expiryDate: readOptExpiry(e.expiryDate)
    });
  } else if (ef.__kind__ === "Medical") {
    const m = ef.Medical;
    Object.assign(base, {
      medName: product.name,
      medCompany: m.company,
      medBatch: m.batchNo,
      medExpiry: m.expiryDate,
      medComposition: m.composition,
      medPackType: m.packType,
      medControlled: m.isControlled
    });
  } else if (ef.__kind__ === "Clothing") {
    const c = ef.Clothing;
    const extractedGender = (() => {
      const lower = (c.itemName ?? "").toLowerCase();
      if (lower.startsWith("under garment - man")) return "Man";
      if (lower.startsWith("under garment - woman")) return "Woman";
      if (lower.startsWith("under garment - children")) return "Children";
      return "";
    })();
    Object.assign(base, {
      clothBrand: c.brand,
      clothItem: c.itemName,
      clothSize: c.size,
      clothColor: c.color,
      clothGender: extractedGender,
      expiryDate: readOptExpiry(c.expiryDate)
    });
  } else if (ef.__kind__ === "Footwear") {
    const f = ef.Footwear;
    const detectedFootGender = (() => {
      const s = f.size ?? "";
      if (FOOTWEAR_SIZES.Man.includes(s)) return "Man";
      if (FOOTWEAR_SIZES.Woman.includes(s)) return "Woman";
      if (FOOTWEAR_SIZES.Children.includes(s)) return "Children";
      return "";
    })();
    Object.assign(base, {
      footBrand: f.brand,
      footModel: f.model,
      footSize: f.size,
      footSizeSystem: f.sizeSystem,
      footColor: f.color,
      footGender: detectedFootGender,
      expiryDate: readOptExpiry(f.expiryDate)
    });
  } else if (ef.__kind__ === "Grocery") {
    const g = ef.Grocery;
    Object.assign(base, {
      grocDecimal: g.decimalQtyEnabled,
      expiryDate: readOptExpiry(g.expiryDate)
    });
  } else if (ef.__kind__ === "Stationery") {
    const s = ef.Stationery;
    Object.assign(base, {
      statSubType: s.subType,
      statBookClass: s.bookClass,
      statBookSubject: s.bookSubject,
      statBookMedium: s.bookMedium,
      statNbSize: s.notebookSize,
      statNbPages: String(s.notebookPages),
      statPenBrand: s.penBrand,
      statPenColor: s.penColor,
      expiryDate: readOptExpiry(s.expiryDate)
    });
  } else if (ef.__kind__ === "Restaurant") {
    const r = ef.Restaurant;
    Object.assign(base, {
      restName: product.name,
      restCategory: r.category,
      expiryDate: readOptExpiry(r.expiryDate)
    });
  } else if (ef.__kind__ === "AutoParts") {
    const a = ef.AutoParts;
    Object.assign(base, {
      autoVehicleBrand: a.vehicleBrand,
      autoVehicleModel: a.vehicleModel,
      autoPartName: a.partName,
      autoPartNo: a.partNo,
      expiryDate: readOptExpiry(a.expiryDate)
    });
  } else if (ef.__kind__ === "Hardware") {
    const h = ef.Hardware;
    Object.assign(base, {
      hwSku: h.sku,
      expiryDate: readOptExpiry(h.expiryDate)
    });
  } else if (ef.__kind__ === "Jewelry") {
    const j = ef.Jewelry;
    Object.assign(base, {
      jwMetal: j.metal ?? Metal.Gold,
      jwWeightGrams: j.weightGrams != null ? String(j.weightGrams) : "",
      jwPurity: j.purity != null ? String(j.purity) : "22K",
      jwMakingCharges: j.makingCharges != null ? String(j.makingCharges) : "",
      jwMetalRate: j.metalRate != null ? String(j.metalRate) : "",
      expiryDate: j.expiryDate != null ? String(j.expiryDate) : ""
    });
  } else if (ef.__kind__ === "Salon") {
    const s = ef.Salon;
    Object.assign(base, {
      salonServiceName: product.name,
      salonDuration: String(s.duration),
      salonStaff: s.staffName,
      expiryDate: readOptExpiry(s.expiryDate)
    });
  } else if (ef.__kind__ === "General") {
    const g = ef.General;
    Object.assign(base, {
      expiryDate: readOptExpiry(g == null ? void 0 : g.expiryDate)
    });
  } else if (ef.__kind__ === "AgroProducts") {
    const a = ef.AgroProducts;
    Object.assign(base, {
      agroProductType: a.productType,
      agroBrand: a.brand,
      agroCropType: a.cropType,
      agroWeight: a.weight != null ? String(a.weight) : "",
      agroWeightUnit: a.weightUnit || "kg",
      agroBatchNumber: a.batchNumber ?? "",
      expiryDate: a.expiryDate ?? ""
    });
  } else if (ef.__kind__ === "Electrical") {
    const e = ef.Electrical;
    Object.assign(base, {
      elecItemCategory: e.itemCategory || "",
      elecBrandName: e.brand || "",
      elecAmpRating: e.ampereRating || "N/A",
      elecAmpCustom: "",
      elecVoltage: e.voltageRating || "230V",
      elecVoltageCustom: "",
      elecWattage: e.wattage || "N/A",
      elecWattageCustom: "",
      elecWireGauge: e.wireGauge || "N/A",
      elecWireGaugeCustom: "",
      elecUnit: e.lengthUnit || "Piece",
      elecColor: e.color || "N/A",
      elecIsiCertified: e.isiCertified || false,
      elecPartModel: e.model || "",
      elecBatchNumber: e.batchNumber || "",
      expiryDate: e.expiryDate || ""
    });
  } else if (ef.__kind__ === "BuildingMaterial") {
    const b = ef.BuildingMaterial;
    Object.assign(base, {
      bldBrand: b.brand,
      bldMaterialType: b.material_type,
      bldGrade: b.grade,
      bldSizeDimensions: b.size_dimensions,
      bldWeight: b.weight,
      bldColor: b.color,
      expiryDate: readOptExpiry(b.expiryDate)
    });
  } else if (ef.__kind__ === "FruitsVegetables") {
    const fv = ef.FruitsVegetables;
    Object.assign(base, {
      fvProductType: fv.productType,
      fvVariety: fv.variety,
      fvUnit: fv.unit,
      fvSeasonalTag: fv.seasonalTag,
      fvOriginSource: fv.originSource,
      fvFreshnessDate: fv.freshnessDate ?? "",
      fvBatchNumber: fv.batchNumber ?? ""
    });
  }
  return base;
}
function initialForm(shopType) {
  return {
    name: "",
    barcode: "",
    supplierId: "",
    category: "",
    unit: defaultUnit(shopType),
    retailPrice: "",
    wholesalePrice: "",
    costPrice: "",
    transportCost: "0",
    labourCost: "0",
    stock: "0",
    minStock: "5",
    mobileCategory: "Mobile",
    mobileImei: "",
    mobileBrand: "",
    mobileModel: "",
    mobileColor: "",
    mobileStorage: "",
    mobileRam: "",
    mobileProcessor: "",
    mobileDisplaySize: "",
    mobileAccessoryType: "",
    mobileCompatibility: "",
    mobileWarrantyMonths: "12",
    mobileSerialNumber: "",
    elecBrand: "",
    elecModel: "",
    elecSerial: "",
    elecWarranty: "12",
    medName: "",
    medCompany: "",
    medBatch: "",
    medExpiry: "",
    medComposition: "",
    medPackType: PackType.Strip,
    medControlled: false,
    clothBrand: "",
    clothItem: "",
    clothSize: "M",
    clothColor: "",
    clothGender: "",
    footBrand: "",
    footModel: "",
    footSize: "",
    footSizeSystem: SizeSystem.UK,
    footGender: "",
    footColor: "",
    grocUnit: "KG",
    grocDecimal: true,
    statSubType: StationerySubType.Book,
    statBookClass: "",
    statBookSubject: "",
    statBookMedium: "",
    statNbSize: "A4",
    statNbPages: "",
    statPenBrand: "",
    statPenColor: "",
    statOtherName: "",
    statOtherDesc: "",
    restName: "",
    restCategory: RestaurantCategory$1.Veg,
    restUnit: "Plate",
    autoVehicleBrand: "",
    autoVehicleModel: "",
    autoPartName: "",
    autoPartNo: "",
    hwSku: "",
    hwCategory: "",
    jwMetal: Metal.Gold,
    jwWeightGrams: "",
    jwPurity: "22K",
    jwMakingCharges: "",
    jwMetalRate: "",
    salonServiceName: "",
    salonDuration: "30",
    salonStaff: "",
    genName: "",
    genCategory: "",
    genUnit: defaultUnit(shopType),
    bldMaterialType: "",
    bldBrand: "",
    bldGrade: "",
    bldSizeDimensions: "",
    bldWeight: "",
    bldColor: "",
    agroProductType: "Seeds",
    agroBrand: "",
    agroCropType: "",
    agroWeight: "",
    agroWeightUnit: "kg",
    agroBatchNumber: "",
    fvProductType: "Fruit",
    fvVariety: "",
    fvUnit: "kg",
    fvSeasonalTag: "All-Season",
    fvOriginSource: "",
    fvFreshnessDate: "",
    fvBatchNumber: "",
    expiryDate: "",
    elecItemCategory: "",
    elecBrandName: "",
    elecAmpRating: "N/A",
    elecAmpCustom: "",
    elecVoltage: "230V",
    elecVoltageCustom: "",
    elecWattage: "N/A",
    elecWattageCustom: "",
    elecWireGauge: "N/A",
    elecWireGaugeCustom: "",
    elecUnit: "Piece",
    elecColor: "N/A",
    elecIsiCertified: false,
    elecPartModel: "",
    elecBatchNumber: ""
  };
}
function validateForm(shopType, form) {
  const errs = {};
  if (!form.retailPrice || Number(form.retailPrice) < 0)
    errs.retailPrice = "Retail price is required";
  if (Number(form.costPrice) < 0)
    errs.costPrice = "Cost price cannot be negative";
  if (Number(form.stock) < 0) errs.stock = "Stock cannot be negative";
  if (Number(form.minStock) < 0) errs.minStock = "Min stock cannot be negative";
  if (shopType === BUILDING_MATERIAL_SHOP_TYPE) {
    if (!form.bldMaterialType)
      errs.bldMaterialType = "Material type is required";
  }
  if (shopType === ShopType.Mobile) {
    if (form.mobileCategory === "Mobile" || !form.mobileCategory) {
      if (!form.mobileImei) errs.mobileImei = "IMEI is required";
      else if (!/^\d{15}$/.test(form.mobileImei))
        errs.mobileImei = "IMEI must be exactly 15 digits";
    }
  }
  if (shopType === ShopType.Medical) {
    if (!form.medExpiry)
      errs.medExpiry = "Expiry date is required for medicines";
  }
  if (shopType === ShopType.Clothing) {
    if (!form.clothGender)
      errs.clothGender = "Please select a type (Man/Woman/Children)";
    else if (!form.clothSize) errs.clothSize = "Size is required";
  }
  if (shopType === ShopType.Footwear) {
    if (!form.footGender)
      errs.footGender = "Please select a type (Man/Woman/Children)";
    else if (!form.footSize) errs.footSize = "Size is required";
  }
  if (shopType === ShopType.Jewelry) {
    if (form.jwWeightGrams && Number(form.jwWeightGrams) <= 0)
      errs.jwWeightGrams = "Weight must be a positive number";
  }
  if (shopType === ShopType.AgroProducts) {
    if (!form.agroProductType)
      errs.agroProductType = "Product type is required";
    if (!form.agroBrand) errs.agroBrand = "Brand is required";
    if (!form.agroCropType) errs.agroCropType = "Crop type is required";
    if (!form.agroWeight || Number(form.agroWeight) <= 0)
      errs.agroWeight = "Weight is required";
  }
  if (shopType === FRUITS_VEGETABLES_SHOP_TYPE) {
    if (!form.fvVariety) errs.fvVariety = "Variety is required";
    if (!form.fvUnit) errs.fvUnit = "Unit is required";
  }
  if (shopType === ShopType.Electrical) {
    if (!form.elecItemCategory)
      errs.elecItemCategory = "Item category is required";
    if (!form.elecBrandName) errs.elecBrandName = "Brand is required";
  }
  return errs;
}
function isNearExpiry(expiryDate, thresholdDays = 90) {
  if (!expiryDate) return false;
  const exp = new Date(expiryDate);
  const now = /* @__PURE__ */ new Date();
  const diff = (exp.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24);
  return diff >= 0 && diff <= thresholdDays;
}
function fieldRow({
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { className: "text-sm font-medium text-foreground", children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
      error
    ] })
  ] });
}
function OptionalExpiryField({
  value,
  onChange,
  thresholdDays
}) {
  const threshold = thresholdDays ?? 90;
  const nearExpiry = value ? isNearExpiry(value, threshold) : false;
  const urgencyColor = (() => {
    if (!value) return "";
    const diff = (new Date(value).getTime() - Date.now()) / (1e3 * 60 * 60 * 24);
    if (diff <= 7) return "border-red-400";
    if (diff <= 30) return "border-orange-400";
    return "border-yellow-400";
  })();
  return fieldRow({
    label: "Expiry Date (Optional)",
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "product.expiry_date.input",
          type: "date",
          value,
          onChange: (e) => onChange(e.target.value),
          className: nearExpiry ? urgencyColor : ""
        }
      ),
      nearExpiry && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-100 text-orange-700 border-orange-300 text-xs", children: "⚠ Near Expiry" })
    ] })
  });
}
function MobileEngineForm({
  form,
  setForm,
  errors
}) {
  const category = form.mobileCategory || "Mobile";
  const MOBILE_BRANDS = [
    "Samsung",
    "Apple",
    "Xiaomi",
    "Realme",
    "Oppo",
    "Vivo",
    "OnePlus",
    "Nokia",
    "Motorola",
    "Huawei",
    "Tecno",
    "Itel",
    "Other"
  ];
  const LAPTOP_BRANDS = [
    "HP",
    "Dell",
    "Lenovo",
    "Asus",
    "Acer",
    "Apple",
    "MSI",
    "Samsung",
    "Toshiba",
    "Other"
  ];
  const TABLET_BRANDS = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Lenovo",
    "Huawei",
    "Amazon",
    "Other"
  ];
  const STORAGE_PHONE = [
    "16GB",
    "32GB",
    "64GB",
    "128GB",
    "256GB",
    "512GB",
    "1TB",
    "Other"
  ];
  const STORAGE_LAPTOP = [
    "128GB SSD",
    "256GB SSD",
    "512GB SSD",
    "1TB SSD",
    "1TB HDD",
    "2TB HDD",
    "256GB+1TB",
    "Other"
  ];
  const STORAGE_TABLET = ["32GB", "64GB", "128GB", "256GB", "512GB", "Other"];
  const RAM_PHONE = [
    "2GB",
    "3GB",
    "4GB",
    "6GB",
    "8GB",
    "12GB",
    "16GB",
    "Other"
  ];
  const RAM_LAPTOP = ["4GB", "8GB", "16GB", "32GB", "64GB", "Other"];
  const RAM_TABLET = ["2GB", "3GB", "4GB", "6GB", "8GB", "Other"];
  const PROCESSORS = [
    "Intel i3",
    "Intel i5",
    "Intel i7",
    "Intel i9",
    "AMD Ryzen 3",
    "AMD Ryzen 5",
    "AMD Ryzen 7",
    "Apple M1",
    "Apple M2",
    "Apple M3",
    "Celeron",
    "Pentium",
    "Other"
  ];
  const DISPLAY_LAPTOP = [
    "11 inch",
    "12 inch",
    "13 inch",
    "13.3 inch",
    "14 inch",
    "15.6 inch",
    "16 inch",
    "17 inch",
    "Other"
  ];
  const DISPLAY_TABLET = [
    "7 inch",
    "8 inch",
    "10 inch",
    "10.5 inch",
    "11 inch",
    "12.9 inch",
    "Other"
  ];
  const WARRANTY_OPTIONS = ["0", "3", "6", "12", "18", "24"];
  const ACCESSORY_TYPES = [
    "Charger",
    "Data Cable",
    "Headphone",
    "Earphone",
    "Earbuds",
    "Laptop Charger",
    "Power Bank",
    "Phone Cover/Case",
    "Screen Guard/Protector",
    "Smartwatch",
    "Keyboard",
    "Mouse",
    "USB Hub",
    "OTG Adapter",
    "Card Reader",
    "Webcam",
    "Speaker",
    "Selfie Stick",
    "Tripod",
    "Other"
  ];
  const brands = category === "Laptop" ? LAPTOP_BRANDS : category === "Tablet" ? TABLET_BRANDS : MOBILE_BRANDS;
  const storageOptions = category === "Laptop" ? STORAGE_LAPTOP : category === "Tablet" ? STORAGE_TABLET : STORAGE_PHONE;
  const ramOptions = category === "Laptop" ? RAM_LAPTOP : category === "Tablet" ? RAM_TABLET : RAM_PHONE;
  const displayOptions = category === "Laptop" ? DISPLAY_LAPTOP : DISPLAY_TABLET;
  const CATEGORIES = [
    { label: "📱 Mobile", value: "Mobile" },
    { label: "💻 Laptop", value: "Laptop" },
    { label: "📟 Tablet", value: "Tablet" },
    { label: "🎧 Accessories", value: "Accessories" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Mobile Shop — Product Details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium", children: "Category *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.mobile_category.${cat.value.toLowerCase()}`,
          onClick: () => setForm({
            mobileCategory: cat.value,
            mobileImei: "",
            mobileModel: "",
            mobileStorage: "",
            mobileRam: "",
            mobileProcessor: "",
            mobileDisplaySize: "",
            mobileAccessoryType: "",
            mobileCompatibility: "",
            mobileSerialNumber: ""
          }),
          className: `py-2 text-xs font-semibold rounded-lg border-2 transition-all ${category === cat.value ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]" : "border-border bg-background text-muted-foreground hover:bg-muted"}`,
          children: cat.label
        },
        cat.value
      )) })
    ] }),
    category === "Mobile" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      fieldRow({
        label: "IMEI (15 digits) *",
        error: errors.mobileImei,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.mobile_imei.input",
            maxLength: 15,
            pattern: "\\d{15}",
            value: form.mobileImei,
            onChange: (e) => setForm({ mobileImei: e.target.value.replace(/\D/g, "") }),
            placeholder: "e.g. 354879101234567",
            className: errors.mobileImei ? "border-destructive" : ""
          }
        )
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Brand",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_brand.select",
              value: form.mobileBrand,
              onChange: (e) => setForm({ mobileBrand: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Brand" }),
                brands.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b, children: b }, b))
              ]
            }
          )
        }),
        fieldRow({
          label: "Model *",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_model.input",
              value: form.mobileModel,
              onChange: (e) => setForm({ mobileModel: e.target.value }),
              placeholder: "Galaxy S24"
            }
          )
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Storage",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_storage.select",
              value: form.mobileStorage,
              onChange: (e) => setForm({ mobileStorage: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                storageOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
              ]
            }
          )
        }),
        fieldRow({
          label: "RAM",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_ram.select",
              value: form.mobileRam,
              onChange: (e) => setForm({ mobileRam: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                ramOptions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
              ]
            }
          )
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Color",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_color.input",
              value: form.mobileColor,
              onChange: (e) => setForm({ mobileColor: e.target.value }),
              placeholder: "Phantom Black"
            }
          )
        }),
        fieldRow({
          label: "Warranty (months)",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: WARRANTY_OPTIONS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `product.mobile_warranty.${w}`,
              onClick: () => setForm({ mobileWarrantyMonths: w }),
              className: `px-3 py-1 text-xs rounded-md border font-medium transition-colors ${form.mobileWarrantyMonths === w ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
              children: [
                w,
                "m"
              ]
            },
            w
          )) })
        })
      ] })
    ] }),
    category === "Laptop" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Brand",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_brand.select",
              value: form.mobileBrand,
              onChange: (e) => setForm({ mobileBrand: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Brand" }),
                brands.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b, children: b }, b))
              ]
            }
          )
        }),
        fieldRow({
          label: "Model *",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_model.input",
              value: form.mobileModel,
              onChange: (e) => setForm({ mobileModel: e.target.value }),
              placeholder: "Pavilion 15"
            }
          )
        })
      ] }),
      fieldRow({
        label: "Processor",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            "data-ocid": "product.mobile_processor.select",
            value: form.mobileProcessor,
            onChange: (e) => setForm({ mobileProcessor: e.target.value }),
            className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Processor" }),
              PROCESSORS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p))
            ]
          }
        )
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "RAM",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_ram.select",
              value: form.mobileRam,
              onChange: (e) => setForm({ mobileRam: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                ramOptions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
              ]
            }
          )
        }),
        fieldRow({
          label: "Storage",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_storage.select",
              value: form.mobileStorage,
              onChange: (e) => setForm({ mobileStorage: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                storageOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
              ]
            }
          )
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Display Size",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_display.select",
              value: form.mobileDisplaySize,
              onChange: (e) => setForm({ mobileDisplaySize: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                displayOptions.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
              ]
            }
          )
        }),
        fieldRow({
          label: "Color",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_color.input",
              value: form.mobileColor,
              onChange: (e) => setForm({ mobileColor: e.target.value }),
              placeholder: "Silver"
            }
          )
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Serial Number (optional)",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_serial.input",
              value: form.mobileSerialNumber,
              onChange: (e) => setForm({ mobileSerialNumber: e.target.value }),
              placeholder: "SN-XXXXXXX"
            }
          )
        }),
        fieldRow({
          label: "Warranty (months)",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: WARRANTY_OPTIONS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `product.mobile_warranty.${w}`,
              onClick: () => setForm({ mobileWarrantyMonths: w }),
              className: `px-3 py-1 text-xs rounded-md border font-medium transition-colors ${form.mobileWarrantyMonths === w ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
              children: [
                w,
                "m"
              ]
            },
            w
          )) })
        })
      ] })
    ] }),
    category === "Tablet" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Brand",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_brand.select",
              value: form.mobileBrand,
              onChange: (e) => setForm({ mobileBrand: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Brand" }),
                brands.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b, children: b }, b))
              ]
            }
          )
        }),
        fieldRow({
          label: "Model *",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_model.input",
              value: form.mobileModel,
              onChange: (e) => setForm({ mobileModel: e.target.value }),
              placeholder: "Tab A9"
            }
          )
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Storage",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_storage.select",
              value: form.mobileStorage,
              onChange: (e) => setForm({ mobileStorage: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                storageOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
              ]
            }
          )
        }),
        fieldRow({
          label: "RAM",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_ram.select",
              value: form.mobileRam,
              onChange: (e) => setForm({ mobileRam: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                ramOptions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
              ]
            }
          )
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Display Size",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "product.mobile_display.select",
              value: form.mobileDisplaySize,
              onChange: (e) => setForm({ mobileDisplaySize: e.target.value }),
              className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                displayOptions.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
              ]
            }
          )
        }),
        fieldRow({
          label: "Color",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_color.input",
              value: form.mobileColor,
              onChange: (e) => setForm({ mobileColor: e.target.value }),
              placeholder: "Gray"
            }
          )
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Serial Number (optional)",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_serial.input",
              value: form.mobileSerialNumber,
              onChange: (e) => setForm({ mobileSerialNumber: e.target.value }),
              placeholder: "SN-XXXXXXX"
            }
          )
        }),
        fieldRow({
          label: "Warranty (months)",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: WARRANTY_OPTIONS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `product.mobile_warranty.${w}`,
              onClick: () => setForm({ mobileWarrantyMonths: w }),
              className: `px-3 py-1 text-xs rounded-md border font-medium transition-colors ${form.mobileWarrantyMonths === w ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
              children: [
                w,
                "m"
              ]
            },
            w
          )) })
        })
      ] })
    ] }),
    category === "Accessories" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      fieldRow({
        label: "Accessory Type *",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            "data-ocid": "product.mobile_accessory_type.select",
            value: form.mobileAccessoryType,
            onChange: (e) => setForm({ mobileAccessoryType: e.target.value }),
            className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Accessory Type" }),
              ACCESSORY_TYPES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a, children: a }, a))
            ]
          }
        )
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Brand",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_brand.input",
              value: form.mobileBrand,
              onChange: (e) => setForm({ mobileBrand: e.target.value }),
              placeholder: "BoAt, Anker, etc."
            }
          )
        }),
        fieldRow({
          label: "Compatibility",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_compatibility.input",
              value: form.mobileCompatibility,
              onChange: (e) => setForm({ mobileCompatibility: e.target.value }),
              placeholder: "e.g. Type-C, iPhone 14, Universal"
            }
          )
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        fieldRow({
          label: "Color (optional)",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.mobile_color.input",
              value: form.mobileColor,
              onChange: (e) => setForm({ mobileColor: e.target.value }),
              placeholder: "Black"
            }
          )
        }),
        fieldRow({
          label: "Warranty (months)",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ["0", "3", "6", "12"].map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `product.mobile_warranty.${w}`,
              onClick: () => setForm({ mobileWarrantyMonths: w }),
              className: `px-3 py-1 text-xs rounded-md border font-medium transition-colors ${form.mobileWarrantyMonths === w ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
              children: [
                w,
                "m"
              ]
            },
            w
          )) })
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function ElectronicsEngineForm({
  form,
  setForm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Electronics Details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Brand",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.elec_brand.input",
            value: form.elecBrand,
            onChange: (e) => setForm({ elecBrand: e.target.value }),
            placeholder: "Sony"
          }
        )
      }),
      fieldRow({
        label: "Model",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.elec_model.input",
            value: form.elecModel,
            onChange: (e) => setForm({ elecModel: e.target.value }),
            placeholder: "WH-1000XM5"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Serial No (optional)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.elec_serial.input",
            value: form.elecSerial,
            onChange: (e) => setForm({ elecSerial: e.target.value }),
            placeholder: "SN-XXXXXX"
          }
        )
      }),
      fieldRow({
        label: "Warranty (months)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.elec_warranty.input",
            type: "number",
            min: "0",
            value: form.elecWarranty,
            onChange: (e) => setForm({ elecWarranty: e.target.value }),
            placeholder: "12"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function MedicalEngineForm({
  form,
  setForm,
  errors
}) {
  const nearExpiry = form.medExpiry ? isNearExpiry(form.medExpiry, 90) : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Medicine Details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Company / Manufacturer",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.med_company.input",
            value: form.medCompany,
            onChange: (e) => setForm({ medCompany: e.target.value }),
            placeholder: "Cipla"
          }
        )
      }),
      fieldRow({
        label: "Batch No",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.med_batch.input",
            value: form.medBatch,
            onChange: (e) => setForm({ medBatch: e.target.value }),
            placeholder: "BT-2024-001"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: fieldRow({
      label: "Expiry Date *",
      error: errors.medExpiry,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.med_expiry.input",
            type: "date",
            value: form.medExpiry,
            onChange: (e) => setForm({ medExpiry: e.target.value }),
            className: errors.medExpiry ? "border-destructive" : nearExpiry ? "border-orange-400" : ""
          }
        ),
        nearExpiry && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-100 text-orange-700 border-orange-300 text-xs", children: "⚠ Near Expiry — within 30 days" })
      ] })
    }) }),
    fieldRow({
      label: "Composition",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "product.med_composition.input",
          value: form.medComposition,
          onChange: (e) => setForm({ medComposition: e.target.value }),
          placeholder: "Paracetamol 500mg"
        }
      )
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Pack Type",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            "data-ocid": "product.med_packtype.select",
            value: form.medPackType,
            onChange: (e) => setForm({ medPackType: e.target.value }),
            className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring",
            children: Object.values(PackType).map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: pt, children: pt }, pt))
          }
        )
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            "data-ocid": "product.med_controlled.checkbox",
            type: "checkbox",
            id: "medControlled",
            checked: form.medControlled,
            onChange: (e) => setForm({ medControlled: e.target.checked }),
            className: "w-4 h-4 rounded border-input accent-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "medControlled", className: "text-sm font-medium", children: "Controlled Medicine" })
      ] })
    ] })
  ] });
}
const UNDER_GARMENT_SIZES = {
  Man: ["S", "M", "L", "XL", "XXL"],
  Woman: [
    "28A",
    "30A",
    "32A",
    "32B",
    "34A",
    "34B",
    "34C",
    "36A",
    "36B",
    "36C",
    "36D",
    "38C",
    "38D",
    "38E",
    "40C",
    "40D",
    "40E"
  ],
  Children: [
    "0-3M",
    "3-6M",
    "6-12M",
    "1Y",
    "2Y",
    "3Y",
    "4Y",
    "5Y",
    "6Y",
    "7Y",
    "8Y",
    "9Y",
    "10Y",
    "11Y",
    "12Y",
    "13Y",
    "14Y",
    "15Y",
    "16Y"
  ]
};
const BOTTOM_WEAR_KEYWORDS = [
  "jeans",
  "trouser",
  "trousers",
  "pant",
  "pants",
  "shorts",
  "legging",
  "leggings",
  "skirt",
  "palazzo",
  "chino",
  "chinos",
  "jogger",
  "joggers",
  "capri",
  "denim"
];
const BOTTOM_WEAR_SIZES = [
  "24",
  "26",
  "28",
  "30",
  "32",
  "34",
  "36",
  "38",
  "40",
  "42",
  "44",
  "46",
  "48",
  "50",
  "52"
];
const ALPHA_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
function getSizeOptionsForClothingItem(itemName, gender) {
  const lower = itemName.trim().toLowerCase();
  if (lower.startsWith("under garment")) {
    if (gender && UNDER_GARMENT_SIZES[gender]) {
      return UNDER_GARMENT_SIZES[gender];
    }
    return [];
  }
  if (BOTTOM_WEAR_KEYWORDS.some((kw) => lower.includes(kw))) {
    if (gender === "Children") {
      return [
        "1Y",
        "2Y",
        "3Y",
        "4Y",
        "5Y",
        "6Y",
        "7Y",
        "8Y",
        "9Y",
        "10Y",
        "11Y",
        "12Y",
        "14Y",
        "16Y"
      ];
    }
    if (gender === "Woman") {
      return ["24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44"];
    }
    return BOTTOM_WEAR_SIZES;
  }
  if (gender === "Children") {
    return [
      "0-3M",
      "3-6M",
      "6-12M",
      "1Y",
      "2Y",
      "3Y",
      "4Y",
      "5Y",
      "6Y",
      "7Y",
      "8Y",
      "9Y",
      "10Y",
      "11Y",
      "12Y",
      "14Y",
      "16Y"
    ];
  }
  return ALPHA_SIZES;
}
const CLOTHING_ITEM_CATEGORIES = [
  { label: "T-Shirt", value: "T-Shirt" },
  { label: "Shirt", value: "Shirt" },
  { label: "Kurti", value: "Kurti" },
  { label: "Jeans", value: "Jeans" },
  { label: "Trousers", value: "Trousers" },
  { label: "Shorts", value: "Shorts" },
  { label: "Skirt", value: "Skirt" },
  { label: "Dress", value: "Dress" },
  { label: "Box Dress", value: "Box Dress" },
  { label: "Jacket", value: "Jacket" },
  { label: "Under Garment", value: "Under Garment" }
];
const CLOTHING_GENDERS = [
  { label: "👨 MAN", value: "Man" },
  { label: "👩 WOMAN", value: "Woman" },
  { label: "👦 CHILDREN", value: "Children" }
];
function ClothingEngineForm({
  form,
  setForm,
  errors
}) {
  const isUnderGarment = form.clothItem.toLowerCase().startsWith("under garment");
  const isBottomWear = BOTTOM_WEAR_KEYWORDS.some(
    (kw) => form.clothItem.toLowerCase().includes(kw)
  );
  const gender = form.clothGender;
  const sizes = reactExports.useMemo(
    () => getSizeOptionsForClothingItem(form.clothItem, gender),
    [form.clothItem, gender]
  );
  const prevItemRef = reactExports.useRef(form.clothItem);
  reactExports.useEffect(() => {
    if (prevItemRef.current === form.clothItem) return;
    prevItemRef.current = form.clothItem;
    const patch = { clothSize: "" };
    if (!form.clothItem.toLowerCase().startsWith("under garment")) {
      patch.clothGender = "";
    }
    setForm(patch);
  }, [form.clothItem, setForm]);
  const prevGenderRef = reactExports.useRef(gender);
  reactExports.useEffect(() => {
    if (prevGenderRef.current === gender) return;
    prevGenderRef.current = gender;
    if (!gender) return;
    const newSizes = getSizeOptionsForClothingItem(form.clothItem, gender);
    if (form.clothSize && !newSizes.includes(form.clothSize)) {
      setForm({ clothSize: "" });
    }
  }, [gender, form.clothItem, form.clothSize, setForm]);
  const handleCategorySelect = (value) => {
    setForm({ clothItem: value, clothGender: "", clothSize: "" });
  };
  const handleGenderSelect = (g) => {
    if (isUnderGarment) {
      setForm({
        clothGender: g,
        clothItem: `Under Garment - ${g}`,
        clothSize: ""
      });
    } else {
      setForm({ clothGender: g, clothSize: "" });
    }
  };
  const sizeLabel = (() => {
    if (isUnderGarment) {
      if (gender === "Woman") return "Bra Size *";
      if (gender === "Children") return "Age / Year Size *";
      return "Size *";
    }
    if (isBottomWear) {
      if (gender === "Children") return "Age / Year Size *";
      return "Waist Size *";
    }
    if (gender === "Children") return "Age / Year Size *";
    return "Size *";
  })();
  const showSizes = gender !== "" && sizes.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Clothing Details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-md", children: "Each size+color combination is tracked separately as its own stock" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Brand",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.cloth_brand.input",
            value: form.clothBrand,
            onChange: (e) => setForm({ clothBrand: e.target.value }),
            placeholder: "Levi's"
          }
        )
      }),
      fieldRow({
        label: "Item Name",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.cloth_item.input",
            value: isUnderGarment ? "Under Garment" : form.clothItem,
            onChange: (e) => {
              const val = e.target.value;
              setForm({ clothItem: val, clothGender: "", clothSize: "" });
            },
            placeholder: "e.g. Jeans, T-Shirt, Shirt, Kurti"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { className: "text-xs text-muted-foreground", children: "Quick Select Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: CLOTHING_ITEM_CATEGORIES.map((cat) => {
        const isActive = isUnderGarment ? cat.value === "Under Garment" : form.clothItem === cat.value;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `product.cloth_category.${cat.value.toLowerCase().replace(/\s+/g, "_")}`,
            onClick: () => handleCategorySelect(cat.value),
            className: `px-3 py-1 text-xs rounded-md border font-medium transition-colors ${isActive ? cat.value === "Under Garment" ? "bg-purple-600 text-white border-purple-600" : "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
            children: cat.label
          },
          cat.value
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `space-y-2 rounded-xl p-3 border ${isUnderGarment ? "bg-purple-50/60 border-purple-200" : "bg-indigo-50/60 border-indigo-200"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 ${isUnderGarment ? "text-purple-800" : "text-indigo-800"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isUnderGarment ? "👕" : "👗" }),
                isUnderGarment ? "Under Garment — Select Type" : "Clothing — Select Type"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: CLOTHING_GENDERS.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `product.cloth_gender.${value.toLowerCase()}`,
              onClick: () => handleGenderSelect(value),
              className: `py-2.5 text-sm font-semibold rounded-lg border-2 transition-all ${gender === value ? isUnderGarment ? "bg-purple-600 text-white border-purple-600 shadow-md scale-[1.03]" : "bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.03]" : isUnderGarment ? "border-purple-300 bg-white text-purple-800 hover:bg-purple-100" : "border-indigo-300 bg-white text-indigo-800 hover:bg-indigo-100"}`,
              children: label
            },
            value
          )) }),
          !gender && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `text-xs flex items-center gap-1 mt-1 ${isUnderGarment ? "text-purple-600" : "text-indigo-600"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                "Please select a type to see available sizes"
              ]
            }
          )
        ]
      }
    ),
    showSizes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: sizeLabel,
        error: errors.clothSize,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `product.cloth_size.${s.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
              onClick: () => setForm({ clothSize: s }),
              className: `px-3 py-1 text-xs rounded-md border font-medium transition-colors ${form.clothSize === s ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
              children: s
            },
            s
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { className: "text-xs text-muted-foreground", children: "Custom Size:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "product.cloth_size_custom.input",
                  value: sizes.includes(form.clothSize) ? "" : form.clothSize,
                  onChange: (e) => setForm({ clothSize: e.target.value }),
                  placeholder: "Enter custom size...",
                  className: "text-xs",
                  onKeyDown: (e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "product.cloth_size_custom_add.button",
                  disabled: !!(sizes.includes(form.clothSize) ? "" : form.clothSize) === false,
                  onClick: () => {
                    const val = (sizes.includes(form.clothSize) ? "" : form.clothSize).trim();
                    if (val) setForm({ clothSize: val });
                  },
                  className: "px-3 py-1 text-xs rounded-md border font-medium border-primary text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
                  children: "Add"
                }
              )
            ] })
          ] })
        ] })
      }),
      fieldRow({
        label: "Color",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.cloth_color.input",
            value: form.clothColor,
            onChange: (e) => setForm({ clothColor: e.target.value }),
            placeholder: "Blue"
          }
        )
      })
    ] }),
    !gender && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: fieldRow({
      label: "Color",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "product.cloth_color.input",
          value: form.clothColor,
          onChange: (e) => setForm({ clothColor: e.target.value }),
          placeholder: "Blue"
        }
      )
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
const FOOTWEAR_SIZES = {
  Man: [
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13"
  ],
  Woman: [
    "3",
    "3.5",
    "4",
    "4.5",
    "5",
    "5.5",
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9"
  ],
  Children: [
    "0-3M",
    "3-6M",
    "6-12M",
    "1Y",
    "2Y",
    "3Y",
    "4Y",
    "5Y",
    "6Y",
    "7Y",
    "8Y",
    "9Y",
    "10Y",
    "11Y",
    "12Y",
    "13Y",
    "14Y",
    "15Y",
    "16Y"
  ]
};
const FOOTWEAR_GENDERS = [
  { label: "👨 MAN", value: "Man" },
  { label: "👩 WOMAN", value: "Woman" },
  { label: "👦 CHILDREN", value: "Children" }
];
function getSizeOptionsForFootwear(gender) {
  if (gender && FOOTWEAR_SIZES[gender]) return FOOTWEAR_SIZES[gender];
  return [];
}
function FootwearEngineForm({
  form,
  setForm,
  errors
}) {
  const gender = form.footGender;
  const sizes = reactExports.useMemo(() => getSizeOptionsForFootwear(gender), [gender]);
  const prevGenderRef = reactExports.useRef(gender);
  reactExports.useEffect(() => {
    if (prevGenderRef.current === gender) return;
    prevGenderRef.current = gender;
    if (!gender) return;
    const newSizes = FOOTWEAR_SIZES[gender] ?? [];
    if (form.footSize && !newSizes.includes(form.footSize)) {
      setForm({ footSize: "" });
    }
  }, [gender, form.footSize, setForm]);
  const handleGenderSelect = (g) => {
    setForm({ footGender: g, footSize: "" });
  };
  const showSizes = !!gender && sizes.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Footwear Details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Brand",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.foot_brand.input",
            value: form.footBrand,
            onChange: (e) => setForm({ footBrand: e.target.value }),
            placeholder: "Nike"
          }
        )
      }),
      fieldRow({
        label: "Model",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.foot_model.input",
            value: form.footModel,
            onChange: (e) => setForm({ footModel: e.target.value }),
            placeholder: "Air Max 90"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 bg-indigo-50/60 border border-indigo-200 rounded-xl p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-indigo-800 uppercase tracking-wide flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "👟" }),
        " Footwear — Select Type"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: FOOTWEAR_GENDERS.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.foot_gender.${value.toLowerCase()}`,
          onClick: () => handleGenderSelect(value),
          className: `py-2.5 text-sm font-semibold rounded-lg border-2 transition-all ${gender === value ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.03]" : "border-indigo-300 bg-white text-indigo-800 hover:bg-indigo-100"}`,
          children: label
        },
        value
      )) }),
      !gender && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-indigo-600 flex items-center gap-1 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
        "Please select a type to see available sizes"
      ] }),
      errors.footGender && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
        errors.footGender
      ] })
    ] }),
    showSizes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: fieldRow({
      label: gender === "Children" ? "Age / Year Size *" : "UK Size *",
      error: errors.footSize,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `product.foot_size.${s.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`,
            onClick: () => setForm({ footSize: s }),
            className: `px-3 py-1 text-xs rounded-md border font-medium transition-colors ${form.footSize === s ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
            children: s
          },
          s
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.foot_size_custom.input",
            value: sizes.includes(form.footSize) ? "" : form.footSize,
            onChange: (e) => setForm({ footSize: e.target.value }),
            placeholder: "Custom size..."
          }
        )
      ] })
    }) }),
    gender && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Size System",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mt-1", children: Object.values(SizeSystem).map((ss) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `product.foot_sizesystem.${ss.toLowerCase()}`,
            onClick: () => setForm({ footSizeSystem: ss }),
            className: `flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.footSizeSystem === ss ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
            children: ss
          },
          ss
        )) })
      }),
      fieldRow({
        label: "Color",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.foot_color.input",
            value: form.footColor,
            onChange: (e) => setForm({ footColor: e.target.value }),
            placeholder: "White"
          }
        )
      })
    ] }),
    !gender && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: fieldRow({
      label: "Color",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "product.foot_color.input",
          value: form.footColor,
          onChange: (e) => setForm({ footColor: e.target.value }),
          placeholder: "White"
        }
      )
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function GroceryEngineForm({
  form,
  setForm
}) {
  const units = ["KG", "GM", "Litre", "ML", "PCS", "Dozen"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Grocery Details" }),
    fieldRow({
      label: "Default Unit",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: units.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.groc_unit.${u.toLowerCase()}`,
          onClick: () => setForm({ grocUnit: u, unit: u }),
          className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.grocUnit === u ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
          children: u
        },
        u
      )) })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          "data-ocid": "product.groc_decimal.checkbox",
          type: "checkbox",
          id: "grocDecimal",
          checked: form.grocDecimal,
          onChange: (e) => setForm({ grocDecimal: e.target.checked }),
          className: "w-4 h-4 rounded border-input accent-primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "grocDecimal", className: "text-sm text-muted-foreground", children: "Allow decimal quantities (e.g. 0.5 KG)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function StationeryEngineForm({
  form,
  setForm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Stationery Details" }),
    fieldRow({
      label: "Sub Type",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: Object.values(StationerySubType).map((st) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.stat_subtype.${st.toLowerCase()}`,
          onClick: () => setForm({ statSubType: st }),
          className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.statSubType === st ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
          children: st
        },
        st
      )) })
    }),
    form.statSubType === StationerySubType.Book && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      fieldRow({
        label: "Class",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.stat_class.input",
            value: form.statBookClass,
            onChange: (e) => setForm({ statBookClass: e.target.value }),
            placeholder: "6"
          }
        )
      }),
      fieldRow({
        label: "Subject",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.stat_subject.input",
            value: form.statBookSubject,
            onChange: (e) => setForm({ statBookSubject: e.target.value }),
            placeholder: "English"
          }
        )
      }),
      fieldRow({
        label: "Medium",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.stat_medium.input",
            value: form.statBookMedium,
            onChange: (e) => setForm({ statBookMedium: e.target.value }),
            placeholder: "Hindi"
          }
        )
      })
    ] }),
    form.statSubType === StationerySubType.Notebook && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Size",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.stat_nbsize.input",
            value: form.statNbSize,
            onChange: (e) => setForm({ statNbSize: e.target.value }),
            placeholder: "A4"
          }
        )
      }),
      fieldRow({
        label: "Pages",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.stat_nbpages.input",
            type: "number",
            min: "0",
            value: form.statNbPages,
            onChange: (e) => setForm({ statNbPages: e.target.value }),
            placeholder: "200"
          }
        )
      })
    ] }),
    form.statSubType === StationerySubType.Pen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Brand",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.stat_penbrand.input",
            value: form.statPenBrand,
            onChange: (e) => setForm({ statPenBrand: e.target.value }),
            placeholder: "Cello"
          }
        )
      }),
      fieldRow({
        label: "Color",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.stat_pencolor.input",
            value: form.statPenColor,
            onChange: (e) => setForm({ statPenColor: e.target.value }),
            placeholder: "Blue"
          }
        )
      })
    ] }),
    (form.statSubType === StationerySubType.File || form.statSubType === StationerySubType.Other) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      fieldRow({
        label: "Item Name",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.stat_othername.input",
            value: form.statOtherName,
            onChange: (e) => setForm({ statOtherName: e.target.value }),
            placeholder: "A4 Document File"
          }
        )
      }),
      fieldRow({
        label: "Description",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.stat_otherdesc.input",
            value: form.statOtherDesc,
            onChange: (e) => setForm({ statOtherDesc: e.target.value }),
            placeholder: "Optional description"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function RestaurantEngineForm({
  form,
  setForm
}) {
  const units = ["Plate", "Bowl", "Glass", "Half", "Full", "PCS"];
  const catStyles = {
    [RestaurantCategory$1.Veg]: "bg-green-100 text-green-800 border-green-300",
    [RestaurantCategory$1.NonVeg]: "bg-red-100 text-red-800 border-red-300",
    [RestaurantCategory$1.Vegan]: "bg-yellow-100 text-yellow-800 border-yellow-300"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Menu Details" }),
    fieldRow({
      label: "Category",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: Object.values(RestaurantCategory$1).map((rc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.rest_category.${rc.toLowerCase()}`,
          onClick: () => setForm({ restCategory: rc }),
          className: `flex-1 py-2 text-xs font-semibold rounded-md border transition-colors ${form.restCategory === rc ? catStyles[rc] : "border-input bg-background hover:bg-muted"}`,
          children: rc === RestaurantCategory$1.NonVeg ? "Non-Veg" : rc
        },
        rc
      )) })
    }),
    fieldRow({
      label: "Serving Unit",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: units.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.rest_unit.${u.toLowerCase()}`,
          onClick: () => setForm({ restUnit: u, unit: u }),
          className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.restUnit === u ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
          children: u
        },
        u
      )) })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function AutoPartsEngineForm({
  form,
  setForm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Auto Parts Details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Vehicle Brand",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.auto_vbrand.input",
            value: form.autoVehicleBrand,
            onChange: (e) => setForm({ autoVehicleBrand: e.target.value }),
            placeholder: "Hero"
          }
        )
      }),
      fieldRow({
        label: "Vehicle Model",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.auto_vmodel.input",
            value: form.autoVehicleModel,
            onChange: (e) => setForm({ autoVehicleModel: e.target.value }),
            placeholder: "Splendor"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Part Name",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.auto_partname.input",
            value: form.autoPartName,
            onChange: (e) => setForm({ autoPartName: e.target.value }),
            placeholder: "Brake Shoe"
          }
        )
      }),
      fieldRow({
        label: "Part No (optional)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.auto_partno.input",
            value: form.autoPartNo,
            onChange: (e) => setForm({ autoPartNo: e.target.value }),
            placeholder: "HS-BRK-001"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function HardwareEngineForm({
  form,
  setForm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Hardware Details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "SKU",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.hw_sku.input",
            value: form.hwSku,
            onChange: (e) => setForm({ hwSku: e.target.value }),
            placeholder: "HW-001"
          }
        )
      }),
      fieldRow({
        label: "Category",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.hw_category.input",
            value: form.hwCategory,
            onChange: (e) => setForm({ hwCategory: e.target.value }),
            placeholder: "Fasteners"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function JewelryEngineForm({
  form,
  setForm,
  errors,
  currencySymbol,
  metalRates
}) {
  const weightNum = Number(form.jwWeightGrams) || 0;
  const rateNum = Number(form.jwMetalRate) || 0;
  const makingNum = Number(form.jwMakingCharges) || 0;
  const autoPrice = (weightNum * rateNum + makingNum).toFixed(2);
  const hasAutoPrice = weightNum > 0 && rateNum > 0;
  const metalRatesRef = reactExports.useRef(metalRates);
  reactExports.useEffect(() => {
    metalRatesRef.current = metalRates;
  }, [metalRates]);
  const handleMetalSelect = reactExports.useCallback(
    (m) => {
      const rates = metalRatesRef.current;
      const patch = { jwMetal: m };
      if (rates == null ? void 0 : rates.available) {
        if (m === Metal.Gold) {
          const g22 = rates.gold22k;
          patch.jwMetalRate = String(Math.round(g22));
          patch.jwPurity = "22K";
        } else if (m === Metal.Silver) {
          patch.jwMetalRate = String(Math.round(rates.silver));
          patch.jwPurity = "99.9%";
        }
      }
      setForm(patch);
    },
    [setForm]
  );
  const handleCaratSelect = reactExports.useCallback(
    (carat) => {
      const rates = metalRatesRef.current;
      const patch = { jwPurity: carat };
      if (rates == null ? void 0 : rates.available) {
        if (carat === "24K") {
          const g24 = rates.gold24k;
          patch.jwMetalRate = String(Math.round(g24));
        } else {
          const g22 = rates.gold22k;
          patch.jwMetalRate = String(Math.round(g22));
        }
      }
      setForm(patch);
    },
    [setForm]
  );
  const metalRateLabel = (metalRates == null ? void 0 : metalRates.available) ? `Metal Rate (${currencySymbol}/gram) — auto-filled` : `Metal Rate (${currencySymbol}/gram)`;
  const metalRatePlaceholder = (metalRates == null ? void 0 : metalRates.available) ? "Auto-filled on metal/carat select" : "Enter rate per gram";
  const currentMetal = form.jwMetal ?? Metal.Gold;
  const currentCarat = (form.jwPurity ?? "22K") === "24K" ? "24K" : "22K";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Jewelry Details" }),
    fieldRow({
      label: "Metal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: Object.values(Metal).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.jw_metal.${m.toLowerCase()}`,
          onClick: () => handleMetalSelect(m),
          className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${currentMetal === m ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
          children: m
        },
        m
      )) })
    }),
    currentMetal === Metal.Gold && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { className: "text-sm font-medium text-foreground", children: "Carat (Purity)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["22K", "24K"].map((carat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `product.jw_carat.${carat.toLowerCase()}`,
          onClick: () => handleCaratSelect(carat),
          className: `flex-1 py-2 text-sm font-semibold rounded-lg border-2 transition-all ${currentCarat === carat ? "bg-amber-500 text-white border-amber-600 shadow-md" : "border-border bg-background text-muted-foreground hover:bg-amber-50 hover:border-amber-300"}`,
          children: [
            carat,
            (metalRates == null ? void 0 : metalRates.available) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-xs font-normal opacity-80", children: [
              currencySymbol,
              carat === "24K" ? Math.round(metalRates.gold24k).toLocaleString() : Math.round(metalRates.gold22k).toLocaleString(),
              "/g"
            ] })
          ]
        },
        carat
      )) })
    ] }),
    currentMetal === Metal.Silver && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-600 font-medium", children: "Purity:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-slate-800", children: "99.9% (Fine Silver)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Weight (grams)",
        error: errors.jwWeightGrams,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.jw_weight.input",
            type: "number",
            min: "0",
            step: "0.01",
            value: form.jwWeightGrams,
            onChange: (e) => setForm({ jwWeightGrams: e.target.value }),
            placeholder: "10.5"
          }
        )
      }),
      currentMetal !== Metal.Gold && currentMetal !== Metal.Silver ? fieldRow({
        label: "Purity",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.jw_purity.input",
            value: form.jwPurity ?? "950",
            onChange: (e) => setForm({ jwPurity: e.target.value }),
            placeholder: "950 or 95%"
          }
        )
      }) : fieldRow({
        label: metalRateLabel,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.jw_metalrate.input",
            type: "number",
            min: "0",
            value: form.jwMetalRate,
            onChange: (e) => setForm({ jwMetalRate: e.target.value }),
            placeholder: metalRatePlaceholder
          }
        )
      })
    ] }),
    currentMetal !== Metal.Gold && currentMetal !== Metal.Silver && fieldRow({
      label: metalRateLabel,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "product.jw_metalrate.input",
          type: "number",
          min: "0",
          value: form.jwMetalRate,
          onChange: (e) => setForm({ jwMetalRate: e.target.value }),
          placeholder: "Enter rate per gram"
        }
      )
    }),
    fieldRow({
      label: "Making Charges",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "product.jw_making.input",
          type: "number",
          min: "0",
          value: form.jwMakingCharges,
          onChange: (e) => setForm({ jwMakingCharges: e.target.value }),
          placeholder: "500"
        }
      )
    }),
    hasAutoPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/10 border border-accent/30 rounded-md px-3 py-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Auto Price: " }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-accent-foreground", children: [
        currencySymbol,
        autoPrice
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-2", children: [
        "(",
        form.jwWeightGrams,
        "g × ",
        form.jwMetalRate,
        " +",
        " ",
        form.jwMakingCharges || 0,
        " making)"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate ?? "",
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function SalonEngineForm({
  form,
  setForm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Service Details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Duration (minutes)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.salon_duration.input",
            type: "number",
            min: "1",
            value: form.salonDuration,
            onChange: (e) => setForm({ salonDuration: e.target.value }),
            placeholder: "30"
          }
        )
      }),
      fieldRow({
        label: "Staff Name (optional)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.salon_staff.input",
            value: form.salonStaff,
            onChange: (e) => setForm({ salonStaff: e.target.value }),
            placeholder: "Rahul"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function GeneralEngineForm({
  form,
  setForm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "Product Details" }),
    fieldRow({
      label: "Category",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "product.gen_category.input",
          value: form.genCategory,
          onChange: (e) => setForm({ genCategory: e.target.value, category: e.target.value }),
          placeholder: "Electronics, Food, etc."
        }
      )
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
const BUILDING_MATERIAL_TYPES = [
  "Cement",
  "Brick",
  "Sand",
  "Steel/Rod",
  "Pipe",
  "Tile",
  "Paint",
  "Wood/Timber",
  "Electrical",
  "Plumbing",
  "Hardware Fitting",
  "Glass",
  "Stone",
  "Waterproofing",
  "Other"
];
const BUILDING_MATERIAL_UNITS = [
  "Bag",
  "Ton",
  "PCS",
  "SqFt",
  "Meter",
  "Bundle",
  "Roll",
  "KG"
];
function BuildingMaterialEngineForm({
  form,
  setForm,
  errors
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "🏗️ Building Material Details" }),
    fieldRow({
      label: "Material Type / Category *",
      error: errors.bldMaterialType,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: BUILDING_MATERIAL_TYPES.slice(0, 8).map((mt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `product.bld_material_type.${mt.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
            onClick: () => setForm({
              bldMaterialType: mt,
              category: mt
            }),
            className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.bldMaterialType === mt ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
            children: mt
          },
          mt
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: BUILDING_MATERIAL_TYPES.slice(8).map((mt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `product.bld_material_type.${mt.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
            onClick: () => setForm({
              bldMaterialType: mt,
              category: mt
            }),
            className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.bldMaterialType === mt ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
            children: mt
          },
          mt
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.bld_material_type_custom.input",
            value: BUILDING_MATERIAL_TYPES.includes(
              form.bldMaterialType
            ) ? "" : form.bldMaterialType,
            onChange: (e) => setForm({
              bldMaterialType: e.target.value,
              category: e.target.value
            }),
            placeholder: "Or enter custom type...",
            className: errors.bldMaterialType ? "border-destructive" : ""
          }
        )
      ] })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Brand",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.bld_brand.input",
            value: form.bldBrand,
            onChange: (e) => setForm({ bldBrand: e.target.value }),
            placeholder: "e.g. Ultratech, JSW, Asian"
          }
        )
      }),
      fieldRow({
        label: "Grade / Quality",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.bld_grade.input",
            value: form.bldGrade,
            onChange: (e) => setForm({ bldGrade: e.target.value }),
            placeholder: "e.g. 53-Grade, TMT Fe500, First Class"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Size / Dimensions",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.bld_size.input",
            value: form.bldSizeDimensions,
            onChange: (e) => setForm({ bldSizeDimensions: e.target.value }),
            placeholder: "e.g. 50kg, 9x4.5x3 inch, 10mm x 12m"
          }
        )
      }),
      fieldRow({
        label: "Weight",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.bld_weight.input",
            value: form.bldWeight,
            onChange: (e) => setForm({ bldWeight: e.target.value }),
            placeholder: "e.g. 50 kg, 1 Ton"
          }
        )
      })
    ] }),
    fieldRow({
      label: "Color (for tiles, paint, glass)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "product.bld_color.input",
          value: form.bldColor,
          onChange: (e) => setForm({ bldColor: e.target.value }),
          placeholder: "e.g. Ivory White, Terracotta Red"
        }
      )
    }),
    fieldRow({
      label: "Unit",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: BUILDING_MATERIAL_UNITS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.bld_unit.${u.toLowerCase()}`,
          onClick: () => setForm({ unit: u }),
          className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.unit === u ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
          children: u
        },
        u
      )) })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
const ELEC_ITEM_CATEGORIES = [
  "Switch",
  "Switchboard/DB Box",
  "Wire/Cable",
  "MCB/Fuse/RCCB",
  "Conduit/Pipe",
  "Socket/Plug/Outlet",
  "LED/CFL/Bulb",
  "Fan",
  "Junction Box",
  "Earthing Material",
  "Tape/Accessories",
  "Electrical Tools",
  "Transformer/Inverter",
  "Capacitor/Motor",
  "Other"
];
const ELEC_BRANDS = [
  "Havells",
  "Anchor",
  "Schneider",
  "Legrand",
  "Polycab",
  "Finolex",
  "Orient",
  "Crompton",
  "Siemens",
  "ABB"
];
const ELEC_AMP_OPTIONS = [
  "1A",
  "2A",
  "4A",
  "6A",
  "10A",
  "13A",
  "16A",
  "20A",
  "25A",
  "32A",
  "40A",
  "50A",
  "63A",
  "80A",
  "100A",
  "N/A",
  "Custom"
];
const ELEC_VOLTAGE_OPTIONS = [
  "12V",
  "24V",
  "48V",
  "110V",
  "230V",
  "415V",
  "N/A",
  "Custom"
];
const ELEC_WATTAGE_OPTIONS = [
  "3W",
  "5W",
  "7W",
  "9W",
  "12W",
  "15W",
  "18W",
  "20W",
  "25W",
  "36W",
  "40W",
  "60W",
  "100W",
  "N/A",
  "Custom"
];
const ELEC_WIRE_GAUGE_OPTIONS = [
  "0.5mm",
  "0.75mm",
  "1mm",
  "1.5mm",
  "2.5mm",
  "4mm",
  "6mm",
  "10mm",
  "16mm",
  "25mm",
  "N/A",
  "Custom"
];
const ELEC_UNIT_OPTIONS = [
  "Piece",
  "Meter",
  "Roll (100m)",
  "Roll (200m)",
  "Box",
  "Set",
  "Bundle",
  "Pair",
  "Pack"
];
const ELEC_COLOR_OPTIONS = [
  "Red",
  "Black",
  "Yellow/Earth",
  "Green",
  "Blue",
  "White",
  "Orange",
  "Multi-core",
  "N/A"
];
function ElecDropdownCustom({
  label,
  options,
  value,
  customValue,
  ocidPrefix,
  onSelect,
  onCustomChange,
  error
}) {
  return fieldRow({
    label,
    error,
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `${ocidPrefix}.${o.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
          onClick: () => onSelect(o),
          className: `px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${value === o ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
          children: o
        },
        o
      )) }),
      value === "Custom" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": `${ocidPrefix}.custom_input`,
          value: customValue,
          onChange: (e) => onCustomChange(e.target.value),
          placeholder: "Enter custom value...",
          className: "text-xs"
        }
      )
    ] })
  });
}
function ElectricalEngineForm({
  form,
  setForm,
  errors
}) {
  const isWireCategory = form.elecItemCategory === "Wire/Cable";
  const isLightOrFan = form.elecItemCategory === "LED/CFL/Bulb" || form.elecItemCategory === "Fan";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "⚡ Electrical Details" }),
    fieldRow({
      label: "Item Category *",
      error: errors.elecItemCategory,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ELEC_ITEM_CATEGORIES.slice(0, 8).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `product.elec_category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
            onClick: () => setForm({ elecItemCategory: cat, category: cat }),
            className: `px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${form.elecItemCategory === cat ? "bg-amber-500 text-white border-amber-500" : "border-input bg-background hover:bg-muted"}`,
            children: cat
          },
          cat
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ELEC_ITEM_CATEGORIES.slice(8).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `product.elec_category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
            onClick: () => setForm({ elecItemCategory: cat, category: cat }),
            className: `px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${form.elecItemCategory === cat ? "bg-amber-500 text-white border-amber-500" : "border-input bg-background hover:bg-muted"}`,
            children: cat
          },
          cat
        )) }),
        errors.elecItemCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
          errors.elecItemCategory
        ] })
      ] })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Brand *",
        error: errors.elecBrandName,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.elec_brand.input",
              value: form.elecBrandName,
              onChange: (e) => setForm({ elecBrandName: e.target.value }),
              placeholder: "Havells, Anchor, Polycab...",
              list: "elec-brand-suggestions",
              className: errors.elecBrandName ? "border-destructive" : ""
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "elec-brand-suggestions", children: ELEC_BRANDS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b }, b)) })
        ] })
      }),
      fieldRow({
        label: "Model / Part No (optional)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.elec_partmodel.input",
            value: form.elecPartModel,
            onChange: (e) => setForm({ elecPartModel: e.target.value })
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50/70 border border-amber-200 rounded-xl p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-amber-800 uppercase tracking-wide flex items-center gap-1.5", children: "⚡ AMP Rating (Critical for Electrical Items)" }),
      ElecDropdownCustom({
        label: "AMP Rating",
        options: ELEC_AMP_OPTIONS,
        value: form.elecAmpRating,
        customValue: form.elecAmpCustom,
        ocidPrefix: "product.elec_amp",
        onSelect: (v) => setForm({ elecAmpRating: v }),
        onCustomChange: (v) => setForm({ elecAmpCustom: v })
      })
    ] }),
    ElecDropdownCustom({
      label: "Voltage Rating",
      options: ELEC_VOLTAGE_OPTIONS,
      value: form.elecVoltage,
      customValue: form.elecVoltageCustom,
      ocidPrefix: "product.elec_voltage",
      onSelect: (v) => setForm({ elecVoltage: v }),
      onCustomChange: (v) => setForm({ elecVoltageCustom: v })
    }),
    isLightOrFan && ElecDropdownCustom({
      label: "Wattage (for Bulbs/Fans)",
      options: ELEC_WATTAGE_OPTIONS,
      value: form.elecWattage,
      customValue: form.elecWattageCustom,
      ocidPrefix: "product.elec_wattage",
      onSelect: (v) => setForm({ elecWattage: v }),
      onCustomChange: (v) => setForm({ elecWattageCustom: v })
    }),
    isWireCategory && ElecDropdownCustom({
      label: "Wire Gauge (for Wire/Cable)",
      options: ELEC_WIRE_GAUGE_OPTIONS,
      value: form.elecWireGauge,
      customValue: form.elecWireGaugeCustom,
      ocidPrefix: "product.elec_gauge",
      onSelect: (v) => setForm({ elecWireGauge: v }),
      onCustomChange: (v) => setForm({ elecWireGaugeCustom: v })
    }),
    fieldRow({
      label: "Unit / Length",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ELEC_UNIT_OPTIONS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.elec_unit.${u.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
          onClick: () => setForm({ elecUnit: u, unit: u }),
          className: `px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${form.elecUnit === u ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
          children: u
        },
        u
      )) })
    }),
    fieldRow({
      label: "Color (for wire/cable)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ELEC_COLOR_OPTIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.elec_color.${c.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
          onClick: () => setForm({ elecColor: c }),
          className: `px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${form.elecColor === c ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
          children: c
        },
        c
      )) })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            "data-ocid": "product.elec_isi_certified.checkbox",
            type: "checkbox",
            id: "elecIsiCertified",
            checked: form.elecIsiCertified,
            onChange: (e) => setForm({ elecIsiCertified: e.target.checked }),
            className: "w-4 h-4 rounded border-input accent-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "elecIsiCertified", className: "text-sm font-medium", children: "ISI/CE Certified" })
      ] }),
      fieldRow({
        label: "Batch Number (optional)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.elec_batch.input",
            value: form.elecBatchNumber,
            onChange: (e) => setForm({ elecBatchNumber: e.target.value }),
            placeholder: "BT-2024-001"
          }
        )
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
const AGRO_PRODUCT_TYPES = [
  "Seeds",
  "Fertilizer",
  "Pesticide",
  "Farming Tools",
  "Animal Feed",
  "Crop Protection"
];
const AGRO_CROP_SUGGESTIONS = [
  "Wheat",
  "Rice",
  "Cotton",
  "Sugarcane",
  "Maize",
  "Vegetables",
  "Fruits",
  "Pulses",
  "Oilseeds",
  "General"
];
const AGRO_WEIGHT_UNITS = ["kg", "grams", "liters", "pieces", "bags"];
const FV_PRODUCT_TYPES = [
  "Fruit",
  "Vegetable",
  "Herb",
  "Dry Fruit",
  "Other"
];
const FV_UNITS = [
  "kg",
  "gram",
  "dozen",
  "piece",
  "bundle",
  "box",
  "tray"
];
const FV_SEASONAL_TAGS = ["All-Season", "Summer", "Winter", "Monsoon"];
const FV_VARIETY_SUGGESTIONS = [
  "Mango",
  "Apple",
  "Banana",
  "Orange",
  "Grapes",
  "Guava",
  "Papaya",
  "Tomato",
  "Potato",
  "Onion",
  "Carrot",
  "Spinach",
  "Cabbage",
  "Cauliflower",
  "Peas",
  "Garlic",
  "Ginger",
  "Coriander",
  "Mint",
  "Other"
];
function FruitsVegetablesEngineForm({
  form,
  setForm,
  errors
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "🍎 Fruits & Vegetables Details" }),
    fieldRow({
      label: "Product Type",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: FV_PRODUCT_TYPES.map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.fv_product_type.${pt.toLowerCase().replace(/\s+/g, "_")}`,
          onClick: () => setForm({ fvProductType: pt }),
          className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.fvProductType === pt ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
          children: pt
        },
        pt
      )) })
    }),
    fieldRow({
      label: "Variety / Name *",
      error: errors.fvVariety,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.fv_variety.input",
            value: form.fvVariety,
            onChange: (e) => setForm({ fvVariety: e.target.value }),
            placeholder: "e.g. Mango, Tomato, Spinach",
            list: "fv-variety-suggestions",
            className: errors.fvVariety ? "border-destructive" : ""
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "fv-variety-suggestions", children: FV_VARIETY_SUGGESTIONS.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v }, v)) })
      ] })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Unit *",
        error: errors.fvUnit,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: FV_UNITS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `product.fv_unit.${u}`,
            onClick: () => setForm({ fvUnit: u, unit: u }),
            className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.fvUnit === u ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
            children: u
          },
          u
        )) })
      }),
      fieldRow({
        label: "Season",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: FV_SEASONAL_TAGS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `product.fv_season.${s.toLowerCase().replace(/-/g, "_")}`,
            onClick: () => setForm({ fvSeasonalTag: s }),
            className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.fvSeasonalTag === s ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
            children: s
          },
          s
        )) })
      })
    ] }),
    fieldRow({
      label: "Origin / Source (Optional)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "product.fv_origin.input",
          value: form.fvOriginSource,
          onChange: (e) => setForm({ fvOriginSource: e.target.value }),
          placeholder: "e.g. Punjab Farm, Local Market"
        }
      )
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Best Before / Freshness Date (Optional)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.fv_freshness_date.input",
            type: "date",
            value: form.fvFreshnessDate,
            onChange: (e) => setForm({ fvFreshnessDate: e.target.value })
          }
        )
      }),
      fieldRow({
        label: "Batch Number (Optional)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.fv_batch.input",
            value: form.fvBatchNumber,
            onChange: (e) => setForm({ fvBatchNumber: e.target.value }),
            placeholder: "e.g. BT-2024-001"
          }
        )
      })
    ] })
  ] });
}
function AgroProductsEngineForm({
  form,
  setForm,
  errors
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1", children: "🌾 Agro Product Details" }),
    fieldRow({
      label: "Product Type *",
      error: errors.agroProductType,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: AGRO_PRODUCT_TYPES.map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `product.agro_product_type.${pt.toLowerCase().replace(/\s+/g, "_")}`,
          onClick: () => setForm({ agroProductType: pt }),
          className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.agroProductType === pt ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
          children: pt
        },
        pt
      )) })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Brand *",
        error: errors.agroBrand,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.agro_brand.input",
            value: form.agroBrand,
            onChange: (e) => setForm({ agroBrand: e.target.value }),
            placeholder: "e.g. Monsanto, Bayer, FCI",
            className: errors.agroBrand ? "border-destructive" : ""
          }
        )
      }),
      fieldRow({
        label: "Crop Type *",
        error: errors.agroCropType,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "product.agro_crop_type.input",
              value: form.agroCropType,
              onChange: (e) => setForm({ agroCropType: e.target.value }),
              placeholder: "e.g. Wheat, Rice, Cotton",
              list: "agro-crop-suggestions",
              className: errors.agroCropType ? "border-destructive" : ""
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "agro-crop-suggestions", children: AGRO_CROP_SUGGESTIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c }, c)) })
        ] })
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      fieldRow({
        label: "Weight / Quantity *",
        error: errors.agroWeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.agro_weight.input",
            type: "number",
            min: "0",
            step: "0.01",
            value: form.agroWeight,
            onChange: (e) => setForm({ agroWeight: e.target.value }),
            placeholder: "e.g. 10",
            className: errors.agroWeight ? "border-destructive" : ""
          }
        )
      }),
      fieldRow({
        label: "Unit",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: AGRO_WEIGHT_UNITS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `product.agro_unit.${u}`,
            onClick: () => setForm({ agroWeightUnit: u, unit: u }),
            className: `px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.agroWeightUnit === u ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`,
            children: u
          },
          u
        )) })
      })
    ] }),
    fieldRow({
      label: "Batch Number (Optional)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "product.agro_batch.input",
          value: form.agroBatchNumber,
          onChange: (e) => setForm({ agroBatchNumber: e.target.value }),
          placeholder: "e.g. BT-2024-001"
        }
      )
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionalExpiryField,
      {
        value: form.expiryDate,
        onChange: (v) => setForm({ expiryDate: v })
      }
    )
  ] });
}
function StockAdjustDialog({
  product,
  onClose,
  onAdjust
}) {
  const [delta, setDelta] = reactExports.useState("0");
  const [note, setNote] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const current = product.stock;
  const newStock = Math.max(0, current + Number(delta));
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAdjust(product.id, newStock, note);
      onClose();
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "stock_adjust.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
      "Adjust Stock — ",
      product.name
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-muted/50 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Current Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-lg text-foreground", children: [
          current,
          " ",
          product.unit
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { children: "Adjustment (+/-)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              "data-ocid": "stock_adjust.minus_button",
              onClick: () => setDelta((d) => String(Number(d) - 1)),
              className: "h-10 w-10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "stock_adjust.delta.input",
              type: "number",
              value: delta,
              onChange: (e) => setDelta(e.target.value),
              className: "text-center font-bold text-lg"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              "data-ocid": "stock_adjust.plus_button",
              onClick: () => setDelta((d) => String(Number(d) + 1)),
              className: "h-10 w-10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-primary/5 border border-primary/20 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "New Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-lg text-primary", children: [
          newStock,
          " ",
          product.unit
        ] })
      ] }),
      fieldRow({
        label: "Note (optional)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "stock_adjust.note.input",
            value: note,
            onChange: (e) => setNote(e.target.value),
            placeholder: "Received new stock, damaged goods, etc."
          }
        )
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            className: "flex-1",
            "data-ocid": "stock_adjust.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSubmit,
            disabled: loading,
            className: "flex-1",
            "data-ocid": "stock_adjust.confirm_button",
            children: loading ? "Saving..." : "Save Adjustment"
          }
        )
      ] })
    ] })
  ] }) });
}
function ProductDetailModal({
  product,
  currency,
  onClose,
  onEdit
}) {
  const currencySymbol = (() => {
    const map = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
      PKR: "₨"
    };
    return map[currency] ?? currency;
  })();
  const expiryDate = getProductExpiryDate(product);
  const isLow = product.stock <= product.minStock;
  const isExpiring = expiryDate ? isNearExpiry(expiryDate, 90) : false;
  const profit = product.retailPrice - product.costPrice;
  const marginPct = product.costPrice > 0 ? (profit / product.costPrice * 100).toFixed(1) : "—";
  const engineDetails = [];
  const ef = product.engineFields;
  if (ef.__kind__ === "Mobile") {
    const m = ef.Mobile;
    if (m.brand) engineDetails.push({ label: "Brand", value: m.brand });
    if (m.model) engineDetails.push({ label: "Model", value: m.model });
    if (m.imei) engineDetails.push({ label: "IMEI", value: m.imei });
    if (m.storage) engineDetails.push({ label: "Storage", value: m.storage });
    if (m.color) engineDetails.push({ label: "Color", value: m.color });
  } else if (ef.__kind__ === "Electronics") {
    const e = ef.Electronics;
    if (e.brand) engineDetails.push({ label: "Brand", value: e.brand });
    if (e.model) engineDetails.push({ label: "Model", value: e.model });
    if (e.serialNo)
      engineDetails.push({ label: "Serial No", value: e.serialNo });
    if (e.warrantyMonths)
      engineDetails.push({
        label: "Warranty",
        value: `${e.warrantyMonths} months`
      });
  } else if (ef.__kind__ === "Medical") {
    const m = ef.Medical;
    if (m.company) engineDetails.push({ label: "Company", value: m.company });
    if (m.batchNo) engineDetails.push({ label: "Batch No", value: m.batchNo });
    if (m.expiryDate)
      engineDetails.push({ label: "Expiry", value: m.expiryDate });
    if (m.composition)
      engineDetails.push({ label: "Composition", value: m.composition });
    engineDetails.push({ label: "Pack Type", value: m.packType });
    if (m.isControlled)
      engineDetails.push({ label: "Controlled", value: "Yes" });
  } else if (ef.__kind__ === "Clothing") {
    const c = ef.Clothing;
    if (c.brand) engineDetails.push({ label: "Brand", value: c.brand });
    if (c.itemName) engineDetails.push({ label: "Item", value: c.itemName });
    if (c.size) engineDetails.push({ label: "Size", value: c.size });
    if (c.color) engineDetails.push({ label: "Color", value: c.color });
  } else if (ef.__kind__ === "Footwear") {
    const f = ef.Footwear;
    if (f.brand) engineDetails.push({ label: "Brand", value: f.brand });
    if (f.model) engineDetails.push({ label: "Model", value: f.model });
    if (f.size)
      engineDetails.push({
        label: "Size",
        value: `${f.size} (${f.sizeSystem})`
      });
    if (f.color) engineDetails.push({ label: "Color", value: f.color });
  } else if (ef.__kind__ === "AutoParts") {
    const a = ef.AutoParts;
    if (a.vehicleBrand)
      engineDetails.push({ label: "Vehicle Brand", value: a.vehicleBrand });
    if (a.vehicleModel)
      engineDetails.push({ label: "Vehicle Model", value: a.vehicleModel });
    if (a.partName)
      engineDetails.push({ label: "Part Name", value: a.partName });
    if (a.partNo) engineDetails.push({ label: "Part No", value: a.partNo });
  } else if (ef.__kind__ === "Jewelry") {
    const j = ef.Jewelry;
    engineDetails.push({ label: "Metal", value: j.metal });
    if (j.weightGrams)
      engineDetails.push({ label: "Weight", value: `${j.weightGrams}g` });
    if (j.purity) engineDetails.push({ label: "Purity", value: j.purity });
    if (j.metalRate)
      engineDetails.push({
        label: "Metal Rate",
        value: `${currencySymbol}${j.metalRate}/g`
      });
    if (j.makingCharges)
      engineDetails.push({
        label: "Making Charges",
        value: `${currencySymbol}${j.makingCharges}`
      });
  } else if (ef.__kind__ === "BuildingMaterial") {
    const b = ef.BuildingMaterial;
    if (b.material_type)
      engineDetails.push({ label: "Material Type", value: b.material_type });
    if (b.brand) engineDetails.push({ label: "Brand", value: b.brand });
    if (b.grade) engineDetails.push({ label: "Grade", value: b.grade });
    if (b.size_dimensions)
      engineDetails.push({
        label: "Size/Dimensions",
        value: b.size_dimensions
      });
    if (b.weight) engineDetails.push({ label: "Weight", value: b.weight });
    if (b.color) engineDetails.push({ label: "Color", value: b.color });
  } else if (ef.__kind__ === "AgroProducts") {
    const a = ef.AgroProducts;
    if (a.productType)
      engineDetails.push({ label: "Product Type", value: a.productType });
    if (a.brand) engineDetails.push({ label: "Brand", value: a.brand });
    if (a.cropType)
      engineDetails.push({ label: "Crop Type", value: a.cropType });
    if (a.weight)
      engineDetails.push({
        label: "Weight",
        value: `${a.weight} ${a.weightUnit}`
      });
    if (a.batchNumber)
      engineDetails.push({ label: "Batch No", value: a.batchNumber });
    if (a.expiryDate)
      engineDetails.push({ label: "Expiry", value: a.expiryDate });
  } else if (ef.__kind__ === "Electrical") {
    const e = ef.Electrical;
    if (e.itemCategory)
      engineDetails.push({ label: "Category", value: e.itemCategory });
    if (e.brand) engineDetails.push({ label: "Brand", value: e.brand });
    if (e.ampereRating && e.ampereRating !== "N/A")
      engineDetails.push({ label: "AMP Rating", value: e.ampereRating });
    if (e.voltageRating && e.voltageRating !== "N/A")
      engineDetails.push({ label: "Voltage", value: e.voltageRating });
    if (e.wattage && e.wattage !== "N/A")
      engineDetails.push({ label: "Wattage", value: e.wattage });
    if (e.wireGauge && e.wireGauge !== "N/A")
      engineDetails.push({ label: "Wire Gauge", value: e.wireGauge });
    if (e.color && e.color !== "N/A")
      engineDetails.push({ label: "Color", value: e.color });
    if (e.model) engineDetails.push({ label: "Model/Part No", value: e.model });
    if (e.isiCertified)
      engineDetails.push({ label: "ISI/CE Certified", value: "Yes ✓" });
    if (e.batchNumber)
      engineDetails.push({ label: "Batch No", value: e.batchNumber });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "product_detail.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl pr-8", children: product.name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: product.category || ef.__kind__ }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: product.unit }),
            isLow && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs", children: "Low Stock" }),
            isExpiring && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-100 text-orange-700 border-orange-300 text-xs", children: "Near Expiry" }),
            !product.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Inactive" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Pricing & Profit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Retail" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: formatCurrency(product.retailPrice, currency) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Wholesale" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: formatCurrency(product.wholesalePrice, currency) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Cost" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: formatCurrency(product.costPrice, currency) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Profit Margin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `font-bold text-sm ${profit >= 0 ? "text-green-600" : "text-destructive"}`,
                    children: [
                      currencySymbol,
                      profit.toFixed(2)
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: `text-xs ${profit >= 0 ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"}`,
                    children: [
                      marginPct,
                      "%"
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Current Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-2xl font-bold ${isLow ? "text-destructive" : "text-foreground"}`,
                  children: product.stock
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: product.unit })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Min Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: product.minStock }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: product.unit })
            ] })
          ] }),
          engineDetails.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
              ef.__kind__,
              " Details"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-xl divide-y divide-border", children: engineDetails.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-4 py-2.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground max-w-[60%] text-right break-words", children: value })
                ]
              },
              label
            )) })
          ] }),
          expiryDate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center justify-between rounded-lg px-4 py-3 border ${isExpiring ? "bg-orange-50 border-orange-200" : "bg-muted/30 border-border"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Expiry Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `text-sm font-semibold ${isExpiring ? "text-orange-700" : "text-foreground"}`,
                    children: [
                      expiryDate,
                      isExpiring && " ⚠️"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                className: "flex-1",
                "data-ocid": "product_detail.close_button",
                children: "Close"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: onEdit,
                className: "flex-1 gap-2",
                "data-ocid": "product_detail.edit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" }),
                  "Edit Product"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function ProductModal({
  shopType,
  editProduct,
  currency,
  metalRates,
  shopId,
  suppliers,
  products,
  onClose,
  onSave
}) {
  const isEdit = !!editProduct;
  useStore((s) => s.shopConfig);
  const api = useApi();
  const [form, setFormState] = reactExports.useState(() => {
    const base = initialForm(shopType);
    if (editProduct) {
      const extracted = extractFormFromProduct(editProduct);
      return { ...base, ...extracted };
    }
    return base;
  });
  const [errors, setErrors] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(false);
  const [autoNameLocked, setAutoNameLocked] = reactExports.useState(false);
  const [showPriceCompare, setShowPriceCompare] = reactExports.useState(false);
  const [priceComparePurchases, setPriceComparePurchases] = reactExports.useState([]);
  const [priceCompareLoading, setPriceCompareLoading] = reactExports.useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = reactExports.useState(false);
  const handleBarcodeScanned = (barcode) => {
    setFormState((prev) => ({ ...prev, barcode }));
    setShowBarcodeScanner(false);
  };
  const defaultChargesLoaded = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (isEdit || defaultChargesLoaded.current || !api.ready) return;
    defaultChargesLoaded.current = true;
    void api.getDefaultCharges().then((defaults) => {
      if (defaults) {
        setFormState((prev) => ({
          ...prev,
          transportCost: defaults.defaultTransportCharge ?? prev.transportCost,
          labourCost: defaults.defaultLabourCharge ?? prev.labourCost
        }));
      }
    });
  }, [api.ready, api.getDefaultCharges, isEdit]);
  const setForm = reactExports.useCallback((patch) => {
    setFormState((prev) => ({ ...prev, ...patch }));
  }, []);
  const computedAutoName = reactExports.useMemo(() => {
    const snap = {
      name: form.name,
      mobileBrand: form.mobileBrand,
      mobileModel: form.mobileModel,
      mobileStorage: form.mobileStorage,
      mobileColor: form.mobileColor,
      mobileCategory: form.mobileCategory,
      mobileAccessoryType: form.mobileAccessoryType,
      mobileCompatibility: form.mobileCompatibility,
      mobileRam: form.mobileRam,
      mobileProcessor: form.mobileProcessor,
      mobileDisplaySize: form.mobileDisplaySize,
      elecBrand: form.elecBrand,
      elecModel: form.elecModel,
      medName: form.medName,
      medCompany: form.medCompany,
      clothBrand: form.clothBrand,
      clothItem: form.clothItem,
      clothColor: form.clothColor,
      clothSize: form.clothSize,
      footBrand: form.footBrand,
      footModel: form.footModel,
      footSize: form.footSize,
      footSizeSystem: form.footSizeSystem,
      statSubType: form.statSubType,
      statBookClass: form.statBookClass,
      statBookSubject: form.statBookSubject,
      statNbSize: form.statNbSize,
      statNbPages: form.statNbPages,
      statPenBrand: form.statPenBrand,
      statPenColor: form.statPenColor,
      statOtherName: form.statOtherName,
      autoVehicleBrand: form.autoVehicleBrand,
      autoPartName: form.autoPartName,
      restName: form.restName,
      restCategory: form.restCategory,
      hwSku: form.hwSku,
      jwMetal: form.jwMetal,
      jwWeightGrams: form.jwWeightGrams,
      salonServiceName: form.salonServiceName,
      salonDuration: form.salonDuration,
      genName: form.genName,
      bldBrand: form.bldBrand,
      bldMaterialType: form.bldMaterialType,
      bldGrade: form.bldGrade,
      bldSizeDimensions: form.bldSizeDimensions,
      agroProductType: form.agroProductType,
      agroBrand: form.agroBrand,
      agroCropType: form.agroCropType,
      agroWeight: form.agroWeight,
      agroWeightUnit: form.agroWeightUnit,
      fvProductType: form.fvProductType,
      fvVariety: form.fvVariety,
      fvUnit: form.fvUnit,
      fvSeasonalTag: form.fvSeasonalTag,
      elecBrandName: form.elecBrandName,
      elecAmpRating: form.elecAmpRating,
      elecAmpCustom: form.elecAmpCustom,
      elecWattage: form.elecWattage,
      elecWattageCustom: form.elecWattageCustom,
      elecItemCategory: form.elecItemCategory,
      elecWireGauge: form.elecWireGauge,
      elecWireGaugeCustom: form.elecWireGaugeCustom,
      elecColor: form.elecColor,
      elecUnit: form.elecUnit
    };
    return generateAutoName(shopType, snap);
  }, [
    shopType,
    form.name,
    form.mobileBrand,
    form.mobileModel,
    form.mobileStorage,
    form.mobileColor,
    form.mobileCategory,
    form.mobileAccessoryType,
    form.mobileCompatibility,
    form.mobileRam,
    form.mobileProcessor,
    form.mobileDisplaySize,
    form.elecBrand,
    form.elecModel,
    form.medName,
    form.medCompany,
    form.clothBrand,
    form.clothItem,
    form.clothColor,
    form.clothSize,
    form.footBrand,
    form.footModel,
    form.footSize,
    form.footSizeSystem,
    form.statSubType,
    form.statBookClass,
    form.statBookSubject,
    form.statNbSize,
    form.statNbPages,
    form.statPenBrand,
    form.statPenColor,
    form.statOtherName,
    form.autoVehicleBrand,
    form.autoPartName,
    form.restName,
    form.restCategory,
    form.hwSku,
    form.jwMetal,
    form.jwWeightGrams,
    form.salonServiceName,
    form.salonDuration,
    form.genName,
    form.bldBrand,
    form.bldMaterialType,
    form.bldGrade,
    form.bldSizeDimensions,
    form.agroProductType,
    form.agroBrand,
    form.agroCropType,
    form.agroWeight,
    form.agroWeightUnit,
    form.fvProductType,
    form.fvVariety,
    form.fvUnit,
    form.fvSeasonalTag,
    form.elecBrandName,
    form.elecAmpRating,
    form.elecAmpCustom,
    form.elecWattage,
    form.elecWattageCustom,
    form.elecItemCategory,
    form.elecWireGauge,
    form.elecWireGaugeCustom,
    form.elecColor,
    form.elecUnit
  ]);
  reactExports.useEffect(() => {
    if (autoNameLocked || !computedAutoName) return;
    setFormState((prev) => {
      if (prev.name === computedAutoName) return prev;
      return { ...prev, name: computedAutoName };
    });
  }, [computedAutoName, autoNameLocked]);
  const currencySymbol = (() => {
    const map = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£"
    };
    return map[currency] ?? currency;
  })();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm(shopType, form);
    if (isEdit && editProduct && form.barcode.trim()) {
      const barcodeConflict = products.find(
        (p) => p.barcode === form.barcode.trim() && p.id !== editProduct.id
      );
      if (barcodeConflict) {
        errs.barcode = "This barcode is already used by another product.";
      }
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const engineFields = buildEngineFields(shopType, form);
      const productName = form.name || form.genName || "Unnamed Product";
      const totalCostPrice = (Number(form.costPrice) || 0) + (Number(form.transportCost) || 0) + (Number(form.labourCost) || 0);
      const barcodeVal = form.barcode.trim() || void 0;
      if (isEdit && editProduct) {
        const input = {
          id: editProduct.id,
          shopId,
          name: productName,
          category: form.category,
          unit: form.unit,
          retailPrice: Number(form.retailPrice) || 0,
          wholesalePrice: Number(form.wholesalePrice) || 0,
          costPrice: totalCostPrice,
          transportCost: form.transportCost ? Number(form.transportCost) : void 0,
          labourCost: form.labourCost ? Number(form.labourCost) : void 0,
          stock: Number(form.stock) || 0,
          minStock: Number(form.minStock) || 0,
          isActive: true,
          barcode: barcodeVal,
          engineFields
        };
        await onSave(input, true, form.supplierId);
      } else {
        const input = {
          shopId,
          name: productName,
          category: form.category,
          unit: form.unit,
          retailPrice: Number(form.retailPrice) || 0,
          wholesalePrice: Number(form.wholesalePrice) || 0,
          costPrice: totalCostPrice,
          transportCost: form.transportCost ? Number(form.transportCost) : void 0,
          labourCost: form.labourCost ? Number(form.labourCost) : void 0,
          stock: Number(form.stock) || 0,
          minStock: Number(form.minStock) || 0,
          isActive: true,
          barcode: barcodeVal,
          shopType: shopType === BUILDING_MATERIAL_SHOP_TYPE ? ShopType.Hardware : shopType === FRUITS_VEGETABLES_SHOP_TYPE ? ShopType.AgroProducts : shopType,
          engineFields
        };
        await onSave(input, false, form.supplierId);
      }
    } catch (err) {
      console.error("Failed to save product:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setErrors({ submit: `Failed to save product: ${errMsg}` });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-2xl max-h-[90vh] overflow-y-auto",
        "data-ocid": "product_modal.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-xl", children: [
            isEdit ? "Edit Product" : "Add Product",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-sm font-normal text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded", children: shopType })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 pt-1", children: [
            shopType === ShopType.Mobile && /* @__PURE__ */ jsxRuntimeExports.jsx(MobileEngineForm, { form, setForm, errors }),
            shopType === ShopType.Electronics && /* @__PURE__ */ jsxRuntimeExports.jsx(ElectronicsEngineForm, { form, setForm }),
            shopType === ShopType.Medical && /* @__PURE__ */ jsxRuntimeExports.jsx(
              MedicalEngineForm,
              {
                form,
                setForm,
                errors
              }
            ),
            shopType === ShopType.Clothing && /* @__PURE__ */ jsxRuntimeExports.jsx(
              ClothingEngineForm,
              {
                form,
                setForm,
                errors
              }
            ),
            shopType === ShopType.Footwear && /* @__PURE__ */ jsxRuntimeExports.jsx(
              FootwearEngineForm,
              {
                form,
                setForm,
                errors
              }
            ),
            shopType === ShopType.Grocery && /* @__PURE__ */ jsxRuntimeExports.jsx(GroceryEngineForm, { form, setForm }),
            shopType === ShopType.Stationery && /* @__PURE__ */ jsxRuntimeExports.jsx(StationeryEngineForm, { form, setForm }),
            shopType === ShopType.Restaurant && /* @__PURE__ */ jsxRuntimeExports.jsx(RestaurantEngineForm, { form, setForm }),
            shopType === ShopType.AutoParts && /* @__PURE__ */ jsxRuntimeExports.jsx(AutoPartsEngineForm, { form, setForm }),
            shopType === ShopType.Hardware && /* @__PURE__ */ jsxRuntimeExports.jsx(HardwareEngineForm, { form, setForm }),
            shopType === ShopType.Jewelry && /* @__PURE__ */ jsxRuntimeExports.jsx(
              JewelryEngineForm,
              {
                form,
                setForm,
                errors,
                currencySymbol,
                metalRates
              }
            ),
            shopType === ShopType.Salon && /* @__PURE__ */ jsxRuntimeExports.jsx(SalonEngineForm, { form, setForm }),
            shopType === ShopType.General && /* @__PURE__ */ jsxRuntimeExports.jsx(GeneralEngineForm, { form, setForm }),
            shopType === BUILDING_MATERIAL_SHOP_TYPE && /* @__PURE__ */ jsxRuntimeExports.jsx(
              BuildingMaterialEngineForm,
              {
                form,
                setForm,
                errors
              }
            ),
            shopType === ShopType.AgroProducts && /* @__PURE__ */ jsxRuntimeExports.jsx(
              AgroProductsEngineForm,
              {
                form,
                setForm,
                errors
              }
            ),
            shopType === ShopType.Electrical && /* @__PURE__ */ jsxRuntimeExports.jsx(
              ElectricalEngineForm,
              {
                form,
                setForm,
                errors
              }
            ),
            shopType === FRUITS_VEGETABLES_SHOP_TYPE && /* @__PURE__ */ jsxRuntimeExports.jsx(
              FruitsVegetablesEngineForm,
              {
                form,
                setForm,
                errors
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label$1, { className: "text-sm font-medium flex items-center justify-between", children: [
                "Product Name",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-xs text-primary hover:underline",
                    onClick: () => setAutoNameLocked((l) => !l),
                    children: autoNameLocked ? "🔒 Manual" : "✨ Auto-generating"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "product.name.input",
                  value: form.name,
                  onChange: (e) => {
                    setAutoNameLocked(true);
                    setForm({ name: e.target.value });
                  },
                  placeholder: "Product name (auto-generated from fields above)",
                  className: "font-medium"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label$1, { className: "text-sm font-medium flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Barcode, { className: "w-4 h-4 text-muted-foreground" }),
                "Barcode (Optional)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "product.barcode.input",
                    value: form.barcode,
                    onChange: (e) => setForm({ barcode: e.target.value }),
                    placeholder: "Scan or type barcode...",
                    className: "font-mono text-sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "icon",
                    "data-ocid": "product.barcode_scan.button",
                    title: "Scan barcode with camera",
                    className: "shrink-0 h-10 w-10",
                    onClick: () => setShowBarcodeScanner(true),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary uppercase tracking-wide pb-1", children: "Pricing & Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                fieldRow({
                  label: `Retail Price (${currencySymbol}) *`,
                  error: errors.retailPrice,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "product.retail_price.input",
                      type: "number",
                      min: "0",
                      step: "0.01",
                      value: form.retailPrice,
                      onChange: (e) => setForm({ retailPrice: e.target.value }),
                      placeholder: "0.00",
                      className: errors.retailPrice ? "border-destructive" : ""
                    }
                  )
                }),
                fieldRow({
                  label: `Wholesale Price (${currencySymbol})`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "product.wholesale_price.input",
                      type: "number",
                      min: "0",
                      step: "0.01",
                      value: form.wholesalePrice,
                      onChange: (e) => setForm({ wholesalePrice: e.target.value }),
                      placeholder: "0.00"
                    }
                  )
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-lg p-3 space-y-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Stock Info & Cost Breakdown" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { className: "text-sm font-medium", children: "Supplier (Optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        "data-ocid": "product.supplier.select",
                        value: form.supplierId,
                        onChange: (e) => {
                          const sid = e.target.value;
                          const sup = suppliers.find((s) => s.id === sid);
                          const patch = {
                            supplierId: sid
                          };
                          if (sup == null ? void 0 : sup.defaultTransportCharge) {
                            patch.transportCost = sup.defaultTransportCharge;
                          }
                          setForm(patch);
                        },
                        className: "flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- No Supplier --" }),
                          suppliers.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s.id, children: [
                            s.name,
                            " (",
                            s.businessType,
                            ")",
                            s.defaultTransportCharge ? ` — Transport: ${s.defaultTransportCharge}` : ""
                          ] }, s.id))
                        ]
                      }
                    ),
                    isEdit && editProduct && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        "data-ocid": "product.price_compare.button",
                        className: "shrink-0 gap-1.5 h-10 text-xs whitespace-nowrap",
                        onClick: async () => {
                          setPriceCompareLoading(true);
                          setShowPriceCompare(true);
                          try {
                            const purchases = await api.getLastNPurchasesForProduct(
                              shopId,
                              editProduct.id,
                              BigInt(3)
                            );
                            setPriceComparePurchases(purchases);
                          } finally {
                            setPriceCompareLoading(false);
                          }
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-3.5 h-3.5" }),
                          "Compare"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                  fieldRow({
                    label: `Purchase Price (${currencySymbol})`,
                    error: errors.costPrice,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": "product.purchase_price.input",
                        type: "number",
                        min: "0",
                        step: "0.01",
                        value: form.costPrice,
                        onChange: (e) => setForm({ costPrice: e.target.value }),
                        placeholder: "0.00",
                        className: errors.costPrice ? "border-destructive" : ""
                      }
                    )
                  }),
                  fieldRow({
                    label: `Transport Cost (${currencySymbol})`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": "product.transport_cost.input",
                        type: "number",
                        min: "0",
                        step: "0.01",
                        value: form.transportCost,
                        onChange: (e) => setForm({ transportCost: e.target.value }),
                        placeholder: "0.00"
                      }
                    )
                  }),
                  fieldRow({
                    label: `Labour Cost (${currencySymbol})`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": "product.labour_cost.input",
                        type: "number",
                        min: "0",
                        step: "0.01",
                        value: form.labourCost,
                        onChange: (e) => setForm({ labourCost: e.target.value }),
                        placeholder: "0.00"
                      }
                    )
                  })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-card border border-primary/30 rounded-md px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Total Cost Price (auto)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-base font-bold text-primary",
                      "data-ocid": "product.total_cost_price.display",
                      children: [
                        currencySymbol,
                        ((Number(form.costPrice) || 0) + (Number(form.transportCost) || 0) + (Number(form.labourCost) || 0)).toFixed(2)
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-primary/5 border border-primary/20 rounded-md px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Cost Per Unit (auto)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-base font-bold text-primary/80",
                      "data-ocid": "product.cost_per_unit.display",
                      children: (() => {
                        const totalCost = (Number(form.costPrice) || 0) + (Number(form.transportCost) || 0) + (Number(form.labourCost) || 0);
                        const qty = Number(form.stock) || 0;
                        if (qty <= 0 || totalCost <= 0) return "—";
                        return `${currencySymbol}${(totalCost / qty).toFixed(2)}`;
                      })()
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                fieldRow({
                  label: "Stock Quantity",
                  error: errors.stock,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "product.stock.input",
                      type: "number",
                      min: "0",
                      value: form.stock,
                      onChange: (e) => setForm({ stock: e.target.value }),
                      placeholder: "0"
                    }
                  )
                }),
                fieldRow({
                  label: "Min Stock Level",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "product.min_stock.input",
                      type: "number",
                      min: "0",
                      value: form.minStock,
                      onChange: (e) => setForm({ minStock: e.target.value }),
                      placeholder: "5"
                    }
                  )
                }),
                fieldRow({
                  label: "Unit",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "product.unit.input",
                      value: form.unit,
                      onChange: (e) => setForm({ unit: e.target.value }),
                      placeholder: "PCS"
                    }
                  )
                })
              ] }),
              fieldRow({
                label: "Category",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "product.category.input",
                    value: form.category,
                    onChange: (e) => setForm({ category: e.target.value }),
                    placeholder: "e.g. Smartphones, Medicines, etc."
                  }
                )
              })
            ] }),
            (() => {
              const totalCost = (Number(form.costPrice) || 0) + (Number(form.transportCost) || 0) + (Number(form.labourCost) || 0);
              const qty = Number(form.stock) || 0;
              const costPerUnit = qty > 0 && totalCost > 0 ? totalCost / qty : totalCost;
              const retail = Number(form.retailPrice) || 0;
              if (!retail || costPerUnit <= 0) return null;
              const margin = retail - costPerUnit;
              const marginPct = margin / retail * 100;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Margin/Unit: " }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-semibold ${margin >= 0 ? "text-green-700" : "text-red-600"}`,
                      children: [
                        currencySymbol,
                        margin.toFixed(2)
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Margin %: " }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-semibold ${marginPct >= 0 ? "text-green-700" : "text-red-600"}`,
                      children: [
                        marginPct.toFixed(1),
                        "%"
                      ]
                    }
                  )
                ] })
              ] });
            })(),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1 border-t border-border", children: [
              errors.submit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "w-full flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2 mb-1",
                  "data-ocid": "product_modal.error_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
                    errors.submit
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: onClose,
                  className: "flex-1",
                  "data-ocid": "product_modal.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: loading,
                  className: "flex-1",
                  "data-ocid": "product_modal.submit_button",
                  children: loading ? "Saving..." : isEdit ? "Save Changes" : "Add Product"
                }
              )
            ] })
          ] })
        ]
      }
    ) }),
    showPriceCompare && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: () => setShowPriceCompare(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "price_compare.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-5 h-5 text-primary" }),
        "Price Comparison — Last 3 Purchases"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
        priceCompareLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-2",
            "data-ocid": "price_compare.loading_state",
            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-16 bg-muted/40 rounded-xl animate-pulse"
              },
              i
            ))
          }
        ) : priceComparePurchases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-8 text-muted-foreground",
            "data-ocid": "price_compare.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-10 h-10 mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No purchase history yet for this product." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 opacity-70", children: "Add supplier purchases to enable price comparison." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (() => {
          const cheapestIdx = priceComparePurchases.reduce(
            (minI, p, i) => Number(p.purchase.purchasePrice) + Number(p.purchase.transportCharge) < Number(
              priceComparePurchases[minI].purchase.purchasePrice
            ) + Number(
              priceComparePurchases[minI].purchase.transportCharge
            ) ? i : minI,
            0
          );
          return priceComparePurchases.map((item, idx) => {
            const purchaseDate = new Date(
              Number(item.purchase.purchaseDate) / 1e6
            ).toLocaleDateString();
            const totalCost = (Number(item.purchase.purchasePrice) || 0) + (Number(item.purchase.transportCharge) || 0);
            const isCheapest = idx === cheapestIdx;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `price_compare.item.${idx + 1}`,
                className: `border rounded-xl p-3 space-y-2 ${isCheapest ? "border-green-400 bg-green-50/60" : "border-border bg-card"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: item.supplierName }),
                      isCheapest && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-green-100 text-green-700 border border-green-300 px-2 py-0.5 rounded-full", children: "💰 Cheapest" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: purchaseDate })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Purchase" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: item.purchase.purchasePrice })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Transport" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: item.purchase.transportCharge || "0" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border border-primary/30 rounded-lg p-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-primary", children: totalCost.toFixed(2) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      "Qty: ",
                      item.purchase.quantity
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: isCheapest ? "default" : "outline",
                        "data-ocid": `price_compare.select.${idx + 1}`,
                        className: "h-8 text-xs",
                        onClick: () => {
                          setForm({
                            supplierId: item.purchase.supplierId,
                            costPrice: item.purchase.purchasePrice,
                            transportCost: item.purchase.transportCharge || "0"
                          });
                          ue.success(
                            `Filled from ${item.supplierName}`
                          );
                          setShowPriceCompare(false);
                        },
                        children: "Select"
                      }
                    )
                  ] })
                ]
              },
              item.purchase.id
            );
          });
        })() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setShowPriceCompare(false),
            className: "w-full",
            "data-ocid": "price_compare.close_button",
            children: "Close"
          }
        )
      ] })
    ] }) }),
    showBarcodeScanner && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BarcodeScanModal,
      {
        onScanned: handleBarcodeScanned,
        onClose: () => setShowBarcodeScanner(false)
      }
    )
  ] });
}
function BarcodeScanModal({ onScanned, onClose }) {
  const videoRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(null);
  const [error, setError] = reactExports.useState(null);
  const [scanning, setScanning] = reactExports.useState(false);
  const [manualBarcode, setManualBarcode] = reactExports.useState("");
  const detectorRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    async function startCamera() {
      if (!window.BarcodeDetector) {
        setError("camera_unsupported");
        return;
      }
      try {
        detectorRef.current = new window.BarcodeDetector({
          formats: [
            "ean_13",
            "ean_8",
            "code_128",
            "code_39",
            "qr_code",
            "upc_a",
            "upc_e",
            "itf"
          ]
        });
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        if (cancelled) {
          for (const track of stream.getTracks()) track.stop();
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setScanning(true);
        scanLoop();
      } catch {
        if (!cancelled) setError("camera_denied");
      }
    }
    async function scanLoop() {
      if (cancelled || !detectorRef.current || !videoRef.current) return;
      try {
        const codes = await detectorRef.current.detect(videoRef.current);
        if (codes.length > 0 && !cancelled) {
          cleanup();
          onScanned(codes[0].rawValue);
          return;
        }
      } catch {
      }
      if (!cancelled) rafRef.current = requestAnimationFrame(scanLoop);
    }
    function cleanup() {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current)
        for (const track of streamRef.current.getTracks()) track.stop();
    }
    startCamera();
    return cleanup;
  }, [onScanned]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
      "data-ocid": "product.barcode_scanner_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Scan Barcode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Point camera at product barcode" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: onClose,
              className: "h-8 w-8",
              "aria-label": "Close scanner",
              "data-ocid": "product.barcode_scanner_modal.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
          error === "camera_unsupported" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Camera scanner not supported" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your browser doesn't support the Barcode Detection API. Use manual entry below." })
          ] }) : error === "camera_denied" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Camera access denied" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Allow camera permission in your browser settings, then try again." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden bg-black aspect-[4/3]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                ref: videoRef,
                className: "w-full h-full object-cover",
                playsInline: true,
                muted: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 h-28 border-2 border-primary/80 rounded-lg relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -left-0.5 w-5 h-5 border-t-4 border-l-4 border-primary rounded-tl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 w-5 h-5 border-t-4 border-r-4 border-primary rounded-tr" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 -left-0.5 w-5 h-5 border-b-4 border-l-4 border-primary rounded-bl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-4 border-r-4 border-primary rounded-br" }),
              scanning && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-0.5 bg-primary animate-scan-line" })
            ] }) }),
            !scanning && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: "Or enter barcode manually" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "manual-barcode-input",
                  placeholder: "e.g. 8901234567890",
                  value: manualBarcode,
                  onChange: (e) => setManualBarcode(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && manualBarcode.trim())
                      onScanned(manualBarcode.trim());
                  },
                  className: "flex-1 h-10 text-sm font-mono",
                  autoComplete: "off",
                  "data-ocid": "product.barcode_manual_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: () => manualBarcode.trim() && onScanned(manualBarcode.trim()),
                  disabled: !manualBarcode.trim(),
                  className: "h-10 px-4 gap-1.5",
                  "data-ocid": "product.barcode_manual_submit",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                    "Find"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function getProductExpiryDate(product) {
  const ef = product.engineFields;
  if (ef.__kind__ === "Medical") return ef.Medical.expiryDate;
  if (ef.__kind__ === "AgroProducts") return ef.AgroProducts.expiryDate ?? "";
  const fields = ef[ef.__kind__];
  if (!fields) return "";
  const opt = fields.expiryDate;
  if (Array.isArray(opt) && opt.length > 0) return opt[0];
  return "";
}
function ProductRow({
  product,
  idx,
  currency,
  expiryThresholdDays,
  onEdit,
  onDelete,
  onQuickStock,
  onAdjustStock,
  onView
}) {
  const isLow = product.stock <= product.minStock;
  const expiryDate = getProductExpiryDate(product);
  const isExpiring = expiryDate ? isNearExpiry(expiryDate, expiryThresholdDays) : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border hover:bg-muted/30 transition-colors",
      "data-ocid": `product.item.${idx}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "font-medium text-foreground text-sm truncate max-w-[200px] hover:text-primary hover:underline text-left",
                onClick: () => onView(product),
                "data-ocid": `product.view_button.${idx}`,
                children: product.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: product.category || "—" })
          ] }),
          isLow && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs shrink-0", children: "Low Stock" }),
          isExpiring && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-100 text-orange-700 border-orange-300 text-xs shrink-0", children: "Near Expiry" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground hidden md:table-cell", children: product.unit }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-semibold text-foreground", children: formatCurrency(product.retailPrice, currency) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `product.stock_minus.${idx}`,
              onClick: () => onQuickStock(product, -1),
              className: "w-7 h-7 rounded border border-input flex items-center justify-center hover:bg-muted transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-sm font-bold min-w-[2.5rem] text-center ${isLow ? "text-destructive" : "text-foreground"}`,
              children: product.stock
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `product.stock_plus.${idx}`,
              onClick: () => onQuickStock(product, 1),
              className: "w-7 h-7 rounded border border-input flex items-center justify-center hover:bg-muted transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => onEdit(product),
              "data-ocid": `product.edit_button.${idx}`,
              className: "h-8 w-8",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8",
                "data-ocid": `product.more_button.${idx}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-3.5 h-3.5" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuContent,
              {
                align: "end",
                "data-ocid": `product.dropdown_menu.${idx}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DropdownMenuItem,
                    {
                      onClick: () => onView(product),
                      "data-ocid": `product.view_details.${idx}`,
                      children: "View Details"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DropdownMenuItem,
                    {
                      onClick: () => onAdjustStock(product),
                      "data-ocid": `product.adjust_stock.${idx}`,
                      children: "Adjust Stock"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    DropdownMenuItem,
                    {
                      onClick: () => onDelete(product),
                      className: "text-destructive",
                      "data-ocid": `product.delete_button.${idx}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 mr-2" }),
                        "Delete"
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function ProductCard({
  product,
  idx,
  currency,
  expiryThresholdDays,
  onEdit,
  onDelete,
  onQuickStock,
  onAdjustStock,
  onView
}) {
  const isLow = product.stock <= product.minStock;
  const expiryDate = getProductExpiryDate(product);
  const isExpiring = expiryDate ? isNearExpiry(expiryDate, expiryThresholdDays) : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 space-y-3",
      "data-ocid": `product.card.${idx}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "font-semibold text-foreground truncate block w-full text-left hover:text-primary",
                onClick: () => onView(product),
                "data-ocid": `product.card_view.${idx}`,
                children: product.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: product.category || product.unit })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            isLow && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs", children: "Low" }),
            isExpiring && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-100 text-orange-700 border-orange-300 text-xs", children: "Expiring" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  "data-ocid": `product.card_more.${idx}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-4 h-4" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DropdownMenuItem,
                  {
                    onClick: () => onView(product),
                    "data-ocid": `product.card_view.${idx}`,
                    children: "View Details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  DropdownMenuItem,
                  {
                    onClick: () => onEdit(product),
                    "data-ocid": `product.card_edit.${idx}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5 mr-2" }),
                      "Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DropdownMenuItem,
                  {
                    onClick: () => onAdjustStock(product),
                    "data-ocid": `product.card_adjust.${idx}`,
                    children: "Adjust Stock"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  DropdownMenuItem,
                  {
                    onClick: () => onDelete(product),
                    className: "text-destructive",
                    "data-ocid": `product.card_delete.${idx}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 mr-2" }),
                      "Delete"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-lg", children: formatCurrency(product.retailPrice, currency) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `product.card_minus.${idx}`,
                onClick: () => onQuickStock(product, -1),
                className: "w-8 h-8 rounded-md border border-input flex items-center justify-center hover:bg-muted transition-colors active:scale-95",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-base font-bold min-w-[2.5rem] text-center ${isLow ? "text-destructive" : "text-foreground"}`,
                children: product.stock
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `product.card_plus.${idx}`,
                onClick: () => onQuickStock(product, 1),
                className: "w-8 h-8 rounded-md border border-input flex items-center justify-center hover:bg-muted transition-colors active:scale-95",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ProductsPage() {
  const api = useApi();
  const navigate = useNavigate();
  const shopConfig = useStore((s) => s.shopConfig);
  const activeShopId = useStore((s) => s.activeShopId);
  const shopType = (shopConfig == null ? void 0 : shopConfig.shopType) ?? ShopType.General;
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "INR";
  const expiryThresholdDays = Number(
    (shopConfig == null ? void 0 : shopConfig.expiryAlertThresholdDays) ?? BigInt(90)
  );
  const [products, setProducts] = reactExports.useState([]);
  const [suppliers, setSuppliers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [filterCategory, setFilterCategory] = reactExports.useState("");
  const [sortField, setSortField] = reactExports.useState("name");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [showModal, setShowModal] = reactExports.useState(false);
  const [showQuickMenu, setShowQuickMenu] = reactExports.useState(false);
  const [editProduct, setEditProduct] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [stockAdjustTarget, setStockAdjustTarget] = reactExports.useState(null);
  const [viewProduct, setViewProduct] = reactExports.useState(null);
  const [metalRates, setMetalRates] = reactExports.useState(null);
  const [metalRatesLoading, setMetalRatesLoading] = reactExports.useState(false);
  const searchTimer = reactExports.useRef(void 0);
  const loadProducts = reactExports.useCallback(async () => {
    if (!api.ready) return;
    let cancelled = false;
    setLoading(true);
    const timeout = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 5e3);
    try {
      const [data, supplierList] = await Promise.all([
        api.listProducts({ isActive: true }),
        api.listSuppliersByShop(activeShopId ?? (shopConfig == null ? void 0 : shopConfig.shopName) ?? "")
      ]);
      if (!cancelled) {
        setProducts(data);
        setSuppliers(supplierList);
      }
    } finally {
      clearTimeout(timeout);
      if (!cancelled) setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [api, activeShopId, shopConfig == null ? void 0 : shopConfig.shopName]);
  reactExports.useEffect(() => {
    void loadProducts();
  }, [loadProducts]);
  const FALLBACK_RATES = { gold24k: 6200, gold22k: 5683, silver: 75 };
  const metalRateRetryTimer = reactExports.useRef(void 0);
  const loadMetalRatesRef = reactExports.useRef(
    async () => {
    }
  );
  const loadMetalRates = reactExports.useCallback(
    async (retryCount = 0) => {
      if (!api.ready) return;
      if (retryCount === 0) setMetalRatesLoading(true);
      try {
        const rates = await api.getMetalRates();
        if (rates.available) {
          setMetalRates(rates);
          setMetalRatesLoading(false);
          return;
        }
        try {
          await api.refreshMetalRates();
        } catch {
        }
        const freshRates = await api.getMetalRates();
        if (freshRates.available) {
          setMetalRates(freshRates);
          setMetalRatesLoading(false);
          return;
        }
        if (retryCount < 3) {
          setMetalRates(freshRates);
          if (metalRateRetryTimer.current)
            clearTimeout(metalRateRetryTimer.current);
          metalRateRetryTimer.current = setTimeout(
            () => void loadMetalRatesRef.current(retryCount + 1),
            3e3
          );
          return;
        }
        setMetalRates(freshRates);
      } catch {
        setMetalRates({
          gold24k: 0,
          gold22k: 0,
          silver: 0,
          lastUpdated: BigInt(0),
          available: false,
          isStale: false
        });
        if (retryCount < 3) {
          if (metalRateRetryTimer.current)
            clearTimeout(metalRateRetryTimer.current);
          metalRateRetryTimer.current = setTimeout(
            () => void loadMetalRatesRef.current(retryCount + 1),
            3e3
          );
        }
      } finally {
        if (retryCount >= 3) setMetalRatesLoading(false);
      }
    },
    [api]
  );
  reactExports.useEffect(() => {
    loadMetalRatesRef.current = loadMetalRates;
  }, [loadMetalRates]);
  reactExports.useEffect(() => {
    return () => {
      if (metalRateRetryTimer.current)
        clearTimeout(metalRateRetryTimer.current);
    };
  }, []);
  const handleRefreshRates = async () => {
    if (!api.ready) return;
    setMetalRatesLoading(true);
    try {
      await api.refreshMetalRates();
      const rates = await api.getMetalRates();
      setMetalRates(rates);
      if (rates.available) {
        ue.success("Metal rates updated successfully");
      } else {
        ue.info(
          "Live rates unavailable — using fallback rates. Enter manually if needed."
        );
      }
    } catch {
      ue.error("Could not refresh rates. Enter rates manually.");
    } finally {
      setMetalRatesLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (shopType === ShopType.Jewelry && api.ready) {
      void loadMetalRates(0);
    }
  }, [shopType, api.ready, loadMetalRates]);
  reactExports.useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (!searchTerm.trim()) {
      void loadProducts();
      return;
    }
    let cancelled = false;
    searchTimer.current = setTimeout(async () => {
      setLoading(true);
      const timeout = setTimeout(() => {
        if (!cancelled) setLoading(false);
      }, 5e3);
      try {
        const results = await api.searchProducts(
          activeShopId ?? (shopConfig == null ? void 0 : shopConfig.shopName) ?? "",
          searchTerm
        );
        if (!cancelled) setProducts(results);
      } finally {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [searchTerm, api, loadProducts, shopConfig, activeShopId]);
  const categories = reactExports.useMemo(() => {
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [products]);
  const filteredSorted = reactExports.useMemo(() => {
    let list = [...products];
    if (filterCategory)
      list = list.filter((p) => p.category === filterCategory);
    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "stock") cmp = a.stock - b.stock;
      else if (sortField === "price") cmp = a.retailPrice - b.retailPrice;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [products, filterCategory, sortField, sortDir]);
  const handleSave = async (input, isEdit, supplierId) => {
    const barcodeVal = input.barcode;
    if (barcodeVal) {
      const existing = products.find(
        (p) => p.barcode === barcodeVal && (!isEdit || p.id !== input.id)
      );
      if (existing) {
        ue.warning(
          `⚠️ Barcode already used by "${existing.name}" — saved anyway.`,
          {
            duration: 6e3
          }
        );
      }
    }
    if (!activeShopId) {
      ue.error("Shop not loaded. Please wait.");
      return;
    }
    try {
      if (isEdit) {
        await api.updateProduct(input);
        if (supplierId) {
          try {
            const upd = input;
            await api.createSupplierPurchase(
              activeShopId ?? (shopConfig == null ? void 0 : shopConfig.shopName) ?? "",
              supplierId,
              upd.id,
              upd.stock ?? 0,
              String(upd.costPrice ?? 0),
              upd.transportCost ? String(upd.transportCost) : "0",
              null
            );
          } catch {
            console.warn("Could not record supplier purchase on update");
          }
        }
        ue.success("Product updated successfully");
      } else {
        const created = await api.createProduct(input);
        if (supplierId && created) {
          try {
            const inp = input;
            await api.createSupplierPurchase(
              inp.shopId,
              supplierId,
              created.id,
              inp.stock,
              String(inp.costPrice),
              inp.transportCost ? String(inp.transportCost) : "0",
              null
            );
          } catch {
            console.warn("Could not record supplier purchase");
          }
        }
        ue.success("Product added successfully");
      }
      setShowModal(false);
      setEditProduct(null);
      void loadProducts();
    } catch (err) {
      console.error("handleSave error:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      ue.error(`Failed to save product: ${errMsg}`);
      throw err;
    }
  };
  const handleDelete = async () => {
    if (!deleteTarget) return;
    await api.deleteProduct(deleteTarget.id);
    ue.success(`"${deleteTarget.name}" deleted`);
    setDeleteTarget(null);
    void loadProducts();
  };
  const handleQuickStock = async (product, delta) => {
    if (!activeShopId) {
      ue.error("Shop not loaded. Please wait.");
      return;
    }
    const newStock = Math.max(0, product.stock + delta);
    const input = {
      id: product.id,
      shopId: activeShopId,
      name: product.name,
      category: product.category,
      unit: product.unit,
      retailPrice: product.retailPrice,
      wholesalePrice: product.wholesalePrice,
      costPrice: product.costPrice,
      stock: newStock,
      minStock: product.minStock,
      isActive: product.isActive,
      engineFields: product.engineFields
    };
    await api.updateProduct(input);
    setProducts(
      (prev) => prev.map((p) => p.id === product.id ? { ...p, stock: newStock } : p)
    );
  };
  const handleStockAdjust = async (id, newStock, _note) => {
    if (!activeShopId) {
      ue.error("Shop not loaded. Please wait.");
      return;
    }
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const input = {
      id: product.id,
      shopId: activeShopId,
      name: product.name,
      category: product.category,
      unit: product.unit,
      retailPrice: product.retailPrice,
      wholesalePrice: product.wholesalePrice,
      costPrice: product.costPrice,
      stock: newStock,
      minStock: product.minStock,
      isActive: product.isActive,
      engineFields: product.engineFields
    };
    await api.updateProduct(input);
    ue.success("Stock adjusted");
    setProducts(
      (prev) => prev.map((p) => p.id === id ? { ...p, stock: newStock } : p)
    );
  };
  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-4 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          products.length,
          " items · ",
          shopType,
          lowStockCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-destructive font-medium", children: [
            lowStockCount,
            " low stock"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => void navigate({ to: "/bulk-entry" }),
            className: "gap-2 shrink-0 flex",
            "data-ocid": "product.bulk_entry_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bulk Entry" })
            ]
          }
        ),
        shopType === ShopType.Restaurant && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowQuickMenu(true),
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors",
            children: "Quick Menu"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => {
              if (!activeShopId) return;
              setEditProduct(null);
              setShowModal(true);
            },
            disabled: !activeShopId,
            className: "gap-2 shrink-0",
            "data-ocid": "product.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Add Product" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Add" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-3 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "product.search_input",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Search products...",
            className: "pl-9 h-10"
          }
        ),
        searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSearchTerm(""),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            "data-ocid": "product.filter_category.select",
            value: filterCategory,
            onChange: (e) => setFilterCategory(e.target.value),
            className: "h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring appearance-none min-w-[140px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Categories" }),
              categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            "data-ocid": "product.sort.select",
            value: `${sortField}-${sortDir}`,
            onChange: (e) => {
              const [f, d] = e.target.value.split("-");
              setSortField(f);
              setSortDir(d);
            },
            className: "h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring appearance-none min-w-[140px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "name-asc", children: "Name A–Z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "name-desc", children: "Name Z–A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "stock-asc", children: "Stock: Low–High" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "stock-desc", children: "Stock: High–Low" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-asc", children: "Price: Low–High" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-desc", children: "Price: High–Low" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 md:p-6 space-y-4", children: [
      shopType === ShopType.Jewelry && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4",
          "data-ocid": "jewelry.metal_rates.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Live Metal Rates" }),
                ((metalRates == null ? void 0 : metalRates.isStale) || !(metalRates == null ? void 0 : metalRates.available) && (metalRates == null ? void 0 : metalRates.lastUpdated) && metalRates.lastUpdated > BigInt(0)) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-300",
                    "data-ocid": "jewelry.rates.stale_badge",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
                      (metalRates == null ? void 0 : metalRates.lastUpdated) && metalRates.lastUpdated > BigInt(0) ? `Stale — Last: ${new Date(Number(metalRates.lastUpdated) / 1e6).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Purani Rate"
                    ]
                  }
                ),
                (metalRates == null ? void 0 : metalRates.lastUpdated) && metalRates.lastUpdated > BigInt(0) && !(metalRates == null ? void 0 : metalRates.isStale) && metalRates.available && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "· Updated",
                  " ",
                  new Date(
                    Number(metalRates.lastUpdated) / 1e6
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: handleRefreshRates,
                  disabled: metalRatesLoading,
                  "data-ocid": "jewelry.refresh_rates.button",
                  className: "gap-1.5 h-8 text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      RefreshCw,
                      {
                        className: `w-3.5 h-3.5 ${metalRatesLoading ? "animate-spin" : ""}`
                      }
                    ),
                    "Refresh"
                  ]
                }
              )
            ] }),
            metalRatesLoading && !metalRates ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-4",
                "data-ocid": "jewelry.rates.loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 flex-1 bg-muted/40 rounded-lg animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 flex-1 bg-muted/40 rounded-lg animate-pulse" })
                ]
              }
            ) : (metalRates == null ? void 0 : metalRates.available) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 font-medium uppercase tracking-wide", children: "Gold / gram" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-600 font-semibold", children: "24K Pure" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-amber-800", children: [
                    getCurrencyConfig(currency).symbol,
                    Math.round(metalRates.gold24k).toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between border-t border-amber-200 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-600 font-semibold", children: "22K" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-bold text-amber-700", children: [
                    getCurrencyConfig(currency).symbol,
                    Math.round(metalRates.gold22k).toLocaleString()
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 border border-slate-200 rounded-lg px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 font-medium uppercase tracking-wide mb-0.5", children: "Silver / gram" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-slate-700", children: [
                  getCurrencyConfig(currency).symbol,
                  metalRates.silver.toLocaleString(void 0, {
                    maximumFractionDigits: 0
                  })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: "99.9% Fine" })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "jewelry.rates.error_state", className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 opacity-70 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 font-medium uppercase tracking-wide", children: "Gold / gram (est.)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-600 font-semibold", children: "24K" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-amber-800", children: [
                      getCurrencyConfig(currency).symbol,
                      FALLBACK_RATES.gold24k.toLocaleString()
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between border-t border-amber-200 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-600 font-semibold", children: "22K" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-bold text-amber-700", children: [
                      getCurrencyConfig(currency).symbol,
                      FALLBACK_RATES.gold22k.toLocaleString()
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 opacity-70", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 font-medium uppercase tracking-wide mb-0.5", children: "Silver / gram (est.)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-slate-700", children: [
                    getCurrencyConfig(currency).symbol,
                    FALLBACK_RATES.silver.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: "99.9% Fine" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
                metalRatesLoading ? "Fetching live rates..." : "Showing approximate rates — click Refresh for live rates or enter manually"
              ] })
            ] })
          ]
        }
      ),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "product.loading_state", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-16 bg-muted/40 rounded-xl animate-pulse"
        },
        i
      )) }) : filteredSorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "product.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-1", children: searchTerm || filterCategory ? "No products found" : "No products yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6", children: searchTerm || filterCategory ? "Try a different search or filter" : "Add your first product to get started managing inventory" }),
            !searchTerm && !filterCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: () => {
                  if (!activeShopId) return;
                  setEditProduct(null);
                  setShowModal(true);
                },
                disabled: !activeShopId,
                "data-ocid": "product.empty_add_button",
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  "Add First Product"
                ]
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Unit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Retail Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredSorted.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductRow,
            {
              product: p,
              idx: i + 1,
              currency,
              expiryThresholdDays,
              onEdit: (product) => {
                setEditProduct(product);
                setShowModal(true);
              },
              onDelete: setDeleteTarget,
              onQuickStock: handleQuickStock,
              onAdjustStock: setStockAdjustTarget,
              onView: setViewProduct
            },
            String(p.id)
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden space-y-3", children: filteredSorted.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductCard,
          {
            product: p,
            idx: i + 1,
            currency,
            expiryThresholdDays,
            onEdit: (product) => {
              setEditProduct(product);
              setShowModal(true);
            },
            onDelete: setDeleteTarget,
            onQuickStock: handleQuickStock,
            onAdjustStock: setStockAdjustTarget,
            onView: setViewProduct
          },
          String(p.id)
        )) })
      ] })
    ] }),
    viewProduct && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductDetailModal,
      {
        product: viewProduct,
        currency,
        onClose: () => setViewProduct(null),
        onEdit: () => {
          setEditProduct(viewProduct);
          setShowModal(true);
          setViewProduct(null);
        }
      }
    ),
    showModal && activeShopId && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductModal,
      {
        shopType,
        editProduct,
        currency,
        metalRates,
        shopId: activeShopId,
        suppliers,
        products,
        onClose: () => {
          setShowModal(false);
          setEditProduct(null);
        },
        onSave: handleSave
      }
    ),
    showQuickMenu && shopConfig && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RestaurantQuickMenuModal,
      {
        shopId: shopConfig.shopName,
        shopType: shopConfig.shopType,
        onClose: () => setShowQuickMenu(false),
        onProductsAdded: loadProducts,
        products,
        onUpdateProduct: async (input) => {
          await api.updateProduct(input);
          await loadProducts();
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: () => setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "product.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                '"',
                deleteTarget == null ? void 0 : deleteTarget.name,
                '"'
              ] }),
              "? This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "product.delete.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "product.delete.confirm_button",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    ),
    stockAdjustTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      StockAdjustDialog,
      {
        product: stockAdjustTarget,
        onClose: () => setStockAdjustTarget(null),
        onAdjust: handleStockAdjust
      }
    )
  ] });
}
export {
  ProductsPage
};
