import AppointmentUser from "../components/appointment/AppointmentUser";
import ListAppointments from "../components/appointment/ListAppointments";
import PatientProfile from "../components/registrations/patient/PatientProfile";

export const GENDER = ["MALE / PRIA", "FEMALE / WANITA"];
export const BLOOD = ["A+", "A", "B", "O"];
export const MARITAL_STATUS = [
  "Single",
  "Married",
  "Divorced",
  "Seperated",
  "Widowed",
];

export const ListSidebar = [
  {
    id: 0,
    name: "Profile",
    path: "/profile",
    element: <PatientProfile />,
  },
  {
    id: 1,
    name: "Appointments",
    path: "appointments",
    element: <ListAppointments />,
  },
  {
    id: 2,
    name: "Notifications",
    path: "notifications",
    element: <div>haiii</div>,
  },
  {
    id: 3,
    name: "Medical Records",
    path: "medical-records",
    element: <div>hauhsua</div>,
  },
];
