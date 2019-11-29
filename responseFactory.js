const error = require("./constants/Errors");
exports.responseAuthorizeOk = function () {
    return {
        auth: true,
        success: true,
        reason: error.FINE
    }
};
exports.responseAuthorizeFail = function (reason) {
    return {
        auth: false,
        success: false,
        reason: reason
    };
};
exports.responseSuccessOk = function () {
    return {
        auth: undefined,
        success: true,
        reason: error.FINE
    }
};
exports.responseSuccessFail = function (reason) {
    return {
        auth: undefined,
        success: false,
        reason: reason
    }
};
exports.responseDataOk = function (data) {
    return {
        auth: undefined,
        success: true,
        reason: error.FINE,
        data: data
    }
};
exports.responseDataFail = function (reason) {
    return {
        auth: undefined,
        success: false,
        reason: reason,
        data: undefined
    }
};