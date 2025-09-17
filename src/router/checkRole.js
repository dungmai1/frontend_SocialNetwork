import { navigate } from "react-router-dom";

const accessToken = localStorage.getItem("accessToken");
if (!accessToken) {
  navigate("/login");
}
export default router;