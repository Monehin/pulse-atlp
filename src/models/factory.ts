import { firestoreDB } from '../firebase';

/**
 * Describe the Firebase client to Typescript
 * since we don't have the actual types.
 */
type FireStoreClient = {
  collection: (
    collection: string
  ) => {
    add: (item: any) => Promise<any>;
    get: (query?: any) => Promise<any>;
  };
};

type FireStoreQuery = { limit: number; page: number };

type Model = (
  collection: string,
  schema: any,
  protectedFields?: string[]
) => {
  create: (item: any) => Promise<any>;
  getAll: (query?: FireStoreQuery) => Promise<any[]>;
};

/**
 * Creates a new Model
 *
 * @param {string} collection
 * @param {object} schema Joi schema object
 * @param {array<string>} protectedFields
 * @returns {object} the modal
 */
const ModelFactory: Model = (
  collection = '',
  schema: any,
  protectedFields: string[] = []
) => {
  const firestoreClient: FireStoreClient = firestoreDB;

  if (!collection) {
    throw new Error('You need to provide a collection');
  }

  if (!schema) {
    throw new Error('You need to provide a valid Joi schema');
  }

  if (protectedFields && !(protectedFields instanceof Array)) {
    throw new Error(
      'You need to provide a valid array of strings representing protected fields'
    );
  }

  return {
    create: (newItem: any) => {
      const { error, value: validatedNewItem } = schema.validate(newItem);

      if (error !== undefined) {
        throw error;
      }

      return firestoreClient.collection(collection).add(validatedNewItem);
    },

    getAll: (query?: FireStoreQuery) => {
      return firestoreClient.collection(collection).get(query);
    },
  };
};

export default ModelFactory;
