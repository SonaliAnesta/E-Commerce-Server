const productCategories = {
  electronics: "Electronics",
  clothing: "Clothing",
  homeAndKitchen: "Home & Kitchen",
  beautyAndPersonalCare: "Beauty & Personal Care",
  sportsAndOutdoors: "Sports & Outdoors",
  books: "Books",
  toysAndGames: "Toys & Games",
};

const brandsByCategory = {
  [productCategories.electronics]: ["Samsung", "Sony", "Apple", "LG", "Dell", "HP"],
  [productCategories.clothing]: ["Nike", "Adidas", "Levi's", "H&M", "Zara"],
  [productCategories.homeAndKitchen]: ["Philips", "Prestige", "Tefal", "IKEA"],
  [productCategories.beautyAndPersonalCare]: ["L'Oréal", "Nivea", "Dove", "Olay"],
  [productCategories.sportsAndOutdoors]: ["Puma", "Reebok", "Yonex", "Wilson"],
  [productCategories.books]: ["Penguin", "HarperCollins", "Scholastic", "Bloomsbury"],
  [productCategories.toysAndGames]: ["Lego", "Mattel", "Hasbro", "Fisher-Price"]
};

module.exports = {
  productCategories,
  brandsByCategory
}
