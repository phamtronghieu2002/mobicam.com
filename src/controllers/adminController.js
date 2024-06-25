const newService = require("../services/newService.js");
const productService = require("../services/productService.js");
const categoryService = require("../services/categoriesService.js");

module.exports = {
  handleRenderAdminLoginPage: (req, res) => {
    const message = req.flash("message")[0];
    return res.render("./Admin/login.ejs", { message });
  },

  handleUploadImage: (req, res) => {
    console.log("req.file.path >>>>", req.file.path);
    return res.status(200).json({ path: req.file.path });
  },

  handleAddNew: async (req, res) => {
    const { title_vi, title_en, content_vi, content_en, imageUrl } = req.body;
    try {
      const result = await newService.addNew(
        title_vi,
        title_en,
        content_vi,
        content_en,
        imageUrl
      );
      if (result) {
        return res.status(200).json(true);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  handleDeleteNew: async (req, res) => {
    const { id } = req.query;
    try {
      const result = await newService.deleteNew(id);
      if (result) {
        return res.redirect("/admin/dashboard");
      }
    } catch (error) {
      return res.render("ErrorPage.ejs");
    }
  },

  handleDeleteNewById: async (req, res) => {
    const { title_vi, title_en, content_vi, content_en, imageUrl } = req.body;
    const { id } = req.params;
    try {
      const result = await newService.updateNew(
        title_vi,
        title_en,
        content_vi,
        content_en,
        imageUrl,
        id
      );
      if (result) {
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  handleAddProduct: async (req, res) => {
    const { name_vi, imgs, desc_vi, catid, name_en, desc_en } = req.body;
    try {
      const result = await productService.addProduct(
        name_vi,
        imgs,
        desc_vi,
        catid,
        name_en,
        desc_en
      );
      if (result) {
        return res.status(200).json(true);
      }
    } catch (error) {
      console.log("error >>>", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  handleDeleteProduct: async (req, res) => {
    const { id } = req.query;
    try {
      const result = await productService.deleteProduct(id);
      if (result) {
        return res.redirect("/admin/dashboard/page/product");
      }
    } catch (error) {
      return res.render("ErrorPage.ejs");
    }
  },

  handleUpdateProductById: async (req, res) => {
    const { name_vi, imgs, desc_vi, catid, name_en, desc_en } = req.body;

    const { id } = req.params;
    try {
      const result = await productService.updateProduct(
        name_vi,
        imgs,
        desc_vi,
        catid,
        name_en,
        desc_en,
        id
      );
      if (result) {
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  handleRenderDashboard: async (req, res) => {
    let roles = req?.roles;
    let news = await newService.getAllnews();
    let products = await productService.getAllProduct();
    cons
    let cats = await categoryService.getAllCategory();
    return res.render("./Admin/dashboard.ejs", { roles, news, cats, products });
  },

  handleRenderDashboardProduct: async (req, res) => {
    const { id } = req.query;

    let products = await productService.getAllProduct();
    let cats = await categoryService.getAllCategory();
    return res.render("./Admin/dashboardProduct.ejs", { cats, products, id });
  },
  handleRenderDashboardNews: async (req, res) => {
    const { id } = req.query;
    console.log("id news", id);
    let cats = await categoryService.getAllCategory();
    let news = await newService.getAllnews();
    return res.render("./Admin/dashboardNews.ejs", { cats, news, id });
  },
};
