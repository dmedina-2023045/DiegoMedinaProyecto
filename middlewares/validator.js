import {body} from "express-validator"
import {validateErrors, validateErrorsWithoutFiles} from './validate.errors.js'
import {existEmail, existUsername, notRequiredField} from "../utils/db.validators.js"

export const registerValidator = [

    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password need min characters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const updateUserValidator = [

    body('username')
        .optional() 
        .notEmpty()
        .toLowerCase()
        .custom((username, {req})=> existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles 

]

export const addCategorieValidator = [

    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({max: 25})
        .withMessage(`Can't be more than 25 characters`)
        .toLowerCase(),
    body('description')
        .notEmpty()
        .withMessage('Description is required.')
        .isLength({max: 50})
        .withMessage(`Can't be more than 50 characters`),
    validateErrors

]

export const updateCategoriaValidator = [
    
    body('name')
        .optional()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({max: 25})
        .withMessage(`Can't be more than 25 characters`)
        .toLowerCase(),
    body('description')
        .optional()
        .notEmpty()
        .withMessage('Description is required.')
        .isLength({max: 128})
        .withMessage(`Can't be more than 50 characters`),
    validateErrorsWithoutFiles

]

export const addProductValidator = [

    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({max: 25})
        .withMessage(`Can't be more than 25 characters`)
        .toLowerCase(),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({max: 128})
        .withMessage(`Can't be more than 128 characters`),
    body('brand')
        .notEmpty()
        .withMessage('Brand is required')
        .toLowerCase(),
    body('price')
        .notEmpty()
        .withMessage('Price is required'),
    body('category')
        .notEmpty()
        .withMessage('Category is required'),
    body('stock')
        .notEmpty()
        .withMessage('Stock is required'),
    validateErrors

]

export const updateProductValidator = [

    body('name')
        .optional()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({max: 25})
        .withMessage(`Can't be more than 25 characters`)
        .toLowerCase(),
    body('description')
        .optional()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({max: 128})
        .withMessage(`Can't be more than 128 characters`),
    body('brand')
        .optional()
        .notEmpty()
        .withMessage('Brand is required')
        .toLowerCase(),
    body('price')
        .optional()
        .notEmpty()
        .withMessage('Price is required'),
    body('category')
        .optional()
        .notEmpty()
        .withMessage('Category is required'),
    body('stock')
        .optional()
        .notEmpty()
        .withMessage('Stock is required'),
    validateErrorsWithoutFiles

]




