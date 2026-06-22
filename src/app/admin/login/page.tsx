"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth, DEMO_CREDENTIALS } from "@/components/admin/AdminAuth";
import { Button, Card, Field, TextInput } from "@/components/admin/ui";

export default function AdminLoginPage() {
  const { ready, authed, login } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && authed) router.replace("/admin");
  }, [ready, authed, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      router.replace("/admin");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-neutral-100 px-4 text-neutral-900">
      <Card className="w-full max-w-sm">
        <h1 className="text-xl font-bold tracking-tight">Admin sign in</h1>
        <p className="mt-1 text-sm text-neutral-500">
          dev|kon portfolio admin panel
        </p>
        <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
          <Field label="Email">
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@devkon.com"
              required
            />
          </Field>
          <Field label="Password">
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit">Sign in</Button>
        </form>
        <div className="mt-5 rounded-lg bg-neutral-100 p-3 text-xs text-neutral-500">
          <span className="font-semibold text-neutral-700">Demo login</span>
          <br />
          {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </div>
      </Card>
    </div>
  );
}
