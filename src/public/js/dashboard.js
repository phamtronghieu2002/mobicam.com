let converter = new showdown.Converter();
let overlay = document.getElementById("overlay");
let title_news_vi = document.getElementById("title_news_vi");
let title_news_en = document.getElementById("title_news_en");
let btn_close = document.querySelector(".btn-close");

const validateSizeImage = (size, height, type = "") => {
  if (type === "news") {
    if (size > 500) {
      toastr.error("Dung lượng ảnh không được vượt quá 500KB", "Lỗi");
      return false;
    }
  } else {
    if (size > 500 || height > 1000) {
      toastr.error(
        "Dung lượng ảnh không được vượt quá 500KB và chiều dài không quá 1000px",
        "Lỗi"
      );
      return false;
    }
  }
  return true;
};
const validateSizeImageProduct = (height, width) => {
  console.log("height", height);
  console.log("width", width);
  if (width >= 600 && height >= 600) {
    return true;
  }
  toastr.error("ảnh sản phẩm hải có kích thước tối thiểu 600x600", "Lỗi");
  return false;
};
const validateSizeImageNews = (height, width) => {
  if (width >= 800 && height >= 700) {
    return true;
  }
  toastr.error("ảnh bài viết phải có kích thước tối thiểu 800x700", "Lỗi");
  return false;
};
btn_close?.classList.add("d-none");
//khởi tạo markdown editor cho news
let easyMDE_news_vi = new EasyMDE({
  element: document.getElementById("markdown_news_vi"),
});
let easyMDE_news_en = new EasyMDE({
  element: document.getElementById("markdown_news_en"),
});
//khởi tạo markdown editor cho product vi
let easyMDE_product_vi = new EasyMDE({
  element: document.getElementById("markdown_product_vi"),
  previewRender: function (plainText) {
    return easyMDE_product_en.markdown(plainText); // Use EasyMDE's default markdown rendering
  },
  renderingConfig: {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true,
  },
  autoDownloadFontAwesome: false, // If you have FontAwesome loaded separately
});
//khởi tạo markdown editor cho product en
let easyMDE_product_en = new EasyMDE({
  element: document.getElementById("markdown_product_en"),
});

// //thêm sự kiện để  đếm số từ của markdown
// easyMDE_product_vi.codemirror?.on("change", function () {
//   updateWordCount();
// });

// // Hàm cập nhật số lượng từ
// function updateWordCount() {
//   const text = easyMDE_product_vi.value(); // Lấy nội dung markdown
//   const words = text.trim().split(/\s+/).length; // Tách các từ và tính số lượng

//   console.log(words);
// }

const reLoadPage = (path = "") => {
  setTimeout(function () {
    if (path) {
      window.location.href = path;
    } else {
      window.location.reload();
    }
  });
};

//==============================================news==============
let imgInp = document.getElementById("image_news");
let blah_news = document.getElementById("preview_news");
const markdownFormNews = document.getElementById("markdownFormNews");

const tab_editNews = document.getElementById("nav-editNews-tab");
const tab_addNews = document.getElementById("nav-addNews-tab");
const parentContentNews = document.getElementById("nav-addNews");

let fileInputNews = document.getElementById("image_news");
let btnEditNews = document.querySelector(".editNews");
let btnAddNews = document.querySelector(".addNews");
let btnCancelNews = document.querySelector(".cancelNews");
let id_edit_news = document.getElementById("id_edit_news");

