export class Patient {
    constructor(
        public title: string,
        public firstname: string,
        public givenname: string,
        public familyname: string,
        public birthdate: Date,
        public maritalstatus: string,
        public phonenumber: string,
        public gender: string

    ){}
}
export class User {
    constructor(
        public userName: string,
        public password: string,
        public userId: number,
    ){}
}