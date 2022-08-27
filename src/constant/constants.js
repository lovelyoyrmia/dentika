import ListAppointments from "../components/appointment/ListAppointments";
import PatientProfile from "../components/registrations/patient/PatientProfile";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

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
    icon: <PersonOutlineIcon />,
  },
  {
    id: 1,
    name: "Appointments",
    path: "appointments",
    element: <ListAppointments />,
    icon: <EventNoteIcon />,
  },
  {
    id: 2,
    name: "Notifications",
    path: "notifications",
    element: <div>haiii</div>,
    icon: <NotificationsNoneIcon />,
  },
  {
    id: 3,
    name: "Medical Records",
    path: "medical-records",
    element: <div>hauhsua</div>,
    icon: <MedicationIcon />,
  },
];
