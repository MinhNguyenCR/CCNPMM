import express from 'express';
import homeController from '../controllers/homeController.js';  

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/',(res, req) => {
        return res.send('Nguyen Duc Minh - 22110378');
    });
    router.get('/about', homeController.getAboutPage);
    router.get('/home', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getFindAllCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.delete('/delete-crud', homeController.deleteCRUD);

    return app.use('/', router);
}
export default initWebRoutes;