export default function TravelLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="relative w-64 h-64">

        {/* SVG Path */}
        <svg viewBox="0 0 200 200" className="absolute inset-0">
          <path
            d="M20 160 C 80 40, 120 40, 180 160"
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="route-path"
          />
        </svg>

        {/* Plane */}
        <div className="plane-wrapper">
          ✈️
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
            font-size: 30px;
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
  )
}
