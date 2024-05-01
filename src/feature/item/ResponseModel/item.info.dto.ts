import { ApiProperty } from "@nestjs/swagger";
import { NewItem } from "./item-detail.dto";

export class ItemInfo {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    itemInfo: NewItem;
}