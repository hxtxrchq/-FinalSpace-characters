"use client"

import { motion } from "framer-motion"
import { Search, X } from "lucide-react"

interface CharacterSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function CharacterSearch({ searchQuery, onSearchChange }: CharacterSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-12"
    >
      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-lg -z-10"></div>

        <div className="relative flex items-center bg-background border border-primary/30 rounded-lg px-4 py-3 backdrop-blur-sm">
          <Search className="w-5 h-5 text-primary mr-3" />

          <input
            type="text"
            placeholder="Buscar personajes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />

          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="ml-2 p-1 hover:bg-primary/10 rounded transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
