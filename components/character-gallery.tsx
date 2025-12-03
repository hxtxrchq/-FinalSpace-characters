"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import CharacterCard from "./character-card"

interface Character {
  id: string | number
  name: string
  image: string
  status?: string
  species?: string
  gender?: string
  abilities?: string[]
}

interface CharacterGalleryProps {
  characters: Character[]
  onSelectCharacter: (character: Character) => void
}

const ITEMS_PER_PAGE = 12

export default function CharacterGallery({ characters, onSelectCharacter }: CharacterGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1)

  if (characters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No se encontraron personajes. Intenta con otra búsqueda.</p>
      </div>
    )
  }

  // Calcular paginación
  const totalPages = Math.ceil(characters.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCharacters = characters.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Conoce a la Tripulación</h2>
        <p className="text-muted-foreground">Haz clic en cualquier personaje para saber más</p>
        <p className="text-sm text-primary/70 mt-2">
          Total de personajes: {characters.length} | Página {currentPage} de {totalPages}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentCharacters.map((character, index) => (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <CharacterCard character={character} onClick={() => onSelectCharacter(character)} />
          </motion.div>
        ))}
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-card border border-border/50 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground font-bold"
                    : "bg-card border border-border/50 hover:border-primary/50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-card border border-border/50 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
