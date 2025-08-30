"use client"

import type React from "react"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import useSWR from "swr"
import type { Artist } from "@/types/artist.type"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function useDebounced<T>(value: T, delay = 200) {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(t)
    }, [value, delay])
    return debounced
}

export function SearchCombobox({ onSelect }: { onSelect: (artist: Artist) => void }) {
    const inputId = useId()
    const listboxId = `${inputId}-listbox`
    const rootRef = useRef<HTMLDivElement>(null)

    const [query, setQuery] = useState("")
    const debounced = useDebounced(query, 200)

    const { data, isValidating } = useSWR<Artist[]>(
        debounced.trim() ? `${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(debounced.trim())}` : null,
        fetcher,
        { revalidateOnFocus: false },
    )
    const suggestions = useMemo(() => data ?? [], [data])

    const [open, setOpen] = useState(false)
    const [highlight, setHighlight] = useState(0)

    useEffect(() => {
        setOpen(!!(debounced && suggestions.length > 0))
        setHighlight(0)
    }, [debounced, suggestions.length])

    // Close on outside click
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!rootRef.current) return
            if (!rootRef.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", onDocClick)
        return () => document.removeEventListener("mousedown", onDocClick)
    }, [])

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (!open) return
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setHighlight((h) => Math.min(h + 1, suggestions.length - 1))
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setHighlight((h) => Math.max(h - 1, 0))
        } else if (e.key === "Enter") {
            e.preventDefault()
            const item = suggestions[highlight]
            if (item) {
                onSelect(item)
                setOpen(false)
            }
        } else if (e.key === "Escape") {
            setOpen(false)
        }
    }

    return (
        <div className="relative" ref={rootRef}>
            <label htmlFor={inputId} className="sr-only">
                Search artists
            </label>
            <Input
                id={inputId}
                type="search"
                placeholder="Search artists by name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setOpen(suggestions.length > 0)}
                onKeyDown={handleKeyDown}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls={listboxId}
                aria-activedescendant={open ? `${listboxId}-option-${highlight}` : undefined}
                className="h-11"
            />
            {open && (
                <ul
                    id={listboxId}
                    role="listbox"
                    className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-md border bg-background shadow-sm"
                >
                    {suggestions.map((artist, idx) => {
                        const active = idx === highlight
                        return (
                            <li
                                key={artist.artist_id}
                                id={`${listboxId}-option-${idx}`}
                                role="option"
                                aria-selected={active}
                                tabIndex={-1}
                                className={cn(
                                    "flex cursor-pointer items-center gap-3 px-3 py-2",
                                    active ? "bg-primary/10 text-foreground" : "hover:bg-muted",
                                )}
                                onMouseEnter={() => setHighlight(idx)}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    onSelect(artist)
                                    setOpen(false)
                                }}
                            >
                                <img
                                    src={artist.artist_img || "/placeholder.svg?height=32&width=32&query=artist%20profile"}
                                    alt=""
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{artist.artist_name}</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {artist.artist_genre} · {artist.country}
                                    </p>
                                </div>
                            </li>
                        )
                    })}
                    {isValidating && suggestions.length === 0 && (
                        <li className="px-3 py-2 text-sm text-muted-foreground">Searching…</li>
                    )}
                    {!isValidating && suggestions.length === 0 && debounced && (
                        <li className="px-3 py-2 text-sm text-muted-foreground">No results</li>
                    )}
                </ul>
            )}
        </div>
    )
}
