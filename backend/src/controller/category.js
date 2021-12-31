const Category = require("../models/category")
const slugify = require("slugify");
exports.addCategory = async (req,res) => {
    try{
        let currentCategory = req.body.name;
        let existedCategory = await Category.findOne({name:currentCategory});
        let categoryObj;
        let categoryUrl; 
        if(existedCategory){
            res.status(400).json({message: 'already exist category',existedCategory});
        }else{
           categoryObj = {
                name : req.body.name,
                slug: slugify(req.body.name)
            }
                if(req.file){
                    categoryUrl = process.env.API + '/public/' + req.file.filename;
                    categoryObj.categoryImage = categoryUrl;
                }
                
                if(req.body.parentId){
                    categoryObj.parentId = req.body.parentId;
                }
                const cate = await new Category(categoryObj);
                const newCategory = await cate.save();
                res.status(201).json({
                    message : "success",
                    category: newCategory
                })
        }
    }catch(err){
        res.status(422).json({err});
    }
}

function createCategories(categories,parentId = null){
            const categoryList = [];
            let category;
            if(parentId == null){
               category =  categories.filter(cat => cat.parentId == undefined);
            }else{
                category = categories.filter(cat => cat.parentId == parentId);
            }
            for(var cate of category){
                categoryList.push({
                    _id : cate._id,
                    name: cate.name,
                    slug: cate.slug,
                    parentId: cate.parentId,
                    children: createCategories(categories, cate._id)
                })
            }
            return categoryList;
}
exports.getCategories = async (req,res) => {
    try{
            let categories = await Category.find();
            // console.log(categories)
            if(categories){
                const categories_list = createCategories(categories);
                res.status(200).json(categories_list);
            }
    }catch(err){
        res.status(422).json({error:"error"})
    }
}
exports.updateCategory = async(req,res) => {
        console.log(req.body)
        res.status(200).json({
            body: req.body
        })
}