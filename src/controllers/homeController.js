const newService = require("../services/newService.js");
const categoryService = require("../services/categoriesService.js");
const editLandingService = require("../services/editLandingService.js");
const {getPolicyDetails,getPolicyList,getQADetails,getQAList,getCoopList,getCoopDetails} = require("../services/footerService.js")

const cheerio = require("cheerio");
const adminController = require("./adminController.js");

const convertStringToHTML = (str) => {
  const $ = cheerio.load(str);
  return $.html();
};

module.exports = {
  handleRenderHomePage: async (req, res,type="home",roles) => {
    const { lang } = req.params?.lang ? req.params : {lang:"vi"};

    try {
      const listQA = await getQAList();  
      const listPolicy = await getPolicyList();
      const listCoop = await getCoopList();  
      const news = await newService.getNewsLimit(3,lang);
      const categories = await categoryService.getAllCategoryAndProduct(lang);
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
        listPolicy: listPolicy,
        listQA : listQA,
        listCoop: listCoop,
        lang:lang? lang : "vi",  
        news,
        categories,
        headerSection: convertStringToHTML(headerSection),
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
      const listPolicy = await getPolicyList();  
      const data={
        listPolicy: listPolicy,
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

  handleRenderPolicy: async (req,res) =>{
    const {id} = req.params
    console.log(id)
    const { lang } = req.params?.lang ? req.params : {lang:"vi"};

    try {
      const headerSection = await editLandingService.getHeaderSection(lang);
      const footerSection = await editLandingService.getFooterSection(lang);
      const listPolicy = await getPolicyList(); 
      const listQA = await getQAList();
      const listCoop = await getCoopList();  
  
 
      const data= {
        id,
        lang:lang ? lang : "vi",
        headerSection: convertStringToHTML(headerSection),
        footerSection: convertStringToHTML(footerSection),
        listPolicy: listPolicy,
        listQA : listQA,
        listCoop: listCoop,
      } 
      return res.render('./Footer/policy.ejs',data)
    } catch (error) {
      console.log("error >>>", error);
      return res.render("ErrorPage.ejs");
    }
  },
  handleRenderQA: async (req,res) =>{
    const {id} = req.params
    const { lang } = req.params?.lang ? req.params : {lang:"vi"};

    try {
      const headerSection = await editLandingService.getHeaderSection(lang);
      const footerSection = await editLandingService.getFooterSection(lang);
      const listQA = await getQAList();  
      const listPolicy = await getPolicyList();
      const listQADetails = await getQADetails(); 
      const listCoop = await getCoopList();

      const data= {
        id,
        lang:lang ? lang : "vi",
        headerSection: convertStringToHTML(headerSection),
        footerSection: convertStringToHTML(footerSection),
        listQA: listQA,
        listPolicy : listPolicy,
        listQADetails : listQADetails,
        listCoop : listCoop
      } 
      return res.render('./Footer/q&a.ejs',data)
    } catch (error) {
      console.log("error >>>", error);  
      return res.render("ErrorPage.ejs");
    }
  },
  handleRenderCooperate: async (req, res)=>{
    const {id} = req.params
    const { lang } = req.params?.lang ? req.params : {lang:"vi"};
    const {name,content}= await getCoopDetails(id,lang);
    try {
      const headerSection = await editLandingService.getHeaderSection(lang);
      const footerSection = await editLandingService.getFooterSection(lang);
      const listPolicy = await getPolicyList();
      const listQA = await getQAList();  
      const listCoop = await getCoopList();

      const data= {
        name,
        content: convertStringToHTML(content),
        listPolicy : listPolicy,
        listQA: listQA,
        listCoop : listCoop,
        id,
        lang:lang ? lang : "vi",
        headerSection: convertStringToHTML(headerSection),
        footerSection: convertStringToHTML(footerSection),
      } 
      return res.render('./Footer/cooperate.ejs',data)
    } catch (error) {
      console.log("error >>>", error);  
      return res.render("ErrorPage.ejs");
    }
  }

};
