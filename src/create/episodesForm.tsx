'use client' 
import { zodResolver } from '@hookform/resolvers/zod'; 
import z from 'zod'; 
import { SubmitHandler, useForm } from 'react-hook-form'; 

// Definimos el esquema de validación con Zod 
const episodeSchema = z.object({ 
    name: z.string().min(1, 'El nombre es obligatorio'), 
    personajes: z.string().min(1, 'los personajes son obligatorios'),
}); 
type EpisodeFormData = z.infer<typeof episodeSchema>; 
type EpisodeFormProps = {
    onSubmit: (data: EpisodeFormData) => void;
  };
  export function EpisodesForm({ onSubmit }: EpisodeFormProps) {
    const {
      register,
      handleSubmit,
      formState: { errors, isValid, isSubmitting },
      reset,
    } = useForm<EpisodeFormData>({
      resolver: zodResolver(episodeSchema),
      mode: "onChange", 
    });
  
    const submitHandler: SubmitHandler<EpisodeFormData> = (data) => {
      onSubmit(data);  
    };
  
    return (
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded space-y-4"
      >
        <h2 className="text-xl font-bold"> Crear episodio</h2>
  
        {'Nombre del episodio'}
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Nombre del Episodio
          </label>
          <input
            id="name"
            {...register("name")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
  
        {' Personajes'}
        <div>
          <label htmlFor="personajes" className="block font-semibold mb-1">
            Personajes (5 IDs separados por "-")
          </label>
          <input
            id="personajes"
            {...register("personajes")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="Ej: 12-14-1-23-8"
          />
          {errors.personajes && (
            <p className="text-red-500 text-sm mt-1">
              {errors.personajes.message}
            </p>
          )}
        </div>
  
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-50"
        >
          Guardar episodio
        </button>
      </form>
    );
  }