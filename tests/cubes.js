// Import the testing module
import test from 'ava';

// Import the fs module
import fs from 'fs';

// Import the mesh package
import { Mesh } from '@oneisland/mesh';

// Import the mesh exporter package
import { MeshExporter } from 'lib/exporter';

// Define the base cube
let base = null;

// Define a list of small cubes
const small = [];

// Define a list of medium cubes'
const medium = [];

// Define a list of large cubes
const large = [];

// Create 10 cubes
for (let scale = 1; scale <= 10; scale++) {

  // Determine the vectors for the cube
  const [neg, pos] = [(scale / 2), (-scale / 2)];

  // Create a cube mesh
  const cube = new Mesh({

    // Add the label
    label: `Cube ${scale}`,
    
    // Add the vertices
    vertices: [
      [neg, neg, pos],
      [pos, neg, pos],
      [pos, neg, neg],
      [neg, neg, neg],
      [neg, pos, pos],
      [pos, pos, pos],
      [pos, pos, neg],
      [neg, pos, neg]
    ],
    
    // Add the faces
    faces: [
      [2, 3, 0],
      [2, 1, 0],
      [7, 3, 0],
      [0, 4, 7],
      [4, 0, 1],
      [1, 5, 4],
      [6, 2, 3],
      [3, 7, 6],
      [5, 1, 2],
      [2, 6, 5],
      [7, 4, 5],
      [5, 6, 7]
    ]
  });

  // If the first cube set it as the base
  if (scale == 1) base = cube;

  // If the cube is small add to the small list
  if (scale >= 2 && scale <= 4) small.push(cube);

  // If the cube is medium add to the medium list
  if (scale >= 5 && scale <= 7) medium.push(cube);

  // If the cube is large add to the large list
  if (scale >= 8 && scale <= 10) large.push(cube);
}

// Successfully create an export
test('Export successfully created', async(result) => {

  // Define the path for exports
  const path = 'tests/cubes.zip';

  // Check if the file already exists and remove it
  if (fs.existsSync(path)) fs.unlinkSync(path);

  // Create an exporter
  const cubes = new MeshExporter(path);

  // Add the base cube to the export archive
  cubes.addMesh(base);

  // Add the lists of meshes to the export archive
  cubes.addMeshes({ small, medium, large });

  // Save / export the archive (test/cubes.zip)
  await cubes.save();

  // Check the file exists and pass the test if so
  result.assert(fs.existsSync(path) == true);
});