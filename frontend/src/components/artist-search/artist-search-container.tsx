"use client"

import { useState } from "react"
import type { Artist } from "@/types/artist.type"
import { SearchCombobox } from "./search-compobox"
import { ArtistCard } from "@/components/artist-card"

export function ArtistSearchContainer() {
    const [selected, setSelected] = useState<Artist | null>(null)

    return (
        <section className="space-y-6" aria-label="Artist search">
            <SearchCombobox
                onSelect={(artist) => {
                    setSelected(artist)
                    const details = document.getElementById("artist-details")
                    if (details) details.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
            />
            <div id="artist-details" aria-live="polite">
                {selected ? (
                    <ArtistCard artist={selected} />
                ) : (
                    <p className="text-sm text-muted-foreground">No artist selected yet.</p>
                )}
            </div>
        </section>
    )
}
