'use client' 
import { SonnerDemo } from "@/components/sonner" 
import { Button } from "@/components/ui/button"  
import { EpisodesForm } from "@/create/episodesForm"
import Image from "next/image" 
import {useState, useEffect} from 'react' 
//aqui hacemos interfaz para el formulario 


//empezamos consumiendo la api 
export default async function HomePage() { 
    const data = await fetch('https://rickandmortyapi.com/api/episode E') 
    const episodes = await data.json()
    const [episodios, setEpisodios] = useState<any[]>([]);
    const [favoritos, setFavoritos] = useState<any[]>([]); 
    const handleCreate = ({
        name,
        personajes,
      }: {
        name: string;
        personajes: string;
      }) => {
        const now = new Date();
        const nuevo = {
          id: Date.now(),
          name,
          air_date: now.toDateString(),
          episode: "CUSTOM",
          created: now.toISOString(),
          personajes, // guardamos los 5 IDs para posible uso posterior
          isCustom: true,
        } as any;
      
        setEpisodios((prev) => [nuevo, ...prev]);
      };
    
    //aqui guardo en local storage 
    useEffect(() => { 
        const favoritosGuardados = localStorage.getItem('favoritos'); 
        if (favoritosGuardados) { 
            setFavoritos(JSON.parse(favoritosGuardados)); 
        } 
    }, []); 
    //aqui guardo los favoritos 
    useEffect(() => { 
        localStorage.setItem('favoritos', JSON.stringify(favoritos)); 
    }, [favoritos]);
    return( 
        <div> 
            <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
                <h1 className="text-4xl font-bold mb-8">Rick and Morty Episodes</h1>  
                //aqui pongo el formulario 
                <EpisodesForm onSubmit={handleCreate} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8"> 
                    {episodes.results.map((episode: { id: number; name: string; air_date: string; episode: string }) => ( 
                        <div key={episode.id} className="bg-white rounded-lg shadow-md p-6"> 
                            <h2 className="text-2xl font-semibold mb-2">{episode.name}</h2> 
                            <p className="text-gray-600 mb-1"><strong>Air Date:</strong> {episode.air_date}</p> 
                            <p className="text-gray-600"><strong>Episode:</strong> {episode.episode}</p> 
                        </div> 
                    ))} 
                </div> 
                <div className="mt-8"> 
                    <SonnerDemo /> 
                </div>  
                //aqui vamos a mostrar los favoritos 
                <div className="mt-8 w-full max-w-2xl"> 
                    <h2 className="text-3xl font-bold mb-4">Favoritos</h2> 
                    {favoritos.length === 0 ? ( 
                        <p className="text-gray-600">No tienes episodios favoritos.</p> 
                    ) : ( 
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8"> 
                            {favoritos.map((fav: { id: number; name: string; air_date: string; episode: string }) => ( 
                                <div key={fav.id} className="bg-yellow-100 rounded-lg shadow-md p-6"> 
                                    <h2 className="text-2xl font-semibold mb-2">{fav.name}</h2> 
                                    <p className="text-gray-600 mb-1"><strong>Air Date:</strong> {fav.air_date}</p> 
                                    <p className="text-gray-600"><strong>Episode:</strong> {fav.episode}</p> 
                                    <Button 
                                        variant="destructive" 
                                        className="mt-4" 
                                        onClick={() => setFavoritos(favoritos.filter(f => f.id !== fav.id))} 
                                    > 
                                        Remove from Favorites 
                                    </Button> 
                                </div> 
                            ))} 
                        </div> 
                    )}
            </div>
        </div>
        </div>
    );
    
    
} 