const handleAddNew = async () => {
  try {
    let markdownContent_vi = easyMDE_news_vi.value();
    let markdownContent_en = easyMDE_news_en.value();
    let content_vi = converter.makeHtml(markdownContent_vi);
    let content_en = converter.makeHtml(markdownContent_en);
    let titleTxt_vi = title_news_vi.value;
    let titleTxt_en = title_news_en.value;
    let formData = new FormData();
    if (fileInputNews.files && fileInputNews.files[0]) {
      formData.append("image", fileInputNews.files[0]);
    }
    if (
      !titleTxt_vi ||
      !titleTxt_en ||
      !content_vi ||
      !content_en ||
      !fileInputNews.files[0] ||
      !markdownContent_en ||
      !markdownContent_vi
    ) {
      toastr.error("Vui lòng điền đầy đủ thông tin", "Thông báo");
      return;
    }
    overlay.classList.remove("d-none");
    const res = await axios.post("/admin/uploadimage", formData);
    const imageUrl = res.data.path;
    const result = await axios.post("/admin/add-new", {
      title_vi: titleTxt_vi,
      title_en: titleTxt_en,
      content_vi,
      content_en,
      imageUrl,
    });
    if (result.data) {
      overlay.classList.add("d-none");
      toastr.success("Thêm tin tức thành công", "Thông báo");
      reLoadPage("/admin/dashboard/page/news");
    }
  } catch (err) {
    console.log(err);
  }
};

const handleClickEditNew = (id) => {
  id_edit_news.innerText = id;
  btnEditNews.classList.remove("d-none");
  btnAddNews.classList.add("d-none");
  btnCancelNews.classList.remove("d-none");

  const titleEdit_vi = document.getElementById(`titleNews${id}_vi`).innerText;
  const titleEdit_en = document.getElementById(`titleNews${id}_en`).innerText;

  const contentEdit_vi = document.getElementById(
    `contentNews${id}_vi`
  ).innerText;
  const contentEdit_en = document.getElementById(
    `contentNews${id}_en`
  ).innerText;

  const imgEdit = document.getElementById(`imgNews${id}`).innerText;
  const turndownService = new TurndownService();
  const markdown_vi = turndownService.turndown(contentEdit_vi);
  const markdown_en = turndownService.turndown(contentEdit_en);

  title_news_vi.value = titleEdit_vi;
  easyMDE_news_vi.value(markdown_vi);

  title_news_en.value = titleEdit_en;
  easyMDE_news_en.value(markdown_en);

  blah_news.src = imgEdit;
  blah_news.parentElement.setAttribute("href", imgEdit);
  btn_close.classList.remove("d-none");
  btn_close.classList.add("d-block");
  overlay.classList.remove("d-none");
  overlay.classList.add("d-block");
  parentContentNews.parentNode.insertBefore(
    markdownFormNews,
    parentContentNews
  );
  markdownFormNews.classList.remove("d-none");
  markdownFormNews.classList.add("d-block");
};

const handleEditNews = async () => {
  try {
    overlay.classList.remove("d-none");
    var id = id_edit_news.innerText;

    var titleEdit_vi = title_news_vi.value;
    var titleEdit_en = title_news_en.value;

    var markdownContent_vi = easyMDE_news_vi.value();
    var markdownContent_en = easyMDE_news_en.value();

    var contentEdit_vi = converter.makeHtml(markdownContent_vi);
    var contentEdit_en = converter.makeHtml(markdownContent_en);

    var formData = new FormData();
    let imageUrl = "";

    if (fileInputNews.files && fileInputNews.files[0]) {
      formData.append("image", fileInputNews.files[0]);
      const res = await axios.post("/admin/uploadimage", formData);
      console.log("res", res);
      imageUrl = res.data.path;
    }
    const res = await axios.put(`/admin/update-new/${id}`, {
      title_vi: titleEdit_vi,
      title_en: titleEdit_en,
      content_vi: contentEdit_vi,
      content_en: contentEdit_en,
      imageUrl,
    });
    if (res.data) {
      overlay.classList.add("d-none");
      toastr.success("Cập nhật tin tức thành công", "Thông báo");
      reLoadPage(`/admin/dashboard/page/news?id=${id}`);
    }
  } catch (error) {
    toastr.error(error, "Thông báo lỗi");
    console.log(error);
  }
};
const handleCancelEdit = () => {
  overlay.classList.remove("d-block");
  overlay.classList.add("d-none");
  btnEditNews.classList.add("d-none");
  btnAddNews.classList.remove("d-none");
  btnCancelNews.classList.add("d-none");
  title_news_vi.value = "";
  title_news_en.value = "";
  easyMDE_news_vi.value("");
  easyMDE_news_en.value("");
  btn_close?.classList.add("d-none");
  blah_news.src =
    "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
  parentContentNews.appendChild(markdownFormNews);
  markdownFormNews.classList.remove("d-block");
  markdownFormNews.classList.add("d-none");
};

