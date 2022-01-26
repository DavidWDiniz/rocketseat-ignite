declare namespace ReactNavigation {
  import {CarDTO} from "../../../dtos/CarDTO";
  export interface RootParamList {
    Home: undefined
    CarDetails: CarDTO
    Scheduling: undefined
    SchedulingDetails: undefined
    SchedulingComplete: undefined
  }
}