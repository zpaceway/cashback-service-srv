export class ProcessedOrderDto {
  id: string;
  value: number;
  cashback: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export class UnprocessedOrderDto {
  id: string;
  value: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export class UserLoginFormDto {
  userId: string;
  password: string;
}
