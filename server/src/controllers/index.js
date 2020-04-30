const express = require('express');
const router = express.Router();
const { verifySession } = require('./session');
const { userFilter, adminFilter } = require('../middlewares/authFilters');
const { addMeal, updateMeal, deleteMeal, fetchMeal } = require('./meal');
const { fetchAllUsers, fetchAdminSession, toggleUserActive, createUserSession, adminLogout } = require('./admin');
const { fetchUserSession, fetchUserProfile, updateUserProfile, saveUserProfile, userLogout } = require('./user');


/* VERIFY session. */
router.get('/verify/session', verifySession);

/* SAVE Meal. */
router.post('/meal/save', userFilter, addMeal);
/* UPDATE Meal. */
router.put('/meal/update', userFilter, updateMeal);
/* DELETE Meal. */
router.delete('/meal/remove/:mealId', userFilter, deleteMeal);
/* FETCH Meals. */
router.get('/meal/fetch', userFilter, fetchMeal);



/* FETCH Users. */
router.get('/admin/fetch/users', adminFilter, fetchAllUsers);
/* CREATE Admin Session. */
router.post('/admin/login', fetchAdminSession);
/* TOGGLE User Activeness. */
router.put('/admin/toggle/user/active', adminFilter, toggleUserActive);
/* LOGIN User By Admin. */
router.post('/admin/user/login', adminFilter, createUserSession);
/* LOGOUT ADMIN*/
router.get('/admin/logout', adminFilter, adminLogout);



/* CREATE User Session. */
router.post('/user/login', fetchUserSession);
/* FETCH User Profile. */
router.get('/user/profile/fetch', userFilter, fetchUserProfile);
/* UPDATE User Profile. */
router.put('/user/profile/update', userFilter, updateUserProfile);
/* SIGNUP User Profile. */
router.post('/user/profile/signup', saveUserProfile);
/* LOGOUT USER*/
router.get('/user/logout', userFilter, userLogout);


/* All Request */
router.use('/*', (_, res, next) => res.status(404).json({
    success: false,
    message: 'Invalid End Point',
}));

module.exports = router;
