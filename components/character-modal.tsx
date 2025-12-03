"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, User, Dna, Star, MapPin, Palette, Tag } from "lucide-react"

interface Character {
  id: string | number
  name: string
  image: string
  status?: string
  species?: string
  gender?: string
  abilities?: string[]
  alias?: string[]
  origin?: string
  hair?: string
}

interface CharacterModalProps {
  character: Character
  onClose: () => void
}

export default function CharacterModal({ character, onClose }: CharacterModalProps) {
  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-card border border-primary/30 rounded-xl overflow-hidden max-w-2xl w-full shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-primary/20 rounded-lg transition-colors border border-border/50"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-96 md:h-full overflow-hidden bg-gradient-to-b from-primary/30 to-secondary/20">
              <img
                src={character.image || "/placeholder.svg"}
                alt={character.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?key=nthfu"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col justify-between max-h-[90vh] overflow-y-auto">
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-foreground">{character.name}</h2>
                  {character.status && (
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      character.status === "Vivo" ? "bg-green-500/20 text-green-400 border border-green-500/50" :
                      character.status === "Muerto" || character.status === "Fallecido" ? "bg-red-500/20 text-red-400 border border-red-500/50" :
                      character.status === "Operacional" ? "bg-blue-500/20 text-blue-400 border border-blue-500/50" :
                      "bg-gray-500/20 text-gray-400 border border-gray-500/50"
                    }`}>
                      {character.status}
                    </span>
                  )}
                </div>

                {/* Información principal */}
                <div className="space-y-3 py-4 border-y border-border/30">
                  {character.species && (
                    <div className="flex items-center gap-3">
                      <Dna className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Especie</p>
                        <p className="text-foreground">{character.species}</p>
                      </div>
                    </div>
                  )}
                  {character.gender && (
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Género</p>
                        <p className="text-foreground">{character.gender}</p>
                      </div>
                    </div>
                  )}
                  {character.origin && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Origen</p>
                        <p className="text-foreground">{character.origin}</p>
                      </div>
                    </div>
                  )}
                  {character.hair && character.hair !== "Ninguno" && (
                    <div className="flex items-center gap-3">
                      <Palette className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cabello</p>
                        <p className="text-foreground">{character.hair}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Alias */}
                {character.alias && character.alias.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Alias / Apodos
                      </h3>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-3 space-y-1">
                      {character.alias.slice(0, 5).map((alias, index) => (
                        <p key={index} className="text-sm text-foreground/80">• {alias}</p>
                      ))}
                      {character.alias.length > 5 && (
                        <p className="text-xs text-muted-foreground italic">
                          ...y {character.alias.length - 5} más
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Abilities */}
                {character.abilities && character.abilities.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Habilidades Especiales
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {character.abilities.map((ability, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/20 border border-primary/50 rounded-full text-sm text-primary hover:bg-primary/30 transition-colors"
                        >
                          {ability}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Action */}
              <div className="pt-6 border-t border-border/30 mt-6">
                <p className="text-xs text-muted-foreground">Haz clic fuera para cerrar</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
