import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center mb-4 gap-2">
            <AlertCircle className="h-16 w-16 text-red-500 mb-2" />
            <h1 className="text-2xl font-bold text-gray-900 text-center">404 Page Not Found</h1>
            <p className="mt-4 text-sm text-gray-600 text-center">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/">
              <Button className="mt-6 bg-[#0B6623] hover:bg-[#084d1a] text-white">
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
