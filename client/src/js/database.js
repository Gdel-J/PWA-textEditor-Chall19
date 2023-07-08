import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//  Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //Database and version
  const jateDB = await openDB("jate", 1);
  //New transaction specifying db and privileges
  const tx = jateDB.transaction("jate", "readwrite");
  //Open desired object store
  const store = tx.objectStore("jate");
  //Pass in content
  const request = store.put({id:1,value: content});
  //Get confirmation of the request
  const result = await request;
  console.log("Content added to the database", result);
};


// Logic for a method that gets all the content from the database
export const getDb = async () => {
  //Database and version
  const jateDB = await openDB("jate", 1);
  //New transaction specifying db and privileges
  const tx = jateDB.transaction("jate", "readonly");
  //Open desired object store
  const store = tx.objectStore("jate");
  //Get all request 
  const request = store.getAll();

  //Get confirmation of the request
  const result = await request;
  console.log("Content read from the database", result);
  return result?.value;
};

initdb();
