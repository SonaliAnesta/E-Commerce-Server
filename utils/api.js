const { httpStatus } = require("./constants");

const parseResponse = (formattedResponse) => {
  const { status, ...body } = formattedResponse;
  const isError = status >= httpStatus.BAD_REQUEST;
  return {
    isError,
    status,
    body,
  };
};

const formatSuccessResponse = (result = null, status = httpStatus.OK) => {
  return {
    status,
    result,
  };
};

const formatErrorResponse = (
  message = "Unexpected error occurred",
  error = null,
  status = httpStatus.SERVER_ERROR
) => {
  return {
    message,
    error,
    status,
  };
};

module.exports = {
  parseResponse,
  formatSuccessResponse,
  formatErrorResponse,
};
