import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useParams } from "@tanstack/react-router";
import { AlertCircle, CheckCircle, Loader2, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useApi } from "../lib/api";

type JoinState = "loading" | "success" | "error" | "login";

export default function JoinPage() {
  const { token } = useParams({ from: "/join/$token" });
  const { identity, login } = useInternetIdentity();
  const { acceptStaffInvite } = useApi();
  const [state, setState] = useState<JoinState>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
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
    acceptStaffInvite(token)
      .then(() => {
        setState("success");
        setMessage("Aap successfully shop ke staff mein add ho gaye hain!");
      })
      .catch((err: Error) => {
        setState("error");
        setMessage(err.message || "Invite accept karne mein error aayi.");
      });
  }, [identity, token, acceptStaffInvite]);

  if (state === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm" data-ocid="join.login_card">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-display">
              Shop Join Karein
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground text-sm">
              Staff invite link se shop join karne ke liye pehle login karein.
            </p>
            <Button
              onClick={() => login()}
              className="w-full"
              data-ocid="join.login_button"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Internet Identity se Login Karein
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm" data-ocid="join.loading_card">
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">
              Invite process ho raha hai...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm" data-ocid="join.success_card">
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
            <p className="text-foreground font-medium text-center">{message}</p>
            <Button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="w-full"
              data-ocid="join.dashboard_button"
            >
              Dashboard par Jayein
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm" data-ocid="join.error_card">
        <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <p className="text-foreground font-medium text-center">{message}</p>
          <Button
            onClick={() => {
              window.location.href = "/";
            }}
            variant="outline"
            className="w-full"
            data-ocid="join.home_button"
          >
            Home par Jayein
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
