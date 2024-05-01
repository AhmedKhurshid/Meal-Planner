import { ApiProperty } from "@nestjs/swagger";

export class NewItem {
    @ApiProperty({
        description: "Add Item First",
    })
    name: string

    @ApiProperty()
    type: string;

    @ApiProperty()
    quantity: string

    @ApiProperty()
    costPrice: number

    @ApiProperty()
    markupPrice: number

    @ApiProperty()
    image: string
}