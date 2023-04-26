exports.Query =  {
    name: () => 'Hello World',
    age: () => 20,
    price: () => 20.5,
    isMarried: () => true,
    products: (parent, {filter} ,{products, reviews}) => {
        const {onSale, avgRating} = filter || {};
        let filteredProducts = products;
        if(filter) {
            // filter onSale
            if(onSale) {
                filteredProducts = filteredProducts.filter(product => product.onSale);
            }
            // filter avgRating
            if([1,2,3,4,5].includes(avgRating)) {
                // 此处的avgRating是传入的参数，通过filter过滤出来当前product下的所有review，然后计算平均值
                filteredProducts = filteredProducts.filter(product => {
                    const filteredReviews = reviews.filter(review => review.productId === product.id);
                    const totalRating = filteredReviews.reduce((acc, next) => acc + next.rating, 0);
                    return totalRating / filteredReviews.length >= avgRating;
                });
            }
        }
    return filteredProducts;
},
    product: (parent, {id}, {products}) => {
        return products.find(product => product.id === id);
    },
    categories: (parent, args, {categories}) => categories,
    category: (parent, {id}, {categories}) => {
        return categories.find(category => category.id === id);
    },
    
};