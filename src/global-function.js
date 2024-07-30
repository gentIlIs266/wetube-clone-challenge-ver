export const logInProcess = (userObj) => {
    req.session.loggedIn = true;
    req.session.user = userObj;
}