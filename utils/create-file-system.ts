import * as FileSystem from 'expo-file-system';

const directory = FileSystem.documentDirectory + 'noir/';
export async function createFileSystem(): Promise<void> {
  // check if the directory exists
  const dirInfo = await FileSystem.getInfoAsync(directory);
  if (dirInfo.exists) {
    console.log('Directory already exists:', directory);
    return;
  }
  // create the directory if it does not exist
  try {
    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  } catch (error) {
    console.error('Error creating directory:', error);
    throw error;
  }
}
