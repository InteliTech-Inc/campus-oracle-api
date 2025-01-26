/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user and admin authentication and session management
 */

/**
 * @swagger
 * /auth/generate-otp:
 *   post:
 *     summary: Generate an OTP for authentication
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - channel
 *             properties:
 *               channel:
 *                 type: string
 *                 description: The channel to send the OTP to
 *                 enum: [sms, whatsapp]
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *             example:
 *               phone: "+233123456789"
 *               channel: "whatsapp"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Validation error or bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify the OTP provided by the user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - token
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *               token:
 *                 type: string
 *                 description: The OTP token received by the user
 *             example:
 *               phone: "+233123456789"
 *               token: "123456"
 *     responses:
 *       200:
 *         description: OTP verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Session data for the authenticated user
 *                   properties:
 *                     access_token:
 *                       type: string
 *                       description: The access token for the session
 *                     refresh_token:
 *                       type: string
 *                       description: The refresh token for the session
 *                     is_new_user:
 *                       type: boolean
 *                       description: Determines if the user has to create a profile or not
 *       401:
 *         description: Unauthorized or invalid OTP
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/sign-out:
 *   post:
 *     summary: Sign out the currently logged-in user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User signed out successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/update-phone:
 *   post:
 *     summary: Update the phone number associated with the user's account
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Phone number updated successfully
 *       400:
 *         description: Validation error or bad request
 */

/**
 * @swagger
 * /auth/current-user:
 *   get:
 *     summary: Retrieve the currently logged-in user's information
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: The logged-in user's information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 photo:
 *                   type: string
 *                 address:
 *                   type: object
 *                   properties:
 *                     lat:
 *                       type: number
 *                     long:
 *                       type: number
 *                     city:
 *                       type: string
 *                     region:
 *                       type: string
 *                 role:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *               example:
 *                 id: "aherhr-3ahfahf-334naklanalhlghag"
 *                 name: "Topia Twnins"
 *                 phone: "+2334567890"
 *                 photo: "https://example.com/avatar.jpg"
 *                 address:
 *                   lat: 22.24
 *                   long: 3323.23
 *                   city: "Akosombo"
 *                   region: "Eastern"
 *                 role: "user"
 *                 created_at: "2024-12-07T09:30:36.774Z"
 *                 updated_at: "2024-12-07T09:30:36.774Z"
 *       401:
 *         description: User not authorized
 */

/**
 * @swagger
 * /auth/admin/sign-in:
 *   post:
 *     summary: Admin Sign-In
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email address
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 description: Admin's password
 *                 example: P@ssw0rd!
 *     responses:
 *       200:
 *         description: Sign-in successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/admin/forgot-password:
 *   post:
 *     summary: Forgot Admin Password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email
 *                 example: admin@example.com
 *               redirectTo:
 *                 type: string
 *                 description: URL for redirection for the admin to input new password
 *                 example: https://example.com/reset-password
 *     responses:
 *       200:
 *         description: Password reset initiated
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /auth/admin/reset-password:
 *   post:
 *     summary: Change Admin Password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the admin
 *                 example: NewP@ssw0rd!
 *     responses:
 *       200:
 *         description: Password successfully changed
 *       400:
 *         description: Validation error
 */
