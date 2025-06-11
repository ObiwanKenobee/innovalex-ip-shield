
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Shield, Search, FileText, Globe, Lock, Ban, Folder, Scale, Zap, Users, Building, CheckCircle, ArrowRight, Play } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">InnovaLex.ai</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
            <a href="#creators" className="text-sm font-medium hover:text-primary transition-colors">For Creators</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <Badge className="mb-6" variant="secondary">
            <Zap className="h-4 w-4 mr-2" />
            AI-Powered Legal Defense
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            The World's First AI-Driven Legal Defense System for Innovators
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Your ideas deserve real protection. Our AI lawyers detect, defend, and destroy misinformation, IP theft, and curated lies — before they spread.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Shield className="mr-2 h-5 w-5" />
              Secure My Work
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch How It Works
            </Button>
          </div>
          
          {/* AI Avatars Visual */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="flex flex-col items-center space-y-2 animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">AI Lawyer 1</span>
            </div>
            <div className="flex flex-col items-center space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
              <span className="text-sm text-muted-foreground">Defense AI</span>
            </div>
            <div className="flex flex-col items-center space-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-green-500" />
              </div>
              <span className="text-sm text-muted-foreground">Proof Engine</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">A Full-Stack Legal Intelligence Engine for the Creator Economy</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI Avatar Lawyers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Understand your work. Recognize originality. Auto-generate legal defenses and licensing frameworks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Search className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle>Proof-of-Origin Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Timestamp and trace every file, draft, line of code or design with verifiable trails.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle>Rumor Firewall</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Detects and refutes public misinformation about your creations using NLP + fact check engines.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle>Instant Legal Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  DMCA notices, Cease & desist letters, Smart contracts & NDAs. All AI-generated, human-lawyer approved.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-2">
              <CardHeader>
                <Globe className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle>Public Credibility Ledger</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  A transparent dashboard of your verified innovations, IP status, and dispute records. Shareable and immutable.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Try a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* For Creators */}
      <section id="creators" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why You Need InnovaLex</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <Lock className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Protect Your Creations</h3>
                <p className="text-muted-foreground">Protect your AI models, designs, code, or content from theft</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Ban className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Eliminate Misinformation</h3>
                <p className="text-muted-foreground">Eliminate curated lies with AI-powered counter-narratives</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Folder className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Prove Authorship</h3>
                <p className="text-muted-foreground">Prove authorship instantly in court or public forums</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Scale className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">License with Confidence</h3>
                <p className="text-muted-foreground">License with confidence using airtight legal templates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Architecture */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Built with AI + Law at Its Core</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "GPT-5 Legal Reasoning Layer",
              "Blockchain-backed IPFS for proof",
              "Real-time misinformation scan (media + social)",
              "Version-control + lineage analysis",
              "Licensed attorney integrations for court cases"
            ].map((tech, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-4" />
                <p className="font-medium">{tech}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing Tiers</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative">
              <CardHeader>
                <Badge className="w-fit">Free Plan</Badge>
                <CardTitle className="text-2xl">For early-stage creators</CardTitle>
                <CardDescription className="text-3xl font-bold text-primary">$0<span className="text-sm font-normal">/month</span></CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Timestamp 5 works</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Auto-NDA Generator</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>1 Rumor Scan/month</span>
                </div>
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="relative border-primary">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardHeader>
                <Badge className="w-fit" variant="secondary">Pro Plan</Badge>
                <CardTitle className="text-2xl">For startups & developers</CardTitle>
                <CardDescription className="text-3xl font-bold text-primary">$99<span className="text-sm font-normal">/month</span></CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Unlimited Proof-of-Origin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>AI avatar legal assistant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time misinformation defense</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Auto cease & desist</span>
                </div>
                <Button className="w-full mt-6">Start Pro Trial</Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader>
                <Badge className="w-fit" variant="outline">Enterprise</Badge>
                <CardTitle className="text-2xl">For labs, firms & creators with IP at scale</CardTitle>
                <CardDescription className="text-3xl font-bold text-primary">Custom</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Everything in Pro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Custom legal workflows</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Dedicated legal team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>API integrations</span>
                </div>
                <Button variant="outline" className="w-full mt-6">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">About Us</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p className="text-2xl font-semibold text-foreground">We are not just a law firm.</p>
            <p className="text-2xl font-semibold text-foreground">We are an AI Defense Network for creators.</p>
            <p>Founded by legal technologists, engineers, and creators tired of watching truth get erased by hype, lies, or theft.</p>
            <p className="text-xl font-medium text-foreground">We believe you only hold power when you've built something real. Our mission is to protect that reality.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Contact</h2>
          <p className="text-xl text-muted-foreground mb-8">Need a custom legal protection stack?</p>
          <p className="text-lg text-muted-foreground mb-8">Talk to our AI legal architect or book a call with a certified innovation attorney.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Brain className="mr-2 h-5 w-5" />
              Talk to AI Architect
            </Button>
            <Button variant="outline" size="lg">
              <Users className="mr-2 h-5 w-5" />
              Book Attorney Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">InnovaLex.ai</span>
            </div>
            <div className="flex flex-wrap gap-6 justify-start md:justify-end">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Use</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 InnovaLex.ai. Protect What You Created. Silence What You Didn't.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
