$(document).ready(function () {
    // Drag and drop Task
    $("#draggable").draggable();
    $("#droppable").droppable({
        drop: function (_event, ui) {
            ui.draggable.remove();
        }
    });

    //------------------------End of drag and drop task---------------------------------------------------

    // Fetch data task
    $.ajax({
        url: "https://dummyjson.com/products",
        success: function (res) {
            if (res.products && res.products.length > 0) {
                res.products.forEach(function (product, index) {
                    displayProduct(product, index === 0);
                });
            }
        },
        error: function (err) {
            console.log(err);
        },
        data: {},
    });

    $("#get-data").click(function () {
        const productId = $("#product-id").val();
        if (!productId) {
            console.log("Please enter a product ID");
            return;
        }
        window.location.href = `product.html?id=${productId}`;
    });

    function displayProduct(product, isFirstProduct = false) {
        const productContainer = $("<div>").addClass("each-product");
        const img = $("<img>").attr("src", product.images[0]).addClass("product-img");
        const title = $("<div>").text(product.title).addClass("product-title");
        const desc = $("<div>").text(product.description).addClass("product-desc");
        const price = $("<div>").text(product.price).addClass("product-price");
        productContainer.append(img, title, desc, price);

        // Add animation
        if (isFirstProduct) {
            productContainer.hide().prependTo("#fetch-data").fadeIn(1000);
        } else {
            productContainer.hide().appendTo("#fetch-data").fadeIn(1000);
        }
    }

    // -------------------end of fetch data task---------------------------------------------

    // To-Do list 
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function (task) {
            appendTaskToList(task);
        });
    }

    function appendTaskToList(task) {
        let listItem = $('<li>').text(task).addClass('toggler');
        let deleteButton = $('<button>').text('Delete').addClass('delete-button');
        let doneButton = $('<button>').text('Done').addClass('done-button');

        listItem.append(doneButton);
        listItem.append(deleteButton);

        $('#task-list').append(listItem);

        deleteButton.click(function () {
            listItem.remove();
            removeTask(task);
        });
    }

    function removeTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        saveTasks(tasks);
    }

    // Event for "Done" button
    $("#task-list").on("click", ".done-button", function () {
        const listItem = $(this).closest("li");
        listItem.toggleClass("Done");
        listItem.css("background-color", listItem.hasClass("Done") ? "#dcf8c6" : "#fff");
    });

    $('#task-form').submit(function (event) {
        event.preventDefault();
        let taskInput = $('input[name=task-input]');
        let task = taskInput.val().trim();

        if (task !== '') {
            appendTaskToList(task);
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            saveTasks(tasks);
            taskInput.val('');
        }
    });

    $("input[name=task-input]").keyup(function (event) {
        if (event.keyCode == 13) {
            $('#task-form').submit();
        }
    });

    $('#task-list').sortable();
    loadTasks();
});

// index.js

$(document).ready(function () {
    $("#get-data").click(function () {
        const productId = $("#product-id").val();
        const searchQuery = $("#search-input").val();

        fetchData(productId, searchQuery);
    });

    function fetchData(productId, searchQuery) {
        let apiUrl = "https://dummyjson.com/products";

        // Append productId to the API URL if provided
        if (productId) {
            apiUrl += `/${productId}`;
        }

        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function (data) {
                displayData(data, searchQuery);
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data:", error);
            }
        });
    }

    function displayData(data, searchQuery) {
        // Clear previous data
        $("#fetch-data").empty();

        if (data.products && data.products.length > 0) {
            data.products.forEach(product => {
                // Check if the title contains the search query
                if (!searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                    displayProduct(product);
                }
            });
        }
    }

    function displayProduct(product) {
        // Your code to display the product goes here
        const productContainer = $("<div>").addClass("each-product");
        const img = $("<img>").attr("src", product.images[0]).addClass("product-img");
        const title = $("<div>").text(product.title).addClass("product-title");
        const desc = $("<div>").text(product.description).addClass("product-desc");
        const price = $("<div>").text(product.price).addClass("product-price");
        productContainer.append(img, title, desc, price);

        productContainer.hide().appendTo("#fetch-data").fadeIn(1000);
    }
});
