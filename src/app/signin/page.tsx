"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "../actions/auth";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc";



export default function Page() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center">
              <span className="text-black bg-lime-500 font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-semibold text-foreground">Echoboard</span>
          </Link>
        </div>

        <Card className="bg-card border-border backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-card-foreground">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground">Sign in to your Echoboard account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form action={formAction} className="space-y-4">
              <input type="hidden" name="redirectTo" value="/dashboard" />

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="bg-input border-border focus:border-accent text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="bg-input border-border focus:border-accent text-foreground"
                  required
                  minLength={8}
                />
              </div>
              <div className="flex items-center justify-between">
                <Link href="#" className="text-sm text-accent-muted">
                  Forgot password?
                </Link>
              </div>
              <Button disabled={isPending} className="w-full bg-lime-500 text-white">{isPending ? "Logging in..." : "Log in"}</Button>
            </form>
            {errorMessage && (
              <p className="text-center text-sm text-destructive">{errorMessage}</p>
            )}

            <div className="relative">
              <Separator className="bg-border" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                or
              </span>
            </div>

            <Button variant="outline" className="w-full border-border text-foreground-secondary hover:text-foreground-primary">
              <FcGoogle className="mr-2" />
              Continue with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-accent-muted">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}