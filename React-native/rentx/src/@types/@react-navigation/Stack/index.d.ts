declare namespace ReactNavigation {
  import {CarDTO} from "../../../dtos/CarDTO";
  import {MarkedDateProps} from "../../../components/Calendar";
  export interface RootParamList {
    Home: undefined
    CarDetails: CarDTO
    Scheduling: CarDTO
    SchedulingDetails: { car: CarDTO, dates: MarkedDateProps}
    SchedulingComplete: undefined
    MyCars: undefined
    Splash: undefined
    SignUpFirstStep: undefined
  }
}