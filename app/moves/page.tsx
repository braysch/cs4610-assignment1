import { fetchMoves } from '@/utils/pokemon-api';
import MovesSearchClient from './MovesSearchClient';

export default async function MovesPage() {
  const moves = await fetchMoves(1000);

  return (
    <div className='flex flex-col items-center py-6 sm:py-8 bg-gray-950 min-h-screen'>
      <h1 className="text-3xl sm:text-4xl font-bold pb-6 sm:pb-8">Moves</h1>
      <MovesSearchClient movesList={moves.results} />
    </div>
  );
}