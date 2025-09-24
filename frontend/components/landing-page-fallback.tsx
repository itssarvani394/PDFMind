'use client'
/**
* Fallback Landing Page - Simple version without Framer Motion
* Use this if Framer Motion causes issues
*/
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { 
  Brain, 
  Sparkles, 
  FileText, 
  Zap, 
  Shield, 
  ArrowRight
} from "lucide-react";

export function LandingPageFallback() {
  const { isSignedIn } = useUser();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="w-full px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 max-w-7xl mx-auto">
              {/* Left Content */}
              <div className="flex flex-col justify-center space-y-8">
                {/* Header */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold gradient-text sm:text-5xl xl:text-6xl">
                        PDFMind
                      </h1>
                      <p className="text-sm text-gray-300">AI Document Assistant</p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
                    Adaptive RAG
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      Document Intelligence
                    </span>
                  </h2>

                  <p className="max-w-[600px] text-gray-300 md:text-xl leading-relaxed">
                    Empower your documents with real-time chat, context-aware AI, and hallucination-free response generation. 
                    Transform any PDF into an intelligent conversation partner.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { icon: FileText, text: "PDF Document Analysis" },
                      { icon: Brain, text: "AI-Powered Insights" },
                      { icon: Shield, text: "Hallucination-Free Responses" },
                      { icon: Zap, text: "Real-Time Processing" }
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 glass rounded-lg p-3"
                      >
                        <feature.icon className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl btn-glow"
                    href={isSignedIn ? "/dashboard" : "/sign-in"}
                  >
                    {isSignedIn ? (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Go to Dashboard
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get Started
                      </>
                    )}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  
                  <Link
                    className="inline-flex items-center justify-center px-8 py-4 glass text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/20"
                    href="#features"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Right Content - Hero Visual */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Main Hero Card */}
                  <div className="glass rounded-3xl p-8 max-w-md mx-auto">
                    {/* Dashboard Preview */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">PDFMind Dashboard</h3>
                          <p className="text-sm text-gray-400">AI Document Assistant</p>
                        </div>
                      </div>

                      {/* Mock Chat Interface */}
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          <div className="glass rounded-lg p-3 max-w-xs">
                            <p className="text-sm">Upload your PDF document</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 justify-end">
                          <div className="glass rounded-lg p-3 max-w-xs">
                            <p className="text-sm">What are the main topics covered?</p>
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div className="glass rounded-lg p-3 max-w-xs">
                            <p className="text-sm">Based on your document, the main topics include...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-16 md:py-24"
        >
          <div className="w-full px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose PDFMind?</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Experience the future of document interaction with our advanced AI technology
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Brain,
                  title: "Intelligent Analysis",
                  description: "Advanced AI understands context and provides accurate insights from your documents."
                },
                {
                  icon: Shield,
                  title: "Hallucination-Free",
                  description: "Our RAG system ensures responses are grounded in your actual document content."
                },
                {
                  icon: Zap,
                  title: "Real-Time Processing",
                  description: "Get instant answers to your questions with lightning-fast response times."
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-6 text-center card-hover"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
