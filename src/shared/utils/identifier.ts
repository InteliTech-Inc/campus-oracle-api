export default function generateRandomId() {
    return Math.random().toString(36).substring(2, 6);
}