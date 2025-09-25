'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';

const PERSONAJES_REGEX = /^\d+-\d+-\d+-\d+-\d+$/;

export function EpisodesForm({
  onSubmit,
}: {
  onSubmit: (data: { name: string; personajes: string }) => void;
}) {
  const [name, setName] = useState('');
  const [personajes, setPersonajes] = useState('');

  const nameValid = name.trim().length >= 6;
  const personajesValid = PERSONAJES_REGEX.test(personajes.trim());
  const isValid = nameValid && personajesValid;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ name: name.trim(), personajes: personajes.trim() });
    // reset form
    setName('');
    setPersonajes('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 w-full"
    >
      <h2 className="text-2xl font-bold mb-4">Crear episodio</h2>

      <label className="block text-sm font-medium mb-1">Nombre del episodio</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del Episodio"
        className="w-full border rounded px-3 py-2 mb-3"
      />
      {!nameValid && name.length > 0 && (
        <p className="text-xs text-red-600 mb-2">Mínimo 6 caracteres.</p>
      )}

      <label className="block text-sm font-medium mb-1">Personajes (5 IDs separados por “-”)</label>
      <input
        value={personajes}
        onChange={(e) => setPersonajes(e.target.value)}
        placeholder="12-14-1-23-8"
        className="w-full border rounded px-3 py-2 mb-3"
      />
      {!personajesValid && personajes.length > 0 && (
        <p className="text-xs text-red-600 mb-2">
          Debe cumplir el formato 5 IDs: 12-14-1-23-8
        </p>
      )}

      <Button type="submit" disabled={!isValid}>
        Guardar episodio
      </Button>
    </form>
  );
}
