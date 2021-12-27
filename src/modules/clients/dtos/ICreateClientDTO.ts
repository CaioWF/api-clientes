interface ICreateClientDTO {
  full_name: string;
  gender: string;
  birth_date: Date;
  city_id?: string;
  id?: string;
  created_at?: Date;
}

export { ICreateClientDTO };
