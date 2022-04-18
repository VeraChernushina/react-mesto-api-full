export const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
        new Error(`Ошибка ${response.status}: ${response.statusText}`)
      );
};

export const BASE_URL = 'https://api.verachernushina.mesto.nomoredomains.work'