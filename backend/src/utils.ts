export const getBearerTokenFromHeaders = (request: Request): string => {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  return token;
};