//==================================================product
let nameProduct_vi = document.getElementById("name_product_vi");
let nameProduct_en = document.getElementById("name_product_en");

let fileInputProduct = document.getElementById("image_product");
let btnEditProduct = document.querySelector(".editProduct");
let btnAddProduct = document.querySelector(".addProduct");
let btnCancelProduct = document.querySelector(".cancelProduct");
let id_edit_product = document.getElementById("id_edit_product");
let imgInpProduct = document.getElementById("image_product");
let blah_product = document.getElementById("preview_product");

const markdownFormProduct = document.getElementById("markdownFormProduct");

const tab_editProduct = document.getElementById("nav-editProduct-tab");
const tab_addProduct = document.getElementById("nav-addProduct-tab");
const parentContentProduct = document.getElementById("nav-addProduct");

let categories = document.getElementById("category_product");

const handleDelete = async (path, title) => {
  const isConfirmed = await poupConfirm(
    `bạn chắc chắc muốn xóa ${title}?","Dữ liệu của bạn sẽ được cập nhật!`
  );

  if (isConfirmed) {
    window.location.href = path;
  }
};

const handleCancelEditProduct = () => {
  overlay.classList.remove("d-block");
  overlay.classList.add("d-none");
  btnEditProduct.classList.add("d-none");
  btnAddProduct.classList.remove("d-none");
  btn_close?.classList.add("d-none");
  // btnCancelProduct.classList.add("d-none");
  nameProduct_vi.value = "";
  easyMDE_product_vi.value("");
  nameProduct_en.value = "";
  easyMDE_product_en.value("");
  pond.removeFiles();
  parentContentProduct.appendChild(markdownFormProduct);
  markdownFormProduct.classList.remove("d-block");
  markdownFormProduct.classList.add("d-none");
  markdownFormProduct.classList.add("modal_absolute_content");
};

// Các URL ảnh bạn muốn hiển thị
// const imageUrls = [
//     '/files/baiviet_valid.jpg',

// ];

// // Hàm để tạo tệp từ URL
// const createFileFromUrl = async (url) => {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   const fileName = url.split('/').pop();
//   return new File([blob], fileName, { type: blob.type });
// };

