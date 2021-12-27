interface IListCitiesDTO {
  filters: {
    name?: string;
    state?: string;
    skip?: number;
    take?: number;
  };
}

export { IListCitiesDTO };
