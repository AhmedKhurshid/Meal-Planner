"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("../core/constant");
const enums_1 = require("../core/enums");
const service_1 = require("../core/service");
const typeorm_1 = require("typeorm");
const ResponseModel_1 = require("../core/common/ResponseModel");
const respose_code_status_1 = require("../core/enums/respose-code-status");
const userDetail_1 = require("./responseModel/userDetail");
const userDetailInfo_1 = require("./responseModel/userDetailInfo");
const adminDrtailInfo_1 = require("./responseModel/adminDrtailInfo");
const adminDetail_1 = require("./responseModel/adminDetail");
const pageMeta_dto_1 = require("../admin/dto/pageMeta.dto");
const student_entity_1 = require("../core/entities/student.entity");
const studentDetail_1 = require("./responseModel/studentDetail");
const typeDetail_1 = require("./responseModel/typeDetail");
let AuthService = class AuthService extends service_1.CoreService {
    constructor(_jwt) {
        super();
        this._jwt = _jwt;
    }
    async signUpAdmin(data) {
        this.logger.warn('Sign Up Admin is triggered!');
        const hashResult = await constant_1.argon.hash(data.password);
        const existUser = await this.repos.user.findOneBy({ email: data.email });
        (0, constant_1.throwForbiddenException)(existUser);
        const user = this.repos.user.create(Object.assign(Object.assign({}, data), { password: hashResult }));
        await this.repos.user.save(user);
        const token = await this.returnGeneratedToken(user);
        const res = new ResponseModel_1.ResponseData();
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.REGISTERSUCCESSFULL];
        res.data = token;
        return res;
    }
    async signUpLawyer(data) {
        const res = new ResponseModel_1.ResponseData();
        const existUser = await this.repos.user.findOneBy({ email: data.email });
        (0, constant_1.throwForbiddenException)(existUser);
        const service = await this.repos.type.findOneBy({ id: data.type });
        if (!service) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.TYPENOTFOUND];
            return res;
        }
        const user = (0, constant_1.searalizeUser)(data, data.role, enums_1.STATUS.PENDING);
        const password = await (0, constant_1.generateCode)();
        user.password = await constant_1.argon.hash(password);
        try {
            const createUser = this.repos.user.create(user);
            const userId = await this.repos.user.save(createUser);
            const student = {
                typeId: data.type,
                secPhone: data.secPhone,
                allergies: data.allergies,
                userId: userId.id,
            };
            const create = this.repos.student.create(student);
            await this.repos.student.save(create);
            await this.mail.signUpPassword({
                to: data.email,
                name: data.name,
                password,
            });
            const { email, id, name } = user;
            const result = { id, email, name };
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.REGISTERSUCCESSFULL];
            res.data = result;
            return res;
        }
        catch (e) {
        }
    }
    async signUpLocal(data) {
        const hashResult = await constant_1.argon.hash(data.password);
        const existUser = await this.repos.user.findOneBy({ email: data.email });
        if (existUser)
            throw new common_1.ForbiddenException('User already Exsist with the ' + data.email);
        const user = this.repos.user.create(Object.assign(Object.assign({}, data), { password: hashResult }));
        await this.repos.user.save(user);
        return this.returnGeneratedToken(user);
    }
    async signin(dto) {
        const res = new ResponseModel_1.ResponseData();
        const user = await this.repos.user.findOneBy({ email: dto.email });
        (0, constant_1.throwForbiddenExceptionUser)(user);
        if (user.status != enums_1.STATUS.ACTIVE) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.Wait];
            return res;
        }
        const passwordMatches = await constant_1.argon.verify(user.password, dto.password);
        if (!passwordMatches) {
            res.statusCode = common_1.HttpStatus.UNAUTHORIZED;
            res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.INVALID];
            return res;
        }
        const token = await this.returnGeneratedToken(user);
        if (user.role == enums_1.ROLE.ADMIN) {
            let loginUserDetail = new adminDetail_1.AdminDetail();
            (loginUserDetail.id = token.user.id),
                (loginUserDetail.name = token.user.name),
                (loginUserDetail.email = token.user.email),
                (loginUserDetail.status = token.user.status),
                (loginUserDetail.role = token.user.role),
                (loginUserDetail.phone = token.user.phone);
            const resp = new adminDrtailInfo_1.AdminDetailInfo();
            (resp.accessToken = token.access_token),
                (resp.refreshToken = token.refresh_token),
                (resp.userDetails = loginUserDetail);
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.SUCCESSFULL];
            res.data = resp;
            return res;
        }
        if (user.role == enums_1.ROLE.STUDENT || enums_1.ROLE.STAFF) {
            const student = await this.repos.student.findOne({
                where: { userId: user.id },
            });
            const loginUserDetail = new userDetail_1.LoginUserDetail();
            const loginStudentDetail = new studentDetail_1.LoginStudentDetail();
            (loginUserDetail.id = token.user.id),
                (loginUserDetail.name = token.user.name),
                (loginUserDetail.email = token.user.email),
                (loginUserDetail.status = token.user.status),
                (loginUserDetail.role = token.user.role),
                (loginUserDetail.phone = token.user.phone),
                (loginUserDetail.image = user.image),
                (loginUserDetail.address = user.address),
                (loginUserDetail.gender = token.user.gender);
            loginStudentDetail.secPhone = student.secPhone;
            loginStudentDetail.allergies = student.allergies;
            loginStudentDetail.type = student.type;
            const resp = new userDetailInfo_1.UserDetailInfo();
            (resp.accessToken = token.access_token),
                (resp.refreshToken = token.refresh_token),
                (resp.userDetails = loginUserDetail),
                (resp.studentDetail = loginStudentDetail);
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.SUCCESSFULL];
            res.data = resp;
            return res;
        }
    }
    async forgetPassword(body) {
        const user = await this.repos.user.findOneBy({ email: body.email });
        (0, constant_1.throwForbiddenExceptionUser)(user);
        const code = await (0, constant_1.generateLawyerPassword)();
        await this.repos.user.update(user.id, { forgetPasswordToken: code });
        await this.mail.forgetPassword({
            to: user.email,
            name: user.name,
            uuidToken: code,
        });
        const res = new ResponseModel_1.ResponseData();
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.FORGETCODE];
        return res;
    }
    async otpverificationforget({ email, code }) {
        const user = await this.repos.user.findOneBy({ email: email });
        (0, constant_1.throwForbiddenExceptionUser)(user);
        try {
            if (code == user.forgetPasswordToken) {
                user.forgetPasswordToken = null;
                await this.repos.user.update(user.id, { forgetPasswordToken: null });
                const { id } = user;
                const result = { id };
                const data = result;
                const res = new ResponseModel_1.ResponseData();
                res.statusCode = common_1.HttpStatus.OK;
                res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.OTPVERIFIED];
                res.data = data;
                return res;
            }
            else {
                const res = new ResponseModel_1.ResponseData();
                res.statusCode = common_1.HttpStatus.BAD_REQUEST;
                res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.CODENOTMATCH];
                return res;
            }
        }
        catch (e) { }
    }
    async forgetPasswordUpdate(body) {
        const res = new ResponseModel_1.ResponseData();
        const user = await this.repos.user.findOneBy({ id: body.id });
        (0, constant_1.throwForbiddenExceptionUser)(user);
        const passwordMatches = await constant_1.argon.verify(user.password, body.password);
        if (passwordMatches) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.SAMEPASSWORD];
            return res;
        }
        await this.repos.user.update(user.id, {
            password: await constant_1.argon.hash(body.password),
        });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.UPDATEDPASSWORD];
        return res;
    }
    async changePassword({ id, password }) {
        const res = new ResponseModel_1.ResponseData();
        const user = await this.repos.user.findOneBy({ id: id });
        (0, constant_1.throwForbiddenExceptionUser)(user);
        await this.repos.user.update(id, {
            password: await constant_1.argon.hash(password),
            forgetPasswordToken: null,
        });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.UPDATEDPASSWORD];
        return res;
    }
    async userChangePassword(dto) {
        const res = new ResponseModel_1.ResponseData();
        const user = await this.repos.user.findOneBy({ id: dto.id });
        (0, constant_1.throwForbiddenExceptionUser)(user);
        const passwordMatches = await constant_1.argon.verify(user.password, dto.oldPassword);
        if (!passwordMatches) {
            res.statusCode = common_1.HttpStatus.NOT_FOUND;
            res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.INVALIDPASSWORD];
            return res;
        }
        await this.repos.user.update(dto.id, {
            password: await constant_1.argon.hash(dto.password),
        });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.UPDATEDPASSWORD];
        return res;
    }
    async logout(id) {
        if (!id)
            return false;
        const result = await this.repos.user.findOneBy({ id });
        if (result && result.hashedRt != null) {
            this.repos.user.update(id, { hashedRt: null });
        }
        return true;
    }
    async refreshTokens(id, rt) {
        const user = await this.repos.user.findOneBy({ id });
        if (!user || !user.hashedRt)
            throw new common_1.ForbiddenException('Access Denied');
        const rtMatches = await constant_1.argon.verify(user.hashedRt, rt);
        if (!rtMatches)
            throw new common_1.ForbiddenException('Access Denied');
        return this.returnGeneratedToken(user);
    }
    async returnGeneratedToken(user) {
        const tokens = await this.getTokens(user);
        await this.updateRtHash(user.id, tokens.refresh_token);
        tokens.user = this.returnedSearializedUser(user);
        return tokens;
    }
    async getTokens({ id, email, role, name }) {
        const jwtPayload = {
            sub: id,
            email,
            role,
            name,
        };
        const [at, rt] = await Promise.all([
            this._jwt.signAsync(jwtPayload, {
                secret: constant_1.ENV.JWT_AT_SECRET,
                expiresIn: constant_1.ENV.JWT_ACCESS_TOKEN_EXPIRE,
            }),
            this._jwt.signAsync(jwtPayload, {
                secret: constant_1.ENV.JWT_RT_SECRET,
                expiresIn: constant_1.ENV.JWT_REFRESH_TOKEN_EXPIRE,
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async updateRtHash(id, rt) {
        const hash = await constant_1.argon.hash(rt);
        await this.repos.user.update(id, { hashedRt: hash });
    }
    returnedSearializedUser({ id, name, email, gender, phone, role, status, }) {
        return { id, name, email, gender, phone, role, status };
    }
    async getLawyerByName({ name, email }) {
        return this.repos.user.find({
            where: { name, email, role: enums_1.ROLE.STUDENT },
            select: { name: true, email: true, id: true },
        });
    }
    async getLawyerList(pageOptionsDto) {
        const queryBuilder = this.repos.user
            .createQueryBuilder('user')
            .innerJoin(student_entity_1.Student, 'student', 'student.userId = user.id')
            .select([
            'user.id as id',
            'user.name as name',
            'user.email  as email ',
            'user.status as status',
            'user.role as role',
            'user.phone as phone',
            'user.gender as gender',
            'user.address as address',
            'user.image as image',
            'student.type as type',
            'student.secPhone as secPhone',
            'student.allergies as allergies',
        ])
            .where('user.role IN (:...roles) AND (user.name LIKE :name AND user.status = :status)', {
            roles: [enums_1.ROLE.STUDENT, enums_1.ROLE.STAFF],
            name: `%${pageOptionsDto.search}%`,
            status: pageOptionsDto.status || null,
        });
        queryBuilder.orderBy('user.createdAt', pageOptionsDto.order);
        const res = new ResponseModel_1.ResponseData();
        const itemCount = await queryBuilder.getCount();
        const entities = await queryBuilder.getRawMany();
        console.log(pageOptionsDto.enable);
        if (pageOptionsDto.enable == true) {
            console.log('reched');
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.ACCEPT];
            res.data = { entities };
            return res;
        }
        const student = entities.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
        const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = { student, paginationDetail };
        return res;
    }
    async getAdminList(pageOptionsDto) {
        const queryBuilder = await this.repos.user
            .createQueryBuilder('user')
            .where('user.role = :role', { role: enums_1.ROLE.ADMIN })
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.where('user.phone LIKE :phone', {
                phone: `%${pageOptionsDto.search}%`,
            })
                .orWhere('user.email LIKE :email', {
                email: `%${pageOptionsDto.search}%`,
            })
                .orWhere('user.name LIKE :name', {
                name: `%${pageOptionsDto.search}%`,
            });
        }))
            .select([
            'user.id as id',
            'user.name as name',
            'user.email  as email',
            'user.status as status',
            'user.role as role',
            'user.phone as phone',
            'user.gender as gender',
            'user.address as address',
            'user.image as image',
        ])
            .orderBy('user.createdAt', pageOptionsDto.order);
        const res = new ResponseModel_1.ResponseData();
        const itemCount = await queryBuilder.getCount();
        const entities = await queryBuilder.getRawMany();
        if (pageOptionsDto.enable == true) {
            console.log('reched');
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.ACCEPT];
            res.data = { entities };
            return res;
        }
        const admin = entities.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
        const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = { admin, paginationDetail };
        return res;
    }
    async profile(id) {
        const res = new ResponseModel_1.ResponseData();
        const user = await this.repos.user.findOneBy({ id: id });
        const student = await this.repos.student.findOneBy({ userId: id });
        const studentType = await this.repos.type.findOneBy({ id: student.typeId });
        (0, constant_1.throwForbiddenExceptionUser)(user);
        const token = await this.returnGeneratedToken(user);
        let loginUserDetail = new userDetail_1.LoginUserDetail();
        let loginStudentDetail = new studentDetail_1.LoginStudentDetail();
        let loginStudentTypeDetail = new typeDetail_1.LoginStudentTypeDetail();
        (loginUserDetail.id = token.user.id),
            (loginUserDetail.name = token.user.name),
            (loginUserDetail.email = token.user.email),
            (loginUserDetail.status = token.user.status),
            (loginUserDetail.role = token.user.role),
            (loginUserDetail.phone = token.user.phone),
            (loginUserDetail.image = user.image),
            (loginUserDetail.address = user.address),
            (loginUserDetail.gender = token.user.gender);
        (loginStudentDetail.allergies = student.allergies);
        (loginStudentDetail.secPhone = student.secPhone);
        (loginStudentDetail.type = student.type);
        (loginStudentTypeDetail.name = studentType.name);
        const resp = new userDetailInfo_1.UserDetailInfo();
        resp.userDetails = loginUserDetail, loginStudentDetail, loginStudentTypeDetail;
        resp.studentDetail = loginStudentDetail;
        resp.typeDetail = loginStudentTypeDetail;
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = resp;
        return res;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map