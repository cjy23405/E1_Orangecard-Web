export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const apiToken = useApiAuthToken();
    const apiLogout = useApiAuthLogout();

    return {
      provide: {
        apiToken: () => apiToken,
        apiLogout: () => apiLogout,
      },
    };
  }
});
