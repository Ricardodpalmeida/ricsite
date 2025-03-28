import { copyFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function copyProfileData() {
  try {
    // Create public directory if it doesn't exist
    await mkdir(new URL('../public', import.meta.url), { recursive: true });
    
    // Copy profile data
    await copyFile(
      new URL('../src/assets/profile-data.json', import.meta.url),
      new URL('../public/profile-data.json', import.meta.url)
    );
    
    console.log('Profile data copied successfully');
  } catch (error) {
    console.error('Error copying profile data:', error);
    process.exit(1);
  }
}

copyProfileData(); 