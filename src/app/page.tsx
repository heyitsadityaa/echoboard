import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Mic, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center">
              <span className="text-black bg-lime-500 font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Echoboard</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-muted-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-muted-foreground">
              Pricing
            </Link>
            <Button asChild variant='outline'>
              <Link href="/signin">
                Sign In
              </Link>
            </Button>

            <Button asChild className="bg-lime-500 text-white">
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Collaborate in Real-Time
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            The modern whiteboard tool with integrated voice chat. Draw, design, and discuss with your team seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-lime-500 text-white text-lg px-8">
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border text-foreground text-lg px-8"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Everything you need to collaborate</h2>
          <p className="text-xl text-muted-foreground">Powerful features designed for modern teams</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-lime-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
              <p className="text-muted-foreground">Work together with unlimited team members in real-time</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <Mic className="h-12 w-12 text-lime-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Integrated Voice Chat</h3>
              <p className="text-muted-foreground">Crystal clear voice communication while you work</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-lime-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Optimized for speed with instant synchronization</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-lime-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">Enterprise-grade security for your sensitive work</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of teams already collaborating on Echoboard</p>
          <Button asChild size="lg" className="bg-lime-500 text-white text-lg px-8">
            <Link href="/signup">
              Start Collaborating Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Echoboard. All rights reserved. (Not really)</p>
        </div>
      </footer>
    </div>
  )
}
