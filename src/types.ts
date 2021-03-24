// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti

export interface ICharacter {
  id: string;
  name?: string;
  birthYear?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: number;
  mass?: number;
}

export interface IFilm {
  title?: string;
  episodeID?: number;
  openingCrawl: string;
  characterConnection: {
    characters: Array<ICharacter>;
  };
}

export interface IPaging {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface IFilmResponse {
  allFilms?: {
    films?: Array<IFilm>;
  };
}

export interface IPeopleResponse {
  allPeople?: {
    totalCount?: number;
    pageInfo?: IPaging;
    edges?: Array<{
      cursor: string;
      node?: ICharacter;
    }>;
  }
}

export interface IPersonResponse {
  person?: ICharacter;
}
