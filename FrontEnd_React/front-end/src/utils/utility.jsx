import React from "react";

export const optionsC = (Auth, methods, Body) => {
  let options = {
    method: methods,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (Auth) {
    options.headers.Authorization = `Bearer ${session_token}`;
  }

  if (Body) {
    options.body = JSON.stringify(Body);
  }

  return options;
};
