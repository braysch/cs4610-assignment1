import { fetchLocations } from '@/utils/pokemon-api';
import LocationsSearchClient from './LocationsSearchClient';

export default async function LocationsPage() {
  const locations = await fetchLocations(1000);

  return (
    <div className='flex flex-col items-center py-6 sm:py-8 bg-gray-950 min-h-screen'>
      <h1 className="text-3xl sm:text-4xl font-bold pb-6 sm:pb-8">Locations</h1>
      <LocationsSearchClient locationsList={locations.results} />
    </div>
  );
}