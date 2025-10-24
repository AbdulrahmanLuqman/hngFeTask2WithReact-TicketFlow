import { CheckCircle, Zap, Shield } from 'lucide-react';
import { Link, useNavigate } from "react-router";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div>
              <div className="relative overflow-hidden bg-background">
        <div className="absolute top-20 right-10 w-64 h-64 bg-foreground rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-32 left-10 w-96 h-96 bg-foreground rounded-full opacity-10 blur-3xl" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <section className="relative pt-20 pb-32">
            <div className="absolute -top-10 right-20 w-32 h-32 bg-foreground rounded-full opacity-60" />

            <div className="text-center relative z-10">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
                TicketFlow
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Streamline your support workflow with powerful ticket management that keeps your team organized and customers satisfied.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant={"default"} className={cn("cursor-pointer py-7 text-lg font-semibold w-[150px]")}>
                  <Link to="/auth/signup">Get Started</Link>
                </Button>
                <Button asChild variant={"outline"} className={cn("cursor-pointer py-7 text-lg font-semibold w-[150px]")}>
                  <Link to="/auth/login">Login</Link>
                </Button>
              </div>
            </div>

            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,64 C360,100 720,20 1440,64 L1440,120 L0,120 Z"
                fill="currentColor"
              />
            </svg>
          </section>

          <section className="py-20">
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
              Why Choose TicketFlow?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="">
                <CardHeader className="w-16 h-16 bg-card-foreground rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="text-white" size={32} />
                </CardHeader>
                <CardTitle className="">
                  Simple & Intuitive
                </CardTitle>
                <CardContent className="">
                  Get started in minutes with our clean, user-friendly interface designed for teams of all sizes.
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader className="w-16 h-16 bg-card-foreground rounded-full flex items-center justify-center mb-6">
                  <Zap className="text-white" size={32} />
                </CardHeader>
                <CardTitle className="">
                  Lightning Fast
                </CardTitle>
                <CardContent className="">
                  Get started in minutes with our clean, user-friendly interface designed for teams of all sizes.
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader className="w-16 h-16 bg-card-foreground rounded-full flex items-center justify-center mb-6">
                  <Shield className="text-white" size={32} />
                </CardHeader>
                <CardTitle className="">
                  Secure & Reliable
                </CardTitle>
                <CardContent className="">
                  Your data is protected with enterprise-grade security and automatic backups.
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-20">
            <div className="bg-linear-to-r from-foreground to-card-foreground rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white rounded-full opacity-10" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-white rounded-full opacity-10" />

              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to transform your support?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of teams already using TicketFlow to deliver exceptional customer experiences.
                </p>
                <button
                  onClick={() => navigate('/auth/signup')}
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LandingPage