import * as db from '../models/index.js';
import CRUDService from '../services/CRUDService.js';

let getHomePage = async (req, res) => {
    try {
        let data = await CRUDService.getAllUsers();
        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post CRUD from server');
}

let getFindAllCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render('displayCRUD.ejs', { data: JSON.stringify(data) });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD.ejs', { user: userData });
    } else {
        return res.send('User not found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUserData(data);
    return res.render('users/findAllUser.ejs', { dataList: JSON.stringify(data1) });
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDService.deleteUserById(userId);
        return res.send('Delete user succeed!');
    } else {
        return res.send('User not found');
    }
}

const homeController = {
    getHomePage,
    getAboutPage,   
    getCRUD,
    postCRUD,
    getFindAllCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
};

export default homeController;

