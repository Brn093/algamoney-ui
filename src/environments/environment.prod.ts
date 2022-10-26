export const environment = {
  production: true,
  apiUrl: 'https://algaworks-money-api.herokuapp.com',
  tokenAllowedDomains: [ /algaworks-money-api.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/],
};