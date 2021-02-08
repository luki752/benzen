export const itemsUrl = (gender) => `http://localhost:3000/${gender} `;

export const loginUrl = (email) => `http://localhost:3000/users?email=${email}`;

export const registerUrl = (email) =>
  `http://localhost:3000/users?email=${email}`;
