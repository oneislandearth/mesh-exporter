// Import the jszip package
import JSZip from 'jszip';

// Import the mesh parsers
import { OBJParser } from './OBJ-parser';
import { STLParser } from './STL-parser';

// Import the validator package
import { Validator } from '@oneisland/validator';

// Define a validator for the class
const { validate } = new Validator('MeshExporter');

// Create an exporter for exporting the meshes
export class MeshExporter {

  // Define the constructor
  constructor(filepath = '') {

    // Throw an error if filepath is not a String
    validate({ filepath }, 'String');

    // Define the filepath of the archive
    this.filepath = filepath;

    // Add the file extension if it does not exist
    if (this.filepath.indexOf('.zip') != (this.filepath.length - 4)) this.filepath += '.zip';

    // Define the zip archive
    this.zip = new JSZip();
  }

  // Add each of the meshes in an array
  addMeshes(meshes) {

    // Iterate through each of the lists of meshes
    for (const key of Object.keys(meshes)) {

      // Check if the meshes is a single mesh
      if (meshes[key].species == 'Mesh') {

        // Add the mesh to the zip
        this.addMesh(meshes[key]);

        // Continue to the next list of meshes
        continue;
      }

      // Add the folder to the zip
      const folder = this.zip.folder(key);

      // Iterate through each of the meshes for the key
      for (const mesh of meshes[key]) {

        // Add the mesh to the folder
        this.addMesh(mesh, folder);
      }
    }

    // Return the exporter
    return this;
  }

  // Add a mesh to the archive
  addMesh(mesh, folder = this.zip) {

    // Throw an error if mesh is not a Mesh
    validate({ mesh }, 'Mesh');

    // Throw an error if folder is not a folder
    validate({ folder }, () => (folder && folder.file), `"folder" to be a valid ZIP directory`);

    // Parse the mesh to an .obj
    const OBJ = new OBJParser(mesh, true);

    // Add the .obj to the folder
    folder.file(OBJ.filename, OBJ.content);

    // Parse the mesh to an .stl
    const STL = new STLParser(mesh);

    // Add the .stl to the folder
    folder.file(STL.filename, STL.content);

    // Return the exporter
    return this;
  }

  // Export the zip to a file
  async save() {

    // Generate a new promise and return it
    return new Promise(resolve => {

      // Attempt to save the file using nodejs
      try {

        // Import the node fs and path modules
        const fs = require('fs');
        const path = require('path');

        // / Create a buffer with the zip conentent
        const buffer = this.zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true });

        // Pipe the files to a file using fs
        const pipe = buffer.pipe(fs.createWriteStream(path.resolve(process.cwd(), this.filepath)));

        // Resolve the promise
        pipe.on('finish', () => resolve());

      // Running from the browser  
      } catch (e) {

        // Generate the zip archive as a blob
        this.zip.generateAsync({ type: 'blob' }).then((content) => {

          // Create a download button
          const button = document.createElement('a');

          // Add the link to the blob
          button.href = window.URL.createObjectURL(content);
          
          // Add the filename to the button
          button.download = this.filepath;

          // Click the button / download the file
          button.click();

          // Resolve the promise
          resolve();
        });
      }
    });
  }
}