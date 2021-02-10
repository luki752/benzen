export const itemsUrl = (gender, category, item, sortOrder) =>
  `http://localhost:3000/${gender}?category=${category}&item=${item}&_sort=price&_order=${sortOrder} `;

export const specificItemUrl = (gender, id) =>
  `http://localhost:3000/${gender}/${id}`;
export const allItemsUrl = (gender) => `http://localhost:3000/${gender}`;

export const loginUrl = (email) => `http://localhost:3000/users?email=${email}`;

export const registerUrl = (email) =>
  `http://localhost:3000/users?email=${email}`;
export const questionUrl = (gender, question) =>
  `http://localhost:3000/${gender}?q=${question}`;
export const discountUrl = (gender) =>
  `http://localhost:3000/${gender}?discount=true`;
