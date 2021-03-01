const appLink = `https://benzen-server.herokuapp.com`;

export const itemsUrl = (gender, category, item, sortOrder, page) =>
  `${appLink}/${gender}?category=${category}&item=${item}&_sort=price&_order=${sortOrder}&_limit=${page} `;

export const specificItemUrl = (gender, id) => `${appLink}/${gender}/${id}`;

export const allItemsUrl = (gender, query, item) =>
  `${appLink}/${gender}?q=${query}&item=${item}`;

export const allUsersUrl = () => `${appLink}/users`;
export const allUsersFilteredUrl = (accessibility, query, page) =>
  `${appLink}/users?accessibility=${accessibility}&q=${query}&_limit=20&_page=${page}`;
export const specificUser = (id) => `${appLink}/users/${id}`;

export const loginUrl = (email) => `${appLink}/users?email=${email}`;

export const registerUrl = (email) => `${appLink}/users?email=${email}`;

export const questionUrl = (gender, question) =>
  `${appLink}/${gender}?q=${question}`;

export const discountUrl = (gender, item, sortOrder) =>
  `${appLink}/${gender}?item=${item}&discount=true&_sort=price&_order=${sortOrder}`;

export const allOrders = (sortOrder, page) =>
  `${appLink}/orders?_sort=date&_order=${sortOrder}&_limit=20&_page=${page}`;

export const usersOrders = (id) =>
  `${appLink}/orders?usersId=${id}&_sort=date&_order=desc`;
export const specificOrder = (id) => `${appLink}/orders/${id}`;
