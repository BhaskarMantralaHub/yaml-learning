import fs from 'fs';
import yaml from 'js-yaml';
import * as path from 'path';

const filepath = path.resolve(__dirname, '../reuse-props.yaml');

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

// interface JSONObject {
//   [x: string]: JSONValue;
// }

type JSONArray = Array<JSONValue>;

interface Address {
  state: string;
  street: string;
  country: string;
  phone: number;
}

interface YamlResponse {
  fruit: string[];
  addressAndPhone: {
    state: string;
    street: string;
    country: string;
    phone: number;
  };
  joint_account: {
    applicant: {
      name: string;
      address: Address;
    };
    coApplicant: {
      name: string;
      address: Address;
    };
  };
  addressAndPhone1: Address & 'phone';
  cellPhone: number;
  name: string;
  fullName: string;
  address: {
    name: string;
  };
}

const readFileWithInterface = () => {
  const file = fs.readFileSync(filepath, 'utf8');
  const parsedYaml: YamlResponse = yaml.load(file) as YamlResponse;
  console.log('readFileWithInterface: \n');
  console.log(parsedYaml);
};

const readFileWithGenericJSON = () => {
  const file = fs.readFileSync(filepath, 'utf8');
  const parsedYaml1: JSONArray = yaml.load(file) as JSONArray;
  console.log('readFileWithGenericJSON: \n');
  console.log(parsedYaml1);
};

console.log(filepath);
console.log(fs.existsSync(filepath));
void readFileWithInterface();
void readFileWithGenericJSON();
