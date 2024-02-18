// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

export const getClientFromLC = (clientName) => {
  const maxTime = 3600 * 24 * 3; // 7 = 7 days
  const clientsStr = localStorage.getItem("__viewed_clients__");

  if (clientsStr !== null && clientsStr !== "") {
    const clients = JSON.parse(clientsStr);

    let client = null;

    client = clients[clientName] ?? {
      data: null,
      stored: 0,
    };

    if (client && Date.now() - client.stored > maxTime) {
      delete clients[clientName];
      localStorage.setItem("__viewed_clients__", JSON.stringify(clients));

      return {
        data: null,
        stored: 0,
      };
    }

    return client;
  } else {
    localStorage.setItem("__viewed_clients__", "{}");
  }

  return {
    data: null,
    stored: 0,
  };
};

export const saveClientToLC = (clientName, client) => {
  const clientsStr = localStorage.getItem("__viewed_clients__");

  if (clientsStr) {
    const clients = JSON.parse(clientsStr);

    clients[clientName] = {
      data: client,
      stored: Date.now(),
    };

    localStorage.setItem("__viewed_clients__", JSON.stringify(clients));
  } else {
    localStorage.setItem(
      "__viewed_clients__",
      JSON.stringify({
        [clientName]: {
          data: client,
          stored: Date.now(),
        },
      })
    );
  }
};
