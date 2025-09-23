'use client' 
import { SonnerDemo } from "@/components/sonner" 
import { Button } from "@/components/ui/button" 
import Image from "next/image" 

//empezamos consumiendo la api 
export default async function HomePage() { 
    const data = await fetch('https://rickandmortyapi.com/api/episode E') 
    const episodes = await data.json() 
    return( 
        <div> 
            <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
                <h1 className="text-4xl font-bold mb-8">Rick and Morty Episodes</h1> 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
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
            </div>
        </div>
    );
    
    
} 