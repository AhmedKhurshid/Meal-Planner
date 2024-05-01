import { User } from 'core/entities/user.entity';
import { AlphaModel, BetaModel } from 'core/entities';
import { Service } from './service.entity';
import { ServiceForm } from './serviceForm.entity';
import { Notification } from './notification.entity';
import { Student } from './student.entity';
import { Vendor } from './vendor.entity';
import { Item } from './item.entity';
import { Order } from './order.entity';
import { MealPlan } from './mealPlan.entity';
import { StudentTpye } from './studentType.entity';
import { FoodAllergies } from './foodAllergy.entity';
import { OrderTimeSchedule } from './order-time-schedule.entity';
import { PaymentRequest } from './paymentRequest.entity';

export const entities = [
  User,
  Service,
  ServiceForm,
  Notification,
  OrderTimeSchedule,
  Student,
  Vendor,
  Item,
  Order,
  MealPlan,
  StudentTpye,
  FoodAllergies,
  PaymentRequest
];

export const baseEntities = [AlphaModel, BetaModel];
