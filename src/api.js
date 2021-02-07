export const itemsUrl = (gender) => `http://localhost:3000/${gender} `;

export const loginUrl = (email, password) =>
  `http://localhost:3000/users?email=${email}&password=${password}`;
