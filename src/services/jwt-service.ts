import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {TokenServiceBindings} from '../keys';
const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService {
  @inject(TokenServiceBindings.TOKEN_SECRET) public readonly jwtSecret: string;
  @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
  public readonly jwtExpiersIn: string;

  async getrateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error while generating token : userprofile is null',
      );
    }
    let token = '';
    try {
      token = await signAsync(userProfile, this.jwtSecret, {
        expiresIn: this.jwtSecret,
      });
    } catch (err) {
      throw new HttpErrors.Unauthoriz();
    }
    return token;
  }
  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }
    let userProfile: UserProfile;
    try {
      const decryptedToken = await verifyAsync(token, this.jwtSecret);
      userProfile = Object.assign(
        {id: '', name: '', permissions: []},
        {
          id: decryptedToken.id,
          name: decryptedToken.name,
          permissions: decryptedToken.permission,
        },
      );
    } catch (err) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${err.message}`,
      );
    }
    return userProfile;
  }
}
