'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { EpisodesForm } from '@/create/episodesForm';
import { SonnerDemo } from '@/components/sonner';
import { toast } from 'sonner';

type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created?: string;
  personajes?: string; 
  isCustom?: boolean;
};

export default function HomePage() {
  const [episodios, setEpisodios] = useState<Episode[]>([]);
  const [favoritos, setFavoritos] = useState<Episode[]>([]);

  // 1) Cargar lista desde la API
  useEffect(() => {
    (async () => {
      const res = await fetch('https://rickandmortyapi.com/api/episode', { cache: 'no-store' });
      const data = await res.json();
      setEpisodios(data?.results ?? []);
    })().catch(console.error);
  }, []);

  // 2) Inicializar favoritos desde localStorage
  useEffect(() => {
    const favs = localStorage.getItem('favoritos');
    if (favs) setFavoritos(JSON.parse(favs));
  }, []);

  // 3) Persistir favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  // Crear episodio (se agrega a lista principal con fecha actual)
  const handleCreate = ({ name, personajes }: { name: string; personajes: string }) => {
    const now = new Date();
    const nuevo: Episode = {
      id: Date.now(),
      name,
      air_date: now.toDateString(),
      episode: 'CUSTOM',
      created: now.toISOString(),
      personajes,
      isCustom: true,
    };
    setEpisodios((prev) => [nuevo, ...prev]);
    toast.success('Episodio creado correctamente');
  };

  // Mover a favoritos (y sacarlo de la lista principal)
  const addFavorito = (ep: Episode) => {
    setEpisodios((prev) => prev.filter((e) => e.id !== ep.id));
    setFavoritos((prev) => (prev.some((f) => f.id === ep.id) ? prev : [ep, ...prev]));
    toast.success(`Agregado a favoritos: ${ep.name}`);
  };

  // Quitar de favoritos (y regresarlo a la lista principal)
  const removeFavorito = (id: number) => {
    setFavoritos((prev) => {
      const ep = prev.find((f) => f.id === id);
      if (ep) {
        setEpisodios((lista) => [ep, ...lista]);
        toast.info(`Eliminado de favoritos: ${ep.name}`);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Rick and Morty Episodes</h1>

      {/* Formulario para crear episodio */}
      <div className="w-full max-w-xl mb-8">
        <EpisodesForm onSubmit={handleCreate} />
      </div>

      {/* Lista principal */}
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-4">Lista de episodios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {episodios.map((episode) => (
            <div key={episode.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-semibold mb-2">{episode.name}</h3>
              <p className="text-gray-600 mb-1"><strong>Air Date:</strong> {episode.air_date}</p>
              <p className="text-gray-600"><strong>Episode:</strong> {episode.episode}</p>

              {/* Si el episodio fue creado por el usuario, mostramos sus 5 IDs */}
              {episode.personajes && (
                <p className="text-gray-600 mt-2">
                  <strong>Personajes (5 IDs):</strong> {episode.personajes}
                </p>
              )}

              <Button className="mt-4" onClick={() => addFavorito(episode)}>
                Add to Favorites
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Toast container */}
      <div className="mt-8">
        <SonnerDemo />
      </div>

      {/* Favoritos */}
      <div className="mt-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-4">Favoritos</h2>
        {favoritos.length === 0 ? (
          <p className="text-gray-600">No tienes episodios favoritos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {favoritos.map((fav) => (
              <div key={fav.id} className="bg-yellow-100 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-2">{fav.name}</h3>
                <p className="text-gray-700 mb-1"><strong>Air Date:</strong> {fav.air_date}</p>
                <p className="text-gray-700"><strong>Episode:</strong> {fav.episode}</p>
                {fav.personajes && (
                  <p className="text-gray-700 mt-2">
                    <strong>Personajes (5 IDs):</strong> {fav.personajes}
                  </p>
                )}
                <Button variant="destructive" className="mt-4" onClick={() => removeFavorito(fav.id)}>
                  Remove from Favorites
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
