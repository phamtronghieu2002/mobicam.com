const newService = require("../services/newService.js");
const categoryService = require("../services/categoriesService.js");
const editLandingService = require("../services/editLandingService.js");
const cheerio = require("cheerio");

const convertStringToHTML = (str) => {
  const $ = cheerio.load(str);
  return $.html();
};
 
module.exports = {
  handleRenderHomePage: async (req, res,type="home",roles) => {
    const { lang } = req.params?.lang ? req.params : {lang:"vi"};
    console.log("lang renderhomepage>>>", lang);
    console.log("lang params>>>", req.params);
    try {
      const news = await newService.getNewsLimit(3,lang);
      const categories = await categoryService.getAllCategoryAndProduct(lang);
      console.log("categories>>>", categories);
      const headerSection = await editLandingService.getHeaderSection(lang);
      const heroSection = await editLandingService.getHeroSection(lang);
      const methodSection = await editLandingService.getMethodSection(lang);
      const featureSection = await editLandingService.getFetureSection(lang);
      const achieveSection= await editLandingService.getAchieveSection(lang);
      const experienceSection = await editLandingService.getExperienceSection(lang);
      const footerSection = await editLandingService.getFooterSection(lang);  
      const benifitSection= await editLandingService.getbenifitSection(lang);
      const certificertSection= await editLandingService.getCertificertSection(lang);
      const categoriesSection= await editLandingService.getCategoriesSection(lang);
      const newsSection = await editLandingService.getNewsSection(lang);
      const certificertHeading = await editLandingService.getCertificertHeadingSection(lang);
      const data= {
        roles,
        lang:lang ? lang : "vi",
        news,
        categories,
        newsSection: convertStringToHTML(newsSection),
        certificertHeading: convertStringToHTML(certificertHeading),
        headerSection: convertStringToHTML(headerSection),
        heroSection: convertStringToHTML(heroSection),
        methodSection: convertStringToHTML(methodSection),
        fetureSection : convertStringToHTML(featureSection),
        achieveSection: convertStringToHTML(achieveSection),
        footerSection: convertStringToHTML(footerSection),
        experienceSection: convertStringToHTML(experienceSection),
        benifitSection: convertStringToHTML(benifitSection),
        certificertSection: convertStringToHTML(certificertSection),
        categoriesSection: convertStringToHTML(categoriesSection),
      } 

      if(type=="home"){

        return res.render("./Home/home.ejs",data);
      }

      return res.render("./Admin/editLandingPage.ejs", data);
    } catch (error) {
      console.log("error >>>", error);
      return res.render("ErrorPage.ejs");
    }
  },

  handleGetAllNews: async (req, res) => {
    try {
       const { lang } = req.params;
      const news = await newService.getAllnews(lang);
      const headerSection = await editLandingService.getHeaderSection(lang);
      const footerSection = await editLandingService.getFooterSection(lang);
      
      const data={
        lang:lang ? lang : "vi",
        news,
        headerSection: convertStringToHTML(headerSection),
        footerSection: convertStringToHTML(footerSection),
      }
      return res.render("./New/allNews.ejs", data);
    } catch (error) {
      console.log("error >>>", error);
      return res.render("ErrorPage.ejs");
    }
  },

  handleGetNewById: async (req, res) => {
    console.log("req.params", req.params);
    const { id ,lang} = req.params;
    const headerSection = await editLandingService.getHeaderSection(lang);
    const footerSection = await editLandingService.getFooterSection(lang);

    try {
      const newDetail = await newService.getNewbyId(id,lang);
      const data={
        lang,
        newDetail,
        headerSection: convertStringToHTML(headerSection),
        footerSection: convertStringToHTML(footerSection),
      }
      return res.render("./New/detailNew.ejs",  data);
    } catch (error) {
      console.log("error âs>>>", error);
      return res.render("ErrorPage.ejs");
    }
  },

  handleRenderNewPage: (req, res) => {
    return res.render("./New/new.ejs");
  },
};
