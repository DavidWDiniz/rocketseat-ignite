declare namespace ReactNavigation {
  import {CarDTO} from "../../../dtos/CarDTO";
  import {MarkedDateProps} from "../../../components/Calendar";
  export interface RootParamList {
    Home: undefined
    CarDetails: CarDTO
    Scheduling: CarDTO
    SchedulingDetails: { car: CarDTO, dates: MarkedDateProps}
    Confirmation: {
      title: string,
      message: string;
      nextScreenRoute: string;
    }
    MyCars: undefined
    Splash: undefined
    SignIn: undefined
    SignUpFirstStep: undefined
    SignUpSecondStep: {
      user: {
          name: string,
          email: string,
          driverLicense: string
      }
    }
  }
}