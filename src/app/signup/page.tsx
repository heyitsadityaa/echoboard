"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "../actions/auth";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { FcGoogle } from "react-icons/fc";

export default function Page() {
  const [errorMessage, formAction, isPending] = useActionState(
    register,
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
            <CardTitle className="text-2xl text-card-foreground">Create your account</CardTitle>
            <CardDescription className="text-muted-foreground">Start collaborating with your team today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form action={formAction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="bg-input border-border focus:border-lime-500 text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  placeholder="Create a strong password"
                  className="bg-input border-border focus:border-lime-500 text-foreground"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox required id="terms" className="border-border data-[state=checked]:bg-lime-500" />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="#" className="text-accent-muted">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-accent-muted">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button disabled={isPending} className="w-full bg-lime-500 text-white">{isPending ? "Creating account..." : "Create Account"}</Button>
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

            <Button variant="outline" className="w-full border-border text-foreground-secondary">
              <FcGoogle className="mr-2" />
              Continue with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="text-accent-muted">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}