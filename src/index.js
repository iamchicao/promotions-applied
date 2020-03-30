// PEGAR quais são os PRODUTOS fornecidos; --OK
// VERIFICAR as CATEGORIAS dos produtos fornecidos ; --OK
// VERIFICAR qts CATEGORIAS diferente existem nos produtos fornecidos; --OK
// VERIFICAR PROMOÇÃO a partir da quantidade de CATEGORIAS que foram descobertas; --OK
// PEGAR os produtos que contêm a promoção ativa 
// SOMAR os valores dos itens de acordo com a PROMOÇÃO aplicada;
// ARMAZENAR o valor total
// SUBTRAIR o VALOR TOTAL do PREÇO COM DESCONTO
// CALCULAR a porcentagem de DESCONTO


// Object Destructuring - Importação de produtos por array
const { products } = require('./data/products');

const PROMOTION_RULES = {
	1: 'SINGLE LOOK',
	2: 'DOUBLE LOOK',
	3: 'TRIPLE LOOK',
	4: 'FULL LOOK',
};

//Pega os produtos pelos ids
const getProductsByIds = (ids, allProducts) => {
	return allProducts.filter((product)=> ids.includes(product.id));
};

//Pega as categorias dos produtos
const getProductsCategories = (filteredProducts) => {
    return filteredProducts.map((product) => product.category);
};

//Remove duplicadas e retorna quantidade de um novo array
const getCategoryQuantity = (categories) => [...new Set (categories)].length;


//Soma do preço regular (sem desconto) de todos os produtos
const getRegularPrices = (cartProducts) => cartProducts.reduce((acc, product) => {
	return acc + product.regularProce;
}, 0);

//
const getPromotionPrices = (cartProducts, promotionRule) => cartProducts.reduce((acc, product) => {
	const foundPromotion = product.promotions.find((promotion) => promotion.looks.includes(promotionRule));
	
	if(foundPromotion){
		acc = 	acc + foundPromotion.price;
	}
	else {
		acc = acc + product.regularPrice;
	}

	return acc;
}, 0);



const getShoppingCart = (ids, allProducts) => {
	const cartProducts = getProductsByIds(ids, allProducts);
	const categoryProducts = getProductsCategories(cartProducts);
	const quantity = getCategoryQuantity(cartProducts);
	const promotion = PROMOTION_RULES[quantity];

	//Retorna um novo array, modificação nos produtos
	const products = cartProducts.map(product => {
		return {
			name: product.name,
			category: product.category,
		}
	});
	const totalRegularPrice = getRegularPrices(cartProducts);
	const totalPriceWithDiscounts = getPromotionPrices(cartProducts, promotion);
	const discountValue = totalRegularPrice - totalPriceWithDiscounts;
	const discount = `${((discountValue / totalRegularPrice) * 100).toFixed(2)}%`;

	return {
		products,
		promotion,
		totalPrice: totalPriceWithDiscounts.toFixed(2),
		discountValue: discountValue.toFixed(2),
		discount,
	}
};

//Executando a função passando os produtos e a lista com todos os produtos
console.log(getShoppingCart([130, 140, 230, 260], products));

module.exports = { 
	getShoppingCart 
};