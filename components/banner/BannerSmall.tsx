import { Store } from "@/constants/store"

const BannerSmall = () => {
  return (
    <article className="w-full h-72 overflow-hidden rounded-2xl relative bg-[#f5f5f7]">
      {/* GIF background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url(/assets/chill-homer.gif)`,
          backgroundPositionY: "30%"
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Text Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <h1 className="text-5xl font-medium text-white px-8 py-3 backdrop-blur-sm bg-black/30 rounded-lg tracking-tight max-[440px]:text-4xl max-[370px]:text-3xl text-center">
          Літній розпродаж вже тут!
        </h1>
      </div>
    </article>
  )
}

export default BannerSmall
