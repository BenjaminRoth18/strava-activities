import { Module } from '@nestjs/common';
import { TokenController } from './controllers/token.controller';
import { TokenService } from './services/token.service';
import { HttpModule } from '@nestjs/axios';
import { AthleteController } from './controllers/athlete.controller';
import { AthleteService } from './services/athlete.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { AppConfigurationService } from './services/app-configuration.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AthleteController, TokenController],
  providers: [AppConfigurationService, AthleteService, TokenService],
})
export class AppModule {}
