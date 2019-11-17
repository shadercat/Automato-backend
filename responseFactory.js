exports.responseAuthorizeOk = function () {
    return {
        auth: true,
        success: true,
        reason: "none"
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
        reason: "none"
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
        reason: "none",
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