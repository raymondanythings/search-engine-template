import { AxiosResponse } from "axios";
import { api } from "./ajax";

export interface IFetchPlace {
  seq: number;
  placeType: string;
  name: string;
  isPublic: boolean;
  isOpen: boolean;
  key: string;
  longitude: string;
  latitude: string;
  rating: number;
  service1: boolean;
  service2: boolean;
  service3: boolean;
  isService: boolean;
  imgUrl1?: string;
  imgUrl2?: string;
  imgUrl3?: string;
  imgUrl4?: string;
  imgUrl5?: string;
  roomTotalCount: number;
  roomUseCount: number;
  deskTotalCount: number;
  deskUseCount: number;
  manager: {
    seq: number;
  };
}
interface IFetchResponse {
  list: IFetchPlace[];
  total: number;
  page: string;
  perPage: string;
  search: string;
  orderBy: string;
  align: string;
  filter: string;
}
async function fetchPlace() {
  const params = {
    incLike: true,
    incUsage: true,
    page: 1,
    perPage: 10,
    debug: false,
  };
  return await api
    .get("/place", { params })
    .then((res: AxiosResponse<IFetchResponse>) => res.data);
}

async function searchPlace(keyword = "") {
  if (keyword) {
    const params = {
      search: keyword,
      incLike: true,
      incUsage: true,
      debug: false,
      page: 1,
      perPage: 10,
    };
    return await api
      .get("/place", { params })
      .then((res: AxiosResponse<IFetchResponse>) => res.data);
  }
}

export { fetchPlace, searchPlace };
