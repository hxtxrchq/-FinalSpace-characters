"use client"
import { motion } from "framer-motion"

interface Character {
  id: string | number
  name: string
  image: string
  status?: string
  species?: string
  gender?: string
}

interface CharacterCardProps {
  character: Character
  onClick: () => void
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 rounded-lg blur transition-opacity duration-300"></div>

      <div className="relative bg-card border border-border/50 group-hover:border-primary/50 rounded-lg overflow-hidden transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-b from-primary/20 to-secondary/20 overflow-hidden">
          <img
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Estado del personaje (badge) */}
          {character.status && (
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                character.status === "Vivo" ? "bg-green-500/80 text-white" :
                character.status === "Muerto" || character.status === "Fallecido" ? "bg-red-500/80 text-white" :
                character.status === "Operacional" ? "bg-blue-500/80 text-white" :
                "bg-gray-500/80 text-white"
              }`}>
                {character.status}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative p-4 space-y-2">
          <h3 className="text-xl font-bold text-foreground">{character.name}</h3>
          {character.species && (
            <p className="text-sm text-accent font-semibold">{character.species}</p>
          )}
          {character.gender && (
            <p className="text-xs text-muted-foreground">{character.gender}</p>
          )}

          {/* Click Indicator */}
          <div className="pt-2 text-xs text-primary/70 group-hover:text-primary transition-colors flex items-center gap-1">
            <span>Click para más detalles</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
