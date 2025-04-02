import { initializeApp } from "firebase/app";
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from "firebase/remote-config";
import type { MaintenanceData } from "@/types/common";

interface RemoteConfig {
  inspection: MaintenanceData | null;
}

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // 상수
    const { $constants } = useNuxtApp();
    const isDev = $constants.isDev();
    const config = $constants.firebaseConfig();

    // firebase 관련
    const app = initializeApp(config);
    const remoteConfig = getRemoteConfig(app);

    remoteConfig.settings = {
      minimumFetchIntervalMillis: 30000,
      fetchTimeoutMillis: 60000,
    };

    const fetchRemoteConfig = async () => {
      const values: RemoteConfig = {
        inspection: null,
      };

      await fetchAndActivate(remoteConfig)
        .then(() => {
          const inspection = getValue(
            remoteConfig,
            isDev ? "dev_v2_app_inspection" : "prod_v2_app_inspection",
          );

          values.inspection = JSON.parse(inspection.asString());
        })
        .catch((err) => {
          console.error("Error fetching Remote Config : ", err);
        });

      return values;
    };

    return {
      provide: {
        remoteConfig: fetchRemoteConfig,
      },
    };
  }
});
