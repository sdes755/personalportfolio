interface BackgroundProps {
  mousePosition: { x: number; y: number }
}

export default function Background({ mousePosition }: BackgroundProps) {
  return (
    <>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            left: `${20 + mousePosition.x * 0.02}%`,
            top: `${10 + mousePosition.y * 0.02}%`,
            transition: "all 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            right: `${10 + mousePosition.x * 0.015}%`,
            top: `${30 + mousePosition.y * 0.015}%`,
            transition: "all 0.5s ease-out",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            left: `${60 + mousePosition.x * 0.01}%`,
            bottom: `${20 + mousePosition.y * 0.01}%`,
            transition: "all 0.7s ease-out",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </>
  )
}
