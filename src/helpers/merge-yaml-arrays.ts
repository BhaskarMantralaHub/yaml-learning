import * as yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

// Read the YAML file
const yamlFile: any = fs.readFileSync(
  path.resolve(__dirname, '../reuse-props.yaml'),
  'utf8'
);
const data = yaml.load(yamlFile) as unknown as {};

for (let obj of Object.keys(data)) {
  // @ts-ignore
  if (Array.isArray(data[obj])) {
    // @ts-ignore
    data[obj] = data[obj].flat(1);
  }
}

// Merge the two arrays conditionally
// @ts-ignore
const array1 = data['CCA_Sanity'];
const merge3 = array1.flat(1); //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
console.log(merge3);
// // @ts-ignore
// const array2 = data['CCA_Sanity'];
// let mergedArray = []
// if (array1.length > 0 && array2.length > 0) {
//   mergedArray = array1.concat(array2);
// } else if (array1.length > 0) {
//   mergedArray = array1;
// } else if (array2.length > 0) {
//   mergedArray = array2;
// }

// Update the YAML file with the merged array
// @ts-ignore
// data['merged_array'] = mergedArray;
// @ts-ignore
// console.table(data['merged_array']);