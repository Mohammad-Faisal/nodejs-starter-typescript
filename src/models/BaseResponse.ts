export class BaseResponse {

    public status: string = "";
    public statusCode: number = 200;
    public data: any[] = [];
    public errors: any[] = [];
    public isError: boolean = false;
    public errorMessage: string = "";

    constructor(data: any[]) {
        this.data = data;
        this.statusCode = 200;
    }

}