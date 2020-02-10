import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Configuration } from './shared/configuration/configuration.enum';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        uri: configurationService.get(Configuration.MONGO_URI),
        retryDelay: 500,
            retryAttempts: 3,
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
      }),
      inject: [ConfigurationService],
    }),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
