import axios from "axios";
import getURL from "../utils/globalConstants";
import { TSettingsType, TUpdateSettingType } from "../schema/settingsSchema";

const URL = getURL();

interface GetSettingsResType {
  status: string;
  settings: TSettingsType;
}
export async function getSettings() {
  try {
    const res = await axios.get<GetSettingsResType>(`${URL}/settings`);
    // console.log(res);
    return res.data.settings;
  } catch (error) {
    console.log(error);
    throw new Error("Settings could not be loaded");
  }
}

// // We expect a newSetting object that looks like {setting: newValue}

export async function updateSetting(newSetting: TUpdateSettingType) {
  try {
    const res = await axios.patch<GetSettingsResType>(`${URL}/settings`, {
      ...newSetting,
    });

    return res.data.settings;
  } catch (error) {
    console.log(error);
    throw new Error("Settings could not be updated");
  }
}
