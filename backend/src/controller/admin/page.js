const Page = require("../../models/page");


exports.createPage = async (req,res) => {
    try{
        const {banners,products} = req.files;
        if(banners.length > 0){
           req.body.banners =  banners.map((banner,ind) => ({
                img:`${process.env.API}/public/${banner.filename}`,
                navigateTo: `banner?categoryId=${req.body.category}&type=${req.body.type}`
            }))
        }
        if(products.length > 0){
            req.body.products = products.map((product,ind) => ({
                img:`${process.env.API}/public/${product.filename}`,
                navigateTo: `product?categoryId=${req.body.category}&type=${req.body.type}`
            }))
        }
        req.body.createdBy = req.user; 
        Page.findOne({category: req.body.category})
        .exec((error,page) => {
            if(error) return res.status(400).json({error});
            if(page){

                Page.findOneAndUpdate({category: req.body.category},req.body)
                .exec((error,updatedPage) => {
                    if(error) return res.status(400).json({error});
                    if(updatedPage){
                        return res.status(201).json({page: updatedPage});
                    }
                })
            }else{

                const createdPage =  new Page(req.body);
                 createdPage.save();
                // console.log(createdPage)
                    res.status(201).json({
                      page : createdPage
                    });
            }
        })
    }catch(err){
        console.log(err)
    }
}

exports.getPage = (req,res) => {
    const {category,type} = req.params;
    console.log(category,type)
    if(type === "page"){
        Page.findOne({category:category})
        .exec((error,page) => {
            if(error) return res.status(400).json({error});
            if(page) return res.status(200).json({page});
        })
    }
}