// // Thêm ảnh từ URL vào FilePond
// (async () => {
//   for (const url of imageUrls) {
//       const file = await createFileFromUrl(url);
//       pond.addFile(file);
//   }
// })();
const handleAddProduct = async () => {
  try {
    let markdownContent_vi = easyMDE_product_vi.value();
    let markdownContent_en = easyMDE_product_en.value();
    let content_vi = converter.makeHtml(markdownContent_vi);
    let content_en = converter.makeHtml(markdownContent_en);

    let cat_id = categories.value;

    let nameTxt_vi = nameProduct_vi.value;
    let nameTxt_en = nameProduct_en.value;

    const pond = FilePond.find(document.querySelector(".filepond"));
    const files = pond.getFiles();
    console.log("files", files);
    const formData = new FormData();

    files.forEach((fileItem) => {
      const file = fileItem.file;
      const fileSizeInBytes = file.size;
      const fileSizeInKB = fileSizeInBytes / 1024;

      if (!validateSizeImage(fileSizeInKB, 1000)) return;

      // Thêm file vào formData
      formData.append("files", file);
    });
    if (
      !nameTxt_vi ||
      !nameTxt_en ||
      !content_vi ||
      !content_en ||
      !cat_id ||
      files?.length == 0 ||
      !markdownContent_en ||
      !markdownContent_vi
    ) {
      toastr.error("Vui lòng điền đầy đủ thông tin", "Thông báo");

      return;
    }
    // Gửi formData qua Axios
    overlay.classList.toggle("d-none");
    const response = await axios.post("/admin/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const imgs = response?.data?.filePaths;

    const result = await axios.post("/admin/add-product", {
      name_vi: nameTxt_vi,
      desc_vi: content_vi,
      name_en: nameTxt_en,
      desc_en: content_en,
      imgs,
      catid: cat_id,
    });

    if (result.data) {
      toastr.success("thêm sản phẩm thành công !!", "Thông báo");
      reLoadPage("/admin/dashboard/page/product");
    }
  } catch (err) {
    toastr.error("thêm sản phẩm thất bại !!", "Thông báo");
    console.log(err);
  }
};

const handleClickEditProduct = (id) => {
  id_edit_product.innerText = id;
  btnEditProduct.classList.remove("d-none");
  btnAddProduct.classList.add("d-none");
  // btnCancelProduct.classList.remove("d-none");
  const nameEdit_vi = document.getElementById(`nameProduct_vi${id}`).innerText;
  const nameEdit_en = document.getElementById(`nameProduct_en${id}`).innerText;

  const contentEdit_vi = document.getElementById(
    `contentProduct${id}_vi`
  ).innerText;
  const contentEdit_en = document.getElementById(
    `contentProduct${id}_en`
  ).innerText;

  const turndownService = new TurndownService();
  const markdown_vi = turndownService.turndown(contentEdit_vi);
  const markdown_en = turndownService.turndown(contentEdit_en);

  nameProduct_vi.value = nameEdit_vi;
  nameProduct_en.value = nameEdit_en;

  easyMDE_product_vi.value(markdown_vi);
  easyMDE_product_en.value(markdown_en);

  categories.value = document.getElementById(`catProduct${id}`).innerText;

  // Các URL ảnh bạn muốn hiển thị
  const imageUrls = Array.from(
    document.querySelectorAll(`.sub_thumb_product_${id}`)
  ).map((img) => img.src);

  // Hàm để tạo tệp từ URL
  const createFileFromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileName = url.split("/").pop();
    return new File([blob], fileName, { type: blob.type });
  };

  // Thêm ảnh từ URL vào FilePond
  (async () => {
    for (const url of imageUrls) {
      const file = await createFileFromUrl(url);
      pond.addFile(file);
    }
  })();

  btn_close.classList.remove("d-none");
  btn_close.classList.add("d-block");
  overlay.classList.remove("d-none");
  overlay.classList.add("d-block");
  parentContentProduct.parentNode.insertBefore(
    markdownFormProduct,
    parentContentProduct
  );
  markdownFormProduct.classList.remove("d-none");
  markdownFormProduct.classList.add("d-block");
};

