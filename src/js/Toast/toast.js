let listeners = [];

export function subscribe(listener) {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
}

function notify(toast) {
  listeners.forEach((listener) => listener(toast));
}

function normalizePayload(messageOrOptions, options = {}) {
  if (typeof messageOrOptions === "string") {
    return {
      messages: [messageOrOptions],
      ...options,
    };
  }

  return {
    messages: [],
    ...messageOrOptions,
  };
}

export const toast = {
  info(messageOrOptions, options) {
    notify({
      type: "info",
      style: "solid",
      showClose: true,
      duration: 4000,
      ...normalizePayload(messageOrOptions, options),
    });
  },

  success(messageOrOptions, options) {
    notify({
      type: "success",
      style: "solid",
      showClose: true,
      duration: 4000,
      ...normalizePayload(messageOrOptions, options),
    });
  },

  warning(messageOrOptions, options) {
    notify({
      type: "warning",
      style: "solid",
      showClose: true,
      duration: 4000,
      ...normalizePayload(messageOrOptions, options),
    });
  },

  error(messageOrOptions, options) {
    notify({
      type: "error",
      style: "solid",
      showClose: true,
      duration: 4000,
      ...normalizePayload(messageOrOptions, options),
    });
  },
};