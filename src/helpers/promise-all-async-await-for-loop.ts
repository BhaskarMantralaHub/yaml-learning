interface User {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const getToDos = async (id: number): Promise<User> => {
  return (await (
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  ).json()) as User;
};

async function todoFuncWithPromiseAll(idArr: number[]) {
  const start = performance.now();
  const response = await Promise.all(
    idArr.map(async (id): Promise<string> => {
      const response = await getToDos(id);
      return response.id.toString().concat(response?.title);
    })
  );

  console.log(response);

  console.log(
    response.reduce((acc, val) => acc.concat(val)),
    ''
  );
  const end = performance.now();
  console.log(`Total difference is ${end - start}`);
}

async function todoFuncWithForOfLoop(idArr: number[]) {
  const start = performance.now();
  const responseArray: string[] = [];
  for (const id of idArr) {
    const user: User = await getToDos(id);
    responseArray.push(user.id.toString().concat(user.title));
  }

  console.log(responseArray);

  console.log(
    responseArray.reduce((acc, val) => acc.concat(val)),
    ''
  );
  const end = performance.now();
  console.log(`Total difference is ${end - start}`);
}

// eslint-disable-next-line @typescript-eslint/require-await
async function todoFuncWithReduce(idArr: number[]) {
  const start = performance.now();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response = await idArr.reduce(async (acc, id) => {
    await acc;
    console.log(`${id} ${(await getToDos(id)).title}`);
  }, Promise.resolve());

  console.log(response);
  const end = performance.now();
  console.log(`Total difference is ${end - start}`);
}

void todoFuncWithPromiseAll([1, 2, 3, 4, 5, 6, 7, 8, 9]).then(console.log); //Better Performance
// void todoFuncWithForOfLoop([1, 2, 3, 4]).then(console.log); //Average performance
// void todoFuncWithReduce([1, 2, 3, 4]).then(console.log); //Below Average performance
