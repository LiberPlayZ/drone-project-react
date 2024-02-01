
 export  function checkCookieExist() {
    // Get all cookies
    const allCookies = document.cookie;

    // Split the cookies string into individual cookies
    const cookiesArray = allCookies.split(';');

    // Create an object to store cookies
    const cookies = {};

    // Loop through the cookies array and parse each cookie
    cookiesArray.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = decodeURIComponent(value);
    });

    // Now you can access individual cookies using the cookies object
    const sessionToken = cookies['session_token'];
    return sessionToken;
}