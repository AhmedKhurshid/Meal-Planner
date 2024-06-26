import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { configStaticFiles, TypeOrmModuleRootAsync } from 'core/config';
import { RolesGuard } from 'core/guards/role.guard';
import { FeatureModule } from 'feature/feature.module';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './core/guards';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from 'core/shared/shared.module';
import { LoggerMiddleware } from 'core/middleware'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: '../public',
    }),
    configStaticFiles,
    TypeOrmModuleRootAsync,
    // SendGridModule.forRoot({
    //   apikey: ENV.MAIL_API_KEY
    // }),

    // MailerModule.forRoot(configMailer),
    SharedModule,
    AuthModule,

    FeatureModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [
    // MailerModule, // Those modules has Services Must needs to be exported
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
