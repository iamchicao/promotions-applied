// PEGAR quais são os PRODUTOS fornecidos -- ok
// PEGAR as CATEGORIAS dos produtos fornecidos --ok
// VERIFICAR quantas CATEGORIAS diferentes existem entre os produtos fornecidos --ok
// VERIFICAR PROMOÇÃO a partir da quantidade de categorias que foram descobertas --ok
// PEGAR o preço regular de todos os produtos --ok
// SOMAR os valores dos itens de acordo com a PROMOÇÃO aplicada --ok
// ARMAZENAR valor total --ok
// SUBTRAIR o VALOR TOTAL do PREÇO COM DESCONTOS --ok
// CALCULAR a PORCENTAGEM de DESCONTOS --ok

const PROMOTIONS_RULES = {
  1: "SINGLE LOOK",
  2: "DOUBLE LOOK",
  3: "TRIPLE LOOK",
  4: "FULL LOOK",
};

// Pega os produtos pelos ids
const getProductsByIds = (ids, allProducts) => {
  return allProducts.filter((product) => ids.includes(product.id));
};

// Pega as categorias dos produtos
const getProductsCategories = (filteredProducts) => {
  return filteredProducts.map((product) => product.category);
};

// Remove duplicados e retorna a quantidade de um novo array
const getCategoryQuantity = (categories) => [...new Set(categories)].length;

// Soma do preço regular (sem desconto) de todos os produtos
const getRegularPrices = (cartProducts) =>
  cartProducts.reduce((acc, product) => {
    return acc + product.regularPrice;
  }, 0);

const getPromotionPrices = (cartProducts, promotionRule) =>
  cartProducts.reduce((acc, product) => {
    const foundPromotion = product.promotions.find((promotion) =>
      promotion.looks.includes(promotionRule)
    );

    if (foundPromotion) {
      acc = acc + foundPromotion.price;
    } else {
      acc = acc + product.regularPrice;
    }

    return acc;
  }, 0);

const getShoppingCart = (ids, allProducts) => {
  const cartProducts = getProductsByIds(ids, allProducts);
  const categoryProducts = getProductsCategories(cartProducts);
  const quantity = getCategoryQuantity(categoryProducts);
  const promotion = PROMOTIONS_RULES[quantity];
  const products = cartProducts.map((product) => {
    return {
      name: product.name,
      category: product.category,
    };
  });
  const totalRegularPrice = getRegularPrices(cartProducts);
  const totalPriceWithDiscounts = getPromotionPrices(cartProducts, promotion);
  const discountValue = totalRegularPrice - totalPriceWithDiscounts;
  const discount = `${((discountValue / totalRegularPrice) * 100).toFixed(2)}%`;

  return {
    products: products,
    promotion,
    totalPrice: totalPriceWithDiscounts.toFixed(2),
    discountValue: discountValue.toFixed(2),
    discount,
  };
};

module.exports = {
  getShoppingCart,
};
