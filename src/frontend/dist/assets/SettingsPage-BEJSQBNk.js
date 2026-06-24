import { m as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as cn, c as useApi, H as Trash2, d as useStore, b as useNavigate, a as useInternetIdentity, N as NumberFormat, D as DateFormat, S as ShopType, T as TaxSystem, L as Language, i as isRTL, w as Receipt, P as Package, B as Badge, f as Button, a0 as LogOut, v as ChevronDown, l as applyRTL, a1 as ShopRole, y as Plus, s as setLanguage, a2 as Principal, a3 as settingsGuard } from "./index-CNXs12t8.js";
import { i as useControllableState, b as Primitive, j as useId, c as composeEventHandlers, P as Presence, d as createContextScope, k as Dialog, l as DialogContent, m as DialogHeader, n as DialogTitle, x as DialogFooter } from "./dialog-D-n2xHWK.js";
import { I as Input } from "./input-DeXUznaN.js";
import { L as Label } from "./label-DPOtEUDX.js";
import { R as Root, I as Item, c as createRovingFocusGroupScope, P as Pen } from "./index-D-oAXv5_.js";
import { u as useDirection } from "./index-uYjmh9-Z.js";
import { G as Globe, T as Textarea } from "./textarea-BjLi0_nD.js";
import { u as ue } from "./index-CkUuusRi.js";
import { L as Link, M as MessageCircle } from "./message-circle-aI4f5Jxn.js";
import { C as Copy } from "./copy-BwykX3iI.js";
import { a as getAllCurrencies } from "./currency-KTzMGZJt.js";
import { B as BUILDING_MATERIAL_SHOP_TYPE } from "./index-GRrUhcmE.js";
import { S as Store } from "./store-B6UzXi2B.js";
import { B as Bell } from "./bell-CYaXYvBS.js";
import { U as Users } from "./users-DeBEcpzC.js";
import { I as Info } from "./info-DzjxVLj1.js";
import { T as TriangleAlert } from "./triangle-alert-CuDZ3TSJ.js";
import { S as Save } from "./save-DAH5D5pw.js";
import { S as Search } from "./search-Q1tperYz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function StaffInviteManager({
  shopId
}) {
  const { generateStaffInvite, getStaffInvites, revokeStaffInvite } = useApi();
  const [invites, setInvites] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [generating, setGenerating] = reactExports.useState(false);
  const [generatedInvite, setGeneratedInvite] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const loadInvites = reactExports.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStaffInvites(shopId);
      setInvites(data);
    } catch (_err) {
      setError("Invites load nahi ho sake. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  }, [shopId, getStaffInvites]);
  const handleGenerate = reactExports.useCallback(async () => {
    setGenerating(true);
    setError(null);
    try {
      const invite = await generateStaffInvite(shopId);
      setGeneratedInvite(invite);
      await loadInvites();
    } catch (_err) {
      setError("Invite link generate nahi ho saka. Dobara try karein.");
    } finally {
      setGenerating(false);
    }
  }, [shopId, generateStaffInvite, loadInvites]);
  const handleRevoke = reactExports.useCallback(
    async (token) => {
      setError(null);
      try {
        await revokeStaffInvite(token);
        await loadInvites();
      } catch (_err) {
        setError("Invite revoke nahi ho saka. Dobara try karein.");
      }
    },
    [revokeStaffInvite, loadInvites]
  );
  reactExports.useEffect(() => {
    loadInvites();
  }, [loadInvites]);
  function getInviteUrl(token) {
    return `${window.location.origin}/join/${token}`;
  }
  async function copyToClipboard(url) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      setError("Link copy nahi ho saka.");
    }
  }
  function shareOnWhatsApp(url) {
    const text = `Aapko staff invite mila hai! Link se join karein: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }
  function formatExpiry(expiresAt) {
    const now = BigInt(Date.now()) * 1000000n;
    const diffNanos = expiresAt - now;
    if (diffNanos <= 0n) return "Expired";
    const diffMs = Number(diffNanos / 1000000n);
    const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    const remainingHours = diffHours % 24;
    if (diffDays > 0) {
      return `Bacha hua waqt: ${diffDays} din ${remainingHours} ghante`;
    }
    return `Bacha hua waqt: ${diffHours} ghante`;
  }
  function getStatusBadge(used, expiresAt) {
    const now = BigInt(Date.now()) * 1000000n;
    const isExpired = expiresAt <= now;
    if (used) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800", children: "Accepted" });
    }
    if (isExpired) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800", children: "Expired" });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800", children: "Pending" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-white rounded-lg shadow p-4 mb-4",
      "data-ocid": "staff-invite-manager",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "h-5 w-5 text-blue-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Staff Invite Links" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Naye staff ke liye invite link banayein. Link 7 din valid rahega." }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700",
            "data-ocid": "staff-invite-error",
            children: error
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleGenerate,
            disabled: generating,
            "data-ocid": "generate-staff-invite-btn",
            className: "inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
            children: generating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" }),
              "Link ban raha hai..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Naya Staff Invite Link Banaye" })
          }
        ),
        generatedInvite && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-4 rounded-md bg-green-50 p-3",
            "data-ocid": "generated-invite-panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-green-800 mb-2", children: "Link ban gaya!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    readOnly: true,
                    value: getInviteUrl(generatedInvite.token),
                    className: "flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700",
                    "data-ocid": "invite-link-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => copyToClipboard(getInviteUrl(generatedInvite.token)),
                    "data-ocid": "copy-invite-link-btn",
                    className: "inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
                      "Copy"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => shareOnWhatsApp(getInviteUrl(generatedInvite.token)),
                    "data-ocid": "whatsapp-share-invite-btn",
                    className: "inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
                      "WhatsApp"
                    ]
                  }
                )
              ] }),
              copied && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "mt-2 text-sm font-medium text-green-700",
                  "data-ocid": "copy-success-message",
                  children: "Link copy ho gaya!"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "my-4 border-gray-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-900 mb-3", children: "Aapke Invite Links" }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 text-sm text-gray-600",
            "data-ocid": "invites-loading-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" }),
              "Loading invites..."
            ]
          }
        ) : invites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", "data-ocid": "invites-empty-state", children: "Koi invite link nahi hai. Naya link banaye!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", "data-ocid": "invites-list", children: invites.map((invite, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0",
            "data-ocid": `invite-item.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-mono text-gray-700", children: [
                    invite.token.slice(0, 8),
                    "..."
                  ] }),
                  getStatusBadge(invite.used, invite.expiresAt)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                  formatExpiry(invite.expiresAt)
                ] }),
                invite.used && invite.usedBy && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-600", children: [
                  "Accepted by: ",
                  invite.usedBy.toString().slice(0, 12),
                  "..."
                ] })
              ] }),
              invite.used === false && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleRevoke(invite.token),
                  "data-ocid": "revoke-invite-btn",
                  className: "inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
                    "Revoke"
                  ]
                }
              )
            ]
          },
          invite.token
        )) })
      ]
    }
  );
}
const CURRENCY_REGIONS = {
  Asia: [
    "INR",
    "BDT",
    "PKR",
    "IDR",
    "MYR",
    "PHP",
    "THB",
    "VND",
    "CNY",
    "JPY",
    "KRW",
    "SGD",
    "HKD",
    "TWD",
    "NPR",
    "LKR",
    "MMK"
  ],
  "Middle East": [
    "AED",
    "SAR",
    "KWD",
    "QAR",
    "BHD",
    "OMR",
    "IQD",
    "JOD",
    "EGP"
  ],
  Europe: [
    "EUR",
    "GBP",
    "CHF",
    "SEK",
    "NOK",
    "DKK",
    "PLN",
    "CZK",
    "HUF",
    "RON",
    "TRY",
    "UAH",
    "RUB",
    "BYN"
  ],
  Americas: ["USD", "CAD", "BRL", "MXN", "ARS", "COP", "CLP", "PEN", "CRC"],
  Africa: [
    "NGN",
    "KES",
    "ZAR",
    "GHS",
    "TZS",
    "UGX",
    "ETB",
    "XOF",
    "MAD",
    "DZD",
    "ZMW"
  ],
  Oceania: ["AUD", "NZD"]
};
const SHOP_TYPE_META = {
  [ShopType.Mobile]: {
    icon: "📱",
    label: "Mobile Shop",
    desc: "IMEI-based tracking"
  },
  [ShopType.Electronics]: {
    icon: "💻",
    label: "Electronics",
    desc: "Serial number engine"
  },
  [ShopType.Medical]: {
    icon: "💊",
    label: "Medical / Pharmacy",
    desc: "Batch + expiry engine"
  },
  [ShopType.Clothing]: {
    icon: "👕",
    label: "Clothing / Fashion",
    desc: "Size variant engine"
  },
  [ShopType.Footwear]: {
    icon: "👟",
    label: "Footwear",
    desc: "Size + pair engine"
  },
  [ShopType.Grocery]: { icon: "🛒", label: "Grocery", desc: "Weight engine" },
  [ShopType.Stationery]: {
    icon: "✏️",
    label: "Stationery",
    desc: "Type-based engine"
  },
  [ShopType.Restaurant]: {
    icon: "🍽️",
    label: "Restaurant",
    desc: "Menu + KOT engine"
  },
  [ShopType.AutoParts]: {
    icon: "🔧",
    label: "Auto Parts",
    desc: "Vehicle mapping engine"
  },
  [ShopType.Hardware]: {
    icon: "🔨",
    label: "Hardware Store",
    desc: "SKU engine"
  },
  [ShopType.Jewelry]: {
    icon: "💍",
    label: "Jewelry",
    desc: "Weight + purity engine"
  },
  [ShopType.Salon]: {
    icon: "✂️",
    label: "Salon / Service",
    desc: "Service + duration engine"
  },
  [ShopType.General]: {
    icon: "🏪",
    label: "General Store",
    desc: "Basic flexible engine"
  },
  [BUILDING_MATERIAL_SHOP_TYPE]: {
    icon: "🏗️",
    label: "Building Material",
    desc: "Cement, bricks, steel, tiles, paint, pipes, wood & all construction materials"
  },
  [ShopType.AgroProducts]: {
    icon: "🌾",
    label: "Agro Products",
    desc: "Seeds, fertilizer, pesticide, farming tools, animal feed"
  },
  [ShopType.FruitsVegetables]: {
    icon: "🍎",
    label: "Fruits & Vegetables",
    desc: "Fresh fruits, vegetables, herbs, dry fruits, seasonal produce"
  },
  [ShopType.Electrical]: {
    icon: "⚡",
    label: "Electrical Shop",
    desc: "Switchboards, wiring, cables, AMP-rated items for retail & wholesale"
  }
};
const TAX_SYSTEM_INFO = {
  [TaxSystem.GST]: {
    label: "GST (India)",
    desc: "CGST + SGST / IGST split. Rates: 0%, 5%, 12%, 18%, 28%",
    country: "🇮🇳 India"
  },
  [TaxSystem.VAT]: {
    label: "VAT",
    desc: "Value Added Tax — used in Europe, Middle East, Africa",
    country: "🌍 Europe / ME / Africa"
  },
  [TaxSystem.SalesTax]: {
    label: "Sales Tax (USA)",
    desc: "State-wise percentage, added at point of sale",
    country: "🇺🇸 USA"
  },
  [TaxSystem.Generic]: {
    label: "Generic Tax %",
    desc: "Any percentage tax — works worldwide",
    country: "🌐 Universal"
  }
};
const GST_RATES = [0, 5, 12, 18, 28];
const LANGUAGE_META = [
  { lang: Language.English, label: "English", native: "English", flag: "🇬🇧" },
  { lang: Language.Hindi, label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  {
    lang: Language.Arabic,
    label: "Arabic",
    native: "العربية",
    flag: "🇸🇦",
    rtl: true
  },
  { lang: Language.French, label: "French", native: "Français", flag: "🇫🇷" },
  { lang: Language.Spanish, label: "Spanish", native: "Español", flag: "🇪🇸" },
  {
    lang: Language.Portuguese,
    label: "Portuguese",
    native: "Português",
    flag: "🇧🇷"
  },
  { lang: Language.Swahili, label: "Swahili", native: "Kiswahili", flag: "🇰🇪" },
  {
    lang: Language.BahasaIndonesia,
    label: "Bahasa Indonesia",
    native: "Bahasa",
    flag: "🇮🇩"
  },
  { lang: Language.Bengali, label: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  { lang: Language.Urdu, label: "Urdu", native: "اردو", flag: "🇵🇰", rtl: true }
];
function CurrencyPicker({
  value,
  onChange
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const currencies = getAllCurrencies();
  const filtered = search.trim() ? currencies.filter(
    (c) => c.code.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase())
  ) : currencies;
  const selectedCurrency = currencies.find((c) => c.code === value);
  const grouped = {};
  if (search.trim()) {
    grouped.Results = filtered;
  } else {
    for (const [region, codes] of Object.entries(CURRENCY_REGIONS)) {
      const regionCurrencies = currencies.filter((c) => codes.includes(c.code));
      if (regionCurrencies.length > 0) grouped[region] = regionCurrencies;
    }
    const allCodes = Object.values(CURRENCY_REGIONS).flat();
    const others = currencies.filter((c) => !allCodes.includes(c.code));
    if (others.length > 0) grouped.Other = others;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "settings.currency_select",
        onClick: () => setOpen(!open),
        className: "w-full flex items-center justify-between px-3 py-2.5 border border-input rounded-lg bg-background hover:bg-muted/50 transition-colors text-sm",
        children: [
          selectedCurrency ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-primary", children: selectedCurrency.symbol }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedCurrency.code }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "— ",
              selectedCurrency.name
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Select currency..." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute z-50 top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl shadow-lg overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5 bg-muted/50 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            "data-ocid": "settings.currency_search_input",
            type: "text",
            placeholder: "Search currency...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-y-auto", children: Object.entries(grouped).map(([region, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 sticky top-0", children: region }),
        items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              onChange(c.code);
              setOpen(false);
              setSearch("");
            },
            className: `w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/60 transition-colors ${c.code === value ? "bg-primary/10 text-primary" : "text-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-primary w-8 shrink-0", children: c.symbol }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold w-12 shrink-0", children: c.code }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate", children: c.name })
            ]
          },
          c.code
        ))
      ] }, region)) })
    ] })
  ] });
}
function SettingsSection({
  title,
  desc,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: desc })
    ] }),
    children
  ] });
}
function RadioToggle({
  options,
  value,
  onChange,
  name
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onChange(opt.value),
      "data-ocid": `settings.${name}.${opt.value.toLowerCase()}`,
      className: `flex-1 min-w-[140px] px-4 py-3 rounded-xl border text-left transition-all ${value === opt.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted/40"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: opt.label }),
        opt.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: opt.desc })
      ]
    },
    opt.value
  )) });
}
function StaffManagementSection({
  shopId,
  ownerPrincipal
}) {
  const { getShopStaff, addStaff, removeStaff } = useApi();
  const [staff, setStaff] = reactExports.useState([]);
  const [loadingStaff, setLoadingStaff] = reactExports.useState(true);
  const [principalInput, setPrincipalInput] = reactExports.useState("");
  const [adding, setAdding] = reactExports.useState(false);
  const [removingPrincipal, setRemovingPrincipal] = reactExports.useState(
    null
  );
  const [confirmRemove, setConfirmRemove] = reactExports.useState(null);
  const [addError, setAddError] = reactExports.useState(null);
  const loadStaff = reactExports.useCallback(async () => {
    if (!shopId) {
      setLoadingStaff(false);
      return;
    }
    setLoadingStaff(true);
    let retries = 0;
    while (retries < 3) {
      try {
        const members = await getShopStaff(shopId);
        setStaff(members);
        setLoadingStaff(false);
        return;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes("Actor not ready") && retries < 2) {
          retries++;
          await new Promise((res) => setTimeout(res, 1e3));
        } else {
          ue.error("Failed to load staff. Please try again.");
          setLoadingStaff(false);
          return;
        }
      }
    }
    setLoadingStaff(false);
  }, [shopId, getShopStaff]);
  reactExports.useEffect(() => {
    void loadStaff();
  }, [loadStaff]);
  const handleAddStaff = async () => {
    const trimmed = principalInput.trim();
    if (!trimmed) {
      setAddError("Please enter a Principal ID");
      return;
    }
    setAddError(null);
    setAdding(true);
    try {
      const principal = Principal.fromText(trimmed);
      const result = await addStaff(shopId, principal);
      if (result.__kind__ === "ok") {
        ue.success("Staff member added successfully");
        setPrincipalInput("");
        await loadStaff();
      } else if (result.__kind__ === "err") {
        setAddError(result.err);
      }
    } catch {
      setAddError("Invalid Principal ID — please check and try again");
    } finally {
      setAdding(false);
    }
  };
  const handleRemoveStaff = async (member) => {
    setRemovingPrincipal(member.principal.toText());
    try {
      const result = await removeStaff(shopId, member.principal);
      if (result.__kind__ === "ok") {
        ue.success("Staff member removed");
        setStaff(
          (prev) => prev.filter(
            (m) => m.principal.toText() !== member.principal.toText()
          )
        );
      } else {
        ue.error(
          result.err ?? "Failed to remove"
        );
      }
    } catch {
      ue.error("Failed to remove staff member");
    } finally {
      setRemovingPrincipal(null);
      setConfirmRemove(null);
    }
  };
  const formatDate = (ts) => {
    const date = new Date(Number(ts / BigInt(1e6)));
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };
  const totalCount = staff.filter((m) => m.role === ShopRole.staff).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsSection,
    {
      title: "Staff Members",
      desc: "Add staff who can create bills. Staff cannot view profit or reports.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: "👑" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground truncate", children: [
              ownerPrincipal.slice(0, 10),
              "...",
              ownerPrincipal.slice(-6)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your account" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 shrink-0 text-xs", children: "Owner" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StaffInviteManager, { shopId }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
            "Add New Staff Member",
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "ml-auto text-xs", children: [
              totalCount,
              " staff"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.staff.principal_input",
                placeholder: "e.g. aaaaa-aa or full principal ID",
                value: principalInput,
                onChange: (e) => {
                  setPrincipalInput(e.target.value);
                  setAddError(null);
                },
                onKeyDown: (e) => {
                  if (e.key === "Enter") void handleAddStaff();
                },
                className: "flex-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": "settings.staff.add_button",
                onClick: () => void handleAddStaff(),
                disabled: adding || !principalInput.trim(),
                className: "shrink-0",
                children: adding ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 mr-1" }),
                  " Add"
                ] })
              }
            )
          ] }),
          addError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              "data-ocid": "settings.staff.add_error",
              className: "text-xs text-destructive flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
                " ",
                addError
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Ask your staff member for their Principal ID — found on their Settings page." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "settings.staff.list", children: loadingStaff ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "settings.staff.loading_state",
            className: "flex items-center gap-2 py-4 text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Loading staff..." })
            ]
          }
        ) : staff.filter((m) => m.role === ShopRole.staff).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "settings.staff.empty_state",
            className: "flex flex-col items-center gap-2 py-8 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No staff members added yet." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Add staff to give them billing access." })
            ]
          }
        ) : staff.filter((m) => m.role === ShopRole.staff).map((member, idx) => {
          const principalText = member.principal.toText();
          const isRemoving = removingPrincipal === principalText;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `settings.staff.item.${idx + 1}`,
              className: "flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-border/80 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground font-mono truncate", children: [
                    principalText.slice(0, 10),
                    "..."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Added ",
                    formatDate(member.addedAt)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/10 text-blue-600 border-blue-500/20 shrink-0 text-xs", children: "Staff" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    "data-ocid": `settings.staff.remove_button.${idx + 1}`,
                    onClick: () => setConfirmRemove(member),
                    disabled: isRemoving,
                    className: "shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive px-2",
                    children: isRemoving ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-destructive/40 border-t-destructive rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ]
            },
            principalText
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!confirmRemove,
            onOpenChange: (open) => {
              if (!open) setConfirmRemove(null);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DialogContent,
              {
                "data-ocid": "settings.staff.remove_dialog",
                className: "max-w-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Remove Staff Member?" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "This will remove",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-medium text-foreground", children: [
                      confirmRemove == null ? void 0 : confirmRemove.principal.toText().slice(0, 10),
                      "..."
                    ] }),
                    " ",
                    "from your shop. They will lose billing access immediately."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 flex-row justify-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        "data-ocid": "settings.staff.remove_cancel_button",
                        onClick: () => setConfirmRemove(null),
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "destructive",
                        "data-ocid": "settings.staff.remove_confirm_button",
                        onClick: () => {
                          if (confirmRemove) void handleRemoveStaff(confirmRemove);
                        },
                        disabled: !!removingPrincipal,
                        children: "Remove"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
