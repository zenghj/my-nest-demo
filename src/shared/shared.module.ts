import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { UserModule } from '../user/user.module';

@Global()
@Module({
    providers: [ConfigurationService],
    exports: [ConfigurationService],
    imports: [UserModule],
})
export class SharedModule {
}
