import { m as createLucideIcon, r as reactExports, j as jsxRuntimeExports, z as useComposedRefs, Y as reactDomExports, v as ChevronDown, e as cn, C as Check, c as useApi, d as useStore, D as DateFormat, Z as BillStatus, X, f as Button, V as PaymentType, w as Receipt, B as Badge, _ as ReturnStatus } from "./index-T7Sl8NUk.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BBh_2gy7.js";
import { b as Primitive, i as useControllableState, j as useId, c as composeEventHandlers, o as useLayoutEffect2, a as Portal$1, u as useCallbackRef, h as hideOthers, f as useFocusGuards, R as ReactRemoveScroll, F as FocusScope, D as DismissableLayer, d as createContextScope, g as createSlot, k as Dialog, l as DialogContent, m as DialogHeader, n as DialogTitle } from "./dialog-BrfMriH9.js";
import { I as Input } from "./input-BdvWVqhx.js";
import { u as useDirection, c as createCollection } from "./index-BubkxtTJ.js";
import { R as Root2$1, A as Anchor, c as createPopperScope, C as Content, a as Arrow } from "./index-BrXXnJLi.js";
import { C as ChevronUp, B as Ban } from "./chevron-up-Bh20rlq8.js";
import { S as Skeleton } from "./skeleton-DnqpL6N2.js";
import { f as formatCurrency } from "./currency-KTzMGZJt.js";
import { a as formatDateTime } from "./date-DenVRcOM.js";
import { u as ue } from "./index-BGtHL4Us.js";
import { B as BillShareCard, b as buildReminderWhatsAppText } from "./BillShareCard-C55cKgCR.js";
import { F as FileText } from "./file-text-oN2OEcic.js";
import { S as Search } from "./search-DdYa4jFs.js";
import { T as TrendingUp } from "./trending-up-rg0bVzyj.js";
import { M as MessageCircle } from "./message-circle-BXa6t2c4.js";
import { P as Printer } from "./printer-D0lQ6_un.js";
import { R as RotateCcw } from "./rotate-ccw-D3NOyLdi.js";
import { T as TriangleAlert } from "./triangle-alert-DXvOFf3p.js";
import { C as CircleCheck } from "./circle-check-DnfsR4UJ.js";
import { C as CircleX } from "./circle-x-bxQVhwHu.js";
import "./label-iEAq-4xT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var NAME = "VisuallyHidden";
var VisuallyHidden = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }
);
VisuallyHidden.displayName = NAME;
var OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"];
var SELECTION_KEYS = [" ", "Enter"];
var SELECT_NAME = "Select";
var [Collection, useCollection, createCollectionScope] = createCollection(SELECT_NAME);
var [createSelectContext] = createContextScope(SELECT_NAME, [
  createCollectionScope,
  createPopperScope
]);
var usePopperScope = createPopperScope();
var [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var Select$1 = (props) => {
  const {
    __scopeSelect,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    value: valueProp,
    defaultValue,
    onValueChange,
    dir,
    name,
    autoComplete,
    disabled,
    required,
    form
  } = props;
  const popperScope = usePopperScope(__scopeSelect);
  const [trigger, setTrigger] = reactExports.useState(null);
  const [valueNode, setValueNode] = reactExports.useState(null);
  const [valueNodeHasChildren, setValueNodeHasChildren] = reactExports.useState(false);
  const direction = useDirection(dir);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: SELECT_NAME
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: SELECT_NAME
  });
  const triggerPointerDownPosRef = reactExports.useRef(null);
  const isFormControl = trigger ? form || !!trigger.closest("form") : true;
  const [nativeOptionsSet, setNativeOptionsSet] = reactExports.useState(/* @__PURE__ */ new Set());
  const nativeSelectKey = Array.from(nativeOptionsSet).map((option) => option.props.value).join(";");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SelectProvider,
    {
      required,
      scope: __scopeSelect,
      trigger,
      onTriggerChange: setTrigger,
      valueNode,
      onValueNodeChange: setValueNode,
      valueNodeHasChildren,
      onValueNodeHasChildrenChange: setValueNodeHasChildren,
      contentId: useId(),
      value,
      onValueChange: setValue,
      open,
      onOpenChange: setOpen,
      dir: direction,
      triggerPointerDownPosRef,
      disabled,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: __scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectNativeOptionsProvider,
          {
            scope: props.__scopeSelect,
            onNativeOptionAdd: reactExports.useCallback((option) => {
              setNativeOptionsSet((prev) => new Set(prev).add(option));
            }, []),
            onNativeOptionRemove: reactExports.useCallback((option) => {
              setNativeOptionsSet((prev) => {
                const optionsSet = new Set(prev);
                optionsSet.delete(option);
                return optionsSet;
              });
            }, []),
            children
          }
        ) }),
        isFormControl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SelectBubbleInput,
          {
            "aria-hidden": true,
            required,
            tabIndex: -1,
            name,
            autoComplete,
            value,
            onChange: (event) => setValue(event.target.value),
            disabled,
            form,
            children: [
              value === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "" }) : null,
              Array.from(nativeOptionsSet)
            ]
          },
          nativeSelectKey
        ) : null
      ]
    }
  ) });
};
Select$1.displayName = SELECT_NAME;
var TRIGGER_NAME = "SelectTrigger";
var SelectTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, disabled = false, ...triggerProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(TRIGGER_NAME, __scopeSelect);
    const isDisabled = context.disabled || disabled;
    const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
    const getItems = useCollection(__scopeSelect);
    const pointerTypeRef = reactExports.useRef("touch");
    const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.value === context.value);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem !== void 0) {
        context.onValueChange(nextItem.value);
      }
    });
    const handleOpen = (pointerEvent) => {
      if (!isDisabled) {
        context.onOpenChange(true);
        resetTypeahead();
      }
      if (pointerEvent) {
        context.triggerPointerDownPosRef.current = {
          x: Math.round(pointerEvent.pageX),
          y: Math.round(pointerEvent.pageY)
        };
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": context.contentId,
        "aria-expanded": context.open,
        "aria-required": context.required,
        "aria-autocomplete": "none",
        dir: context.dir,
        "data-state": context.open ? "open" : "closed",
        disabled: isDisabled,
        "data-disabled": isDisabled ? "" : void 0,
        "data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
        ...triggerProps,
        ref: composedRefs,
        onClick: composeEventHandlers(triggerProps.onClick, (event) => {
          event.currentTarget.focus();
          if (pointerTypeRef.current !== "mouse") {
            handleOpen(event);
          }
        }),
        onPointerDown: composeEventHandlers(triggerProps.onPointerDown, (event) => {
          pointerTypeRef.current = event.pointerType;
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
          }
          if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
            handleOpen(event);
            event.preventDefault();
          }
        }),
        onKeyDown: composeEventHandlers(triggerProps.onKeyDown, (event) => {
          const isTypingAhead = searchRef.current !== "";
          const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
          if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
          if (isTypingAhead && event.key === " ") return;
          if (OPEN_KEYS.includes(event.key)) {
            handleOpen();
            event.preventDefault();
          }
        })
      }
    ) });
  }
);
SelectTrigger$1.displayName = TRIGGER_NAME;
var VALUE_NAME = "SelectValue";
var SelectValue$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
    const context = useSelectContext(VALUE_NAME, __scopeSelect);
    const { onValueNodeHasChildrenChange } = context;
    const hasChildren = children !== void 0;
    const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);
    useLayoutEffect2(() => {
      onValueNodeHasChildrenChange(hasChildren);
    }, [onValueNodeHasChildrenChange, hasChildren]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        ...valueProps,
        ref: composedRefs,
        style: { pointerEvents: "none" },
        children: shouldShowPlaceholder(context.value) ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: placeholder }) : children
      }
    );
  }
);
SelectValue$1.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, children, ...iconProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { "aria-hidden": true, ...iconProps, ref: forwardedRef, children: children || "▼" });
  }
);
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME = "SelectPortal";
var SelectPortal = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, ...props });
};
SelectPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "SelectContent";
var SelectContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useSelectContext(CONTENT_NAME, props.__scopeSelect);
    const [fragment, setFragment] = reactExports.useState();
    useLayoutEffect2(() => {
      setFragment(new DocumentFragment());
    }, []);
    if (!context.open) {
      const frag = fragment;
      return frag ? reactDomExports.createPortal(
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContentProvider, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: props.children }) }) }),
        frag
      ) : null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContentImpl, { ...props, ref: forwardedRef });
  }
);
SelectContent$1.displayName = CONTENT_NAME;
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var Slot = createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      position = "item-aligned",
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      //
      // PopperContent props
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions,
      //
      ...contentProps
    } = props;
    const context = useSelectContext(CONTENT_NAME, __scopeSelect);
    const [content, setContent] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [selectedItem, setSelectedItem] = reactExports.useState(null);
    const [selectedItemText, setSelectedItemText] = reactExports.useState(
      null
    );
    const getItems = useCollection(__scopeSelect);
    const [isPositioned, setIsPositioned] = reactExports.useState(false);
    const firstValidItemFoundRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      if (content) return hideOthers(content);
    }, [content]);
    useFocusGuards();
    const focusFirst = reactExports.useCallback(
      (candidates) => {
        const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
        const [lastItem] = restItems.slice(-1);
        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
        for (const candidate of candidates) {
          if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
          candidate == null ? void 0 : candidate.scrollIntoView({ block: "nearest" });
          if (candidate === firstItem && viewport) viewport.scrollTop = 0;
          if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
          candidate == null ? void 0 : candidate.focus();
          if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
        }
      },
      [getItems, viewport]
    );
    const focusSelectedItem = reactExports.useCallback(
      () => focusFirst([selectedItem, content]),
      [focusFirst, selectedItem, content]
    );
    reactExports.useEffect(() => {
      if (isPositioned) {
        focusSelectedItem();
      }
    }, [isPositioned, focusSelectedItem]);
    const { onOpenChange, triggerPointerDownPosRef } = context;
    reactExports.useEffect(() => {
      if (content) {
        let pointerMoveDelta = { x: 0, y: 0 };
        const handlePointerMove = (event) => {
          var _a, _b;
          pointerMoveDelta = {
            x: Math.abs(Math.round(event.pageX) - (((_a = triggerPointerDownPosRef.current) == null ? void 0 : _a.x) ?? 0)),
            y: Math.abs(Math.round(event.pageY) - (((_b = triggerPointerDownPosRef.current) == null ? void 0 : _b.y) ?? 0))
          };
        };
        const handlePointerUp = (event) => {
          if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
            event.preventDefault();
          } else {
            if (!content.contains(event.target)) {
              onOpenChange(false);
            }
          }
          document.removeEventListener("pointermove", handlePointerMove);
          triggerPointerDownPosRef.current = null;
        };
        if (triggerPointerDownPosRef.current !== null) {
          document.addEventListener("pointermove", handlePointerMove);
          document.addEventListener("pointerup", handlePointerUp, { capture: true, once: true });
        }
        return () => {
          document.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("pointerup", handlePointerUp, { capture: true });
        };
      }
    }, [content, onOpenChange, triggerPointerDownPosRef]);
    reactExports.useEffect(() => {
      const close = () => onOpenChange(false);
      window.addEventListener("blur", close);
      window.addEventListener("resize", close);
      return () => {
        window.removeEventListener("blur", close);
        window.removeEventListener("resize", close);
      };
    }, [onOpenChange]);
    const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.ref.current === document.activeElement);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem) {
        setTimeout(() => nextItem.ref.current.focus());
      }
    });
    const itemRefCallback = reactExports.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItem(node);
          if (isFirstValidItem) firstValidItemFoundRef.current = true;
        }
      },
      [context.value]
    );
    const handleItemLeave = reactExports.useCallback(() => content == null ? void 0 : content.focus(), [content]);
    const itemTextRefCallback = reactExports.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItemText(node);
        }
      },
      [context.value]
    );
    const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
    const popperContentProps = SelectPosition === SelectPopperPosition ? {
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions
    } : {};
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectContentProvider,
      {
        scope: __scopeSelect,
        content,
        viewport,
        onViewportChange: setViewport,
        itemRefCallback,
        selectedItem,
        onItemLeave: handleItemLeave,
        itemTextRefCallback,
        focusSelectedItem,
        selectedItemText,
        position,
        isPositioned,
        searchRef,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FocusScope,
          {
            asChild: true,
            trapped: context.open,
            onMountAutoFocus: (event) => {
              event.preventDefault();
            },
            onUnmountAutoFocus: composeEventHandlers(onCloseAutoFocus, (event) => {
              var _a;
              (_a = context.trigger) == null ? void 0 : _a.focus({ preventScroll: true });
              event.preventDefault();
            }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DismissableLayer,
              {
                asChild: true,
                disableOutsidePointerEvents: true,
                onEscapeKeyDown,
                onPointerDownOutside,
                onFocusOutside: (event) => event.preventDefault(),
                onDismiss: () => context.onOpenChange(false),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectPosition,
                  {
                    role: "listbox",
                    id: context.contentId,
                    "data-state": context.open ? "open" : "closed",
                    dir: context.dir,
                    onContextMenu: (event) => event.preventDefault(),
                    ...contentProps,
                    ...popperContentProps,
                    onPlaced: () => setIsPositioned(true),
                    ref: composedRefs,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...contentProps.style
                    },
                    onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                      if (event.key === "Tab") event.preventDefault();
                      if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
                      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
                        const items = getItems().filter((item) => !item.disabled);
                        let candidateNodes = items.map((item) => item.ref.current);
                        if (["ArrowUp", "End"].includes(event.key)) {
                          candidateNodes = candidateNodes.slice().reverse();
                        }
                        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
                          const currentElement = event.target;
                          const currentIndex = candidateNodes.indexOf(currentElement);
                          candidateNodes = candidateNodes.slice(currentIndex + 1);
                        }
                        setTimeout(() => focusFirst(candidateNodes));
                        event.preventDefault();
                      }
                    })
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
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onPlaced, ...popperProps } = props;
  const context = useSelectContext(CONTENT_NAME, __scopeSelect);
  const contentContext = useSelectContentContext(CONTENT_NAME, __scopeSelect);
  const [contentWrapper, setContentWrapper] = reactExports.useState(null);
  const [content, setContent] = reactExports.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
  const getItems = useCollection(__scopeSelect);
  const shouldExpandOnScrollRef = reactExports.useRef(false);
  const shouldRepositionRef = reactExports.useRef(true);
  const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
  const position = reactExports.useCallback(() => {
    if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
      const triggerRect = context.trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const valueNodeRect = context.valueNode.getBoundingClientRect();
      const itemTextRect = selectedItemText.getBoundingClientRect();
      if (context.dir !== "rtl") {
        const itemTextOffset = itemTextRect.left - contentRect.left;
        const left = valueNodeRect.left - itemTextOffset;
        const leftDelta = triggerRect.left - left;
        const minContentWidth = triggerRect.width + leftDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const rightEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedLeft = clamp(left, [
          CONTENT_MARGIN,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(CONTENT_MARGIN, rightEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.left = clampedLeft + "px";
      } else {
        const itemTextOffset = contentRect.right - itemTextRect.right;
        const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
        const rightDelta = window.innerWidth - triggerRect.right - right;
        const minContentWidth = triggerRect.width + rightDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const leftEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedRight = clamp(right, [
          CONTENT_MARGIN,
          Math.max(CONTENT_MARGIN, leftEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.right = clampedRight + "px";
      }
      const items = getItems();
      const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
      const itemsHeight = viewport.scrollHeight;
      const contentStyles = window.getComputedStyle(content);
      const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
      const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
      const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
      const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
      const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
      const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
      const viewportStyles = window.getComputedStyle(viewport);
      const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
      const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
      const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
      const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
      const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
      const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
      const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
      const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
      const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
      if (willAlignWithoutTopOverflow) {
        const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
        contentWrapper.style.bottom = "0px";
        const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
        const clampedTriggerMiddleToBottomEdge = Math.max(
          triggerMiddleToBottomEdge,
          selectedItemHalfHeight + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth
        );
        const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
        contentWrapper.style.height = height + "px";
      } else {
        const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
        contentWrapper.style.top = "0px";
        const clampedTopEdgeToTriggerMiddle = Math.max(
          topEdgeToTriggerMiddle,
          contentBorderTopWidth + viewport.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight
        );
        const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
        contentWrapper.style.height = height + "px";
        viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
      }
      contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
      contentWrapper.style.minHeight = minContentHeight + "px";
      contentWrapper.style.maxHeight = availableHeight + "px";
      onPlaced == null ? void 0 : onPlaced();
      requestAnimationFrame(() => shouldExpandOnScrollRef.current = true);
    }
  }, [
    getItems,
    context.trigger,
    context.valueNode,
    contentWrapper,
    content,
    viewport,
    selectedItem,
    selectedItemText,
    context.dir,
    onPlaced
  ]);
  useLayoutEffect2(() => position(), [position]);
  const [contentZIndex, setContentZIndex] = reactExports.useState();
  useLayoutEffect2(() => {
    if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [content]);
  const handleScrollButtonChange = reactExports.useCallback(
    (node) => {
      if (node && shouldRepositionRef.current === true) {
        position();
        focusSelectedItem == null ? void 0 : focusSelectedItem();
        shouldRepositionRef.current = false;
      }
    },
    [position, focusSelectedItem]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectViewportProvider,
    {
      scope: __scopeSelect,
      contentWrapper,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: setContentWrapper,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: contentZIndex
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Primitive.div,
            {
              ...popperProps,
              ref: composedRefs,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...popperProps.style
              }
            }
          )
        }
      )
    }
  );
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    align = "start",
    collisionPadding = CONTENT_MARGIN,
    ...popperProps
  } = props;
  const popperScope = usePopperScope(__scopeSelect);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      ...popperScope,
      ...popperProps,
      ref: forwardedRef,
      align,
      collisionPadding,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...popperProps.style,
        // re-namespace exposed content custom properties
        ...{
          "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-select-content-available-width": "var(--radix-popper-available-width)",
          "--radix-select-content-available-height": "var(--radix-popper-available-height)",
          "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    }
  );
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, nonce, ...viewportProps } = props;
    const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
    const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
    const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
    const prevScrollTopRef = reactExports.useRef(0);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: __scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...viewportProps,
          ref: composedRefs,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...viewportProps.style
          },
          onScroll: composeEventHandlers(viewportProps.onScroll, (event) => {
            const viewport = event.currentTarget;
            const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
            if ((shouldExpandOnScrollRef == null ? void 0 : shouldExpandOnScrollRef.current) && contentWrapper) {
              const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
              if (scrolledBy > 0) {
                const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
                const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
                const cssHeight = parseFloat(contentWrapper.style.height);
                const prevHeight = Math.max(cssMinHeight, cssHeight);
                if (prevHeight < availableHeight) {
                  const nextHeight = prevHeight + scrolledBy;
                  const clampedNextHeight = Math.min(availableHeight, nextHeight);
                  const heightDiff = nextHeight - clampedNextHeight;
                  contentWrapper.style.height = clampedNextHeight + "px";
                  if (contentWrapper.style.bottom === "0px") {
                    viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                    contentWrapper.style.justifyContent = "flex-end";
                  }
                }
              }
            }
            prevScrollTopRef.current = viewport.scrollTop;
          })
        }
      ) })
    ] });
  }
);
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME);
var SelectGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...groupProps } = props;
    const groupId = useId();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectGroupContextProvider, { scope: __scopeSelect, id: groupId, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { role: "group", "aria-labelledby": groupId, ...groupProps, ref: forwardedRef }) });
  }
);
SelectGroup.displayName = GROUP_NAME;
var LABEL_NAME = "SelectLabel";
var SelectLabel = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...labelProps } = props;
    const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { id: groupContext.id, ...labelProps, ref: forwardedRef });
  }
);
SelectLabel.displayName = LABEL_NAME;
var ITEM_NAME = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME);
var SelectItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      value,
      disabled = false,
      textValue: textValueProp,
      ...itemProps
    } = props;
    const context = useSelectContext(ITEM_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_NAME, __scopeSelect);
    const isSelected = context.value === value;
    const [textValue, setTextValue] = reactExports.useState(textValueProp ?? "");
    const [isFocused, setIsFocused] = reactExports.useState(false);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => {
        var _a;
        return (_a = contentContext.itemRefCallback) == null ? void 0 : _a.call(contentContext, node, value, disabled);
      }
    );
    const textId = useId();
    const pointerTypeRef = reactExports.useRef("touch");
    const handleSelect = () => {
      if (!disabled) {
        context.onValueChange(value);
        context.onOpenChange(false);
      }
    };
    if (value === "") {
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectItemContextProvider,
      {
        scope: __scopeSelect,
        value,
        disabled,
        textId,
        isSelected,
        onItemTextChange: reactExports.useCallback((node) => {
          setTextValue((prevTextValue) => prevTextValue || ((node == null ? void 0 : node.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Collection.ItemSlot,
          {
            scope: __scopeSelect,
            value,
            disabled,
            textValue,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "option",
                "aria-labelledby": textId,
                "data-highlighted": isFocused ? "" : void 0,
                "aria-selected": isSelected && isFocused,
                "data-state": isSelected ? "checked" : "unchecked",
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                tabIndex: disabled ? void 0 : -1,
                ...itemProps,
                ref: composedRefs,
                onFocus: composeEventHandlers(itemProps.onFocus, () => setIsFocused(true)),
                onBlur: composeEventHandlers(itemProps.onBlur, () => setIsFocused(false)),
                onClick: composeEventHandlers(itemProps.onClick, () => {
                  if (pointerTypeRef.current !== "mouse") handleSelect();
                }),
                onPointerUp: composeEventHandlers(itemProps.onPointerUp, () => {
                  if (pointerTypeRef.current === "mouse") handleSelect();
                }),
                onPointerDown: composeEventHandlers(itemProps.onPointerDown, (event) => {
                  pointerTypeRef.current = event.pointerType;
                }),
                onPointerMove: composeEventHandlers(itemProps.onPointerMove, (event) => {
                  var _a;
                  pointerTypeRef.current = event.pointerType;
                  if (disabled) {
                    (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
                  } else if (pointerTypeRef.current === "mouse") {
                    event.currentTarget.focus({ preventScroll: true });
                  }
                }),
                onPointerLeave: composeEventHandlers(itemProps.onPointerLeave, (event) => {
                  var _a;
                  if (event.currentTarget === document.activeElement) {
                    (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
                  }
                }),
                onKeyDown: composeEventHandlers(itemProps.onKeyDown, (event) => {
                  var _a;
                  const isTypingAhead = ((_a = contentContext.searchRef) == null ? void 0 : _a.current) !== "";
                  if (isTypingAhead && event.key === " ") return;
                  if (SELECTION_KEYS.includes(event.key)) handleSelect();
                  if (event.key === " ") event.preventDefault();
                })
              }
            )
          }
        )
      }
    );
  }
);
SelectItem$1.displayName = ITEM_NAME;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, ...itemTextProps } = props;
    const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
    const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
    const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
    const [itemTextNode, setItemTextNode] = reactExports.useState(null);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => setItemTextNode(node),
      itemContext.onItemTextChange,
      (node) => {
        var _a;
        return (_a = contentContext.itemTextRefCallback) == null ? void 0 : _a.call(contentContext, node, itemContext.value, itemContext.disabled);
      }
    );
    const textContent = itemTextNode == null ? void 0 : itemTextNode.textContent;
    const nativeOption = reactExports.useMemo(
      () => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: itemContext.value, disabled: itemContext.disabled, children: textContent }, itemContext.value),
      [itemContext.disabled, itemContext.value, textContent]
    );
    const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
    useLayoutEffect2(() => {
      onNativeOptionAdd(nativeOption);
      return () => onNativeOptionRemove(nativeOption);
    }, [onNativeOptionAdd, onNativeOptionRemove, nativeOption]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { id: itemContext.textId, ...itemTextProps, ref: composedRefs }),
      itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren ? reactDomExports.createPortal(itemTextProps.children, context.valueNode) : null
    ] });
  }
);
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...itemIndicatorProps } = props;
    const itemContext = useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect);
    return itemContext.isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { "aria-hidden": true, ...itemIndicatorProps, ref: forwardedRef }) : null;
  }
);
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton$1 = reactExports.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const [canScrollUp, setCanScrollUp] = reactExports.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const canScrollUp2 = viewport.scrollTop > 0;
        setCanScrollUp(canScrollUp2);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollUp ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollUpButton$1.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton$1 = reactExports.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const [canScrollDown, setCanScrollDown] = reactExports.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        const canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
        setCanScrollDown(canScrollDown2);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollDown ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollDownButton$1.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
  const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
  const autoScrollTimerRef = reactExports.useRef(null);
  const getItems = useCollection(__scopeSelect);
  const clearAutoScrollTimer = reactExports.useCallback(() => {
    if (autoScrollTimerRef.current !== null) {
      window.clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);
  reactExports.useEffect(() => {
    return () => clearAutoScrollTimer();
  }, [clearAutoScrollTimer]);
  useLayoutEffect2(() => {
    var _a;
    const activeItem = getItems().find((item) => item.ref.current === document.activeElement);
    (_a = activeItem == null ? void 0 : activeItem.ref.current) == null ? void 0 : _a.scrollIntoView({ block: "nearest" });
  }, [getItems]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "aria-hidden": true,
      ...scrollIndicatorProps,
      ref: forwardedRef,
      style: { flexShrink: 0, ...scrollIndicatorProps.style },
      onPointerDown: composeEventHandlers(scrollIndicatorProps.onPointerDown, () => {
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerMove: composeEventHandlers(scrollIndicatorProps.onPointerMove, () => {
        var _a;
        (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerLeave: composeEventHandlers(scrollIndicatorProps.onPointerLeave, () => {
        clearAutoScrollTimer();
      })
    }
  );
});
var SEPARATOR_NAME = "SelectSeparator";
var SelectSeparator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...separatorProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { "aria-hidden": true, ...separatorProps, ref: forwardedRef });
  }
);
SelectSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME = "SelectArrow";
var SelectArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(ARROW_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ARROW_NAME, __scopeSelect);
    return context.open && contentContext.position === "popper" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef }) : null;
  }
);
SelectArrow.displayName = ARROW_NAME;
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = reactExports.forwardRef(
  ({ __scopeSelect, value, ...props }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const prevValue = usePrevious(value);
    reactExports.useEffect(() => {
      const select = ref.current;
      if (!select) return;
      const selectProto = window.HTMLSelectElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        selectProto,
        "value"
      );
      const setValue = descriptor.set;
      if (prevValue !== value && setValue) {
        const event = new Event("change", { bubbles: true });
        setValue.call(select, value);
        select.dispatchEvent(event);
      }
    }, [prevValue, value]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.select,
      {
        ...props,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style },
        ref: composedRefs,
        defaultValue: value
      }
    );
  }
);
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function shouldShowPlaceholder(value) {
  return value === "" || value === void 0;
}
function useTypeaheadSearch(onSearchChange) {
  const handleSearchChange = useCallbackRef(onSearchChange);
  const searchRef = reactExports.useRef("");
  const timerRef = reactExports.useRef(0);
  const handleTypeaheadSearch = reactExports.useCallback(
    (key) => {
      const search = searchRef.current + key;
      handleSearchChange(search);
      (function updateSearch(value) {
        searchRef.current = value;
        window.clearTimeout(timerRef.current);
        if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
      })(search);
    },
    [handleSearchChange]
  );
  const resetTypeahead = reactExports.useCallback(() => {
    searchRef.current = "";
    window.clearTimeout(timerRef.current);
  }, []);
  reactExports.useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);
  return [searchRef, handleTypeaheadSearch, resetTypeahead];
}
function findNextItem(items, search, currentItem) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
  let wrappedItems = wrapArray(items, Math.max(currentItemIndex, 0));
  const excludeCurrentItem = normalizedSearch.length === 1;
  if (excludeCurrentItem) wrappedItems = wrappedItems.filter((v) => v !== currentItem);
  const nextItem = wrappedItems.find(
    (item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextItem !== currentItem ? nextItem : void 0;
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root2 = Select$1;
var Trigger = SelectTrigger$1;
var Value = SelectValue$1;
var Icon = SelectIcon;
var Portal = SelectPortal;
var Content2 = SelectContent$1;
var Viewport = SelectViewport;
var Item = SelectItem$1;
var ItemText = SelectItemText;
var ItemIndicator = SelectItemIndicator;
var ScrollUpButton = SelectScrollUpButton$1;
var ScrollDownButton = SelectScrollDownButton$1;
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content2,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4" })
    }
  );
}
function todayRange() {
  const start = /* @__PURE__ */ new Date();
  start.setHours(0, 0, 0, 0);
  const end = /* @__PURE__ */ new Date();
  end.setHours(23, 59, 59, 999);
  return { from: BigInt(start.getTime()), to: BigInt(end.getTime()) };
}
function weekRange() {
  const start = /* @__PURE__ */ new Date();
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  const end = /* @__PURE__ */ new Date();
  end.setHours(23, 59, 59, 999);
  return { from: BigInt(start.getTime()), to: BigInt(end.getTime()) };
}
function monthRange() {
  const start = /* @__PURE__ */ new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  const end = /* @__PURE__ */ new Date();
  end.setHours(23, 59, 59, 999);
  return { from: BigInt(start.getTime()), to: BigInt(end.getTime()) };
}
function billNumberLabel(n) {
  return `#${String(n).padStart(4, "0")}`;
}
function matchesSearch(bill, query) {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  if (bill.customerName.toLowerCase().includes(q)) return true;
  if (bill.customerPhone.toLowerCase().includes(q)) return true;
  const label = billNumberLabel(bill.billNumber).toLowerCase();
  if (label.includes(q)) return true;
  if (String(bill.billNumber).includes(q)) return true;
  return false;
}
const RETURN_REASONS = [
  "Damaged",
  "Defective",
  "Wrong Item",
  "Changed Mind",
  "Size Wrong",
  "Quality Issue",
  "Expired",
  "Other"
];
function printBill(bill, shopConfig, size) {
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "USD";
  const dateFormat = (shopConfig == null ? void 0 : shopConfig.dateFormat) ?? DateFormat.DDMMYYYY;
  const shopName = (shopConfig == null ? void 0 : shopConfig.shopName) ?? "Shop";
  const shopAddress = (shopConfig == null ? void 0 : shopConfig.shopAddress) ?? "";
  const shopPhone = (shopConfig == null ? void 0 : shopConfig.shopPhone) ?? "";
  const width = size === "58mm" ? "58mm" : size === "80mm" ? "80mm" : "210mm";
  const itemsHtml = bill.items.map(
    (item) => `
      <tr>
        <td style="padding:2px 4px">${item.name}</td>
        <td style="padding:2px 4px;text-align:right">${item.qty} ${item.unit}</td>
        <td style="padding:2px 4px;text-align:right">${formatCurrency(item.rate, currency)}</td>
        ${item.discount > 0 ? `<td style="padding:2px 4px;text-align:right">-${formatCurrency(item.discount, currency)}</td>` : ""}
        <td style="padding:2px 4px;text-align:right">${formatCurrency(item.lineTotal, currency)}</td>
      </tr>`
  ).join("");
  const taxHtml = bill.taxBreakdown.cgst > 0 ? `<tr><td>CGST</td><td style="text-align:right">${formatCurrency(bill.taxBreakdown.cgst, currency)}</td></tr>
         <tr><td>SGST</td><td style="text-align:right">${formatCurrency(bill.taxBreakdown.sgst, currency)}</td></tr>` : bill.taxBreakdown.igst > 0 ? `<tr><td>IGST</td><td style="text-align:right">${formatCurrency(bill.taxBreakdown.igst, currency)}</td></tr>` : "";
  const extraHtml = bill.extraCharges.map(
    (c) => `<tr><td>${c.description}</td><td style="text-align:right">${formatCurrency(c.amount, currency)}</td></tr>`
  ).join("");
  const html = `<!DOCTYPE html><html><head><style>
    body{font-family:monospace;font-size:${size === "a4" ? "14px" : "11px"};width:${width};margin:0 auto;padding:8px}
    h2{text-align:center;margin:4px 0;font-size:${size === "a4" ? "18px" : "13px"}}
    p{margin:2px 0;text-align:center}
    table{width:100%;border-collapse:collapse;margin:6px 0}
    hr{border:none;border-top:1px dashed #000;margin:6px 0}
    .total{font-weight:bold;font-size:${size === "a4" ? "16px" : "13px"}}
  </style></head><body>
    <h2>${shopName}</h2>
    <p>${shopAddress}</p>
    <p>${shopPhone}</p>
    <hr/>
    <p>Bill: ${billNumberLabel(bill.billNumber)}</p>
    <p>Date: ${formatDateTime(bill.createdAt, dateFormat)}</p>
    ${bill.customerName ? `<p>Customer: ${bill.customerName}</p>` : ""}
    ${bill.customerPhone ? `<p>Phone: ${bill.customerPhone}</p>` : ""}
    <hr/>
    <table>${itemsHtml}</table>
    <hr/>
    <table>
      <tr><td>Subtotal</td><td style="text-align:right">${formatCurrency(bill.subtotal, currency)}</td></tr>
      ${taxHtml}
      ${extraHtml}
      ${bill.totalDiscount > 0 ? `<tr><td>Discount</td><td style="text-align:right">-${formatCurrency(bill.totalDiscount, currency)}</td></tr>` : ""}
      <tr class="total"><td>TOTAL</td><td style="text-align:right">${formatCurrency(bill.grandTotal, currency)}</td></tr>
    </table>
    <hr/>
    <p style="font-size:10px">Thank you for your purchase!</p>
  </body></html>`;
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.onload = () => win.print();
}
function ReturnStatusBadge({ status }) {
  if (status === ReturnStatus.Approved) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-emerald-100 text-emerald-700 border-emerald-200 gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
      " Approved"
    ] });
  }
  if (status === ReturnStatus.Rejected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-xs gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
      " Rejected"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-amber-100 text-amber-700 border-amber-200 gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3" }),
    " Pending Approval"
  ] });
}
function ReturnRequestModal({
  bill,
  currency,
  shopId,
  onClose,
  onSuccess
}) {
  const api = useApi();
  const [items, setItems] = reactExports.useState(
    bill.items.map((it) => ({
      productId: it.productId,
      name: it.name,
      originalRate: it.rate,
      maxQty: it.qty,
      returnQty: 0,
      reason: RETURN_REASONS[0],
      notes: ""
    }))
  );
  const [saving, setSaving] = reactExports.useState(false);
  const selectedCount = items.filter((i) => i.returnQty > 0).length;
  const totalRefund = items.reduce(
    (sum, i) => sum + i.returnQty * i.originalRate,
    0
  );
  const handleSubmit = async () => {
    const returnItems = items.filter((i) => i.returnQty > 0).map((i) => ({
      productId: i.productId,
      name: i.name,
      returnQty: i.returnQty,
      originalRate: i.originalRate,
      lineTotal: i.returnQty * i.originalRate,
      reason: i.reason ? i.reason : void 0
    }));
    if (returnItems.length === 0) {
      ue.error("Select at least one item to return");
      return;
    }
    setSaving(true);
    try {
      const result = await api.createReturn(shopId, {
        originalBillId: bill.id,
        returnItems,
        customerName: bill.customerName || "Anonymous",
        customerPhone: bill.customerPhone
      });
      ue.success(`Return #${result.id} submitted — Pending Owner Approval`);
      onSuccess();
      onClose();
    } catch {
      ue.error("Failed to submit return request");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg w-full max-h-[90vh] overflow-y-auto",
      "data-ocid": "return_request.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display", children: [
          "Return Items — ",
          billNumberLabel(bill.billNumber)
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `border rounded-xl p-3 space-y-2 transition-colors ${item.returnQty > 0 ? "border-primary/40 bg-primary/5" : "border-border bg-muted/20"}`,
            "data-ocid": `return_request.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate flex-1", children: item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0", children: [
                  formatCurrency(item.originalRate, currency),
                  " × max",
                  " ",
                  item.maxQty
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border rounded-lg overflow-hidden h-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setItems(
                        (prev) => prev.map(
                          (it, i) => i === idx ? {
                            ...it,
                            returnQty: Math.max(0, it.returnQty - 1)
                          } : it
                        )
                      ),
                      className: "px-2 h-full text-muted-foreground hover:bg-muted transition-colors",
                      "aria-label": "Decrease",
                      children: "−"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center text-sm font-bold", children: item.returnQty }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setItems(
                        (prev) => prev.map(
                          (it, i) => i === idx ? {
                            ...it,
                            returnQty: Math.min(
                              it.maxQty,
                              it.returnQty + 1
                            )
                          } : it
                        )
                      ),
                      className: "px-2 h-full text-muted-foreground hover:bg-muted transition-colors",
                      "aria-label": "Increase",
                      children: "+"
                    }
                  )
                ] }),
                item.returnQty > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: item.reason,
                    onValueChange: (v) => setItems(
                      (prev) => prev.map(
                        (it, i) => i === idx ? { ...it, reason: v } : it
                      )
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "flex-1 h-8 text-xs",
                          "data-ocid": `return_request.reason.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: RETURN_REASONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
                    ]
                  }
                )
              ] })
            ]
          },
          String(item.productId)
        )) }),
        selectedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              selectedCount,
              " item",
              selectedCount !== 1 ? "s" : "",
              " selected"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
              "Refund: ",
              formatCurrency(totalRefund, currency)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Store credit will be awarded upon owner approval" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              className: "flex-1",
              disabled: saving || selectedCount === 0,
              onClick: handleSubmit,
              "data-ocid": "return_request.submit_button",
              children: saving ? "Submitting…" : "Submit Return Request"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onClose,
              "data-ocid": "return_request.cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ]
    }
  ) });
}
function ReturnsSectionInDetail({
  bill,
  currency,
  shopId,
  dateFormat
}) {
  const api = useApi();
  const [returns, setReturns] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let cancelled = false;
    api.getReturnsByBill(shopId, bill.id).then((data) => {
      if (!cancelled) setReturns(data);
    }).catch(() => {
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [api, shopId, bill.id]);
  if (loading)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", "data-ocid": "bill_detail.returns.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" })
    ] });
  if (returns.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-t border-border pt-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-display font-semibold text-sm text-foreground", children: [
      "Returns (",
      returns.length,
      ")"
    ] }),
    returns.map((ret) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-muted/30 border border-border rounded-lg p-3 space-y-1.5",
        "data-ocid": `bill_detail.return.${String(ret.id)}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Return #",
              String(ret.id),
              " ·",
              " ",
              formatDateTime(ret.createdAt, dateFormat)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReturnStatusBadge, { status: ret.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: ret.returnItems.map((ri, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between text-xs text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                  ri.name,
                  " × ",
                  ri.returnQty
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 ml-2", children: formatCurrency(ri.lineTotal, currency) })
              ]
            },
            `${String(ri.productId)}-${i}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Refund" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatCurrency(ret.totalRefundAmount, currency) })
          ] }),
          ret.status === ReturnStatus.Approved && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-600", children: "✓ Store credit awarded" }),
          ret.status === ReturnStatus.Rejected && ret.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive", children: [
            "Rejected: ",
            ret.rejectionReason
          ] })
        ]
      },
      String(ret.id)
    ))
  ] });
}
function StatCard({
  label,
  value,
  color
}) {
  const colorClass = color === "green" ? "text-emerald-600" : color === "blue" ? "text-primary" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-4 py-3 flex flex-col gap-0.5 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide truncate", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display text-lg font-bold truncate ${colorClass}`, children: value })
  ] });
}
function StatusBadge({ status }) {
  if (status === BillStatus.Cancelled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs", children: "Cancelled" });
  }
  if (status === BillStatus.Draft) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Draft" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-emerald-100 text-emerald-700 border-emerald-200", children: "Active" });
}
function BillDetailModal({
  bill,
  currency,
  dateFormat,
  shopConfig,
  shopId,
  onClose,
  onReprint,
  onCancel,
  isOwner
}) {
  const [printSize, setPrintSize] = reactExports.useState("80mm");
  const [showCancelConfirm, setShowCancelConfirm] = reactExports.useState(false);
  const [showReturnModal, setShowReturnModal] = reactExports.useState(false);
  const taxTotal = bill.taxBreakdown.cgst + bill.taxBreakdown.sgst + bill.taxBreakdown.igst;
  const extraTotal = bill.extraCharges.reduce((s, c) => s + c.amount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-2xl w-full max-h-[90vh] overflow-y-auto",
        "data-ocid": "bill_detail.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl", children: billNumberLabel(bill.billNumber) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: bill.status }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: formatDateTime(bill.createdAt, dateFormat) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 bg-muted/40 rounded-lg p-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Customer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: bill.customerName || "Walk-in" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: bill.customerPhone || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Price Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: bill.priceType })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax System" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: bill.taxSystem })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-1 text-muted-foreground font-medium", children: "Product" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-1 text-muted-foreground font-medium", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-1 text-muted-foreground font-medium", children: "Rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-1 text-muted-foreground font-medium", children: "Disc" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-1 text-muted-foreground font-medium", children: "Total" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bill.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50",
                "data-ocid": `bill_detail.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 px-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: item.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs ml-1", children: item.unit })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right py-2 px-1", children: item.qty }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right py-2 px-1", children: formatCurrency(item.rate, currency) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right py-2 px-1 text-muted-foreground", children: item.discount > 0 ? `-${formatCurrency(item.discount, currency)}` : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right py-2 px-1 font-medium", children: formatCurrency(item.lineTotal, currency) })
                ]
              },
              `${item.productId}-${i}`
            )) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-sm border-t border-border pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(bill.subtotal, currency) })
            ] }),
            bill.totalDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "-",
                formatCurrency(bill.totalDiscount, currency)
              ] })
            ] }),
            taxTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              bill.taxBreakdown.cgst > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "CGST (",
                  bill.taxRate / 2,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(bill.taxBreakdown.cgst, currency) })
              ] }),
              bill.taxBreakdown.sgst > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "SGST (",
                  bill.taxRate / 2,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(bill.taxBreakdown.sgst, currency) })
              ] }),
              bill.taxBreakdown.igst > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "IGST (",
                  bill.taxRate,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(bill.taxBreakdown.igst, currency) })
              ] }),
              bill.taxBreakdown.cgst === 0 && bill.taxBreakdown.sgst === 0 && bill.taxBreakdown.igst === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Tax (",
                  bill.taxRate,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(taxTotal, currency) })
              ] })
            ] }),
            bill.extraCharges.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(c.amount, currency) })
                ]
              },
              c.description
            )),
            extraTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Extra charges" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(extraTotal, currency) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-base border-t border-border pt-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatCurrency(bill.grandTotal, currency) })
            ] }),
            isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-emerald-600 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Profit (Owner)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(bill.profit, currency) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReturnsSectionInDetail,
            {
              bill,
              currency,
              shopId,
              dateFormat
            }
          ),
          bill.status !== BillStatus.Cancelled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "bill_detail.share_card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BillShareCard, { bill, shopConfig }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: printSize,
                  onValueChange: (v) => setPrintSize(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "w-28 h-9",
                        "data-ocid": "bill_detail.select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "58mm", children: "58mm" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "80mm", children: "80mm" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "a4", children: "A4" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: () => onReprint(bill, printSize),
                  "data-ocid": "bill_detail.reprint_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4 mr-1.5" }),
                    "Reprint"
                  ]
                }
              )
            ] }),
            bill.status === BillStatus.Saved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => setShowReturnModal(true),
                className: "gap-1.5 border-amber-400 text-amber-700 hover:bg-amber-50",
                "data-ocid": "bill_detail.return_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                  "Return Items"
                ]
              }
            ),
            bill.status !== BillStatus.Cancelled && isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "destructive",
                size: "sm",
                onClick: () => setShowCancelConfirm(true),
                "data-ocid": "bill_detail.cancel_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-4 h-4 mr-1.5" }),
                  "Cancel Bill"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: onClose,
                "data-ocid": "bill_detail.close_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1.5" }),
                  "Close"
                ]
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showCancelConfirm, onOpenChange: setShowCancelConfirm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "cancel_bill.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive" }),
          "Cancel Bill ",
          billNumberLabel(bill.billNumber),
          "?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will cancel the bill and restore stock for all items. This action cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "cancel_bill.cancel_button", children: "Keep Bill" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            onClick: () => {
              onCancel(bill.id);
              setShowCancelConfirm(false);
              onClose();
            },
            "data-ocid": "cancel_bill.confirm_button",
            children: "Yes, Cancel Bill"
          }
        )
      ] })
    ] }) }),
    showReturnModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReturnRequestModal,
      {
        bill,
        currency,
        shopId,
        onClose: () => setShowReturnModal(false),
        onSuccess: () => {
        }
      }
    )
  ] });
}
function PaymentBadge({
  bill,
  currency
}) {
  if (bill.paymentType === PaymentType.partial && bill.amountPending > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100", children: [
      "Partial · ",
      formatCurrency(bill.amountPending, currency),
      " pending"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100", children: "Paid" });
}
function RecordPaymentInline({
  bill,
  currency,
  shopId,
  onSuccess
}) {
  const api = useApi();
  const [amount, setAmount] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const handleSave = async (markFull) => {
    setSaving(true);
    try {
      const additional = markFull ? bill.amountPending : Math.min(bill.amountPending, Math.max(0, Number(amount) || 0));
      await api.recordPayment(shopId, bill.id, additional);
      ue.success(markFull ? "Bill marked as paid" : "Payment recorded");
      onSuccess();
    } catch {
      ue.error("Failed to record payment");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-col gap-2 mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg",
      "data-ocid": "history.record_payment.panel",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: "0",
            max: bill.amountPending,
            step: "0.01",
            value: amount,
            onChange: (e) => setAmount(e.target.value),
            placeholder: `Max: ${formatCurrency(bill.amountPending, currency)}`,
            className: "flex-1 h-8 px-2.5 text-sm border border-amber-300 rounded-md bg-white outline-none focus:ring-1 focus:ring-amber-400",
            "data-ocid": "history.record_payment_amount_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            disabled: saving || !amount,
            onClick: () => handleSave(false),
            className: "h-8 text-xs border-amber-400 text-amber-700 hover:bg-amber-100",
            "data-ocid": "history.record_payment_save_button",
            children: "Save"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            disabled: saving,
            onClick: () => handleSave(true),
            className: "h-8 text-xs bg-emerald-600 text-white hover:bg-emerald-700",
            "data-ocid": "history.mark_paid_button",
            children: "Mark Paid"
          }
        )
      ] })
    }
  );
}
function BillRow({
  bill,
  currency,
  dateFormat,
  isOwner,
  shopId,
  onExpand,
  onRefresh
}) {
  const api = useApi();
  const itemCount = bill.items.length;
  const isPartial = bill.paymentType === PaymentType.partial && bill.amountPending > 0;
  const [showRecordPayment, setShowRecordPayment] = reactExports.useState(false);
  const lastReminderDays = bill.lastReminderSent ? Math.floor(
    (Date.now() - Number(bill.lastReminderSent)) / (1e3 * 60 * 60 * 24)
  ) : null;
  const handleSendReminder = async (e) => {
    e.stopPropagation();
    if (!bill.customerPhone) {
      ue.error("No phone number — add customer phone to send reminder");
      return;
    }
    const phone = bill.customerPhone.replace(/\D/g, "");
    const text = buildReminderWhatsAppText(bill, shopId, currency);
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    try {
      await api.recordReminderSent(shopId, bill.id);
      ue.success("Reminder sent");
      onRefresh();
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all duration-200",
      "data-ocid": `history.bill.${String(bill.billNumber)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "w-full text-left px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            onClick: () => onExpand(bill),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: billNumberLabel(bill.billNumber) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: bill.status }),
                    bill.status !== BillStatus.Cancelled && /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentBadge, { bill, currency })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
                    bill.customerName || "Walk-in",
                    " ·",
                    " ",
                    itemCount === 1 ? "1 item" : `${itemCount} items`,
                    " ·",
                    " ",
                    formatDateTime(bill.createdAt, dateFormat)
                  ] }),
                  isPartial && lastReminderDays !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600 mt-0.5", children: [
                    "Last reminder:",
                    " ",
                    lastReminderDays === 0 ? "Today" : `${lastReminderDays}d ago`
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground", children: formatCurrency(bill.grandTotal, currency) }),
                isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-600 font-medium", children: [
                  "+",
                  formatCurrency(bill.profit, currency)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground self-center shrink-0" })
            ] })
          }
        ),
        isPartial && bill.status !== BillStatus.Cancelled && // biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation container only
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 pb-3 flex flex-wrap gap-2",
            onClick: (e) => e.stopPropagation(),
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: handleSendReminder,
                  className: "h-8 text-xs gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-50",
                  disabled: !bill.customerPhone,
                  "data-ocid": `history.send_reminder.${String(bill.billNumber)}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                    "Send Reminder"
                  ]
                }
              ),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: (e) => {
                    e.stopPropagation();
                    setShowRecordPayment((v) => !v);
                  },
                  className: "h-8 text-xs gap-1.5 border-primary/40 text-primary hover:bg-primary/5",
                  "data-ocid": `history.record_payment_button.${String(bill.billNumber)}`,
                  children: "Record Payment"
                }
              ),
              showRecordPayment && isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                RecordPaymentInline,
                {
                  bill,
                  currency,
                  shopId,
                  onSuccess: () => {
                    setShowRecordPayment(false);
                    onRefresh();
                  }
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
function BillSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-lg shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" })
  ] });
}
function EmptyState({ filtered }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 gap-4",
      "data-ocid": "history.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: filtered ? "No bills found" : "No bills yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: filtered ? "Try adjusting your search or date range" : "Create your first bill from the New Bill tab" })
        ] })
      ]
    }
  );
}
const PAGE_SIZE = 20;
function HistoryPage() {
  const { listBills, cancelBill } = useApi();
  const shopConfig = useStore((s) => s.shopConfig);
  const activeShopId = useStore((s) => s.activeShopId);
  const userRole = useStore((s) => s.userRole);
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "USD";
  const dateFormat = (shopConfig == null ? void 0 : shopConfig.dateFormat) ?? DateFormat.DDMMYYYY;
  const shopId = activeShopId ?? (shopConfig == null ? void 0 : shopConfig.shopName) ?? "default";
  const isOwner = userRole !== "staff";
  const [bills, setBills] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [quickFilter, setQuickFilter] = reactExports.useState("all");
  const [fromDate, setFromDate] = reactExports.useState("");
  const [toDate, setToDate] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [selectedBill, setSelectedBill] = reactExports.useState(null);
  const searchRef = reactExports.useRef(null);
  const fetchBills = reactExports.useCallback(async () => {
    let cancelled = false;
    setLoading(true);
    const timeout = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 5e3);
    try {
      const filter = {};
      if (quickFilter === "today") {
        const r = todayRange();
        filter.fromDate = r.from;
        filter.toDate = r.to;
      } else if (quickFilter === "week") {
        const r = weekRange();
        filter.fromDate = r.from;
        filter.toDate = r.to;
      } else if (quickFilter === "month") {
        const r = monthRange();
        filter.fromDate = r.from;
        filter.toDate = r.to;
      } else if (fromDate && toDate) {
        filter.fromDate = BigInt(new Date(fromDate).setHours(0, 0, 0, 0));
        filter.toDate = BigInt(new Date(toDate).setHours(23, 59, 59, 999));
      }
      const data = await listBills(shopId, filter);
      if (!cancelled) {
        const sorted = [...data].sort(
          (a, b) => Number(b.createdAt) - Number(a.createdAt)
        );
        setBills(sorted);
      }
    } catch {
      if (!cancelled) ue.error("Failed to load bill history");
    } finally {
      clearTimeout(timeout);
      if (!cancelled) setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [listBills, shopId, quickFilter, fromDate, toDate]);
  reactExports.useEffect(() => {
    void fetchBills();
  }, [fetchBills]);
  const filtered = reactExports.useMemo(
    () => bills.filter((b) => matchesSearch(b, searchQuery)),
    [bills, searchQuery]
  );
  const paginated = reactExports.useMemo(
    () => filtered.slice(0, page * PAGE_SIZE),
    [filtered, page]
  );
  const hasMore = filtered.length > page * PAGE_SIZE;
  const stats = reactExports.useMemo(() => {
    const active = filtered.filter((b) => b.status !== BillStatus.Cancelled);
    return {
      totalBills: filtered.length,
      totalRevenue: active.reduce((s, b) => s + b.grandTotal, 0),
      totalProfit: active.reduce((s, b) => s + b.profit, 0)
    };
  }, [filtered]);
  const handleCancel = reactExports.useCallback(
    async (id) => {
      try {
        const ok = await cancelBill(id);
        if (ok) {
          ue.success("Bill cancelled and stock restored");
          await fetchBills();
        } else {
          ue.error("Failed to cancel bill");
        }
      } catch {
        ue.error("Failed to cancel bill");
      }
    },
    [cancelBill, fetchBills]
  );
  const handleQuickFilter = (f) => {
    setQuickFilter(f);
    setFromDate("");
    setToDate("");
    setPage(1);
  };
  const handleCustomDateChange = (from, to) => {
    setFromDate(from);
    setToDate(to);
    if (from || to) setQuickFilter("all");
    setPage(1);
  };
  const quickFilters = [
    { key: "all", label: "All" },
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-24", "data-ocid": "history.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Bill History" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            ref: searchRef,
            placeholder: "Search by bill #, customer name or phone…",
            value: searchQuery,
            onChange: (e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            },
            className: "pl-9 h-10",
            "data-ocid": "history.search_input"
          }
        ),
        searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            onClick: () => setSearchQuery(""),
            "data-ocid": "history.search_clear_button",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        quickFilters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleQuickFilter(f.key),
            "data-ocid": `history.filter.${f.key}`,
            className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 min-h-[36px] ${quickFilter === f.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
            children: f.label
          },
          f.key
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: fromDate,
              onChange: (e) => handleCustomDateChange(e.target.value, toDate),
              className: "text-xs border border-input bg-background rounded-md px-2 py-1.5 text-foreground min-h-[36px] focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "history.from_date_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "–" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: toDate,
              onChange: (e) => handleCustomDateChange(fromDate, e.target.value),
              className: "text-xs border border-input bg-background rounded-md px-2 py-1.5 text-foreground min-h-[36px] focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "history.to_date_input"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 pt-4 space-y-4", children: [
      !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `grid ${isOwner ? "grid-cols-3" : "grid-cols-2"} gap-2`,
          "data-ocid": "history.stats.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Bills",
                value: String(stats.totalBills),
                color: "default"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Revenue",
                value: formatCurrency(stats.totalRevenue, currency),
                color: "blue"
              }
            ),
            isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Profit",
                value: formatCurrency(stats.totalProfit, currency),
                color: "green"
              }
            )
          ]
        }
      ),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "history.loading_state", children: ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(BillSkeleton, {}, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { filtered: bills.length > 0 || !!searchQuery }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "history.bill.list", children: paginated.map((bill, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          BillRow,
          {
            bill,
            currency,
            dateFormat,
            isOwner,
            shopId,
            onExpand: setSelectedBill,
            onRefresh: fetchBills,
            "data-ocid": `history.bill.item.${i + 1}`
          },
          String(bill.id)
        )) }),
        hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setPage((p) => p + 1),
            className: "min-h-[44px] px-6",
            "data-ocid": "history.load_more_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 mr-2" }),
              "Load more (",
              filtered.length - page * PAGE_SIZE,
              " remaining)"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground pb-2", children: [
          "Showing ",
          Math.min(paginated.length, filtered.length),
          " of",
          " ",
          filtered.length,
          " bills"
        ] })
      ] }),
      isOwner && !loading && stats.totalBills > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-emerald-600 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-800 font-medium", children: [
          "Profit margin:",
          " ",
          stats.totalRevenue > 0 ? `${(stats.totalProfit / stats.totalRevenue * 100).toFixed(1)}%` : "N/A"
        ] })
      ] })
    ] }),
    selectedBill && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BillDetailModal,
      {
        bill: selectedBill,
        currency,
        dateFormat,
        shopConfig,
        shopId,
        onClose: () => setSelectedBill(null),
        onReprint: (bill, size) => {
          printBill(bill, shopConfig, size);
        },
        onCancel: handleCancel,
        isOwner
      }
    )
  ] });
}
export {
  HistoryPage
};
