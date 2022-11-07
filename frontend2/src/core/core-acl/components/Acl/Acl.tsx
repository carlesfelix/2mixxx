import useAcl from "../../hooks/useAcl";
import { AclProps } from "../../types";

export default function Acl(props: AclProps) {
  const {
    children, permissions,
    fallback
  } = props;
  const { hasSomePermission } = useAcl();
  return hasSomePermission(permissions) ? (
    <>{children}</>
  ) : (
    <>{fallback}</>
  );
}
