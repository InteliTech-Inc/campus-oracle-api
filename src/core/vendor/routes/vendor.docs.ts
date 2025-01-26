/**
 * @swagger
 * tags:
 *   name: Vendors
 *   description: API endpoints for managing vendors and their verifications
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     VendorVerification:
 *       type: object
 *       properties:
 *         vendor_id:
 *           type: string
 *           description: Unique identifier for the vendor.
 *         national_id_photo:
 *           type: string
 *           format: binary
 *           description: National ID photo for verification.
 *         business_registration_cert_photo:
 *           type: string
 *           format: binary
 *           description: Business registration certificate photo for verification.
 *       required:
 *         - vendor_id
 *         - national_id_photo
 *         - business_registration_cert_photo
 *
 * /vendors/verifications:
 *   post:
 *     summary: Create a vendor verification.
 *     description: Submits vendor verification details including photos for verification.
 *     tags: [Vendors]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/VendorVerification'
 *     responses:
 *       201:
 *         description: Vendor verification successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 *
 *   get:
 *     summary: List all vendor verifications.
 *     description: Retrieves all verification requests for vendors.
 *     tags: [Vendors]
 *     responses:
 *       200:
 *         description: Successfully retrieved verifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VendorVerification'
 *       500:
 *         description: Internal server error.
 *
 * /vendors/verifications/{id}:
 *   patch:
 *     summary: Update vendor verification details.
 *     description: Updates the details of an existing vendor verification request.
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the verification request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorVerification'
 *     responses:
 *       201:
 *         description: Verification successfully updated.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Verification not found.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a vendor verification.
 *     description: Removes a specific vendor verification request.
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the verification request.
 *     responses:
 *       204:
 *         description: Verification successfully deleted.
 *       404:
 *         description: Verification not found.
 *       500:
 *         description: Internal server error.
 *
 *   get:
 *     summary: Retrieve a vendor verification.
 *     description: Retrieves details of a specific vendor verification request.
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the verification request.
 *     responses:
 *       200:
 *         description: Successfully retrieved verification details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VendorVerification'
 *       404:
 *         description: Verification not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /vendors:
 *   post:
 *     summary: Create a new vendor.
 *     description: Creates a vendor account with personal and shop details.
 *     tags: [Vendors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendor'
 *     responses:
 *       201:
 *         description: Vendor successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 *   get:
 *     summary: List all vendors.
 *     description: Retrieves a list of all vendors with their details.
 *     tags: [Vendors]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of vendors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/responses/VendorResponse'
 *       500:
 *         description: Internal server error.
 *
 * /vendors/{id}:
 *   patch:
 *     summary: Update vendor details.
 *     description: Updates shop-related information for a vendor.
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the vendor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendor'
 *     responses:
 *       201:
 *         description: Vendor successfully updated.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Vendor not found.
 *       500:
 *         description: Internal server error.
 *   get:
 *     summary: Retrieve vendor details.
 *     description: Retrieves detailed information for a specific vendor.
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the vendor.
 *     responses:
 *       200:
 *         description: Successfully retrieved vendor details.
 *       404:
 *         description: Vendor not found.
 *       500:
 *         description: Internal server error.
 */
