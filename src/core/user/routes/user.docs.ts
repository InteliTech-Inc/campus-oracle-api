/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user.
 *         name:
 *           type: string
 *           description: The full name of the user.
 *         phone:
 *           type: string
 *           description: The user's phone number.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         photo:
 *           type: string
 *           description: A URL or path to the user's profile photo.
 *         address:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 *           description: The list of addresses associated with the user.
 *         role:
 *           type: string
 *           enum: [user, vendor, rider]
 *           description: The role assigned to the user.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated.
 *       required:
 *         - id
 *         - name
 *         - phone
 *         - photo
 *         - address
 *         - role
 *         - created_at
 *         - updated_at
 *       description: The User type defines the structure of a user entity in the system.
 *
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: A unique id for the address.
 *         label:
 *           type: string
 *           description: A name given to the specified address.
 *         lat:
 *           type: number
 *           description: The latitude of the address.
 *         long:
 *           type: number
 *           description: The longitude of the address.
 *         city:
 *           type: string
 *           description: The city of the address.
 *         region:
 *           type: string
 *           description: The region of the address.
 *         active:
 *           type: boolean
 *           description: Indicates whether the id is still active
 *       required:
 *         - lat
 *         - long
 *         - city
 *         - region
 *       description: The Address type defines the structure of an address entity associated with a user.
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users.
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user account.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user.
 *               phone:
 *                 type: string
 *                 description: Phone number of the user.
 *               address:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                     description: The latitude of the address.
 *                   long:
 *                     type: number
 *                     description: The longitude of the address.
 *                   city:
 *                     type: string
 *                     description: The city of the address.
 *                   region:
 *                     type: string
 *                     description: The region of the address.
 *                 required:
 *                   - lat
 *                   - long
 *                   - city
 *                   - region
 *                 description: The address details of the user.
 *             example:
 *               name: "John Doe"
 *               phone: "+1234567890"
 *               address:
 *                 lat: 22.24
 *                 long: 3324
 *                 city: "Akosombo"
 *                 region: "Eastern"
 *     responses:
 *       201:
 *         description: User account created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update an existing user profile.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the user.
 *               phone:
 *                 type: string
 *                 description: Updated phone number of the user.
 *               email:
 *                 type: string
 *                 description: The user's updated email.
 *               address:
 *                 type: string
 *                 description: Updated stringified address object.
 *           example:
 *               name: "John Doe"
 *               phone: "+1234567890"
 *               address:
 *                 lat: 22.24
 *                 long: 3323
 *                 city: "Akosombo"
 *                 region: "Eastern"
 *     responses:
 *       201:
 *         description: User profile updated successfully.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/photo/{id}:
 *   patch:
 *     summary: Update a user's profile photo.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: The new profile photo to be uploaded.
 *     responses:
 *       201:
 *         description: User profile photo updated successfully.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user account.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID.
 *     responses:
 *       201:
 *         description: User account deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user.
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing or invalid id parameter.
 *       500:
 *         description: Internal server error.
 *
 */
