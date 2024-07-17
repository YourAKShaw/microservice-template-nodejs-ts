import { ObjectId } from 'mongodb';
import { getDb } from '../common/mongoClient';
import logger from '../common/logger';
import Sample from './entity/sample.entity';

let sampleCollection: import('mongodb').Collection<Sample>;

(async () => {
  const db = await getDb();
  sampleCollection = db.collection('samples');
})(); // Immediately Invoked Function Expression (IIFE) for collection creation

// Function to create a new sample document
export async function createSample(sampleData: Sample): Promise<ObjectId> {
  try {
    const result = await sampleCollection.insertOne(sampleData);
    return result.insertedId; // Return the inserted document ID
  } catch (error) {
    logger.error('Error creating sample:', error);
    throw error; // Re-throw the error for handling in the controller
  }
}

// Function to get all sample documents
export async function getAllSamples(): Promise<Sample[]> {
  try {
    const samples = await sampleCollection.find().toArray();
    return samples;
  } catch (error) {
    logger.error('Error getting samples:', error);
    throw error; // Re-throw the error for handling in the controller
  }
}

// Function to get a sample document by ID
export async function getSampleById(id: string): Promise<Sample | null> {
  try {
    const sampleId = new ObjectId(id); // Convert string ID to ObjectId
    const sample = await sampleCollection.findOne({ _id: sampleId });
    return sample;
  } catch (error) {
    logger.error('Error getting sample by ID:', error);
    throw error; // Re-throw the error for handling in the controller
  }
}

// Function to update a sample document by ID
export async function updateSample(
  id: string,
  updatedData: Sample,
): Promise<number> {
  try {
    const sampleId = new ObjectId(id); // Convert string ID to ObjectId
    const result = await sampleCollection.updateOne(
      { _id: sampleId },
      { $set: updatedData },
    );
    return result.modifiedCount; // Return the number of documents modified (should be 1)
  } catch (error) {
    logger.error('Error updating sample:', error);
    throw error; // Re-throw the error for handling in the controller
  }
}

// Function to delete a sample document by ID
export async function deleteSample(id: string): Promise<number> {
  try {
    const sampleId = new ObjectId(id); // Convert string ID to ObjectId
    const result = await sampleCollection.deleteOne({ _id: sampleId });
    return result.deletedCount; // Return the number of documents deleted (should be 1)
  } catch (error) {
    logger.error('Error deleting sample:', error);
    throw error; // Re-throw the error for handling in the controller
  }
}
