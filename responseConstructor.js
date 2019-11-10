// const responseSuccess = {
//     success: true,
//     reason: "none"
// };
// const responseAuthorize = {
//     auth: true,
//     reason: "none"
// };
exports.responseAuthorizeOk = function () {
    return {
        auth: true,
        reason: "none"
    }
};
exports.responseAuthorizeFail = function (reason) {
    return {
        auth: false,
        reason: reason
    };
};
exports.responseSuccessOk = function () {
    return {
        success: true,
        reason: none
    }
};
exports.responseSuccessFail = function (reason) {
    return {
        success: false,
        reason: reason
    }
};
