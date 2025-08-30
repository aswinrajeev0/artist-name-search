import { ArtistSearchContainer } from "@/components/artist-search/artist-search-container"

export default function Page() {
  return (
    <main className="min-h-[100dvh] px-4 py-8 md:py-12">
      <div className="mx-auto w-full max-w-xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">Find your favorite artists</h1>
          <p className="text-sm text-muted-foreground">
            Start typing a name to see real-time suggestions. Select an artist to view details.
          </p>
        </header>

        <ArtistSearchContainer />
      </div>
    </main>
  )
}
