const express = require('express');
const userController = require('../controllers/userController');
const { validateCreateUser, validateGetUserById, validateBorrowBook, validateReturnBook} = require('../middlewares/validationMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the user
 *         name:
 *           type: string
 *           description: Name of the user
 *       example:
 *         id: 1
 *         name: Hadi Kirkici
 *     BorrowedBook:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the book
 *         userScore:
 *           type: integer
 *           description: User's rating for the book
 *       example:
 *         name: "Lord of The Ring"
 *         userScore: 10
 *     UserDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         books:
 *           type: object
 *           properties:
 *             past:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BorrowedBook'
 *               description: List of books the user has read in the past
 *             present:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BorrowedBook'
 *               description: List of books the user is currently reading
 *       example:
 *         id: 7
 *         name: Hadi Aslan
 *         books:
 *           past:
 *             - name: "Dune"
 *               userScore: 10
 *           present:
 *             - name: "Lord of The Ring"
 *               userScore: 4
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *                 example: Hadi Kirkici
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Name is required"
 */
router.post('/', validateCreateUser, userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetail'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User not found."
 */
router.get('/:id', validateGetUserById, userController.getUserById);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}/borrow/{bookId}:
 *   post:
 *     summary: Borrow a book
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Book ID
 *     responses:
 *       204:
 *         description: Book borrowed successfully
 *       400:
 *         description: Invalid input or book already borrowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Book is already borrowed by this user"
 *       404:
 *         description: User or book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User or book not found."
 */
router.post('/:id/borrow/:bookId', validateBorrowBook, userController.borrowBook);

/**
 * @swagger
 * /users/{id}/return/{bookId}:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 format: float
 *                 description: Rating score
 *     responses:
 *       204:
 *         description: Book returned successfully
 *       400:
 *         description: Invalid input or book not borrowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Borrowed book not found or already returned"
 *       404:
 *         description: User or book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User or book not found."
 */
router.post('/:id/return/:bookId', validateReturnBook, userController.returnBook);

module.exports = router;