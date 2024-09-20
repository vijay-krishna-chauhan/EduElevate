// const BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log(BASE_URL);
// export const categories = {
//     CATEGORIES_API: BASE_URL + "/course/showAllCategories",
//   };
// console.log(categories);

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL); // Should output http://localhost:3000

export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/showAllCategories`,
};
console.log(categories); // Should output the correct categories object
