"use client"

import { useState } from "react"
import type { Company } from "@/lib/types"
import { ChevronLeft, ChevronRight, Play, X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  company: Company
}

export function CompanyGallery({ company }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const items = company.gallery
  const currentItem = items[currentIndex]

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }

  if (items.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-secondary/40">
      <div className="container-wide">
        <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-8 text-center">
          معرض الصور والفيديوهات
        </h2>

        {/* Main Featured Item */}
        <div className="relative rounded-3xl overflow-hidden mb-6 bg-card border border-border shadow-soft">
          <div className="aspect-video md:aspect-[21/9] relative">
            {currentItem.type === "image" ? (
              <img
                src={currentItem.url}
                alt={currentItem.caption || `صورة تابعة لشركة ${company.name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full relative">
                {currentItem.thumbnail ? (
                  <img
                    src={currentItem.thumbnail}
                    alt={currentItem.caption || `فيديو لشركة ${company.name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: company.color + "20" }}
                  >
                    <Play className="h-20 w-20 text-muted-foreground" />
                  </div>
                )}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                >
                  <div 
                    className="h-20 w-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: company.color }}
                  >
                    <Play className="h-10 w-10 text-white fill-white ml-1" />
                  </div>
                </button>
              </div>
            )}
            
            {/* Caption */}
            {currentItem.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-semibold">{currentItem.caption}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            {items.length > 1 && (
              <>
                <button
                  onClick={prevItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Zoom Button */}
            {currentItem.type === "image" && (
              <button
                onClick={() => openLightbox(currentIndex)}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Thumbnails Grid */}
        {items.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                  index === currentIndex
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.caption || `صورة مصغرة ${company.name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full relative">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.caption || `فيديو مصغر ${company.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: company.color + "20" }}
                      >
                        <Play className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="h-8 w-8 text-white fill-white ml-1" />
                      </div>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div className="relative max-w-6xl w-full">
            {currentItem.type === "image" ? (
              <img
                src={currentItem.url}
                alt={currentItem.caption || ""}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
            ) : (
              <div className="aspect-video w-full">
                <iframe
                  src={currentItem.url}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}

            {items.length > 1 && (
              <>
                <button
                  onClick={prevItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="h-8 w-8 text-white" />
                </button>
                <button
                  onClick={nextItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="h-8 w-8 text-white" />
                </button>
              </>
            )}

            {currentItem.caption && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-lg">
                <p className="text-white font-semibold">{currentItem.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
