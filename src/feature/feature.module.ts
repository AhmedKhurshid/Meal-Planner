import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { VendorModule } from './vendor/vendor.module';
import { ItemModule } from './item/item.module';
// import { StudentModule } from './student/student.module';
import { MealModule } from './meal/meal.module';
import { InvoiceModule } from './invoice/invoice.module';
import { MealPlanModule } from './meal-plan/meal-plan.module';
import { StudenTtypeModule } from './studen-ttype/studen-ttype.module';
import { AllergyModule } from './allergy/allergy.module';
import { OrderTimeScheduleModule } from './order-time-schedule/order-time-schedule.module';
import { PaymentRequestModule } from './payment-request/payment-request.module';

@Module({
  imports: [
    ServiceModule,
    VendorModule,
    ItemModule,
    MealModule,
    InvoiceModule,
    MealPlanModule,
    StudenTtypeModule,
    AllergyModule,
    OrderTimeScheduleModule,
    PaymentRequestModule
  ],
})
export class FeatureModule { }
