import { fetchCollection } from './src/lib/firebase';

async function test() {
  const profile = await fetchCollection('profile');
  const bio = profile.find(p => p.id === 'biography');
  console.log(JSON.stringify(bio, null, 2));
}

test();
