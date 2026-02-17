// queries/productKeys.js
export const productKeys = {
  all: ['products', 'all'],
  list: (keyword) => ['products', 'list', keyword || 'all'],
};