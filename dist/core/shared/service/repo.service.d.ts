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
export declare class RepoService {
    datasource: DataSource;
    user: Repository<User>;
    service: Repository<Service>;
    serviceForm: Repository<ServiceForm>;
    notification: Repository<Notification>;
    student: Repository<Student>;
    item: Repository<Item>;
    vendor: Repository<Vendor>;
    mealPlan: Repository<MealPlan>;
    order: Repository<Order>;
    type: Repository<StudentTpye>;
    constructor(datasource: DataSource, user: Repository<User>, service: Repository<Service>, serviceForm: Repository<ServiceForm>, notification: Repository<Notification>, student: Repository<Student>, item: Repository<Item>, vendor: Repository<Vendor>, mealPlan: Repository<MealPlan>, order: Repository<Order>, type: Repository<StudentTpye>);
}
