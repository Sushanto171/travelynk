"use client"
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function PaymentSuccessPage() {
  const router = useRouter()
  useEffect(() => {
    // Play the SVG draw animation by adding a class after mount
    const svg = document.querySelector(".check-svg") as SVGElement | null;
    if (svg) svg.classList.add("animate-draw-check");

    // Launch simple DOM confetti (keeps dependency-free)
    const launchConfetti = () => {
      const viewportWidth = window.innerWidth;
      const baseY = -20;
      for (let i = 0; i < 40; i++) {
        const confetto = document.createElement("div");
        confetto.className = "confetto rounded-sm pointer-events-none fixed z-50";
        const size = Math.random() * 8 + 4;
        confetto.style.width = `${size}px`;
        confetto.style.height = `${size}px`;
        const colors = ["#f87171", "#fcd34d", "#4ade80", "#60a5fa", "#a78bfa"];
        confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * viewportWidth;
        const startY = `${baseY + (Math.random() - 0.5) * 50}px`;
        confetto.style.left = `${startX}px`;
        confetto.style.top = startY;
        confetto.style.animation = `${["confetti-fall-1", "confetti-fall-2", "confetti-fall-3"][Math.floor(Math.random() * 3)]} ${Math.random() * 2 + 1.5}s linear forwards`;
        document.body.appendChild(confetto);
        const dur = (parseFloat(confetto.style.animation.split(" ")[1]) || 2) * 1000;
        setTimeout(() => confetto.remove(), dur + 200);
      }
    };

    setTimeout(launchConfetti, 800);

    // Optional auto redirect callback
    const t = setTimeout(() => {
      router.push("/my-profile")
    }, 2000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="max-w-xl w-full rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.01]">
        <CardContent className="text-center p-0">
          <div className="mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-green-200 relative">
            {/* Decorative pulse ring using tailwind utility + custom class inlined below */}
            <div className="absolute inset-0 rounded-full ring-4 ring-green-200 opacity-40 animate-pulse-slow" />
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Payment Successful!
          </h2>

          <p className="text-gray-500 mb-6 text-lg">
            Your transaction has been processed and confirmed. Thank you for your purchase.
          </p>

        </CardContent>
      </Card>

      {/* Inline styles for animations that were present in the original HTML. Keeping them scoped here so the component is self-contained. */}
      <style jsx>{`
        @keyframes confetti-fall-1 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-150px, 800px) rotate(1080deg); opacity: 0; }
        }
        @keyframes confetti-fall-2 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(100px, 700px) rotate(-720deg); opacity: 0; }
        }
        @keyframes confetti-fall-3 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(50px, 900px) rotate(360deg); opacity: 0; }
        }
        .confetto { position: fixed; border-radius: 2px; z-index: 50; pointer-events: none; }

        /* slow pulse ring to replicate icon-pulse behaviour */
        @keyframes pulse-slow {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.45); }
          70% { box-shadow: 0 0 0 20px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
        .animate-pulse-slow { animation: pulse-slow 1.8s ease-out infinite; }

        /* small helper for svg draw if you want to animate a stroke - kept for parity */
        .animate-draw-check path { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw-check 1s ease-in-out forwards; }
        @keyframes draw-check { to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}
