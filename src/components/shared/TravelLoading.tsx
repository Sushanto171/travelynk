import { Plane } from "lucide-react";

export default function TravelLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="relative w-64 h-64">
        {/* SVG Path */}
        <svg viewBox="0 0 200 200" className="absolute inset-0">
          <path
            d="M20 160 C 80 40, 120 40, 180 160"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeDasharray="8 8"
            className="route-path"
          />
        </svg>

        {/* Animated Plane Icon */}
        <div className="plane-wrapper">
          <Plane className="w-8 h-8 text-primary" />
        </div>

        {/* Brand */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2">
            {/* <Plane className="w-8 h-8 text-primary" /> */}
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Travelynk
            </span>
          </div>
        </div>

        {/* Status */}
        <p className="absolute -bottom-10 w-full text-center text-sm text-muted-foreground animate-pulse">
          Preparing your journey…
        </p>

        <style>{`
          .plane-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            offset-path: path("M20 160 C 80 40, 120 40, 180 160");
            offset-distance: 0%;
            animation: fly 2.6s ease-in-out infinite;
          }

          @keyframes fly {
            0% {
              offset-distance: 0%;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              offset-distance: 100%;
              opacity: 0;
            }
          }

          .route-path {
            animation: dash 2.6s linear infinite;
          }

          @keyframes dash {
            from {
              stroke-dashoffset: 24;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
