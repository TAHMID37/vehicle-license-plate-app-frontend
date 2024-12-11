import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Smart Parking Management System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Efficiently manage vehicle entries, exits, and registrations with our advanced parking system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/process">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Vehicle Entry/Exit
                  <ArrowRight className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  Process vehicle entry and exit with automatic license plate detection
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/register">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Vehicle Registration
                  <ArrowRight className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  Register new vehicles through image uploads or folder processing
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Dashboard
                  <ArrowRight className="h-5 w-5" />
                </CardTitle>
                <CardDescription>
                  View vehicle logs and manage registered vehicles
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}