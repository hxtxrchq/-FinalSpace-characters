"use client"

import { useEffect, useState } from "react"
import CharacterGallery from "@/components/character-gallery"
import CharacterModal from "@/components/character-modal"
import CharacterSearch from "@/components/character-search"

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

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true)
        // Hacemos fetch a nuestra API que ya traduce todo al español
        const response = await fetch("/api/characters")
        if (!response.ok) throw new Error("Error al obtener personajes")

        const data = await response.json()

        // Transformamos los datos para que coincidan con nuestra interfaz
        // La API ya retorna TODO traducido al español
        const transformedCharacters: Character[] = data.map((char: any) => ({
          id: char.id,
          name: char.name,
          image: char.img_url || "/placeholder.svg",
          status: char.status,
          species: char.species,
          gender: char.gender,
          // Guardamos todos los datos adicionales para el modal
          abilities: char.abilities || [],
          alias: char.alias || [],
          origin: char.origin || "Desconocido",
          hair: char.hair || "Ninguno",
        }))

        setCharacters(transformedCharacters)
        setError(null)
      } catch (err) {
        console.error("[Final Space Wiki] Error al cargar personajes:", err)
        setError("Error al cargar los personajes. Por favor intenta nuevamente.")
        setCharacters([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <div className="cosmic-bg" />
      <div className="cosmic-overlay" />

      <main className="relative min-h-screen">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 via-transparent to-transparent py-20">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div
              className="absolute top-32 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-glow">FINAL SPACE</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora la tripulación y los personajes que conforman la aventura a través del universo de Final Space
            </p>
            <p className="text-sm text-blue-500 max-w-2xl mx-auto"> ⭐ Desarrollado por{" "}
              <a href="https://Chiqo.site" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Chiqocorp
              </a>
              ⭐ 
            </p>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="container mx-auto px-4 py-16">
          <CharacterSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              </div>
              <p className="text-muted-foreground mt-4">Cargando personajes de Final Space...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <CharacterGallery characters={filteredCharacters} onSelectCharacter={setSelectedCharacter} />
          )}
        </div>

        {/* Character Modal */}
        {selectedCharacter && (
          <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
        )}
      </main>
    </>
  )
}