const handleEditProduct = async () => {
  try {
    overlay.classList.remove("d-none");

    var id = id_edit_product.innerText;
    let markdownContent_vi = easyMDE_product_vi.value();
    let markdownContent_en = easyMDE_product_en.value();
    let content_vi = converter.makeHtml(markdownContent_vi);
    let content_en = converter.makeHtml(markdownContent_en);

    let nameTxt_vi = nameProduct_vi.value;
    let nameTxt_en = nameProduct_en.value;
    let catid = categories.value;

    const pond = FilePond.find(document.querySelector(".filepond"));
    const files = pond.getFiles();
    console.log("files", files);
    const formData = new FormData();

    files.forEach((fileItem) => {
      const file = fileItem.file;
      const fileSizeInBytes = file.size;
      const fileSizeInKB = fileSizeInBytes / 1024;

      if (!validateSizeImage(fileSizeInKB, 1000)) return;

      // Thêm file vào formData
      formData.append("files", file);
    });
    if (
      !nameTxt_vi ||
      !nameTxt_en ||
      !content_vi ||
      !content_en ||
      !catid ||
      files?.length == 0 ||
      !markdownContent_en ||
      !markdownContent_vi
    ) {
      toastr.error("Vui lòng điền đầy đủ thông tin", "Thông báo");

      return;
    }
    // Gửi formData qua Axios

    const response = await axios.post("/admin/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const imgs = response?.data?.filePaths;

    const result = await axios.put(`/admin/update-product/${id}`, {
      name_vi: nameTxt_vi,
      desc_vi: content_vi,
      name_en: nameTxt_en,
      desc_en: content_en,
      imgs,
      catid,
    });

    if (result.data) {
      toastr.success("Cập nhật sản phẩm thành công", "Thông báo");
      reLoadPage(`/admin/dashboard/page/product?id=${id}`);
    }
  } catch (error) {
    toastr.error(error, "Thông báo");
    console.log(error);
  }
};

const hanldeChangeImage = () => {
  if (imgInp) {
    imgInp.onchange = (evt) => {
      const [file] = imgInp.files;
      const fileSize = file.size;
      const fileSizeKB = fileSize / 1024;
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async function () {
        if (!validateSizeImage(fileSizeKB, 1000, "news")) return;
        if (!validateSizeImageNews(img.height, img.width)) return;

        if (file) {
          const img_url = URL.createObjectURL(file);
          blah_news.src = img_url;
          blah_news.parentElement.setAttribute("href", img_url);
        }
      };
    };
  }
  if (imgInpProduct) {
    imgInpProduct.onchange = (evt) => {
      const [file] = imgInpProduct.files;
      const fileSize = file.size;
      const fileSizeKB = fileSize / 1024;
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async function () {
        if (!validateSizeImage(fileSizeKB, 1000)) return;
        if (!validateSizeImageProduct(img.height, img.width)) return;
        if (file) {
          const img_url = URL.createObjectURL(file);
          blah_product.src = img_url;
          blah_product.parentElement.setAttribute("href", img_url);
        }
      };
    };
  }
};

hanldeChangeImage();

markdownFormNews?.addEventListener("submit", function (e) {
  e.preventDefault();
  handleAddNew();
});
markdownFormProduct?.addEventListener("submit", function (e) {
  e.preventDefault();
  handleAddProduct();
});

document.addEventListener("DOMContentLoaded", function () {
  tab_editProduct?.addEventListener("click", function (e) {
    if (parentContentProduct && parentContentProduct.parentNode) {
      parentContentProduct.parentNode.insertBefore(
        markdownFormProduct,
        parentContentProduct
      );
    }
    markdownFormProduct.classList.add("d-none");
    markdownFormProduct.classList.add("modal_absolute_content");
  });
  tab_addProduct?.addEventListener("click", function (e) {
    if (parentContentProduct && parentContentProduct.parentNode) {
      parentContentProduct.appendChild(markdownFormProduct);
    }
    markdownFormProduct.classList.remove("d-none");
    markdownFormProduct.classList.remove("modal_absolute_content");
    markdownFormNews.classList.add("d-block");
  });

  tab_editNews?.addEventListener("click", function (e) {
    if (parentContentNews && parentContentNews.parentNode) {
      parentContentNews.parentNode.insertBefore(
        markdownFormNews,
        parentContentNews
      );
    }
    markdownFormNews.classList.add("d-none");
    markdownFormNews.classList.add("modal_absolute_content");
  });
  tab_addNews?.addEventListener("click", function (e) {
    if (parentContentNews && parentContentNews.parentNode) {
      parentContentNews.appendChild(markdownFormNews);
    }
    markdownFormNews.classList.remove("d-none");
    markdownFormNews.classList.remove("modal_absolute_content");
    markdownFormProduct.classList.add("d-block");
  });
});

//
const productEditPrams = document.querySelector("#product_param_id")?.innerText;
const btn_edit_product_id = document.getElementById(
  `btn_edit_product_${productEditPrams}`
);
if (btn_edit_product_id) {
  setTimeout(() => {
    tab_editProduct?.click();
  }, 100);
  setTimeout(() => {
    btn_edit_product_id?.click();
  }, 400);
}

const newsEditPrams = document.querySelector("#new_param_id")?.innerText;
const btn_edit_news_id = document.getElementById(
  `btn_edit_news_${newsEditPrams}`
);
if (btn_edit_news_id) {
  setTimeout(() => {
    tab_editNews?.click();
  }, 100);
  setTimeout(() => {
    btn_edit_news_id?.click();
  }, 400);
}

CKEDITOR.replace('policy-content-vi');
CKEDITOR.replace('policy-content-en');
CKEDITOR.replace('qa-content-vi');
CKEDITOR.replace('qa-content-en');
CKEDITOR.replace('coop-content-vi');
CKEDITOR.replace('coop-content-en');