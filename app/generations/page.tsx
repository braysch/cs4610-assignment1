import { fetchGenerations } from '@/utils/pokemon-api';
import GenerationsSearchClient from './GenerationsSearchClient';

export default async function GenerationsPage() {
  const generations = await fetchGenerations();

  return (
    <div className='flex flex-col items-center py-6 sm:py-8 bg-gray-950 min-h-screen'>
      <h1 className="text-3xl sm:text-4xl font-bold pb-6 sm:pb-8">Generations</h1>
      <GenerationsSearchClient generationsList={generations.results} />
    </div>
  );
}