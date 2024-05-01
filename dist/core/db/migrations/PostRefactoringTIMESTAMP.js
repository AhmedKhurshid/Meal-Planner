"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoringTIMESTAMP = void 0;
class PostRefactoringTIMESTAMP {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "title" TO "name"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "name" TO "title"`);
    }
}
exports.PostRefactoringTIMESTAMP = PostRefactoringTIMESTAMP;
//# sourceMappingURL=PostRefactoringTIMESTAMP.js.map