const EMPTY_SUPPLIER_FORM = {
  name: "",
  businessType: "Wholesaler",
  phone: "",
  email: "",
  address: "",
  city: "",
  defaultTransportCharge: ""
};
const BUSINESS_TYPES = ["Wholesaler", "Distributor", "Manufacturer"];
function SuppliersSection({
  shopId,
  currency
}) {
  const {
    listSuppliersByShop,
    createSupplier,
    updateSupplier,
    deleteSupplier
  } = useApi();
  const [suppliers, setSuppliers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingSupplier, setEditingSupplier] = reactExports.useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_SUPPLIER_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const loadSuppliers = reactExports.useCallback(async () => {
    if (!shopId) return;
    setLoading(true);
    let retries = 0;
    while (retries < 3) {
      try {
        const data = await listSuppliersByShop(shopId);
        setSuppliers(data);
        setLoading(false);
        return;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes("Actor not ready") && retries < 2) {
          retries++;
          await new Promise((res) => setTimeout(res, 1e3));
        } else {
          ue.error("Failed to load suppliers. Please try again.");
          setLoading(false);
          return;
        }
      }
    }
    setLoading(false);
  }, [shopId, listSuppliersByShop]);
  reactExports.useEffect(() => {
    void loadSuppliers();
  }, [loadSuppliers]);
  const openAdd = () => {
    setEditingSupplier(null);
    setForm(EMPTY_SUPPLIER_FORM);
    setErrors({});
    setDialogOpen(true);
  };
  const openEdit = (s) => {
    setEditingSupplier(s);
    setForm({
      name: s.name,
      businessType: s.businessType,
      phone: s.phone,
      email: s.email ?? "",
      address: s.address ?? "",
      city: s.city ?? "",
      defaultTransportCharge: s.defaultTransportCharge ?? ""
    });
    setErrors({});
    setDialogOpen(true);
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    let retries = 0;
    while (retries < 3) {
      try {
        if (editingSupplier) {
          const updated = await updateSupplier(
            shopId,
            editingSupplier.id,
            form.name.trim(),
            form.businessType,
            form.phone.trim(),
            form.email.trim() || null,
            form.address.trim() || null,
            form.city.trim() || null,
            form.defaultTransportCharge.trim() || null
          );
          if (updated == null ? void 0 : updated.id) {
            ue.success("Supplier updated");
            setDialogOpen(false);
            await loadSuppliers();
          } else {
            ue.error("Failed to update supplier. Please try again.");
          }
        } else {
          const created = await createSupplier(
            shopId,
            form.name.trim(),
            form.businessType,
            form.phone.trim(),
            form.email.trim() || null,
            form.address.trim() || null,
            form.city.trim() || null,
            form.defaultTransportCharge.trim() || null
          );
          if (created == null ? void 0 : created.id) {
            ue.success("Supplier added");
            setDialogOpen(false);
            await loadSuppliers();
          } else {
            ue.error("Failed to add supplier. Please try again.");
          }
        }
        setSaving(false);
        return;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes("Actor not ready") && retries < 2) {
          retries++;
          await new Promise((res) => setTimeout(res, 1e3));
        } else if (msg.includes("trap") || msg.includes("assertion failed")) {
          ue.error(
            `Backend error: ${msg}. Please check your input and try again.`
          );
          setSaving(false);
          return;
        } else if (msg.includes("validation") || msg.includes("required")) {
          ue.error(`Validation error: ${msg}`);
          setSaving(false);
          return;
        } else {
          ue.error("Something went wrong. Please try again.");
          setSaving(false);
          return;
        }
      }
    }
    setSaving(false);
    ue.error(
      "Connection timed out. Please check your network and try again."
    );
  };
  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setDeleting(true);
    try {
      const ok = await deleteSupplier(confirmDeleteId);
      if (ok) {
        ue.success("Supplier deleted");
        setSuppliers((prev) => prev.filter((s) => s.id !== confirmDeleteId));
      } else {
        ue.error("Failed to delete supplier");
      }
    } catch {
      ue.error("Something went wrong");
    } finally {
      setDeleting(false);
      setConfirmDeleteId(null);
    }
  };
  const businessTypeBadgeClass = (bt) => {
    switch (bt) {
      case "Distributor":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Manufacturer":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      default:
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsSection,
    {
      title: "Suppliers",
      desc: "Manage your wholesalers, distributors, and manufacturers. Track purchase history and transport charges per supplier.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "settings.suppliers.add_button",
            onClick: openAdd,
            size: "sm",
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add Supplier"
            ]
          }
        ) }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "settings.suppliers.loading_state",
            className: "flex items-center gap-2 py-8 text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Loading suppliers..." })
            ]
          }
        ) : suppliers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "settings.suppliers.empty_state",
            className: "flex flex-col items-center gap-3 py-12 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-6 h-6 text-muted-foreground/50" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No suppliers added yet." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Add suppliers to track purchase history and compare prices." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "settings.suppliers.list", children: suppliers.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `settings.suppliers.item.${idx + 1}`,
            className: "flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-border/80 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: s.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-[10px] px-1.5 py-0 h-4 shrink-0 ${businessTypeBadgeClass(s.businessType)}`,
                      children: s.businessType
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                  s.phone,
                  s.city ? ` · ${s.city}` : "",
                  s.defaultTransportCharge ? ` · Transport: ${currency} ${s.defaultTransportCharge}` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    "data-ocid": `settings.suppliers.edit_button.${idx + 1}`,
                    onClick: () => openEdit(s),
                    className: "px-2 text-muted-foreground hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    "data-ocid": `settings.suppliers.delete_button.${idx + 1}`,
                    onClick: () => setConfirmDeleteId(s.id),
                    className: "px-2 text-destructive hover:bg-destructive/10 hover:text-destructive",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ]
          },
          s.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: dialogOpen,
            onOpenChange: (o) => {
              if (!o) setDialogOpen(false);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DialogContent,
              {
                "data-ocid": "settings.suppliers.dialog",
                className: "max-w-md max-h-[90vh] overflow-y-auto",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editingSupplier ? "Edit Supplier" : "Add Supplier" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "sup-name", className: "font-medium", children: [
                        "Supplier Name ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "sup-name",
                          "data-ocid": "settings.suppliers.name_input",
                          placeholder: "e.g. Ali Traders, Pak Distributors",
                          value: form.name,
                          onChange: (e) => {
                            setForm((p) => ({ ...p, name: e.target.value }));
                            setErrors((p) => ({ ...p, name: void 0 }));
                          }
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          "data-ocid": "settings.suppliers.name_error",
                          className: "text-xs text-destructive",
                          children: errors.name
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium", children: "Business Type" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: BUSINESS_TYPES.map((bt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `settings.suppliers.btype.${bt.toLowerCase()}`,
                          onClick: () => setForm((p) => ({ ...p, businessType: bt })),
                          className: `flex-1 min-w-[90px] px-3 py-2 rounded-lg border text-sm font-medium transition-all ${form.businessType === bt ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:border-primary/40"}`,
                          children: bt
                        },
                        bt
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "sup-phone", className: "font-medium", children: [
                        "Phone ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "sup-phone",
                          "data-ocid": "settings.suppliers.phone_input",
                          type: "tel",
                          placeholder: "+92 300 1234567",
                          value: form.phone,
                          onChange: (e) => {
                            setForm((p) => ({ ...p, phone: e.target.value }));
                            setErrors((p) => ({ ...p, phone: void 0 }));
                          }
                        }
                      ),
                      errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          "data-ocid": "settings.suppliers.phone_error",
                          className: "text-xs text-destructive",
                          children: errors.phone
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "sup-email", className: "font-medium", children: [
                        "Email",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: "(optional)" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "sup-email",
                          "data-ocid": "settings.suppliers.email_input",
                          type: "email",
                          placeholder: "supplier@example.com",
                          value: form.email,
                          onChange: (e) => setForm((p) => ({ ...p, email: e.target.value }))
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "sup-city", className: "font-medium", children: [
                          "City",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: "(optional)" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "sup-city",
                            "data-ocid": "settings.suppliers.city_input",
                            placeholder: "Karachi",
                            value: form.city,
                            onChange: (e) => setForm((p) => ({ ...p, city: e.target.value }))
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "sup-transport", className: "font-medium", children: [
                          "Transport (",
                          currency,
                          ")",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: "(optional)" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "sup-transport",
                            "data-ocid": "settings.suppliers.transport_input",
                            type: "number",
                            min: 0,
                            step: 0.01,
                            placeholder: "0.00",
                            value: form.defaultTransportCharge,
                            onChange: (e) => setForm((p) => ({
                              ...p,
                              defaultTransportCharge: e.target.value
                            }))
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "sup-address", className: "font-medium", children: [
                        "Address",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: "(optional)" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          id: "sup-address",
                          "data-ocid": "settings.suppliers.address_input",
                          placeholder: "Street, area, city",
                          value: form.address,
                          onChange: (e) => setForm((p) => ({ ...p, address: e.target.value })),
                          rows: 2,
                          className: "resize-none"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 flex-row justify-end pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        "data-ocid": "settings.suppliers.cancel_button",
                        onClick: () => setDialogOpen(false),
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "settings.suppliers.submit_button",
                        onClick: () => void handleSave(),
                        disabled: saving,
                        children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin mr-2" }),
                          "Saving..."
                        ] }) : editingSupplier ? "Save Changes" : "Add Supplier"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!confirmDeleteId,
            onOpenChange: (o) => {
              if (!o) setConfirmDeleteId(null);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DialogContent,
              {
                "data-ocid": "settings.suppliers.delete_dialog",
                className: "max-w-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Delete Supplier?" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This will permanently remove the supplier and their records from this shop." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 flex-row justify-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        "data-ocid": "settings.suppliers.delete_cancel_button",
                        onClick: () => setConfirmDeleteId(null),
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "destructive",
                        "data-ocid": "settings.suppliers.delete_confirm_button",
                        onClick: () => void handleDelete(),
                        disabled: deleting,
                        children: deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-destructive-foreground/40 border-t-destructive-foreground rounded-full animate-spin" }) : "Delete"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function DefaultChargesSection({ currency }) {
  const { getDefaultCharges, setDefaultCharges } = useApi();
  const [transport, setTransport] = reactExports.useState("");
  const [labour, setLabour] = reactExports.useState("");
  const [other, setOther] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    getDefaultCharges().then((charges) => {
      if (cancelled) return;
      if (charges) {
        setTransport(charges.defaultTransportCharge ?? "");
        setLabour(charges.defaultLabourCharge ?? "");
        setOther(charges.defaultOtherCharge ?? "");
      }
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [getDefaultCharges]);
  const handleSave = async () => {
    setSaving(true);
    try {
      const charges = {
        defaultTransportCharge: transport.trim() || void 0,
        defaultLabourCharge: labour.trim() || void 0,
        defaultOtherCharge: other.trim() || void 0
      };
      const ok = await setDefaultCharges(charges);
      if (ok) {
        ue.success("Default charges saved successfully");
      } else {
        ue.error("Failed to save default charges");
      }
    } catch {
      ue.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "settings.default_charges.loading_state",
        className: "flex items-center gap-2 py-8 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Loading default charges..." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsSection,
    {
      title: "Default Charges",
      desc: "Set default transport, labour, and other charges. These auto-fill when adding stock — you can still edit per purchase.",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "def-transport",
              className: "font-medium flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-muted-foreground" }),
                "Default Transport Charge (",
                currency,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "def-transport",
              "data-ocid": "settings.default_charges.transport_input",
              type: "number",
              min: 0,
              step: 0.01,
              placeholder: "e.g. 200",
              value: transport,
              onChange: (e) => setTransport(e.target.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Shipping / freight charge per purchase order" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "def-labour",
              className: "font-medium flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-muted-foreground" }),
                "Default Labour Charge (",
                currency,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "def-labour",
              "data-ocid": "settings.default_charges.labour_input",
              type: "number",
              min: 0,
              step: 0.01,
              placeholder: "e.g. 100",
              value: labour,
              onChange: (e) => setLabour(e.target.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Labour / handling cost per purchase order" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "def-other",
              className: "font-medium flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4 text-muted-foreground" }),
                "Default Other Charge (",
                currency,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "def-other",
              "data-ocid": "settings.default_charges.other_input",
              type: "number",
              min: 0,
              step: 0.01,
              placeholder: "e.g. 50",
              value: other,
              onChange: (e) => setOther(e.target.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Any other recurring charge (packaging, inspection, etc.)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 px-3 py-2.5 bg-muted/40 border border-border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
            "These values auto-fill when adding new stock. They are included in automatic cost calculation:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cost = Purchase Price + Transport + Labour + Other" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            "data-ocid": "settings.default_charges.save_button",
            onClick: () => void handleSave(),
            disabled: saving,
            className: "w-full",
            children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin mr-2" }),
              "Saving..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
              "Save Default Charges"
            ] })
          }
        )
      ] })
    }
  );
}
function SettingsPage() {
  const { getShopConfig, updateShopConfig, ready } = useApi();
  const { shopConfig, setShopConfig, activeShopId } = useStore();
  const navigate = useNavigate();
  const { clear: logout, identity } = useInternetIdentity();
  const ownerPrincipal = (identity == null ? void 0 : identity.getPrincipal().toText()) ?? "";
  const unifiedShopId = activeShopId ?? (shopConfig == null ? void 0 : shopConfig.shopName) ?? "";
  const { reset } = useStore();
  const handleLogout = () => {
    logout();
    reset();
    void navigate({ to: "/setup" });
  };
  const [loading, setLoading] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [changeShopTypeOpen, setChangeShopTypeOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    isSetupComplete: true,
    shopName: "",
    shopAddress: "",
    shopPhone: "",
    shopEmail: "",
    country: "IN",
    currency: "INR",
    language: Language.English,
    taxSystem: TaxSystem.GST,
    taxRate: 18,
    shopType: ShopType.General,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.Indian,
    expiryAlertThresholdDays: BigInt(90),
    minStockAlertEnabled: true,
    deadStockAlertDays: BigInt(180),
    gstinNumber: "",
    vatNumber: ""
  });
  const [customGstRate, setCustomGstRate] = reactExports.useState(false);
  const [selectedLanguage, setSelectedLanguage] = reactExports.useState(
    Language.English
  );
  const loadConfig = reactExports.useCallback(async () => {
    if (!ready) return;
    setLoading(true);
    try {
      const config = shopConfig ?? await getShopConfig();
      if (config) {
        setForm({
          ...config,
          expiryAlertThresholdDays: config.expiryAlertThresholdDays ?? BigInt(90),
          minStockAlertEnabled: config.minStockAlertEnabled ?? true,
          deadStockAlertDays: config.deadStockAlertDays ?? BigInt(180),
          gstinNumber: config.gstinNumber ?? "",
          vatNumber: config.vatNumber ?? ""
        });
        setSelectedLanguage(config.language);
        const isCustomGst = config.taxSystem === TaxSystem.GST && !GST_RATES.includes(config.taxRate);
        setCustomGstRate(isCustomGst);
      }
    } finally {
      setLoading(false);
    }
  }, [ready, shopConfig, getShopConfig]);
  reactExports.useEffect(() => {
    void loadConfig();
  }, [loadConfig]);
  const handleSave = async () => {
    if (!form.shopName.trim()) {
      ue.error("Shop name is required");
      return;
    }
    const setupKeys = [
      "usm-setup-done",
      "usm-setup-complete",
      "usm-setup-complete-v2",
      "usm-registered",
      "usm-setup-complete-nav"
    ];
    for (const k of setupKeys) {
      try {
        localStorage.setItem(k, "true");
      } catch {
      }
      try {
        sessionStorage.setItem(k, "true");
      } catch {
      }
    }
    try {
      const principalKey = Object.keys(localStorage).find(
        (k) => k.startsWith("usm-reg-")
      );
      if (principalKey) {
        localStorage.setItem(principalKey, "true");
        sessionStorage.setItem(principalKey, "true");
      }
    } catch {
    }
    settingsGuard.isSavingSettings = true;
    setSaving(true);
    try {
      const updated = await updateShopConfig({
        ...form,
        language: selectedLanguage,
        isSetupComplete: true
      });
      if (updated) {
        setShopConfig(updated);
        setLanguage(updated.language);
        applyRTL(updated.language);
        ue.success("Settings saved successfully");
      }
    } catch {
      ue.error("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
      setTimeout(() => {
        settingsGuard.isSavingSettings = false;
      }, 500);
    }
  };
  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setForm((prev) => ({ ...prev, language: lang }));
    applyRTL(lang);
  };
  const currentShopMeta = SHOP_TYPE_META[form.shopType] ?? SHOP_TYPE_META[ShopType.General];
  const isRTLSelected = isRTL(selectedLanguage);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "settings.loading_state",
        className: "flex items-center justify-center min-h-[60vh]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading settings..." })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full bg-background pb-32", "data-ocid": "settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 py-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Configure your shop, currency, tax, and display preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "shop-info", "data-ocid": "settings.tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full flex flex-wrap h-auto gap-1 p-1 mb-6 bg-muted/60 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "shop-info",
              "data-ocid": "settings.tab.shop_info",
              className: "flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Shop Info" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Shop" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "currency",
              "data-ocid": "settings.tab.currency",
              className: "flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Currency" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Money" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "tax",
              "data-ocid": "settings.tab.tax",
              className: "flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-3.5 h-3.5" }),
                "Tax"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "language",
              "data-ocid": "settings.tab.language",
              className: "flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Language" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Lang" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "shop-type",
              "data-ocid": "settings.tab.shop_type",
              className: "flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Shop Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Type" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "alerts",
              "data-ocid": "settings.tab.alerts",
              className: "flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3.5 h-3.5" }),
                "Alerts"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "staff",
              "data-ocid": "settings.tab.staff",
              className: "flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
                "Staff"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "suppliers",
              "data-ocid": "settings.tab.suppliers",
              className: "flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Suppliers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Supp." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "default-charges",
              "data-ocid": "settings.tab.default_charges",
              className: "flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Charges" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Chrg." })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "shop-info", className: "space-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            title: "Shop Information",
            desc: "Your shop's basic details appear on all bills and invoices",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "shopName", className: "font-medium", children: [
                  "Shop Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "shopName",
                    "data-ocid": "settings.shop_name.input",
                    placeholder: "e.g. Sharma Electronics, Bright Pharmacy",
                    value: form.shopName,
                    onChange: (e) => setForm((p) => ({ ...p, shopName: e.target.value }))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "shopAddress", className: "font-medium", children: "Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "shopAddress",
                    "data-ocid": "settings.shop_address.textarea",
                    placeholder: "Shop address, city, state, country",
                    value: form.shopAddress,
                    onChange: (e) => setForm((p) => ({ ...p, shopAddress: e.target.value })),
                    rows: 3,
                    className: "resize-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "shopPhone", className: "font-medium", children: "Shop Mobile Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "shopPhone",
                      "data-ocid": "settings.shop_phone.input",
                      type: "tel",
                      placeholder: "+91 98765 43210",
                      value: form.shopPhone,
                      onChange: (e) => setForm((p) => ({ ...p, shopPhone: e.target.value }))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Used for bill sharing and shop identification" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "shopEmail", className: "font-medium", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "shopEmail",
                      "data-ocid": "settings.shop_email.input",
                      type: "email",
                      placeholder: "shop@example.com",
                      value: form.shopEmail,
                      onChange: (e) => setForm((p) => ({ ...p, shopEmail: e.target.value }))
                    }
                  )
                ] })
              ] })
            ] })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "currency", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            title: "Currency & Region",
            desc: "Set your local currency and number formatting preferences",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium", children: "Currency" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CurrencyPicker,
                  {
                    value: form.currency,
                    onChange: (code) => setForm((p) => ({ ...p, currency: code }))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Changing currency updates how amounts are displayed throughout the app" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium", children: "Number Format" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RadioToggle,
                  {
                    name: "number_format",
                    value: form.numberFormat,
                    onChange: (v) => setForm((p) => ({ ...p, numberFormat: v })),
                    options: [
                      {
                        value: NumberFormat.Indian,
                        label: "Indian Format",
                        desc: "1,00,000 (lakhs/crores)"
                      },
                      {
                        value: NumberFormat.International,
                        label: "International",
                        desc: "100,000 (thousands)"
                      }
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium", children: "Date Format" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RadioToggle,
                  {
                    name: "date_format",
                    value: form.dateFormat,
                    onChange: (v) => setForm((p) => ({ ...p, dateFormat: v })),
                    options: [
                      {
                        value: DateFormat.DDMMYYYY,
                        label: "DD/MM/YYYY",
                        desc: "31/12/2025 — Asia, Europe"
                      },
                      {
                        value: DateFormat.MMDDYYYY,
                        label: "MM/DD/YYYY",
                        desc: "12/31/2025 — USA"
                      }
                    ]
                  }
                )
              ] })
            ] })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tax", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            title: "Tax Settings",
            desc: "Configure how taxes are calculated and displayed on bills",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium", children: "Tax System" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: Object.entries(TAX_SYSTEM_INFO).map(([key, info]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `settings.tax_system.${key.toLowerCase()}`,
                    onClick: () => {
                      const ts = key;
                      setForm((p) => ({
                        ...p,
                        taxSystem: ts,
                        taxRate: ts === TaxSystem.GST ? 18 : ts === TaxSystem.VAT ? 5 : 0
                      }));
                      setCustomGstRate(false);
                    },
                    className: `text-left p-3 rounded-xl border transition-all ${form.taxSystem === key ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/40"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-foreground", children: info.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5 leading-snug", children: info.desc }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: info.country })
                    ]
                  },
                  key
                )) })
              ] }),
              form.taxSystem === TaxSystem.GST && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium", children: "GST Rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                  GST_RATES.map((rate) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `settings.gst_rate.${rate}`,
                      onClick: () => {
                        setForm((p) => ({ ...p, taxRate: rate }));
                        setCustomGstRate(false);
                      },
                      className: `px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${form.taxRate === rate && !customGstRate ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/40"}`,
                      children: [
                        rate,
                        "%"
                      ]
                    },
                    rate
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "settings.gst_rate.custom",
                      onClick: () => setCustomGstRate(true),
                      className: `px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${customGstRate ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:border-primary/40"}`,
                      children: "Custom"
                    }
                  )
                ] }),
                customGstRate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "settings.gst_custom_rate.input",
                      type: "number",
                      min: 0,
                      max: 100,
                      step: 0.1,
                      className: "w-32",
                      value: form.taxRate,
                      onChange: (e) => setForm((p) => ({
                        ...p,
                        taxRate: Number(e.target.value)
                      }))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "%" })
                ] })
              ] }),
              form.taxSystem !== TaxSystem.GST && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "taxRate", className: "font-medium", children: [
                  form.taxSystem === TaxSystem.SalesTax ? "Sales Tax Rate" : "Tax Rate",
                  " ",
                  "(%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "taxRate",
                      "data-ocid": "settings.tax_rate.input",
                      type: "number",
                      min: 0,
                      max: 100,
                      step: 0.01,
                      className: "w-32",
                      value: form.taxRate,
                      onChange: (e) => setForm((p) => ({
                        ...p,
                        taxRate: Number(e.target.value)
                      }))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "%" }),
                  form.taxSystem === TaxSystem.VAT && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Tip: UAE 5%, KSA 15%, EU varies" })
                ] })
              ] }),
              form.taxSystem === TaxSystem.GST && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "gstin-number",
                    className: "block text-sm font-medium text-foreground mb-1",
                    children: "GSTIN (GST Registration Number)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "gstin-number",
                    type: "text",
                    value: form.gstinNumber,
                    onChange: (e) => setForm((prev) => ({
                      ...prev,
                      gstinNumber: e.target.value.toUpperCase()
                    })),
                    placeholder: "22AAAAA0000A1Z5",
                    maxLength: 15,
                    className: "w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Your GST registration number — will appear on bills" })
              ] }),
              form.taxSystem === TaxSystem.VAT && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "vat-number",
                    className: "block text-sm font-medium text-foreground mb-1",
                    children: "VAT Registration Number"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "vat-number",
                    type: "text",
                    value: form.vatNumber,
                    onChange: (e) => setForm((prev) => ({
                      ...prev,
                      vatNumber: e.target.value
                    })),
                    placeholder: "Enter your VAT registration number",
                    className: "w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Your VAT registration number — will appear on bills" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/40 rounded-lg flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Tax is applied on top of product prices (tax-exclusive). The breakdown is shown on every bill. India GST shows CGST + SGST split automatically." })
              ] })
            ] })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "language", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            title: "Language & Display",
            desc: "Choose your preferred language. RTL layout applies automatically for Arabic and Urdu.",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              isRTLSelected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "settings.rtl_indicator",
                  className: "flex items-center gap-2 px-3 py-2 bg-accent/20 border border-accent/30 rounded-lg",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "⇄" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-accent-foreground", children: "RTL (Right-to-Left) layout is active" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-auto text-xs", children: "RTL" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 gap-2", children: LANGUAGE_META.map(({ lang, label, native, flag, rtl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `settings.language.${lang.toLowerCase()}`,
                  onClick: () => handleLanguageSelect(lang),
                  className: `flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedLanguage === lang ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/30 hover:bg-muted/40"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl shrink-0", children: flag }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `font-semibold text-sm text-foreground ${rtl ? "text-right" : ""}`,
                          children: native
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                        label,
                        rtl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: "text-[10px] px-1 py-0 h-4 ml-1",
                            children: "RTL"
                          }
                        )
                      ] })
                    ] }),
                    selectedLanguage === lang && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-primary text-base shrink-0", children: "✓" })
                  ]
                },
                lang
              )) })
            ] })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "shop-type", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            title: "Shop Type",
            desc: "Your shop type determines which product fields and engine are used",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: currentShopMeta.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-foreground text-base", children: currentShopMeta.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: currentShopMeta.desc })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 shrink-0", children: "Current" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-700 leading-relaxed", children: [
                  "Changing shop type affects how",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "new products" }),
                  " are added. Existing products and bills remain unchanged."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  "data-ocid": "settings.change_shop_type.open_modal_button",
                  onClick: () => setChangeShopTypeOpen(true),
                  className: "w-full border-dashed border-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-4 h-4 mr-2" }),
                    "Change Shop Type"
                  ]
                }
              )
            ] })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "alerts", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            title: "Smart Alerts Settings",
            desc: "Configure expiry, low stock, and dead stock alert thresholds for your dashboard.",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "🟠" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Expiry Alert" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Alert days before product expires" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-col sm:flex-row", children: [
                  {
                    days: BigInt(30),
                    label: "30 Days",
                    desc: "1 month",
                    ocid: "settings.expiry_threshold.30"
                  },
                  {
                    days: BigInt(90),
                    label: "3 Months",
                    desc: "90 days",
                    ocid: "settings.expiry_threshold.90"
                  },
                  {
                    days: BigInt(180),
                    label: "6 Months",
                    desc: "180 days",
                    ocid: "settings.expiry_threshold.180"
                  },
                  {
                    days: BigInt(365),
                    label: "12 Months",
                    desc: "365 days",
                    ocid: "settings.expiry_threshold.365"
                  }
                ].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": opt.ocid,
                    onClick: () => setForm((p) => ({
                      ...p,
                      expiryAlertThresholdDays: opt.days
                    })),
                    className: `flex-1 text-left px-3 py-2.5 rounded-xl border transition-all ${form.expiryAlertThresholdDays === opt.days ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted/40"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: opt.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: opt.desc })
                    ]
                  },
                  String(opt.days)
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "🔴" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Low Stock Alert" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Alert when product stock falls below minimum" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "settings.min_stock_alert.toggle",
                      role: "switch",
                      "aria-checked": form.minStockAlertEnabled,
                      onClick: () => setForm((p) => ({
                        ...p,
                        minStockAlertEnabled: !p.minStockAlertEnabled
                      })),
                      className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${form.minStockAlertEnabled ? "bg-primary" : "bg-muted-foreground/30"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${form.minStockAlertEnabled ? "translate-x-6" : "translate-x-1"}`
                        }
                      )
                    }
                  )
                ] }),
                !form.minStockAlertEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg", children: "⚠️ Low stock alerts are disabled. You won't see low stock warnings on the dashboard." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "⚫" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Dead Stock Alert" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mark product as dead stock after X days without a sale" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-col sm:flex-row", children: [
                  {
                    days: BigInt(90),
                    label: "3 Months",
                    desc: "90 days",
                    ocid: "settings.dead_stock.90"
                  },
                  {
                    days: BigInt(180),
                    label: "6 Months",
                    desc: "180 days (recommended)",
                    ocid: "settings.dead_stock.180"
                  },
                  {
                    days: BigInt(365),
                    label: "1 Year",
                    desc: "365 days",
                    ocid: "settings.dead_stock.365"
                  }
                ].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": opt.ocid,
                    onClick: () => setForm((p) => ({
                      ...p,
                      deadStockAlertDays: opt.days
                    })),
                    className: `flex-1 text-left px-3 py-2.5 rounded-xl border transition-all ${form.deadStockAlertDays === opt.days ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted/40"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: opt.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: opt.desc })
                    ]
                  },
                  String(opt.days)
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 px-3 py-2.5 bg-muted/40 border border-border rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
                  "All alerts appear in the ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Smart Alerts" }),
                  " ",
                  "panel on your Dashboard — expiry, low stock, and dead stock in one place. Save your settings to apply changes."
                ] })
              ] })
            ] })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "staff", className: "space-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          StaffManagementSection,
          {
            shopId: unifiedShopId,
            ownerPrincipal
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "suppliers", className: "space-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SuppliersSection,
          {
            shopId: unifiedShopId,
            currency: form.currency
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "default-charges", className: "space-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultChargesSection, { currency: form.currency }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-16 left-0 right-0 sm:static sm:bottom-auto sm:mt-6 px-4 sm:px-0 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card sm:bg-transparent border-t sm:border-0 border-border shadow-xl sm:shadow-none px-0 pt-3 pb-2 sm:p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          "data-ocid": "settings.save_button",
          onClick: () => void handleSave(),
          disabled: saving || !form.shopName.trim(),
          className: "w-full h-12 text-base font-semibold",
          children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin mr-2" }),
            "Saving..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
            "Save Changes"
          ] })
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 text-center space-y-1 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Universal Shop System" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/40", children: "v1.0.0 · Built on Internet Computer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-destructive/20 rounded-xl p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Sign Out" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Log out of your Internet Identity. Your shop data stays safely stored." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            "data-ocid": "settings.logout_button",
            onClick: handleLogout,
            className: "w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive font-medium",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-2" }),
              "Logout"
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: changeShopTypeOpen, onOpenChange: setChangeShopTypeOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "settings.change_shop_type.dialog",
        className: "max-w-lg max-h-[85vh] overflow-y-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg", children: "Select New Shop Type" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 py-2", children: Object.entries(SHOP_TYPE_META).map(([key, meta]) => {
            const type = key;
            const isCurrent = form.shopType === key;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `settings.shop_type_option.${key.toLowerCase()}`,
                onClick: () => {
                  setForm((p) => ({ ...p, shopType: type }));
                  setChangeShopTypeOpen(false);
                },
                className: `flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${isCurrent ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/30 hover:bg-muted/40"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl shrink-0", children: meta.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-foreground truncate", children: meta.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: meta.desc })
                  ] }),
                  isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-sm shrink-0", children: "✓" })
                ]
              },
              key
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              "data-ocid": "settings.change_shop_type.cancel_button",
              onClick: () => setChangeShopTypeOpen(false),
              children: "Cancel"
            }
          ) })
        ]
      }
    ) })
  ] });
}
export {
  SettingsPage
};
