/**
 * AvatarService: A service for generating avatar URLs using DiceBear.
 *
 * This class provides a method to generate an avatar URL based on a user's name.
 * It uses the DiceBear API to create unique avatars based on the given seed.
 * The base URL for the API is retrieved from environment variables.
 */
export default class AvatarService {
    /**
     * Generates a DiceBear avatar URL.
     *
     * @param {string} name - The name used as the seed for generating the avatar.
     *                        If the name contains multiple words, only the first word (converted to lowercase) is used.
     *                        If no name is provided, a default value ('John') is used as the seed.
     * @returns {string} - A complete URL pointing to the DiceBear API, with the seed included.
     */
    static generateUrl = (name: string): string => {
        const firstName = name.toLowerCase().split(' ')[0] ?? 'John';

        // Construct and return the URL using the base API URL from environment variables
        return `${process.env.DICEBEAR_API_URL}/svg?seed=${firstName}`;
    };
}
