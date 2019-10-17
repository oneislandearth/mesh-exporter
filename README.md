<p align="center">
  <a href="https://github.com/oneislandearth/mesh-exporter" target="_blank">
    <img src="https://i.imgur.com/MwBNOz9.png">
  </a>
</p>

<p align="center">
  <a href="https://greenkeeper.io" target="_blank">
  <img src="https://badges.greenkeeper.io/oneislandearth/mesh-exporter.svg"></a>
  <a href="https://travis-ci.org" target="_blank">
  <img src="https://api.travis-ci.org/oneislandearth/mesh-exporter.svg?branch=master"></a>
  <a href="https://packagephobia.now.sh/result?p=@oneisland/mesh-exporter" target="_blank">
  <img src="https://packagephobia.now.sh/badge?p=@oneisland/mesh-exporter"></a>
  <a href="https://snyk.io/vuln/search?q=@oneisland/mesh-exporter&type=npm" target="_blank">
  <img src="https://img.shields.io/snyk/vulnerabilities/github/oneislandearth/mesh-exporter.svg"></a>
  <a href="https://www.npmjs.com/package/@oneisland/mesh-exporter" target="_blank">
  <img src="https://img.shields.io/npm/l/@oneisland/mesh-exporter.svg"></a>
</p>

***

A simple tool for exporting meshes to ZIP archives

## Installation

[Mesh Exporter](https://github.com/oneislandearth/mesh-exporter) is available through the [npm registry](https://www.npmjs.com/package/@oneisland/mesh-exporter):

```bash
$ npm install @oneisland/mesh-exporter
```

## Usage

After installing Mesh Exporter you can use the package like so:

##### simple-usage.js
```js
// Import the mesh package
import { Mesh } from '@oneisland/mesh';

// Import the mesh exporter package
import { MeshExporter } from '@oneisland/mesh-exporter';

// Create a cube mesh
const cube = new Mesh({

  // Add the label
  label: `Cube`,
  
  // Add the vertices
  vertices: [
    [-0.5, -0.5,  0.5],
    [ 0.5, -0.5,  0.5],
    [ 0.5, -0.5, -0.5],
    [-0.5, -0.5, -0.5],
    [-0.5,  0.5,  0.5],
    [ 0.5,  0.5,  0.5],
    [ 0.5,  0.5, -0.5],
    [-0.5,  0.5, -0.5]
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

// Create an exporter
const example = new MeshExporter('example');

// Add the cube to the root folder of the archive
example.addMesh(cube);

// Save / export the archive (example.zip)
example.save();
```

Running the following code with Node:

```sh
$ node simple-example.js
```

The script will create a ZIP archive which includes an [STL](https://en.wikipedia.org/wiki/STL_(file_format)) and [OBJ](https://en.wikipedia.org/wiki/OBJ_(file_format)) for the `cube` mesh.

Please read the [documentation below](#documentation) for more details on how to configure Mesh Exporter.

You can check out the [tests](https://github.com/oneislandearth/mesh-exporter/tree/master/tests) or the source code of our [Structure library](https://github.com/oneislandearth/structure) for more complex usage.

## Documentation

### MeshExporter

```js
class MeshExporter {

  constructor(filepath) {}

  addMesh(mesh) {}

  addMeshes(meshes) {}
}
```

MeshExporter is a class which is instantiated for usage within a Class or Object.

Once instantiated, a Mesh Exporter ex0.5es two functions for use:

 - [addMesh](#addMesh) - Add a singular mesh to the archive for exporting
 - [addMeshes](#addMeshes) - Add a number of arrays of meshes to the archive for exporting

#### constructor

##### filepath

The `filename` parameter defines the filename (with or without `.zip` extension) for the archive of exports.

The `filepath` parameter can include the relative filepath for the archive of exports (from the current working direction).

The `filepath` should be a [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

```js
// Example filepath (with filename) 
'export-archive'

// Example filepath (with folder and filename) 
'some_folder/archive'

// Example filepath (with folder and filename and extension) 
'another_folder/archive.zip'
```

#### addMesh

The `addMesh` function accepts one argument `mesh` which must be a [Mesh](https://github.com/oneislandearth/mesh).

The `addMesh` function will generate an [STL](https://en.wikipedia.org/wiki/STL_(file_format)) and [OBJ](https://en.wikipedia.org/wiki/OBJ_(file_format)) of the `mesh` within the root directory of the archive.

See the [usage example](#usage) above.

#### addMeshes

The `addMeshes` function accepts one argument `meshes` which must be an [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), of which each property must be an [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [Mesh](https://github.com/oneislandearth/mesh).

The `addMeshes` function will generate a folder for each property of `meshes` by the same name.

The `addMeshes` function will generate an [STL](https://en.wikipedia.org/wiki/STL_(file_format)) and [OBJ](https://en.wikipedia.org/wiki/OBJ_(file_format)) of each `mesh` within each of the meshes properties in the respective directory of the archive.

See the [usage example](#usage) above.


#### save

The `save` function is called to export the archive.

The `save` function is [asyncronous](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) and can be [awaited](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).

The `save` function will save the archive to the respective filename (and filepath) if running from Node.js, or download if running from the browser.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, OneIsland Limited
