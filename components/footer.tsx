"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo y texto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20">
              <img src="img/icono.jpg" alt="ChiqoCorp Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Desarrollado con ❤️ por</p>
              <a
                href="https://chiqo.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                ChiqoCorp
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </a>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground"
          >
            <a
              href="https://chiqo.site"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-2 group"
            >
              <span>Visita nuestro sitio web</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <span className="hidden md:block">•</span>
            <p>© 2025 Chiqocorp. Todos los derechos reservados.</p>
          </motion.div>
        </div>

        {/* Barra decorativa animada */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
        />
      </div>
    </footer>
  )
}
