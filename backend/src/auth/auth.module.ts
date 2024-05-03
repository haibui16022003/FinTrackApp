/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './schemas/account.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config: ConfigService)=> {
          return{
            secret:config.get<string>('JWT_SECRET'),
            signOptions: {
             expiresIn: config.get<string|number>('JWT_EXPIRES'),
            }

          }
      },
    }),
    MongooseModule.forFeature([{name:'Account', schema: AccountSchema}])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
