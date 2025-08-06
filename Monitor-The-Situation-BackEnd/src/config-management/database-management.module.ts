import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${ENV}.env`,  // <-- FIXED HERE
      ignoreEnvFile: false,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('DATABASE_URI');
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule implements OnApplicationBootstrap {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  onApplicationBootstrap() {
    console.log(`
      \n Here is our database URI: ${this.configService.get('DATABASE_URI')} 🚀
      \n 🚀 MongoDB has connected successfully at port ${this.configService.get('PORT')} 🚀
    `);
  }
}
