import { useCallback, useState } from "react";
import { ACL_CONTEXT } from "../../constants";
import { AclProviderProps } from "../../types";

export default function AclProvider(props: AclProviderProps) {
  const {
    children,
    initialPermissions = []
  } = props;
  const [ permissions, setPermissions ] = useState<string[]>(initialPermissions);

  const addPermissions = useCallback((permissionsToAdd: string[]) => {
    setPermissions(old => old.concat(permissionsToAdd));
  }, [setPermissions]);

  const removePermissions = useCallback((permissionsToRemove: string[]) => {
    setPermissions(old => old.filter(oldPermission => !permissionsToRemove.includes(oldPermission)));
  }, [setPermissions]);

  const hasSomePermission = useCallback((checkPermissions: string[]) => {
    return checkPermissions.some(permission => permissions.includes(permission));
  }, [permissions]);

  const dataItemsFilter = useCallback(
    <DataItem extends { permissions?: string[] }>(dataItems: DataItem[]) => (
      dataItems.filter(dataItem => !dataItem.permissions || hasSomePermission(dataItem.permissions))
    ),
    [hasSomePermission]
  );
  
  return (
    <ACL_CONTEXT.Provider
      value={{
        addPermissions,
        dataItemsFilter,
        permissions,
        removePermissions,
        hasSomePermission
      }}
    >
      {children}
    </ACL_CONTEXT.Provider>
  );
}
