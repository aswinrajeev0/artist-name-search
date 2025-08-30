import type { Artist } from "@/types/artist.type"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

export function ArtistCard({ artist }: { artist: Artist }) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4">
                <img
                    src={artist.artist_img || "/placeholder.svg?height=64&width=64&query=artist%20profile"}
                    alt={`Profile picture of ${artist.artist_name}`}
                    className="h-16 w-16 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                    <CardTitle className="text-pretty">{artist.artist_name}</CardTitle>
                    <div className="mt-1 flex items-center gap-2">
                        <Badge variant="secondary">{artist.artist_genre}</Badge>
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" aria-hidden="true" />
                            <span className="truncate">{artist.country}</span>
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Discover tracks, upcoming shows, and more from {artist.artist_name}.</p>
            </CardContent>
        </Card>
    )
}
