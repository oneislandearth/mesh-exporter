// Import the validator package
import { Validator } from '@oneisland/validator';

// Define a validator for the class
const { validate } = new Validator('OBJParser');
 
// Transforms a mesh into a .obj data set
export class OBJParser {
  
  // Parse a mesh into the required format for an .obj file
  constructor(mesh, normals = false) {

    // Throw an error if mesh value is not a Mesh
    validate({ mesh }, 'Mesh');

    // Determine the name of the mesh
    const name = (mesh.label) ? mesh.label.replace(/( )/ig, '_') : `Mesh_${Date.now()}`;

    // Create a string for the output
    let content = `# Scale = meters\ng ${name}\no ${name}\n`;

    // Iterate through each of the vertices
    for (const vertex of mesh.vertices) {

      // Extract the vertex components
      const [x, y, z] = vertex;

      // Add the vertex to the output (6dp)
      content += `v ${x} ${y} ${z}\n`;

      // Check if normals are to be added
      if (normals) {

        // Extract the vertex normal components
        const [xn, yn, zn] = vertex.normal;

        // Add the vertex normals to the output (6dp)
        content += `vn ${xn} ${yn} ${zn}\n`;
      }
    }

    // Iterate through each of the faces
    for (const face of mesh.faces) {

      // Extract each of the indices (+1)
      const [a, b, c] = face.map(i => (i + 1));

      // Check if normals are to be added
      if (normals) {

        // Add the face vertices with normals to the output
        content += `f ${a}//${a} ${b}//${b} ${c}//${c}\n`;

      } else {

        // Add the face vertices to the output
        content += `f ${a} ${b} ${c}\n`;
      }
    }
      
    // Return the name and content
    return {
      filename: `${name}.obj`,
      content
    };
  }
}