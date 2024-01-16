$(function() {
    // Get the product ID from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Call API to fetch the details of the specific product
    $.ajax({
        url: `https://dummyjson.com/products/${productId}`,
        success: function (res) {
            if (res.id) {
                displayProductDetails(res);
            }
        },
        error: function (err) {
            console.log(err);
        },
        data: {},
    });
});

function displayProductDetails(product, isFirstProduct = false) {
    const productDetailsContainer = $("<div>").addClass("product-details");
    const img = $("<img>").attr("src", product.images[0]).addClass("product-img");
    const title = $("<div>").text(product.title).addClass("product-title");
    const desc = $("<div>").text(product.description).addClass("product-desc");
    const price = $("<div>").text(product.price).addClass("product-price");
    productDetailsContainer.append(img, title, desc, price);

    productDetailsContainer.hide().appendTo("#product-details").fadeIn(1000);
}

    
       