import jwt, { Algorithm, JwtPayload } from "jsonwebtoken";

const verifyToken = (
  token: string,
  secret: string,
  algorithms?: Algorithm[]
) => {
  return jwt.verify(token, secret, { algorithms }) as JwtPayload;
};

export const jwtHelper = {
  verifyToken,
};

