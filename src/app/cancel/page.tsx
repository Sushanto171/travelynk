"use client"
import { Card, CardContent } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentCancelPage() {
  const router = useRouter();

  useEffect(() => {
    // Light shockwave pulse for visual feedback
    const t = setTimeout(() => {
      router.push("/my-profile");
    }, 2000);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <Card className="max-w-xl w-full rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.01]">
        <CardContent className="text-center p-0">

          <div className="mx-auto w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-red-200 relative">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full ring-4 ring-red-200 opacity-40 animate-pulse-slow" />
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <XCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold  mb-2">
            Payment Cancelled
          </h2>

          <p className="text-gray-500 mb-6 text-lg">
            Your transaction was cancelled. No charges were applied.
          </p>

        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes pulse-slow {
          0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.45); }
          70% { box-shadow: 0 0 0 20px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }
        .animate-pulse-slow { animation: pulse-slow 1.8s ease-out infinite; }
      `}</style>
    </div>
  );
}
