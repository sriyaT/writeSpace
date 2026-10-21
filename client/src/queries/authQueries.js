import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
// export const useRegisterMutation = () => {
//   return useMutation({
//     mutationFn: register,
//   });
// };
// export const useLogoutMutation = () => {
//   return useMutation({
//     mutationFn: logout,
//   });
// };
