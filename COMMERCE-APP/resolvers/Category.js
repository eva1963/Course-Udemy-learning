exports.Category =  {
    products: (parent, args, {products}) => {
        return products.filter(product => product.categoryId === parent.id);
    }
}