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
  constructor(filename, filepath = '') {

    // Throw an error if filename value is not a String
    validate({ filename }, 'String');

    // Define the filename of the archive
    this.filename = `${filename}.zip`;

    // Add the filepath (node / fs only)
    this.filepath = filepath;

    // Define the zip archive
    this.zip = new JSZip();
  }

  // Add each of the meshes in an array
  addMeshes(meshes) {

    // Iterate through each of the lists of meshes
    for (const key of Object.keys(meshes)) {

      // Add the folder to the zip
      const folder = this.zip.folder(key);

      // Iterate through each of the meshes for the key
      for (const mesh of meshes[key]) {

        // Parse the mesh to an .obj
        const OBJ = new OBJParser(mesh, true);

        // Add the .obj to the folder
        folder.file(OBJ.filename, OBJ.content);

        // Parse the mesh to an .stl
        const STL = new STLParser(mesh);

        // Add the .stl to the folder
        folder.file(STL.filename, STL.content);
      }
    }
  }

  // Export the zip to a file
  save() {

    // Attempt to save the file using nodejs
    try {

      // Import the node fs and path modules
      const fs = require('fs');
      const path = require('path');

      // / Create a buffer with the zip conentent
      const buffer = this.zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true });

      // Pipe the files to a file using fs
      buffer.pipe(fs.createWriteStream(path.resolve(process.cwd(), this.filepath, this.filename)));

    // Running from the browser  
    } catch (e) {

      // Generate the zip archive as a blob
      this.zip.generateAsync({ type: 'blob' }).then((content) => {

        // Create a download button
        const button = document.createElement('a');

        // Add the link to the blob
        button.href = window.URL.createObjectURL(content);
        
        // Add the filename to the button
        button.download = this.filename;

        // Click the button / download the file
        button.click();
      });
    }

  }
}