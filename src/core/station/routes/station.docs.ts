/**
 * @swagger
 * components:
 *   schemas:
 *     Station:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The unique identifier for the station.
 *         long:
 *           type: number
 *           description: The longitude of the station.
 *         lat:
 *           type: number
 *           description: The latitude of the station.
 *         city:
 *           type: string
 *           description: The city where the station is located.
 *         region:
 *           type: string
 *           description: The region where the station is located.
 *       required:
 *         - long
 *         - lat
 *         - city
 *         - region
 *       description: Station entity structure.
 */

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: API endpoints for managing stations.
 */

/**
 * @swagger
 * /stations:
 *   post:
 *     summary: Create a new station.
 *     tags: [Stations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - long
 *               - lat
 *               - city
 *               - region
 *             properties:
 *               long:
 *                 type: number
 *                 description: The longitude of the station.
 *               lat:
 *                 type: number
 *                 description: The latitude of the station.
 *               city:
 *                 type: string
 *                 description: The city of the station.
 *               region:
 *                 type: string
 *                 description: The region of the station.
 *             example:
 *               long: 23.456
 *               lat: -12.345
 *               city: "Accra"
 *               region: "Greater Accra"
 *     responses:
 *       201:
 *         description: Station created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /stations/{id}:
 *   get:
 *     summary: Retrieve a station by ID.
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The unique identifier of the station.
 *     responses:
 *       200:
 *         description: Station retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Station'
 *       404:
 *         description: Station not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /stations/{id}:
 *   patch:
 *     summary: Update a station by ID.
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The unique identifier of the station.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               long:
 *                 type: number
 *                 description: Updated longitude of the station.
 *               lat:
 *                 type: number
 *                 description: Updated latitude of the station.
 *               city:
 *                 type: string
 *                 description: Updated city of the station.
 *               region:
 *                 type: string
 *                 description: Updated region of the station.
 *             example:
 *               long: 24.567
 *               lat: -11.234
 *               city: "Tema"
 *               region: "Greater Accra"
 *     responses:
 *       201:
 *         description: Station updated successfully.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Station not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /stations:
 *   get:
 *     summary: List all stations.
 *     tags: [Stations]
 *     responses:
 *       200:
 *         description: List of stations retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Station'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /stations/{id}:
 *   delete:
 *     summary: Delete a station by ID.
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The unique identifier of the station.
 *     responses:
 *       201:
 *         description: Station deleted successfully.
 *       404:
 *         description: Station not found.
 *       500:
 *         description: Internal server error.
 */
