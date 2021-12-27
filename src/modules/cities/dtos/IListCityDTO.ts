interface IListCityDTO {
  filters: {
    name?: string;
    state?: string;
    skip?: number;
    take?: number;
  };
}

export { IListCityDTO };
