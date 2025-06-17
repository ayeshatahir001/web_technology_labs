$(document).ready(function () {
  // Toggle Views
  $("#add-btn").click(() => {
    $("#form-heading").text("Add New Product");
    $("form")[0].reset();
    $("input[name='productID']").val("");
    $("#add-form").slideDown();
    $("#product-list").slideUp();
  });

  $("#view-btn").click(() => {
    $("#product-list").slideDown();
    $("#add-form").slideUp();
  });

  // Submit Add or Update
  $("#add-product-form").on("submit", function (e) {
    e.preventDefault();

    const id = $("input[name='productID']").val().trim();
    const data = {
      title: $("input[name='title']").val(),
      price: $("input[name='price']").val(),
      image: $("input[name='image']").val(),
      description: $("textarea[name='description']").val(),
    };

    const url = id
      ? `/admin/products/edit/${id}`
      : `/admin/products/add`;

    $.post(url, data)
      .done(() => {
        alert(id ? "✅ Product updated!" : "✅ Product added!");
        location.reload();
      })
      .fail(() => {
        alert("❌ Operation failed.");
      });
  });

  // Prefill Edit Form
  $(".edit-product").click(function () {
    const card = $(this).closest(".product-card");
    $("input[name='productID']").val($(this).data("id"));
    $("input[name='title']").val(card.find("h3").text());
    $("input[name='price']").val(card.find(".product-price").text().replace("PKR ", "").trim());
    $("input[name='image']").val(card.find("img").attr("src"));
    $("textarea[name='description']").val(card.find(".product-description").text());
    $("#form-heading").text("Edit Product");
    $("#add-form").slideDown();
    $("#product-list").slideUp();
  });

  // Delete Product
  $(".delete-product").click(function () {
    const id = $(this).data("id");

    $.post(`/admin/products/delete/${id}`)
      .done(() => {
        alert("🗑️ Product deleted!");
        location.reload();
      })
      .fail(() => {
        alert("❌ Delete failed.");
      });
  });
});
