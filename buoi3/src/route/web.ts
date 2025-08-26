import express from "express"; //gọi Express
import {getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD,} from "../controller/homeController.ts"; 

let router = express.Router(); 

let initWebRoutes = (app) => {
    router.get('/', (req,res) => {
        return res.send('Nguyen Duc Minh');
    });
    
    router.get('/home', getHomePage); 
    router.get('/about', getAboutPage);
    router.get('/crud', getCRUD);
    router.get('/get-crud', getFindAllCrud);
    router.post('/post-crud', postCRUD);
    router.get('/edit-crud', getEditCRUD);
    router.post('/put-crud', putCRUD);
    router.get('/delete-crud', deleteCRUD);

    return app.use("/", router);
}

export default initWebRoutes;