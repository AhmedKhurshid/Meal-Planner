import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from 'core/entities';
import { Item } from 'core/entities/item.entity';
import { Order } from 'core/entities/order.entity';
import { Notification } from 'core/entities/notification.entity';
import { Service } from 'core/entities/service.entity';
import { ServiceForm } from 'core/entities/serviceForm.entity';
import { Student } from 'core/entities/student.entity';
import { Vendor } from 'core/entities/vendor.entity';
import { DataSource, Repository } from 'typeorm';
import { MealPlan } from 'core/entities/mealPlan.entity';
import { StudentTpye } from 'core/entities/studentType.entity';
import { FoodAllergies } from 'core/entities/foodAllergy.entity';
import { OrderTimeSchedule } from 'core/entities/order-time-schedule.entity';
import { PaymentRequest } from 'core/entities/paymentRequest.entity';

@Injectable({})
export class RepoService {
  constructor(
    @InjectDataSource() public datasource: DataSource,
    @InjectRepository(User) public user: Repository<User>,
    @InjectRepository(Service) public service: Repository<Service>,
    @InjectRepository(ServiceForm) public serviceForm: Repository<ServiceForm>,
    @InjectRepository(Notification)
    public notification: Repository<Notification>,
    @InjectRepository(Student) public student: Repository<Student>,
    @InjectRepository(Item) public item: Repository<Item>,
    @InjectRepository(Vendor) public vendor: Repository<Vendor>,
    @InjectRepository(MealPlan) public mealPlan: Repository<MealPlan>,
    @InjectRepository(Order) public order: Repository<Order>,
    @InjectRepository(FoodAllergies) public foodAllergies: Repository<FoodAllergies>,
    // @InjectRepository(MealPlan) public meal: Repository<MealPlan>,
    @InjectRepository(StudentTpye) public type: Repository<StudentTpye>,
    // @InjectRepository(OrderTimeSchedule) public type: Repository<OrderTimeSchedule>,
    @InjectRepository(OrderTimeSchedule) public orderTime: Repository<OrderTimeSchedule>,

    @InjectRepository(PaymentRequest) public payemetRequest: Repository<PaymentRequest>
  ) {}
}
