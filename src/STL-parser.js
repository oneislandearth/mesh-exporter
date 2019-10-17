// Import the validator package
import { Validator } from '@oneisland/validator';

// Define a validator for the class
const { validate } = new Validator('STLParser');
 
// Transforms a mesh into a .stl data set
export class STLParser {
  
  // Parse a mesh into the required format for an .stl file
  constructor(mesh) {

    // Throw an error if mesh value is not a Mesh
    validate({ mesh }, 'Mesh');

    // Determine the name of the mesh
    const name = (mesh.label) ? mesh.label.replace(/( )/ig, '_') : `Mesh_${Date.now()}`;

    // Create a string for the output
    let content = `solid ${name}\n`;

    // // Round all the vertex values to 5dp
    // for (let i = 0; i < mesh.vertices.length; i++) {
    //   mesh.vertices[i][0] = mesh.vertices[i][0].toFixed(5);
    //   mesh.vertices[i][1] = mesh.vertices[i][1].toFixed(5);
    //   mesh.vertices[i][2] = mesh.vertices[i][2].toFixed(5);
    // }

    // Iterate through each of the faces
    for (const face of mesh.faces) {

      // Extract the face normal values
      const [xn, yn, zn] = face.normal;

      // Add the facet normals
      content += `facet normal ${xn} ${yn} ${zn}\n`;

      // Begin the outer loop (1 tab)
      content += `\touter loop\n`;

      // Iterate through each of the vertices in the face
      for (const [x, y, z] of face.vertices) {

        // Add the vertices (2 tabs)
        content += `\t\tvertex ${x} ${y} ${z}\n`;
      }

      // Close the outer loop and facet (1 tab)
      content += `\tendloop\nendfacet\n`;
    }

    // End the shape
    content += `endsolid ${name}\n`;
      
    // Return the name and content
    return {
      filename: `${name}.stl`,
      content
    };
  }
}