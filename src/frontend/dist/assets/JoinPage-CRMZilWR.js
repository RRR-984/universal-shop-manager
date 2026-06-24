import { m as createLucideIcon, j as jsxRuntimeExports, e as cn, a4 as useParams, a as useInternetIdentity, c as useApi, r as reactExports, f as Button, k as LoaderCircle } from "./index-CNXs12t8.js";
import { C as CircleAlert } from "./circle-alert-BnIukzqe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function JoinPage() {
  const { token } = useParams({ from: "/join/$token" });
  const { identity, login } = useInternetIdentity();
  const { acceptStaffInvite } = useApi();
  const [state, setState] = reactExports.useState("loading");
  const [message, setMessage] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!identity) {
      setState("login");
      return;
    }
    if (!token) {
      setState("error");
      setMessage("Invite link invalid hai. Kripya valid link use karein.");
      return;
    }
    setState("loading");
    acceptStaffInvite(token).then(() => {
      setState("success");
      setMessage("Aap successfully shop ke staff mein add ho gaye hain!");
    }).catch((err) => {
      setState("error");
      setMessage(err.message || "Invite accept karne mein error aayi.");
    });
  }, [identity, token, acceptStaffInvite]);
  if (state === "login") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-sm", "data-ocid": "join.login_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl font-display", children: "Shop Join Karein" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Staff invite link se shop join karne ke liye pehle login karein." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => login(),
            className: "w-full",
            "data-ocid": "join.login_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "mr-2 h-4 w-4" }),
              "Internet Identity se Login Karein"
            ]
          }
        )
      ] })
    ] }) });
  }
  if (state === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-sm", "data-ocid": "join.loading_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-10 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Invite process ho raha hai..." })
    ] }) }) });
  }
  if (state === "success") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-sm", "data-ocid": "join.success_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-10 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-10 w-10 text-green-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-center", children: message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => {
            window.location.href = "/dashboard";
          },
          className: "w-full",
          "data-ocid": "join.dashboard_button",
          children: "Dashboard par Jayein"
        }
      )
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-sm", "data-ocid": "join.error_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-10 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-10 w-10 text-destructive" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-center", children: message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: () => {
          window.location.href = "/";
        },
        variant: "outline",
        className: "w-full",
        "data-ocid": "join.home_button",
        children: "Home par Jayein"
      }
    )
  ] }) }) });
}
export {
  JoinPage as default
};
